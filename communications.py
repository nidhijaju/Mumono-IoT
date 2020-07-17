import json
import ExceptionDefinitions as exp
import requests

#**class looks after all communication of data to firebase backend**
class communications:
    def __init__(self):
        return

    def setup(self):
        #assume connection to Wifi already established
        #check using ifconfig wlan0 on pi startup
        return True

    def send_data_package(self,example): 
        #example is a list of 3 tuples containing
        #all our sensor readings 
        print("Sending data package to web app")

        self.airqual = example[0] #first tuple
        self.temp = example[1] #second tuple
        self.acc = example[2] #third tuple


        #send all data as a python dictionary indexed by string name
        #and reading corresponding to specific value in tuple
        self.dict_send_data = {'fields' : {
		'CO2': {'integerValue': str(self.airqual[0])},
		'TVOC': {'integerValue': str(self.airqual[1])},
		'Temp' : {'doubleValue': str(self.temp[0])},
		'AccX' : {'doubleValue': str(self.acc[0])},
		'AccY' : {'doubleValue': str(self.acc[1])},
		'AccZ' : {'doubleValue': str(self.acc[2])}
        }}

        #send data to firebase database in json format
        URL ="https://firestore.googleapis.com/v1/projects/whyphy-babycare/databases/(default)/documents/readings/toTO0cjNLV3ZE4OJObmR?updateMask.fieldPaths=CO2&updateMask.fieldPaths=TVOC&updateMask.fieldPaths=Temp&updateMask.fieldPaths=AccX&updateMask.fieldPaths=AccY&updateMask.fieldPaths=AccZ"
        resp = requests.patch(URL, json=self.dict_send_data)
        
        #should give Response[200] when fine, [400] otherwise
        print(resp) 
        #check that sent is in json format
        print(resp.json())

        return True

    def status(self):
        #assume that status is all okay,
        #no disconnection with WiFi
        return True

    def reconnect(self):
        #no need to reconnect to WiFi
        return



        



        
        




