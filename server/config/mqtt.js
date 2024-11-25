const mqtt = require('mqtt');
const ParkingData = require('../models/ParkingData');

const setupMQTT = (io) => {
  const client = mqtt.connect(process.env.MQTT_BROKER);

  client.on('connect', () => {
    console.log('Connected to MQTT broker');
    client.subscribe('/TX_SERGIO', (err) => {
      if (!err) {
        console.log('Subscribed to parking system topic');
      }
    });
  });

  client.on('message', async (topic, message) => {
    try {
      const data = JSON.parse(message.toString());
      io.emit('parkingUpdate', data);
      
      const parkingData = new ParkingData(data);
      await parkingData.save();
    } catch (error) {
      console.error('Error processing MQTT message:', error);
    }
  });

  return client;
};

module.exports = setupMQTT;