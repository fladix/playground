from noaah import agent
import os
import time

from flask import Flask
from flask import jsonify
from noaah import world


"""
Attention:
    Cloud Run local emulation does not work with Buildpacks for osBrain. 
    We had to set up the build with Docker -> No live-reload :(
"""

# pylint: disable=C0103
app = Flask(__name__)

@app.route('/admin/disassemble')
def disassemble():
    world.disassemble_world()    
    return jsonify({"msg": 'World has been disassembled!'}), 200

@app.route('/admin/home')
def home():
    msg = 'You are at home! Please look at the [Cloud Run/Debug Locally - Detailed] window'
    return jsonify({"msg": msg}), 200

@app.route('/usecase/push-pull')
def push_pull():
    agent_id = '6uv5UhwyXmnStkYRYFdq'
    nick = agent.get_nick(agent_id)
    ns_name = agent.get_ns_name(agent_id)
    if agent.check_alive(agent_id):
        for i in range(3):
            agent.get_agent_proxy(ns_name, agent_id).send('main', f'Hello there! This is {nick}! Message #{i}')
            time.sleep(3)
        msg = f'{nick} says:- Please look for messages in the console'
    else:
        msg = f'{nick} says:- Looks like I am dead'
    return jsonify({"msg": msg}), 200


if __name__ == '__main__':

    # World assembling
    world.connect_world_db()
    world.instantiate_name_servers()
    world.instantiate_base_agents()

    # API spin-up
    server_port = os.environ.get('PORT', '8080')
    app.run(debug=False, port=server_port, host='0.0.0.0')
    