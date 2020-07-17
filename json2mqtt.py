import paho.mqtt.client as mqtt
import time
import json

data_out = data.json
data_in = data_out
brokers_in=json.load(data_in)

def on_message(client, userdata, msg):
    topic=msg.topic
    m_decode=str(msg.payload.decode(

topic="IC.embedded/WhyPhy/test"
cliemt=mqtt.Client()
print("Connecting to broker")
client.connect("test.mosquitto.org",port=1883)
client.loop_start()
client.subscribe(topic)
time.sleep(3)
print("Sending data")
client.publish(topic,data_out)
time.sleep(10)
client.loop_stop()
client.disconnect()
