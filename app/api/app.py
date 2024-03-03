from flask import Flask, request, jsonify
import xml.etree.ElementTree as ET
import json

app = Flask(__name__)

@app.route('/api/process', methods=['POST'])
def process_xml():
    post_data = request.data

    # Parse XML from POST data
    root = ET.fromstring(post_data)

    configurations = []
    motors_by_configid = {}

    # Your existing processing logic
    for motor in root.findall(".//motor"):
        config_id = motor.get('configid')
        motors_by_configid[config_id] = {
            'manufacturer': motor.find('manufacturer').text,
            'designation': motor.find('designation').text,
            'delay': motor.find('delay').text,
            'ignitionevent': "",
            'ignitiondelay': "",
        }

    for ignitionconfig in root.findall(".//ignitionconfiguration"):
      config_id = ignitionconfig.get('configid')
      if config_id and config_id in motors_by_configid:
          motors_by_configid[config_id]['ignitionevent'] = ignitionconfig.find('ignitionevent').text
          motors_by_configid[config_id]['ignitiondelay'] = ignitionconfig.find('ignitiondelay').text

    for motorconfig in root.findall(".//motorconfiguration"):
      config_id = motorconfig.get('configid')
      stage = motorconfig.find('.//stage')
      stageNumber = int(stage.get('number')) if stage is not None else None
      stageActive = stage.get('active') == 'true' if stage is not None else False

      motor_details = motors_by_configid.get(config_id, {})
      manufacturer = motor_details.get('manufacturer', "Unknown")
      designation = motor_details.get('designation', "Unknown")
      delay = motor_details.get('delay', "Unknown")
      ignitionevent = motor_details.get('ignitionevent', "Unknown")
      ignitiondelay = motor_details.get('ignitiondelay', "Unknown")

      simulations = []

      for simulation in root.findall(".//simulation"):
        conditions = simulation.find('conditions')
        sim_configid= conditions.find('configid').text
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
            'deploymentvelocity': flight_data.get('deploymentvelocity'),
            'optimumdelay': flight_data.get('optimumdelay')
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
        'simulations': simulations
      }

      configurations.append(config_data)

    # Convert configurations to JSON
    response_data = json.dumps(configurations, indent=4)

    # Send the response as JSON
    return jsonify(response_data), 200

if __name__ == '__main__':
    app.run(debug=True)
