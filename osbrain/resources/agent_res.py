from noaah.world import World
from flask import jsonify, request
from flask.views import MethodView
from noaah import agent


class AgentRes(MethodView):

    # Get agent data
    def get(self, agent_id):
        if not agent.check_agent_alive(agent_id): 
            return jsonify({'msg': 'The requested agent is not among with us'}), 404
        return jsonify(agent.get_agent_doc(agent_id)), 200

    # Create a new agent in Firestore and instantitate it
    def post(self):
        if not World.get_name(): 
            return jsonify({'msg': 'Cannot send agent to live in vacuum'}), 404
        data = request.get_json()
        doc_ref = World.get_client_db().collection('agents').add(data)
        World.instatiate_agent(doc_ref[1].id, data)
        return jsonify({'msg': f'Agent {doc_ref[1].id} was created'}), 201

    # TODO Change agent data
    def put(self, agent_id):
        pass

    # Eliminate an agent from World (not from database)
    # Method still inconsistent. Will not be further developed by now
    def delete(self, agent_id):
        if not agent.check_agent_alive(agent_id): 
            return jsonify({'msg': 'The requested agent is not among with us'}), 404
        ns_name = agent.get_agent_nsname(agent_id)
        agent.get_agent_proxy(ns_name, agent_id).shutdown()
        # TODO Remove agent from World live_agents[]
        # Best way: delete from Firestore and use DB sync functionality
        return jsonify({'msg': f'Agent {agent_id} was eliminated :('}), 200