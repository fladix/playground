"""
World creation and management routines
"""
from firebase_admin import credentials, firestore, initialize_app
from osbrain import agent, run_agent
from osbrain import run_nameserver
from osbrain.address import SocketAddress
from osbrain.proxy import NSProxy


# TODO Transform in a class to avoid this globals
# May have side-effects while importing
db = {}
live_ns = []
live_agents = []

def connect_world_db():
    cred = credentials.Certificate('noaah/key.json')
    initialize_app(cred)
    db['fire'] = firestore.client()

def instantiate_name_servers():
    print('\n', '=' * 10, 'NAME SERVERS', '=' * 10)
    world_ref = db['fire'].collection('world')
    for doc in world_ref.stream():
        #print(doc.to_dict())
        run_nameserver(addr=get_address(doc.id))
        live_ns.append(doc.id)

def instantiate_base_agents():
    print('\n', '=' * 10, 'AGENTS', '=' * 10)
    agents_ref = db['fire'].collection('agents')
    for doc in agents_ref.stream():
        dic = doc.to_dict()
        agent_proxy = run_agent(name=doc.id, nsaddr=get_address(dic['ns_name']))
        setup_agent_comms(dic, agent_proxy)
        live_agents.append(doc.id)

def setup_agent_comms(agent_data, agent_proxy):
    for channel in agent_data['comm']['channels']:
        if channel['pattern'] == 'PUSH':
            print('PUSH:', channel)
            agent_proxy.bind('PUSH', alias=channel['alias'])
        elif channel['pattern'] == 'PULL':
            print('PULL:', channel)
            interlocutor_proxy = get_agent_proxy(agent_data['ns_name'], channel['address'])
            addr = interlocutor_proxy.addr(channel['alias'])
            agent_proxy.connect(addr, handler=log_message) # TODO Rethink handler assignment here
        elif channel['pattern'] == 'PUB':
            print('PUB:', 'TBD') # TODO Implement
        elif channel['pattern'] == 'SUB':
            print('SUB:', 'TBD') # TODO Implement  

def get_agent_proxy(ns_name, agent_id):
    return NSProxy(nsaddr=get_address(ns_name)).proxy(agent_id)

# TODO Move handlers out of the module; should be on derived agent classes
def log_message(agent, message):
    agent.log_info(f'Received: {message}')

def monitor():
    pass

def disassemble_world():
    for ns in live_ns:
        NSProxy(nsaddr=get_address(ns)).shutdown()

def get_address(ns_name):
    world_ref = db['fire'].collection('world')
    ns_doc = world_ref.document(ns_name).get()
    return SocketAddress(ns_doc.get('address.host'), ns_doc.get('address.port'))


if __name__ == '__main__':
    
    # Connect to Firestore database
    connect_world_db()
    
    # Assemble World
    instantiate_name_servers()
    instantiate_base_agents()

    # Disassemble World
    disassemble_world()
