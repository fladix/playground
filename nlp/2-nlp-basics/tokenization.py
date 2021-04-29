from spacy import displacy
import spacy


nlp = spacy.load('en_core_web_sm')

doc1 = nlp(u'Over the last quarter Apple sold nearly 20 thousand iPods for a profit of $6 million.')
displacy.serve(doc1, style='ent') 

doc2 = nlp(u'This is a sentence')
displacy.serve(doc2, style='dep')