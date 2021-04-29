import time

from osbrain import run_agent
from osbrain import run_nameserver


def delayed(agent, message):
    agent.log_info(message)


if __name__ == '__main__':
    ns = run_nameserver()
    agent = run_agent('a0')
    # Start unidentified timer
    agent.after(1, delayed, 'Hello!')
    # Start timer and get ID
    timer0 = agent.after(1, delayed, 'Never logged')
    # Start timer with an alias
    agent.after(1, delayed, 'Never logged either', alias='timer_alias')
    # First list all the timers
    print('List of timers: ', agent.list_timers())
    # And then, stop 2 of the 3 timers: by ID and alias
    agent.stop_timer(timer0)
    agent.stop_timer('timer_alias')

    time.sleep(2)

    # Printing system threading information (only works 
    # while in the Debugger: this thread printing code
    # has the same result independently of how many agents
    # are instanciated. Possibly, there are more but the 
    # code as is now cannot capture those others. Should
    # study multhreading in Python and come back later
    import threading
    main_thread = threading.current_thread()
    for t in threading.enumerate():
	    if t is main_thread:
		    continue
	    print('Thread %s' % t.getName())

    ns.shutdown()