from pokemontcgsdk import Card
from pokemontcgsdk import Set
from pokemontcgsdk import Type
from pokemontcgsdk import Supertype
from pokemontcgsdk import Subtype
from pokemontcgsdk import Rarity
from pokemontcgsdk import RestClient

RestClient.configure('ab8ebbb1-a29d-447b-87b2-4b89cdc0920b')

# for x in range(237): 
#     cardId = f"swsh7-{str(x)}"
#     card = Card.find(cardId)
#     print(card)

card = Card.find("swsh7-1").images.small

print(card)

