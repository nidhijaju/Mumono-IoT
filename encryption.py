import ssl
import paho.mqtt.client as mqtt

client = mqtt.Client()
client.connect("test.mosquitto.org",port=1883)
client.tls_set(ca_certs="mosquitto.org.crt", certfile="client.crt", keyfile="client.key", tls_version=ssl.PROTOCOL_TLSv1_2)

