# Printing with f-strings
print('\n====================================')
print('Printing with f-strings')
print('====================================\n')

name = 'Hans'
print(f'His names is {name}.')

# Pass !r to ger the string representation
print(f'His name is {name!r}')

# Min widths, alignment, and padding
print('\n====================================')
print('Min widths, alignment, and padding')
print('====================================\n')

library = [
    ('Author', 'Topic', 'Pages'),
    ('Twain', 'Rafting', 601),
    ('Feynman', 'Physics', 95),
    ('Hamilton', 'Mythology', 144)
]

for book in library:
    print(f'{book[0]:{20}} {book[1]:{20}} {book[2]:<{10}}')

print('\n')

for book in library:
    print(f'{book[0]:{20}} {book[1]:{20}} {book[2]:.>{10}}')

# Date formatting
print('\n====================================')
print('Date formatting')
print('====================================\n')

from datetime import datetime

today = datetime(year=2020, month=1, day=27)
print(f'{today:%B %d, %Y}')

# File manipulation
print('\n====================================')
print('File manipulation')
print('====================================\n')

myfile = open('whoops.txt', 'w+')
myfile.write('First line\nSecond line')
myfile.seek(0)
print(myfile.readlines())
print('\n# Now empty since cursor reached EOF in the previous reading:')
print(f'{myfile.read()!r}')
print('\n# Curso at zero again:')
myfile.seek(0)
print(myfile.read())
myfile.close()

# Attention: opening with w+ truncates the original - delete its content
myfile = open('whoops.txt', 'w+')
myfile.write('This a new first line because we lost the original ones after opening in w+ mode!')
print('\n# After writing, the cursor also goes to the end. So, a read would render nothing again:')
print(f'{myfile.read()!r}')
myfile.seek(0)
print(f'\n# Returning the cursor to position zero:\n{myfile.read()}')
myfile.close()

# Appending
myfile = open('whoops.txt', 'a+')
myfile.write('\nThis is a line being appended in a+ mode')
myfile.seek(0)
print(f'\n# Since we appended, now we have two lines:\n{myfile.read()}')
myfile.close()

# Aliases and Context Managers
print('\n# Now we are reading with a Context Manager. File implicitly closed')
with open('whoops.txt', 'r') as txt:
    first_line = txt.readline()
print(first_line)

# Iterating
print('\n# Iterating...')
with open('whoops.txt', 'r') as txt:
    for line in txt:
        print(line, end='') # the end='' argument removes extra linebreaks