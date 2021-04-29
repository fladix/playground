import spacy


print('\n=============')
print('SpaCy Basics')
print('=============\n')

nlp = spacy.load('en_core_web_sm')

# Create a Doc object
doc = nlp(u'Tesla is looking at buying U.S. startup for $6 million')

# Print each token separately
for token in doc:
    print(f'{token.text:{20}} {token.pos_:{10}} {token.dep_:{10}}')

print('\n# spaCy Pipeline:\n', nlp.pipeline)
print('\n# spaCy Pipe_names:\n', nlp.pipe_names)

print(f'\n# spaCy Doc: {type(doc)}\n', doc)

print('\n# POS and explanation:\n', doc[0].pos_, '\t-> ', spacy.explain(doc[0].pos_))
print('\n# POS DEP and explanation:\n', doc[0].dep_, '\t-> ', spacy.explain(doc[0].dep_))

print(f"\n# Lemma of '{doc[2].text}':\n", doc[2].lemma_)

print(f"\n# Simple POS with detailed Tag for '{doc[2].text}'\n", 
      'POS:', doc[2].pos_, '\n', 'Tag:', doc[2].tag_, '->', spacy.explain(doc[2].tag_))

print(f'\n# Word Shapes:\n', doc[0].text + ' -> ' + doc[0].shape_, 
       '\n ' + doc[5].text + '  -> ' + doc[5].shape_)

doc2 = nlp(u'Although commmonly attributed to John Lennon from his song "Beautiful Boy", \
             the phrase "Life is what happens to us while we are making other plans" was written by \
             cartoonist Allen Saunders and published in Reader\'s Digest in 1957, when Lennon was 17.')
span = doc2[17:31]
print(f"\n# Spans: {type(span)}\n", span)

doc3 = nlp(u'This is a sentence. Another one. Yet one more!')
print('\n# Sentences in a Doc:')
print(doc3.text)
for sent in doc3.sents:
    print(sent)