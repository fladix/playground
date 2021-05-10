"""
World creation and management routines
"""
from cloudpickle.cloudpickle import instance
from firebase_admin import credentials, firestore, initialize_app
from osbrain import agent, run_agent
from osbrain import run_nameserver
from osbrain.address import SocketAddress
from osbrain.proxy import NSProxy


class World():

    """
    Class public interface
    """
    @classmethod
    def set_db_client(cls):
        initialize_app(credentials.Certificate(cls.__key))
        cls.__db = firestore.client()

    @classmethod
    def get_client_db(cls):
        return cls.__db
    
    @classmethod
    def get_live_ns(cls):
        return cls.__live_agents
    
    @classmethod
    def get_live_agents(cls):
        return cls.__live_agents

    @classmethod
    def get_agent_proxy(cls, ns_name, agent_id):
        return NSProxy(nsaddr=cls.__get_address(ns_name)).proxy(agent_id)

    @classmethod
    def monitor(cls):
        pass

    @classmethod
    def disassemble_world(cls):
        for ns in cls.__live_ns:
            NSProxy(nsaddr=cls.__get_address(ns)).shutdown()

    """
    Class private interface
    """
    __db = {}
    __key = 'noaah/key.json'
    __live_ns = []
    __live_agents = []
 
    def __init__(self):
        self.__class__.set_db_client()        
        self.__instantiate_name_servers()
        self.__instantiate_base_agents()

    @classmethod
    def __instantiate_name_servers(cls):
        print('\n', '=' * 10, 'NAME SERVERS', '=' * 10)
        world_ref = cls.__db.collection('world')
        for doc in world_ref.stream():
            #print(doc.to_dict())
            run_nameserver(addr=cls.__get_address(doc.id))
            cls.__live_ns.append(doc.id)

    @classmethod
    def __get_address(cls, ns_name):
        world_ref = cls.__db.collection('world')
        ns_doc = world_ref.document(ns_name).get()
        return SocketAddress(ns_doc.get('address.host'), ns_doc.get('address.port'))

    @classmethod
    def __instantiate_base_agents(cls):
        print('\n', '=' * 10, 'AGENTS', '=' * 10)
        agents_ref = cls.__db.collection('agents')
        for doc in agents_ref.stream():
            dic = doc.to_dict()
            agent_proxy = run_agent(name=doc.id, nsaddr=cls.__get_address(dic['ns_name']))
            cls.__setup_agent_comms(dic, agent_proxy)
            cls.__live_agents.append(doc.id)

    @classmethod
    def __setup_agent_comms(cls, agent_data, agent_proxy):
        for channel in agent_data['comm']['channels']:
            if channel['pattern'] == 'PUSH':
                print('PUSH:', channel)
                agent_proxy.bind('PUSH', alias=channel['alias'])
            elif channel['pattern'] == 'PULL':
                print('PULL:', channel)
                interlocutor_proxy = cls.get_agent_proxy(agent_data['ns_name'], channel['address'])
                addr = interlocutor_proxy.addr(channel['alias'])
                agent_proxy.connect(addr, handler=lambda agent, message: agent.log_info(f'Received: {message}')) # TODO Move out handler from here
            elif channel['pattern'] == 'PUB':
                print('PUB:', 'TBD') # TODO Implement
            elif channel['pattern'] == 'SUB':
                print('SUB:', 'TBD') # TODO Implement  


if __name__ == '__main__':
    
    # Assemble World
    world = World()

    # Disassemble World
    World.disassemble_world()
