import random
import time

from osbrain import run_agent
from osbrain import run_nameserver


def log_a(agent, message):
    agent.log_info('Log a: %s' % message)


def log_b(agent, message):
    agent.log_info('Log b: %s' % message)


if __name__ == '__main__':

    # System deployment: instanciate ns and agents remotely
    # and returns a proxy to them
    ns = run_nameserver()  
    alice = run_agent('Alice')
    bob = run_agent('Bob')
    eve = run_agent('Eve')
    dave = run_agent('Dave')

    # System configuration: defines the publisher and subscribers
    # and also bind methods remotely to the agendts (serialize and
    # send to them via Pyro4). Specif handlers to different 
    # subscribed topics are defined
    addr = alice.bind('PUB', alias='main')
    bob.connect(addr, handler={'a': log_a, 'b': log_b})
    eve.connect(addr, handler={'a': log_a})
    dave.connect(addr, handler={'b': log_b})

    # Send messages: ramdonly choose topics to which send messages
    # Agents should print received messages in accordance to the 
    # subscribed topics. Topic filtering is carried out by the 
    # publisher preventig unecessary traffic in the network 
    for _ in range(6):
        time.sleep(1)
        topic = random.choice(['a', 'b'])
        message = 'Hello, %s!' % topic
        alice.send('main', message, topic=topic)

    # Printing all agents aliases
    print('And this are our agents...')
    for alias in ns.agents():
        print(alias)

    print('And now, closing the bar!')
    ns.shutdown()