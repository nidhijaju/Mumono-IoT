import smbus
import time
import ExceptionDefinitions as exp

SMBUS_CHANNEL = 1
bus = smbus.SMBus(SMBUS_CHANNEL)

LIS3DH_ADDR = 0x18
LIS3DH_STATUS = 0x27
LIS3DH_WHO_AM_I = 0x0F
LIS3DH_OUT_X_L = 0x28
LIS3DH_OUT_X_H = 0x29
LIS3DH_OUT_Y_L = 0x2A
LIS3DH_OUT_Y_H = 0x2B
LIS3DH_OUT_Z_L = 0x2C
LIS3DH_OUT_Z_H = 0x2D
LIS3DH_CTRL_REG1 = 0x20

class accelerometer:
    def __init__(self):
        self.bus = bus
        self.x_dir = 0
        self.y_dir = 0
        self.z_dir = 0
        self.g = 9.81

    def setup(self):

        #check identity of sensor using WHO_AM_I register 
        hwid = self.bus.read_i2c_block_data(LIS3DH_ADDR, LIS3DH_WHO_AM_I,1)

        #check that the relevant bitss have been set correctly
        if hwid == [0b00110011]: 
            print("Found accelerometer at correct address")
        else:
            #raise exception if error is found
            raise exp.SetupError("Test expression", "Can't find accelerometer at correct address")

        #set up CTRL_REG1 for setting correct data rate and reading values on sensor
        setup_reg = [0b00010111] 
        #MSBs: 0001 -> Low power mode reading at 1Hz
        #LSBs: 0111 -> Normal mode and enable x,y,z axis

        self.bus.write_i2c_block_data(LIS3DH_ADDR, LIS3DH_CTRL_REG1, setup_reg)

    def status(self):

        #check that CTRL_REG1 has been correctly setup in setup() function
        status = self.bus.read_i2c_block_data(LIS3DH_ADDR, LIS3DH_CTRL_REG1,1)

        if status == [0b00010111]: 
            #check that the correct bits have been set and return boolean True
            print("Status okay")
            return True
        else:
            #raise the exception for the error 
            raise exp.SetupError("Test expression", "Status is not okay")

        return False

    def poll(self):

        #read register values for x-direction
        x_low = self.bus.read_i2c_block_data(LIS3DH_ADDR,LIS3DH_OUT_X_L,1)
        x_high = self.bus.read_i2c_block_data(LIS3DH_ADDR, LIS3DH_OUT_X_H,1)

        x_val = (x_high[0] << 8 | x_low[0]) >> 4

        #correct reading for x-direction accounting for gravity g
        self.x_dir = (self.check_complement(x_val)/16380)*self.g 

        print("X-Direction: ", self.x_dir)

        #read register values for y-direction
        y_low = self.bus.read_i2c_block_data(LIS3DH_ADDR,LIS3DH_OUT_Y_L,1)
        y_high = self.bus.read_i2c_block_data(LIS3DH_ADDR, LIS3DH_OUT_Y_H,1)
        
        y_val = (y_high[0] << 8 | y_low[0]) >> 4

        #correct reading for y-direction accounting for gravity g
        self.y_dir = (self.check_complement(y_val)/16380)*self.g

        print("Y-Direction: ", self.y_dir)

        #read register values for y-direction
        z_low = self.bus.read_i2c_block_data(LIS3DH_ADDR,LIS3DH_OUT_Z_L,1)
        z_high = self.bus.read_i2c_block_data(LIS3DH_ADDR, LIS3DH_OUT_Z_H,1)

        z_val = (z_high[0] << 8 | z_low[0]) >> 4

        #correct reading for z-direction accounting for gravity g
        self.z_dir = (self.check_complement(z_val)/16380)*self.g

        print("Z-Direction: ", self.z_dir)

        #return readings as a tuple accessed by driver_package.py
        return (self.x_dir, self.y_dir, self.z_dir)

    def check_complement(self, reading):
        #check that the MSB bit is set (& 0x800) 
        # or bitwise OR remaining bits except the MSB
        reading = -(reading & 0x800) | (reading & 0x7FF)
        return reading

    def restart(self):
        #should call setup again but did not experience any hardware issues
        return 0

#testing individual sensor 
#a = accelerometer()
#a.setup()
#if a.status() == True:
#    print("==========Entering Measure===============")
#    while True:
#        a.poll()
#        time.sleep(1)
