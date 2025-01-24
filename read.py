import pandas as pd
import requests
import json


name = pd.read_csv("/Users/ayushpai/pai-bank copy/stmt.csv")
newArr = name['Description'].to_numpy()








myobj = {"content" : json.dumps(newArr.tolist())}

x = requests.post(url="http://127.0.0.1:5000", json = myobj)


print(x.json()["content"])
