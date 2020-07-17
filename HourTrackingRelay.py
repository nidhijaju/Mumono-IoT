import requests
import datetime
import ExceptionDefinitions
import json
import time


READFILENAME = "HR_READ.txt"


class Relay:
    filename = READFILENAME
    file = None
    values = []
    TimeStamp = None
    NewDict = None
    OldDatArray = []

    def __init__(self, Filename=READFILENAME):
        try:
            self.filename = Filename
            self.file = open(self.filename)
        except Exception as err:
            print(err)

    def loadValuesFromFile(self):
        filestring = self.file.read()
        filearray = filestring.split()
        self.values = filearray


    def loadTimeStamp(self):
        d = datetime.datetime.utcnow()  # <-- get time in UTC
        Time = d.isoformat("T") + "Z"
        self.TimeStamp = str(Time)


    def buildDict(self):
        val = self.values
        dat = {'fields': {
            'CO2': {'integerValue': val[0]},
            'TVOC': {'integerValue': val[1]},
            'Temp': {'integerValue': val[2]},
            'AccX': {'integerValue': val[3]},
            'AccY': {'integerValue': val[4]},
            'AccZ': {'integerValue': val[5]},
            'Time': {'timestampValue': self.TimeStamp}
        }}
        self.NewDict = dat

    def getOldData(self):
        self.OldDatArray = []
        URLBase = 'https://firestore.googleapis.com/v1/projects/whyphy-babycare/databases/(default)/documents/Backup/'
        URLARRAY = []
        for i in range(1, 23):
            URLARRAY.append(URLBase + str(i) + "Entry")

        for i in URLARRAY:
            resp = requests.get(i)
            self.OldDatArray.append(
                json.loads(
                    resp.content
                )
            )

    def shuffleAndPushData(self):
        URLBase1 = "https://firestore.googleapis.com/v1/projects/whyphy-babycare/databases/(default)/documents/Backup/"
        URLBase2 = "?updateMask.fieldPaths=CO2&updateMask.fieldPaths=TVOC&updateMask.fieldPaths=Temp&updateMask.fieldPaths=AccX&updateMask.fieldPaths=AccY&updateMask.fieldPaths=AccZ&updateMask.fieldPaths=Time"
        URLARRAY = []
        for i in range(1, 24):
            URLARRAY.append(URLBase1 + str(i) + "Entry" + URLBase2)
        resp = requests.patch(URLARRAY[0], json=self.NewDict)
        #print(resp)
        for i in range(1, 23):
            resp = requests.patch(URLARRAY[i], json=self.OldDatArray[i-1])

    def updateDatabase(self):
        self.loadValuesFromFile()
        self.loadTimeStamp()
        self.buildDict()
        self.getOldData()
        self.shuffleAndPushData()

    def __del__(self):
        self.file.close()

