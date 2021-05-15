import os
import time

from flask import Flask
from flask import jsonify, request
from flask.views import MethodView

from noaah.world import World
from noaah.agent import AgentUtils

"""
Attention:
    Cloud Run local emulation does not work with Buildpacks for osBrain. 
    We had to set up the build with Docker -> No live-reload :(
"""

# pylint: disable=C0103
app = Flask(__name__)

class WorldRes(MethodView):
    
    def get(self):
        if not World.get_name(): return {'msg': 'Welcome to Emptiness'}, 404
        msg = f'Welcome to {World.get_name()}!'
        return jsonify({'msg': msg}), 200
    
    def put(self):
        http_code = 201 if not World.get_name() else 200
        data = request.get_json()
        World(data['name'])
        msg = f'Welcome to {data["name"]}!'
        return jsonify({'msg': msg}), http_code

    def delete(self):
        name = World.get_name()
        if not name: return {'msg': 'Nothing to destroy here'}, 404  
        World.destroy_world()
        msg = f'{name} was destroyed!'
        return jsonify({'msg': msg}), 200


class PushPullRes(MethodView):
    
    def get(self):
        if not World.get_name(): return jsonify({'msg': 'Cannot communicate in vacuum'}), 404
        agent = AgentUtils('6uv5UhwyXmnStkYRYFdq')
        nick = agent.get_nick()
        ns_name = agent.get_ns_name()
        if agent.check_alive():
            for i in range(3):
                agent.get_agent_proxy(ns_name).send('main', f'Hello there! This is {nick}! Message #{i}')
                time.sleep(0.5)
            msg = f'{nick} says:- Please look for messages in the console'
        else:
            msg = f'{nick} says:- Looks like I am dead'
        return jsonify({"msg": msg}), 200


class AgentRes(MethodView):

    # TODO Get agent data
    def get(self):
        pass

    # TODO Instantitate a new agent
    def post(self):
        pass

    # TODO Change an agent data
    def pu(self):
        pass

    # TODO Eliminate an agent
    def delete():
        pass

app.add_url_rule('/osbrain/world', view_func=WorldRes.as_view('world_res'))
app.add_url_rule('/osbrain/pushpull', view_func=PushPullRes.as_view('pushpull_res'))
app.add_url_rule('/osbrain/agent/<string:agent_id>', view_func=AgentRes.as_view('agent_res'))


if __name__ == '__main__':

    # API spin-up
    server_port = os.environ.get('PORT', '8080')
    app.run(debug=True, port=server_port, host='0.0.0.0')