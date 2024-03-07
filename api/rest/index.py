from flask import Flask, request, jsonify
import zipfile
from io import BytesIO
import xml.etree.ElementTree as ET

app = Flask(__name__)


@app.route('/api/rest/ork', methods=['POST'])
def ork():
    if 'ork' not in request.files:
        return jsonify({'error': 'No file part found'}), 400

    file = request.files['ork']
    if file.filename == '':
        return jsonify({'error': 'No file selected'}), 400

    try:
        with zipfile.ZipFile(BytesIO(file.read()), 'r') as zip_ref:
            with zip_ref.open('rocket.ork') as rocket_ork_file:
                xml_content = rocket_ork_file.read()

            root = ET.fromstring(xml_content)
            configurations = []
            motors_by_cfg = {}
            rocket_name = root.find(
                ".//rocket/name").text if root.find(".//rocket/name") is not None else "Unknown Rocket"

            def calculate_length_diameter(root):
                len_tags = {'nosecone', 'bodytube',
                            'transition', 'fairing', 'secondstage'}
                total_len = 0.0
                max_diameter = 0.0

                for part in root.iter():
                    if part.tag.lower() in len_tags and part.find('length') is not None:
                        try:
                            total_len += float(part.find('length').text)
                        except (TypeError, ValueError):
                            pass

                    if part.find('radius') is not None:
                        try:
                            radius = float(part.find('radius').text)
                            diameter = radius * 2
                            max_diameter = max(max_diameter, diameter)
                        except (TypeError, ValueError):
                            pass

                return total_len, max_diameter

            total_length, max_diameter = calculate_length_diameter(root)

            # Process motors
            for motor in root.findall(".//motor"):
                config_id = motor.get('configid')
                motors_by_cfg[config_id] = {
                    'manufacturer': motor.find('manufacturer').text,
                    'designation': motor.find('designation').text,
                    'delay': motor.find('delay').text,
                    'ignitionevent': "",
                    'ignitiondelay': "",
                }

            # Process ignition configurations
            for ignconfig in root.findall(".//ignitionconfiguration"):
                config_id = ignconfig.get('configid')
                if config_id in motors_by_cfg:
                    motors_by_cfg[config_id]['ignitionevent'] = ignconfig.find(
                        'ignitionevent').text
                    motors_by_cfg[config_id]['ignitiondelay'] = ignconfig.find(
                        'ignitiondelay').text

            # Process motor configurations
            for motorconfig in root.findall(".//motorconfiguration"):
                config_id = motorconfig.get('configid')
                stage = motorconfig.find('.//stage')
                stageNumber = int(stage.get('number')
                                  ) if stage is not None else None
                stageActive = stage.get(
                    'active') == 'true' if stage is not None else False

                motor_details = motors_by_cfg.get(config_id, {})
                manufacturer = motor_details.get('manufacturer', "Unknown")
                designation = motor_details.get('designation', "Unknown")
                delay = motor_details.get('delay', "Unknown")
                ignitionevent = motor_details.get('ignitionevent', "Unknown")
                ignitiondelay = motor_details.get('ignitiondelay', "Unknown")

                simulations = []

                # Process simulations
                for simulation in root.findall(".//simulation"):
                    conditions = simulation.find('conditions')
                    sim_configid = conditions.find('configid').text
                    if sim_configid == config_id:
                        flt = simulation.find('.//flightdata')
                        simulations.append({
                            'name': simulation.find('name').text,
                            'simulator': simulation.find('simulator').text,
                            'calculator': simulation.find('calculator').text,
                            'maxaltitude': flt.get('maxaltitude'),
                            'maxvelocity': flt.get('maxvelocity'),
                            'maxacceleration': flt.get('maxacceleration'),
                            'maxmach': flt.get('maxmach'),
                            'timetoapogee': flt.get('timetoapogee'),
                            'flighttime': flt.get('flighttime'),
                            'groundhitvelocity': flt.get('groundhitvelocity'),
                            'launchrodvelocity': flt.get('launchrodvelocity'),
                            'optimumdelay': flt.get('optimumdelay'),
                            'deploymentvelocity': flt.get('deploymentvelocity')
                        })

                config_data = {
                    'configId': config_id,
                    'stageNumber': stageNumber,
                    'stageActive': stageActive,
                    'manufacturer': manufacturer,
                    'designation': designation,
                    'delay': delay,
                    'ignitionEvent': ignitionevent,
                    'ignitionDelay': ignitiondelay,
                    'simulations': simulations,
                }

                configurations.append(config_data)

        response_data = {
            'configurations': configurations,
            'totalLength': total_length,
            'maxDiameter': max_diameter,
            'name': rocket_name
        }

        return jsonify(response_data), 200

    except Exception as e:
        app.logger.error(f'Error processing file: {e}')
        return jsonify({'error': 'Error with file', 'message': str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)
