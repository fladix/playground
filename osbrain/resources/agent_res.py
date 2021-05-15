from flask import jsonify
from flask.views import MethodView
from noaah.world import World


class AgentRes(MethodView):

    # TODO Get agent data
    def get(self, agent_id):
        if not World.get_name(): return jsonify({'msg': 'There is only Emptiness'}), 404
        agent_found = agent_id == '6uv5UhwyXmnStkYRYFdq'
        msg = 'You have found me!' if agent_found else 'Agent could not be found.'
        return jsonify({"msg": msg}), 200 if agent_found else 404

    # TODO Instantitate a new agent
    def post(self):
        pass

    # TODO Change an agent data
    def pu(self):
        pass

    # TODO Eliminate an agent
    def delete():
        pass