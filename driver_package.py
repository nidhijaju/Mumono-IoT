import sys
import numpy
from datetime import datetime
import air_quality_sensor
import temperature_sensor
import accelerometer
import communications
import ExceptionDefinitions as Err
import time


MAX_RECONNECT_COUNT = 10
POLL_TIMEOUT_SECONDS = 1


def get_datetime():                                 #Get datetime for averaging calculation
    now = datetime.now()
    dt_string = now.strftime("%m/%d/%Y %H:%M:%S")
    return dt_string


class Log_File:                                     #Log files are an important part of our debugging and error logging
    Log = None
    Name = None

    def __init__(self, name):
        self.Name = name
        self.Log = open(self.Name, "a+")                                        #Opens up log file
        self.Log.write("New Session opened at {}".format(get_datetime()) + "\n")

    def write_to_log(self, message):
        self.Log.write(message + "\n")                                          #Appends line to log file

    def clear_log_file(self):
        self.Log.close()
        self.Log = open(self.Name, "w+")
        self.Log.write("Log file cleared at {}".format(get_datetime()) + "\n")      #Not called so far, but cna be used to clear the log file

    def __del__(self):
        try:
            self.Log.write("Session ended at {}".format(get_datetime()) + "\n")
            self.Log.close()
        except ImportError as err:                                                  #Trivial error where datetime is conditionally deleted before this class
            print("Trivial Error, get_datatime shut down: " + str(err))
            self.Log.close()

class driver_package:                       #Packaging of all drivers into a simple callable class
    Air = None
    Temp = None
    Acc = None
    Comms = None

    Log = None
    Data_Packet = ([], True)
    meanIterations = 1                      #Counter to take the mean over
    def __init__(self):                     #Initialisation of all driver files, also checks for existence and handles errors
        try:
            self.Log = Log_File("logfile.log")              #Open logfile, by creating instance of class
            self.Log.write_to_log("Attempting to load drivers at {}".format(get_datetime()))
            try:
                self.Air = air_quality_sensor.air_quality_sensor()
                self.Temp = temperature_sensor.temperature_sensor()
                self.Acc = accelerometer.accelerometer()
                self.Comms = communications.communications()
                self.Log.write_to_log("Successfully loaded all sensor drivers at {}".format(get_datetime()))
            except AttributeError as err:                   #Careful error checking using custom exceptions
                print("Run Time Error, Sensor driver not found for {}".format(err))
                self.Log.write_to_log("Run Time Error, Sensor driver not found for {} at {}".format(err, get_datetime()))
        except IOError as err:
            print("Logfile cannot be opened, check if there are any running instances of this script")




    def configure_sensor_group(self):           #Modular sensor setup function
        try:
            self.Air.setup()
            self.Temp.setup()
            self.Acc.setup()
            self.Comms.setup()
        except Err.SensorError as err:          #Custom exception handling
            print("Sensor setup failed: {}".format(err))
            self.Log.write_to_log("Sensor setup failed: {} at {}".format(err, get_datetime()))

    def poll_sensor_array(self):                #Consucts a single poll of all sensors and loads into class datapacket property
        try:
            airqualtemp = self.Air.poll()
            airqual = (airqualtemp[0], airqualtemp[1])
            temp = self.Temp.poll()
            temp = (temp[0], temp[1])
            acctemp = self.Acc.poll()
            acc = (acctemp[0], acctemp[1], acctemp[2])
            if(self.Data_Packet[1] == True):
                self.Data_Packet = ([airqual, temp, acc], False)
            else:
                raise Err.TransmitError("Data_Packet has not been transmitted to MQTT, new data packet cannot be loaded")   #If current data has not been cleared next set won't be sent
        except Err.SensorError as err:
            (exp, txp) = err
            print("Sensor Poll failed: {}".format(txp))
            self.Log.write_to_log("Sensor Poll failed: {} at {}".format(txp, get_datetime()))
            raise Err.RestartSensor(exp, txp)       #Powerful restart sensor error, attempts to trigger sensor restart

    def send_data_packet(self):             #Function to send out the datapacket to be handled by the communication class
        try:
            if self.Comms.status():
                self.Comms.send_data_package(self.Data_Packet[0])
                New_Data_Packet = ([], True)
                self.Data_Packet = New_Data_Packet

        except Err.ConnectionError as err:          #Handles connection errors and attempts reconnection to database
            print("Communications Error on Data Packet Send: {} attempting reconnection, Max reconnection attempts: {}".format(err, MAX_RECONNECT_COUNT))
            self.Log.write_to_log("Communications Error on Data Packet Send: {} attempting reconnection, Max reconnection attempts: {} at {}".format(err, MAX_RECONNECT_COUNT,  get_datetime()))
            count = MAX_RECONNECT_COUNT
            while count > 0:
                if self.Comms.status():
                    self.send_data_packet()
                    self.Log.write_to_log("Reconnection successful after delay at {}".format(get_datetime()))
                    break
                else:
                    self.Log.write_to_log("Reconnection Attempt {}/{}".format(count, MAX_RECONNECT_COUNT))
                    if self.Comms.reconnect():
                        self.Log.write_to_log("Reconnection successful at {}".format(get_datetime()))
                        self.send_data_packet()     #If connection is re-established the datapacket will be resent
                        break
                    else:
                        count -= 1
            if not self.Comms.status:
                print("Reconnection Attempts Run out, Max Attempts = {}. Program safely terminating".format(
                    MAX_RECONNECT_COUNT))
                self.Log.write_to_log(
                    "Reconnection Attempts Run out, Max Attempts = {}. Program safely terminating at {}".format(
                        MAX_RECONNECT_COUNT, get_datetime()))
                del self



    def auto_pollsend(self, number_of_polls=-1):    #Main runtime function, calls a set number of sensor polls
        count = number_of_polls
        if number_of_polls < 0:
            while(1):
                try:
                    self.poll_sensor_array()
                except Err.RestartSensor as err:
                    self.Log.write_to_log("Broken sensor restarted")
                    exp, txp = err
                    if self.restart_sensor(txp):
                        self.Log.write_to_log("Successful restart on sensor: {} at {}".format(txp, get_datetime()))
                        break
                    else:
                        self.Log.write_to_log("Sensor was not restarted, closing down program at {}".format(get_datetime()))
                        print("Sensor was not restarted, closing down program")
                        del self
                        break
                self.Log.write_to_log("Successful Poll to Sensor Array on infinite poll, Data packet loaded at {}".format(get_datetime()))
                self.send_data_packet()


                self.Log.write_to_log("Successful Data transmit at {}".format(get_datetime()))
                time.sleep(POLL_TIMEOUT_SECONDS)    #Uses global variable to set the polling rate
        else:
            while count > 0:
                try:
                    self.poll_sensor_array()
                except Err.RestartSensor as err:
                    self.Log.write_to_log("Broken sensor restarted")
                    exp, txp = err
                    if self.restart_sensor(txp):
                        self.Log.write_to_log("Successful restart on sensor: {} at {}".format(txp, get_datetime()))
                        self.poll_sensor_array()
                    else:
                        self.Log.write_to_log(
                            "Sensor was not restarted, closing down program at {}".format(get_datetime()))
                        print("Sensor was not restarted, closing down program")
                        del self
                        break
                self.Log.write_to_log("Successful Poll to Sensor Array on limited run poll (Poll {} / {}, Data packet loaded at {}".format(count, number_of_polls, get_datetime()))
                self.send_data_packet()
                self.Log.write_to_log("Successful Data transmit at {}".format(get_datetime()))
                time.sleep(POLL_TIMEOUT_SECONDS)
                count -= 1

    def look_up_sensor(self, name_string):              #Maps sensor names to the data objects
        if name_string == 'air_quality_sensor':
            return self.Air
        elif name_string == 'temperature_sensor':
            return self.Temp
        elif name_string == 'accelerometer':
            return self.Acc


    def restart_sensor(self, sensor_name):            #Attempts to restart sensors
        Sensor = self.look_up_sensor(sensor_name)
        return Sensor.restart()

    def clear_log(self):                            #Function to clear the log file if necessary
        self.Log.clear_log_file()

    def running_mean(self,Received_Data_Packet):    #Running mean function for the 24 Hour graph

        self.airqual = Received_Data_Packet[0]
        self.temp = Received_Data_Packet[1]
        self.acc = Received_Data_Packet[2]

        readings = [self.airqual[0], self.airqual[1], self.temp[0], self.acc[0], self.acc[1], self.acc[2]]

        f = open("HR_READ.txt", "r+")
        values = f.read().split()
        intval = []
        average_readings = []
        for i in range(0, len(values)):
            intval.append(float(values[i]))
            average_readings.append(intval[i]*self.meanIterations + readings[i] / (i+1))
            f.write(' '.join(average_readings))
        self.meanIterations +=1

        f.close()


    def __del__(self):                              #Proper deletion function
        try:
            del self.Log
            del self.Air
            del self.Temp
            del self.Acc
            del self.Comms
        except AttributeError as err:
            print("Could not find {}".format(err))
