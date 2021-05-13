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
        name = 'Emptiness' if not World.get_name() else World.get_name()
        msg = f'Welcome to {name}! Please look at the [Cloud Run/Debug Locally - Detailed] window'
        return {'msg': msg}, 200 if World.get_name() else 404
    
    def put(self):
        http_code = 201 if not World.get_live_ns() else 200
        data = request.get_json()
        World(data['name'])
        msg = f'Welcome to {data["name"]}!'
        return {'msg': msg}, http_code

    def delete(self):
        name = World.get_name()
        World.destroy_world()   
        return {'msg': f'{name} was destroyed!'}, 200


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
    server_port = os.environ.get('PORT', '8080')
    # TODO @fladix When debug=True, the World Singleton instantiates two times
    app.run(debug=True, port=server_port, host='0.0.0.0')