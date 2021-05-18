import time
from flask import jsonify
from flask.views import MethodView
from noaah.world import World
from noaah import agent 


class PushPullRes(MethodView):
    
    def get(self, agent_id):
        # Validation
        if not World.get_name(): 
            return jsonify({'msg': 'Cannot communicate in vacuum'}), 404
        if not agent.check_agent_alive(agent_id): 
            return jsonify({'msg': 'The requested agent is not among with us'}), 404
        # Run PUSH-PULL communication
        nick = agent.get_agent_nick(agent_id)
        ns_name = agent.get_agent_nsname(agent_id)
        for i in range(3):
            agent.get_agent_proxy(ns_name, agent_id).send('main', f'Hello there! This is {nick}! Message #{i}')
            time.sleep(0.5)
        return jsonify({'msg': f'{nick} says:- Please look for messages in the console'}), 200