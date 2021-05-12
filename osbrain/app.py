import os
import time

from flask import Flask, request
from flask_restful import Resource, Api

from noaah.world import World
from noaah.agent import AgentUtils

"""
Attention:
    Cloud Run local emulation does not work with Buildpacks for osBrain. 
    We had to set up the build with Docker -> No live-reload :(
"""

# pylint: disable=C0103
app = Flask(__name__)
api = Api(app)

class WorldRes(Resource):
    
    def get(self):
        msg = f'Welcome to {World.get_name()}! Please look at the [Cloud Run/Debug Locally - Detailed] window'
        return {'msg': msg}, 200
    
    def put(self):
        data = request.get_json()
        World(data['name'])
        msg = f'Welcome to {data["name"]}!'
        return {'msg': msg}, 200

    def delete(self):
        World.destroy_world()    
        return {'msg': f'{World.get_name()} was destroyed!'}, 200


class PushPullRes(Resource):
    
    def get(self):
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
        return {"msg": msg}, 200


class AgentRes(Resource):

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

api.add_resource(WorldRes, '/osbrain/world')
api.add_resource(PushPullRes, '/osbrain/pushpull')
api.add_resource(AgentRes, '/osbrain/agent/<string:agent_id>')


if __name__ == '__main__':

    # API spin-up
    World('Westeros')
    server_port = os.environ.get('PORT', '8080')
    app.run(debug=False, port=server_port, host='0.0.0.0')