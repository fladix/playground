"""
Agent logic
"""
from noaah.world import World


def get_agent_proxy(ns_name, agent_id):
    return World.get_agent_proxy(ns_name, agent_id)

def check_agent_alive(agent_id):
    return agent_id in World.get_live_agents()

def get_agent_nick(agent_id):
    dic = get_agent_doc(agent_id)
    return dic['nick']

def get_agent_nsname(agent_id):
    dic = get_agent_doc(agent_id)
    return dic['ns_name']

def get_agent_doc(agent_id):
    return World.get_client_db().collection('agents').document(agent_id).get().to_dict()