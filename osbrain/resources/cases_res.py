import time
from flask import jsonify
from flask.views import MethodView
from noaah.world import World
from noaah.agent import AgentUtils


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