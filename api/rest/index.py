from flask import Flask, request, jsonify
import xml.etree.ElementTree as ET
import zipfile
from io import BytesIO

app = Flask(__name__)


@app.route('/api/rest/ork', methods=['POST'])
def ork():
    app.logger.debug('Received request to process XML')

    # Check if the expected file part is in the request
    if 'ork' not in request.files:
        return jsonify({'error': 'No file part found'}), 400

    file = request.files['ork']
    app.logger.debug('File received')

    if file.filename == '':
        return jsonify({'error': 'No file selected'}), 400

    try:
        app.logger.debug('Attempting to process file')

        # Process the ZIP file
        with zipfile.ZipFile(BytesIO(file.read()), 'r') as zip_ref:
            # Extract `rocket.ork` from the ZIP archive
            with zip_ref.open('rocket.ork') as rocket_ork_file:
                xml_content = rocket_ork_file.read()

            # Parse the XML content
            root = ET.fromstring(xml_content)

            configurations = []
            motors_by_cfg = {}

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
                        flight_data = simulation.find('.//flightdata')
                        simulations.append({
                            'name': simulation.find('name').text,
                            'simulator': simulation.find('simulator').text,
                            'calculator': simulation.find('calculator').text,
                            'maxaltitude': flight_data.get('maxaltitude'),
                            'maxvelocity': flight_data.get('maxvelocity'),
                            'maxacceleration': flight_data.get('maxacceleration'),
                            'maxmach': flight_data.get('maxmach'),
                            'timetoapogee': flight_data.get('timetoapogee'),
                            'flighttime': flight_data.get('flighttime'),
                            'groundhitvelocity': flight_data.get('groundhitvelocity'),
                            'launchrodvelocity': flight_data.get('launchrodvelocity'),
                            'optimumdelay': flight_data.get('optimumdelay'),
                            'deploymentvelocity': flight_data.get('deploymentvelocity'),
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

        # Send the processed configurations as a JSON response
        return jsonify(configurations), 200

    except Exception as e:
        app.logger.error(f'Error processing file: {e}')
        return jsonify({'error': 'Error processing file', 'message': str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)
