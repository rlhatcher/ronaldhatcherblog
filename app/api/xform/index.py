from http.server import BaseHTTPRequestHandler
import xml.etree.ElementTree as ET
import json


class handler(BaseHTTPRequestHandler):

    def do_POST(self):
        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length)

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
        # Additional processing logic...

        # Convert configurations to JSON
        response_data = json.dumps(configurations, indent=4)

        # Send the response
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.end_headers()
        self.wfile.write(response_data.encode('utf-8'))
