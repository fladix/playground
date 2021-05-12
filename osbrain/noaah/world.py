"""
World creation and management routines
"""
from firebase_admin import credentials, firestore, initialize_app
from osbrain import run_agent
from osbrain import run_nameserver
from osbrain.address import SocketAddress
from osbrain.proxy import NSProxy


class World(object):

    # ----------------------
    # Class public interface
    # ----------------------
    @classmethod
    def get_name(cls):
        return cls.__name

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
    def destroy_world(cls):
        for ns in cls.__live_ns:
            NSProxy(nsaddr=cls.__get_address(ns)).shutdown()

    # ----------------------
    # Class private interface
    # ----------------------
    __name = ''
    __db = {}
    __key = 'noaah/key.json'
    __live_ns = []
    __live_agents = []
    __instance = None

    def __new__(cls, name):
        if cls.__instance is None:
            print('Creating the object')
            cls.__instance = super(World, cls).__new__(cls)
            # Initialization
            cls.set_db_client()        
            cls.__instantiate_name_servers()
            cls.__instantiate_base_agents()
        # Update creation time argument
        cls.__name = name
        return cls.__instance

    @classmethod
    def __instantiate_name_servers(cls):
        print('\n', '=' * 10, ' NAME SERVERS ', '=' * 10, sep='')
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
        print('\n', '=' * 10, ' SETING UP AGENTS ', '=' * 10, sep='')
        print('\n', f'{"NS":<20}{"Class":<30}{"Nick":<50}{"Comms":<20}\n', '-' * 105, sep='')
        agents_ref = cls.__db.collection('agents')
        for doc in agents_ref.stream():
            dic = doc.to_dict()
            agent_proxy = run_agent(name=doc.id, nsaddr=cls.__get_address(dic['ns_name']))
            cls.__setup_agent_comms(dic, agent_proxy)
            cls.__live_agents.append(doc.id)
            print(f'{dic["ns_name"]:<20}{dic["class"]:<30}{dic["nick"]:<50}{dic["comm"]["channels"][0]["pattern"]:<20}', sep='')

    @classmethod
    def __setup_agent_comms(cls, agent_data, agent_proxy):
        for channel in agent_data['comm']['channels']:
            if channel['pattern'] == 'PUSH':
                #print('PUSH:', channel)
                agent_proxy.bind('PUSH', alias=channel['alias'])
            elif channel['pattern'] == 'PULL':
                #print('PULL:', channel)
                interlocutor_proxy = cls.get_agent_proxy(agent_data['ns_name'], channel['address'])
                addr = interlocutor_proxy.addr(channel['alias'])
                agent_proxy.connect(addr, handler=lambda agent, message: agent.log_info(f'Received: {message}')) # TODO Move out handler from here
            elif channel['pattern'] == 'PUB':
                #print('PUB:', 'TBD') # TODO Implement
                pass
            elif channel['pattern'] == 'SUB':
                #print('SUB:', 'TBD') # TODO Implement
                pass  


if __name__ == '__main__':
    
    # Assemble World: Singleton pattern
    world1 = World('Westeros')
    print('\n', '=' * 10, ' REALITY TEST ', '=' * 10, sep='')
    print(f'You are in {World.get_name()}!')
    world2 = World('Narnia')
    print(f'Now, rebulding as {World.get_name()}?')
    print(f'\nBut wait, look again: \nworld1 = {world1}\nworld2 = {world2}')

    # Destroying the world
    print('\n', '=' * 10, ' DESTROYING SPACE-TIME ', '=' * 10, sep='')
    print('Closing Name Servers automatically kills their linked agents')
    World.destroy_world()
