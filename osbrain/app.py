import os
import time

from flask import Flask
from flask import jsonify

from noaah.world import World
from noaah.agent import AgentUtils


"""
Attention:
    Cloud Run local emulation does not work with Buildpacks for osBrain. 
    We had to set up the build with Docker -> No live-reload :(
"""

# pylint: disable=C0103
app = Flask(__name__)

@app.route('/admin/home')
def home():
    msg = 'You are at home! Please look at the [Cloud Run/Debug Locally - Detailed] window'
    return jsonify({"msg": msg}), 200

@app.route('/admin/disassemble')
def disassemble():
    World.disassemble_world()    
    return jsonify({"msg": 'World has been disassembled!'}), 200

@app.route('/usecase/push-pull')
def push_pull():
    agent = AgentUtils('6uv5UhwyXmnStkYRYFdq')
    nick = agent.get_nick()
    ns_name = agent.get_ns_name()
    if agent.check_alive():
        for i in range(3):
            agent.get_agent_proxy(ns_name).send('main', f'Hello there! This is {nick}! Message #{i}')
            time.sleep(3)
        msg = f'{nick} says:- Please look for messages in the console'
    else:
        msg = f'{nick} says:- Looks like I am dead'
    return jsonify({"msg": msg}), 200


if __name__ == '__main__':

    # World assembling
    world = World()

    # API spin-up
    server_port = os.environ.get('PORT', '8080')
    app.run(debug=False, port=server_port, host='0.0.0.0')
    