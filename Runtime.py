from driver_package import driver_package as Drivers
from HourTrackingRelay import Relay as Rel

from time import sleep
import datetime
Drivers = Drivers()

Drivers.configure_sensor_group()
Re = Rel()
timeout = False

while True:
    Drivers.auto_pollsend(1)
    now = datetime.datetime.now()
    if now.minute == 59 and ~timeout:
        try:
            Re.updateDatabase()
            timeout = True
        except Exception as err: 
            pass
    if now.minute == 5:
        timeout = False


