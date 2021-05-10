"""
Agent logic
"""
from noaah.world import World


class AgentUtils():

    """
    Class public interface
    """
    def get_agent_proxy(self, ns_name):
        return World.get_agent_proxy(ns_name, self.agent_id)

    def check_alive(self):
        return self.agent_id in World.get_live_agents()

    def get_nick(self):
        dic = self._agent_doc()
        return dic['nick']

    def get_ns_name(self):
        dic = self._agent_doc()
        return dic['ns_name']

    """
    Class private interface
    """
    def __init__(self, agent_id):
        self.agent_id = agent_id
        
    def _agent_doc(self):
        return World.get_client_db().collection('agents').document(self.agent_id).get().to_dict()