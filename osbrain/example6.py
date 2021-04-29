"""Advanced communication patterns: Asynchronous Request-Reply channel

Some advanced communication patterns are also implemented in osBrain. 
They are called CHANNELS, rather than sockets, as they are formed
with multiple sockets.
"""

import time

from osbrain import run_agent
from osbrain import run_nameserver


def alice_replies_late(agent, message):
    time.sleep(1)
    agent.log_info('Finished my processing! Replying...')
    return 'Hello Bob!'


def bob_processes_reply(agent, message):
    agent.log_info('Processed reply: %s' % message)


def bob_processes_differently(agent, message):
    agent.log_info(message + ' Original handler ovewriten...')


def bob_no_reply_in_time(agent):
    agent.log_warning('No reply on-time received from Alice!')


if __name__ == '__main__':
    ns = run_nameserver()
    alice = run_agent('Alice')
    bob = run_agent('Bob')

    addr = alice.bind('ASYNC_REP', handler=alice_replies_late)
    bob.connect(addr, alias='alice', handler=bob_processes_reply)

    bob.send('alice', 'Hello, Alice!')
    bob.log_info('Message sent to Alice: I am free to do other things ' \
                 'including printing this message while waiting for ' \
                 'Alice process this reply!')
    
    # Since this is a REQ-REP comm protocol (and not PUB-SUB) we've gotta
    # wait for Alice before sending a new request, otherwise the first
    # will be overwritten
    time.sleep(3)

    bob.send('alice', 'Hello Alice 2', handler=bob_processes_differently)
    bob.log_info('Waiting again for Alice')

    time.sleep(3)

    bob.send('alice', 'Hello Alice 3', wait=0.5, on_error=bob_no_reply_in_time)
    time.sleep(3)

    ns.shutdown()