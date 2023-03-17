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

sub_category = ['gods','creatures', 'items', 'notebook', 'novel', 'key_chain', 'backpack_wallet', 'necklace']
class Product:
    def __init__(self):
        self.name = WordGen(5)
        self.img_path = '/image00{0}'.format(random.randint(0, 9))
        self.description = WordGen(30)
        self.price = random.randint(10, 3000)
        self.category = sub_category[random.randint(0, 7)]
        self.discount_id = random.randint(0, 20)
        self.num_product = random.randint(50, 200)
        self.num_buy = random.randint(1, 600)
        self.like = random.randint(0, 200)
        self.rating = random.randint(0, 5)

listOfProduct = [];
for _ in range(50):
    product = Product()
    listOfProduct.append(product)
def ProductGen(num):
    template = "('{0}', '{1}', '{2}', '{3}', '{4}', '{5}', '{6}', '{7}', '{8}', '{9}', NOW())"
    result = ', '.join([template.format(listOfProduct[i].name, listOfProduct[i].img_path, listOfProduct[i].description, listOfProduct[i].price, listOfProduct[i].category, listOfProduct[i].discount_id, listOfProduct[i].num_product, listOfProduct[i].num_buy, listOfProduct[i].like, listOfProduct[i].rating) for i in range(num)])
    return result

def DiscountGen(num):
    template = "('{0}', '{1}', NOW())"
    result = ', '.join([template.format(WordGen(2), random.randint(25, 70)) for _ in range(num)])
    return result

logging.info(ProductGen(len(listOfProduct)))
logging.info('-'.join(['-' for _ in range(20)]))
logging.info(DiscountGen(20))

