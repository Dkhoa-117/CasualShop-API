import requests
import random
import logging
logging.basicConfig(filename="database.txt", level=logging.INFO)

word_site = "https://www.mit.edu/~ecprice/wordlist.10000"
response = requests.get(word_site)
words = response.content.splitlines()

def WordGen(numOfWord):
    result = ' '.join([words[random.randint(0,len(words))].decode('utf-8').capitalize() for _ in range(numOfWord)])
    return result
def UserGenerate(num):
    gender = ['male', 'female', 'other']
    template = "('{0}', '{1}', '{2}', NOW(), '{3}@gmail.com', '/default_avatar', NULL, NULL)"
    result = ', '.join([template.format(WordGen(2), gender[random.randint(0, 2)], WordGen(3).lower().replace(' ', ''), WordGen(2).lower().replace(' ', '')) for _ in range(num)])
    return result
def MovieGen(num):
    catagory = ['action', 'adventure', 'comedy', 'drama', 'fantasy', 'horror', 'musical', 'mystery', 'romance', 'science_fiction', 'sports', 'thriller', 'western']
    template = "('{0}', '/spiderman.png', '{1}', {2}, {3}, '{4}', NULL, NULL)"
    result = ', '.join([template.format(WordGen(random.randint(1, 5)), WordGen(random.randint(20, 30)),  str(random.randint(500000000, 1000000000)), str(random.randrange(50000000, 170000000)), catagory[random.randint(0, len(catagory))]) for _ in range(num)])
    return result
def PersonGen(num):
    gender = ['male', 'female', 'others']
    department = ['acting', 'writing', 'directing']
    template = "('{0}', NOW(), '{1}', '{2}', '{3}', '{4}', '/default_avatar.png', NOW())"
    result = ', '.join([template.format(WordGen(2), department[random.randint(0, 2)], gender[random.randint(0, 2)], WordGen(2), ', '.join(WordGen(3).split())) for _ in range(num)])
    return result

# NOTE: print(UserGenerate(10))
# NOTE: print(MovieGen(30))

def ProductGen(num):
    template = ''
    result = ', '.join([template.format() for _ in range(num)])
    return result
def CategoryGen(num):
    category = ['first']
    sub_category = []
    template = ''
    result = ', '.join([template.format() for _ in range(num)])
    return result
def DiscountGen(num):
    template = ''
    result = ', '.join([template.format() for _ in range(num)])
    return result

logging.info(ProductGen(60))
logging.info('-'.join(['-' for _ in range(10)]))
logging.info(CategoryGen(10))
logging.info('-'.join(['-' for _ in range(10)]))
logging.info(DiscountGen(10))
