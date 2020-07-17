import pyrebase

config = {
    "apiKey": "AIzaSyB-LoQduOS7TkZvrlJyZy9lJp6RHoOouoI",
    "authDomain": "whyphy-babycare.firebaseapp.com",
    "databaseURL": "https://whyphy-babycare.firebaseio.com/",
    "storageBucket": "whyphy-babycare.appspot.com"
}

firebase = pyrebase.initialize_app(config)
