"""
The Singleton Pattern: https://python-patterns.guide/gang-of-four/singleton/
The Global Object Pattern: https://python-patterns.guide/python/module-globals/
"""
class Singleton(object):
    
    _instance = None
    _arg = None

    def __new__(cls, arg):
        if cls._instance is None:
            print(f'Creating the object with {arg}')
            cls._instance = super(Singleton, cls).__new__(cls)
            # Initialization
        cls._arg = arg
        return cls._instance

    def method(self):
        print(self.__class__._arg)

def run_singleton():
    log1 = Singleton('initial arg')
    print(log1)
    log1.method()

    log2 = Singleton('arg changed')
    print(log2)
    print('Are they the same object?', log1 is log2)
    log2.method()

run_singleton()

"""
What else?
"""