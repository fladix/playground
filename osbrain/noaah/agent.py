"""
Agent logic
"""
# TODO This a bad implemented module; will be refactored into a class later
from noaah.world import db
from noaah.world import live_agents
from noaah.world import get_agent_proxy as __get_ag_px


def _agent_doc(agent_id):
    return db['fire'].collection('agents').document(agent_id).get().to_dict()

def get_agent_proxy(ns_name, agent_id):
    return __get_ag_px(ns_name, agent_id)

def get_nick(agent_id):
    dic = _agent_doc(agent_id)
    return dic['nick']

def get_ns_name(agent_id):
    dic = _agent_doc(agent_id)
    return dic['ns_name']

def check_alive(agent_id):
    return agent_id in live_agents