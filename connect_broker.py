import paho.mqtt.client as mqtt

client = mqtt.Client()
client.connect("test.mosquitto.org",port=1883)
client.publish("IC.embedded/WhyPhy/test","It's okay")
mqtt.error_string((client.publish("IC.embedded/WhyPhy/test","It's okay")).rc)
