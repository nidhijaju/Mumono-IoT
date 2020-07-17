# Mumono 
Mumono Internet of Things device is an embedded systems project designed to provide remote safety for babies

# Marketing Website
- Visit marketing website on: https://mumono.squarespace.com/

# Web Interface 
- Find WebApp on our website and backend code in directory: ``` babymon2 ```
- WebApp can also be accessed here: https://whyphybabymonitor.firebaseapp.com/

# Installation
Ensure ``` 'Python 3' ``` and ``` 'requests' ``` library is installed on your PC 

# Runtime
- Call ``` 'python3 Runtime.py' ``` to initiate full functionality of the product 
- The script calls ``` 'driver_package.py' ``` which handles polling of all sensors 
- ``` 'Communications.py' ``` handles all data formatting and communicates correctly with Firebase App
- ``` 'ExceptionDefinitions.py' ``` handles all exception errors that could occur in sensor runtime
- ``` 'accelerometer.py' ``` ``` 'air_quality_sensor.py' ``` ``` 'temperature_sensor.py' ``` contains our sensor interaction code

# Communication
- HTTPS communication was used using 'POST','GET' and 'PATCH' to interact with Firebase App 
- MQTT Client and Publisher was trialled, but unused as HTTPS has equivalent abstraction

# Contributors
This project was completed with Neelesh Ravichandran (Neelesh99) and Nidhi Jaju (nidhijaju)

