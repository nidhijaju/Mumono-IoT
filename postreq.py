import requests

#URL = "https://firebase.googleapis.com/$discovery/rest?version=v1"
URL = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPasswordKey=[AlzaSyB-LoQduOS7TkZvrlJyZy9lJp6RHoOouol]"

data = {'email':'nidhijaju127@gmail.com',
        'password': 'Giraffe129!',
        'returnSecureToken': True}


r = requests.get(url=URL, json=data)
print(r)
#b = r.text()
#print(b)
data = r.json()

print(data)

