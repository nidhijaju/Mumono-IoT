import smbus
import time

SMBUS_CHANNEL = 1
bus = smbus.SMBus(SMBUS_CHANNEL)

Si7021_ADDR = 0x40
Si7021_TEMP_READING = 0xE3
Si7021_RH_READING = 0xE5
Si7021_SW_RESET = 0xFE

class temperature_sensor:
    def __init__(self):
        #initialise all reading values
        self.bus = bus
        self.Temp = 0
        self.RH = 0

    def setup(self):
        #sensor does not need specific registers to be instantiated
        return

    def poll(self):

        #read the raw temperature values from the temp register
        Temp_raw = bus.read_i2c_block_data(Si7021_ADDR, Si7021_TEMP_READING, 2)
        #converting raw temperature values into degrees celcius values
        Temp = 175.72 * (Temp_raw[0]<<8 | Temp_raw[1])/65536.0 - 46.85

        #read the raw humidity values from the humidity register
        RH_raw = bus.read_i2c_block_data(Si7021_ADDR, Si7021_RH_READING, 2)
        #converting the humidity values into relative percentage humidity 
        RH = 125.0 * (RH_raw[0]<<8 | RH_raw[1])/65536.0 - 6.0

        #return a tuple to driver_package.py 
        return (Temp, RH)

    def status(self):
        #assume sensor is working as expected
        return True

    def restart(self):
        #assume no need to restart if not working as expected
        return
