import time

from osbrain import run_agent
from osbrain import run_nameserver


def log_message(agent, message):
    print('Bob received msg')
    agent.log_info('Received: %s' % message)


if __name__ == '__main__':

    # System deployment
    ns = run_nameserver()
    alice = run_agent('Alice')
    bob = run_agent('Bob')

    # System configuration
    addr = alice.bind('PUSH', alias='main')
    print(addr, type(addr))
    bob.connect(addr, handler=log_message)

    # Send messages
    for _ in range(3):
        print('\n' + '*' * 60)
        print('Alice will send msg')
        alice.send('main', 'Hello, Bob!')
        print('Alice sent msg (Bob might receive the msg before we print this)')
        time.sleep(5)

    ns.shutdown()