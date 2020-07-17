import smbus    
import time
import json
import ExceptionDefinitions as exp

SMBUS_CHANNEL = 1
bus = smbus.SMBus(SMBUS_CHANNEL)

CCS811_ADDR = 0x5B
CCS811_STATUS = 0x00
CCS811_MEAS_MODE = 0x01
CCS811_ALG_RESULT_DATA = 0x02
CCS811_HW_ID = 0x20
CCS811_HW_VERSION = 0x21
CCS811_ERROR_ID = 0xE0
CCS811_APP_DATA = 0xF2
CCS811_APP_VERIFY = 0xF3
CCS811_APP_START = 0xF4
CCS811_SW_RESET = 0xFF

reading_array = []

class air_quality_sensor:
    def __init__(self):
        self.bus = bus #initialise SMBUS
        self.eCO2 = 0 #initialise eC02 reading
        self.TVOC = 0 #initialise TVOC reading

    def setup(self):

        #************* HWID check ***************

        #check that hardware id register has value 0x81 to confirm
        #sensor has been configured correctly
        hwid = self.bus.read_i2c_block_data(CCS811_ADDR,CCS811_HW_ID,1)
        if hwid == [0x81]:
            #inform user that sensor has been identified correctly
            print("Identified sensor correctly")
        else:
            #raise exception if not configured
            raise exp.SetupError("Test expression","Air quality sensor not identified")

        #************* ERROR bit check ***************
            
        #check that error bit in status register is 0 to indicate no errors
        error_bit = self.bus.read_i2c_block_data(CCS811_ADDR, CCS811_STATUS,1)
        if (error_bit[0] & 1) == 0: #bitwise operation to check 0 value on bit 0 
            #inform user that error bit is 0 and proceed
            print("No error") 
        else:
            #raise exception if error has been detected
            raise exp.SetupError("Test expression", "Error on I2C or sensor: check Error register")

        #************* Check App Valid Bit is SET ***************

        #read bit 4 on status register to check valid application firmware loaded
        app_valid = self.bus.read_i2c_block_data(CCS811_ADDR, CCS811_STATUS,1)

        #bitwise operation to check bit 4 is set to 1
        if app_valid[0] & (1<<(4)): 
            #inform user that valid bit is set
            print("Valid application firmware loaded")
        else: 
            #raise exception if error has been detected
            raise exp.SetupError("Test expression", "No application firmware loaded")
        
        #************* Start application ***************
        app_start = [] #a write with NO DATA is needed

        #transition the sensor from boot to application mode  
        self.bus.write_i2c_block_data(CCS811_ADDR,CCS811_APP_START,app_start)
        time.sleep(0.5) #time for data to configure

    def status(self):
        #read status register value to check if DATA_READY bit is SET
        status_reg = self.bus.read_i2c_block_data(CCS811_ADDR, CCS811_STATUS,1)

        #check that bit 3 is set to 1
        if status_reg[0] & (1<<(3)):
            #inform user that firmware and app mode loaded
            print("Firmware and application mode loaded")
            return True
        else:
            #raise exception if error has been detected
            raise exp.SetupError("Test expression", "Firmware and application mode not loaded")

        return False

    def measure(self):

        #set drive mode to mode 1 (001) for constant power mode
        #and measurement frequency of 1Hz
        measure_1s = [0b00010000]
        self.bus.write_i2c_block_data(CCS811_ADDR,CCS811_MEAS_MODE,measure_1s)

        #read value of MEASURE_MODE register to check that bit 
        meas_mode_reg = self.bus.read_i2c_block_data(CCS811_ADDR, CCS811_MEAS_MODE,1)

        #check that bit 4 is correctly set to 1
        if meas_mode_reg[0] & (1<<(4)):
            #inform user how often being measured
            print("Measuring every 1 second:")
        else:
            #raise exception if error has been detected
            raise exp.SensorError("Test expression", "Measuring mode has not been correctly set")  

    
    def poll(self):

        #fill readings array with readings from the RESULT_DATA register 
        readings = self.bus.read_i2c_block_data(CCS811_ADDR, CCS811_ALG_RESULT_DATA,4)
        time.sleep(0.5) #pause briefly to configure data correctly
        CO2MSB = readings[0] 
        CO2LSB = readings[1]
        TVOCMSB = readings[2]
        TVOCLSB = readings[3]

        #left shift MSBs by 8 to get correct reading
        #and combine reading by doing OR
        
        self.eCO2 = CO2MSB << 8 | CO2LSB 
        #min = 400ppm and max = 8192ppm
        self.TVOC = TVOCMSB << 8 | TVOCLSB 
        #min = 0ppb and max = 1187ppb

        print("CO2: ", self.eCO2)
        print("TVOC: ", self.TVOC)

        return(self.eCO2,self.TVOC)

    def restart(self):

        not_configured = True

        while not_configured:

            #4 bytes (0x11 0xE5 0x72 0x8A) are written
            #to SW_RESET in a single sequence
            reset_seq = [0x11, 0xE5, 0x72, 0x8A]
            self.bus.write_i2c_block_data(CCS811_ADDR, CCS811_SW_RESET,reset_seq)

            #return normal start up as before
            self.setup()
            if self.status() == True:
                print("Restart completed okay")
                not_configured = False
            else:
                #raise exception if we have an error
                raise exp.SensorError("Test expression", "Could not initiate restart properly")


#testing individua functionality of sensor:
#c = air_quality_sensor()
#c.setup()
#print("Exiting setup, starting to measure now")
#if c.status() == True:
#    c.measure()
#    print("Exiting measure, checking status is ok")
#    while True:
#        c.poll()
#        time.sleep(1)
#else:
#    c.restart()
