from flask import Flask
from flask import render_template
import os
import sys

from osbrain import run_agent
from osbrain import run_nameserver
import time

################################################
# ATTENTION:                                   #
# Cloud Run local emulation does not work with #
# Buildpacks for osBrain. We had to set up the #
# build with Docker!!!!!!                      #
################################################

# pylint: disable=C0103
app = Flask(__name__)

def log_message(agent, message):
    agent.log_info(f'Received: {message}')

@app.route('/example0')
def example0():
    # System deployment
    ns = run_nameserver()
    alice = run_agent('Alice')
    bob = run_agent('Bob')

    # System configuration
    addr = alice.bind('PUSH', alias='main')
    bob.connect(addr, handler=log_message)

    # Send messages
    for _ in range(3):
        time.sleep(1)
        alice.send('main', 'Hi Bob!')
    
    ns.shutdown()

    app.logger.info('### END ###')

    return 'Please look at the [Cloud Run/Debug Locally - Detailed] window'

@app.route('/')
def hello():
    # Return a friendly HTTP greeting
    message = "It's running!"

    # Get Cloud Run environment variables
    service = os.environ.get('K_SERVICE', 'Unknown service')
    revision = os.environ.get('K_REVISION', 'Unknown revision')

    return render_template('index.html',
        message=message,
        Service=service,
        Revision=revision)

if __name__ == '__main__':
    server_port = os.environ.get('PORT', '8080')
    app.run(debug=False, port=server_port, host='0.0.0.0')
