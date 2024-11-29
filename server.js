const mqtt = require("mqtt");
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Configuración del broker MQTT
const MQTT_BROKER = "mqtt://test.mosquitto.org";
const TX_TOPIC = "/TX_SERGIO";
const RX_TOPIC = "/RX_SERGIO";

// Conexión al broker MQTT
const mqttClient = mqtt.connect(MQTT_BROKER);

mqttClient.on("connect", () => {
    console.log("Conectado al broker MQTT");
    mqttClient.subscribe(RX_TOPIC, (err) => {
        if (err) {
            console.error("Error al suscribirse al topic:", err);
        } else {
            console.log(`Suscrito al topic: ${RX_TOPIC}`);
        }
    });
});

// Definir el modelo de datos "ParkingData" una sola vez
const ParkingData = mongoose.model("ParkingData", {
    topic: String,
    message: String,
    timestamp: { type: Date, default: Date.now },
});

// Gestión de mensajes MQTT
mqttClient.on("message", (topic, message) => {
    if (topic === RX_TOPIC) {
        const data = message.toString();
        console.log(`Mensaje recibido en ${RX_TOPIC}:`, data);

        // Guardar datos en MongoDB
        const newEntry = new ParkingData({ topic, message: data });
        newEntry
            .save()
            .then(() => console.log("Datos guardados en MongoDB"))
            .catch((err) => console.error("Error al guardar en MongoDB:", err));
    }
});

// Configuración de MongoDB
const MONGO_URI = "mongodb+srv://yahan92:Y8tP8utqcgbm1nIq@cluster0.s06cb.mongodb.net/";
mongoose
    .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Conectado a MongoDB"))
    .catch((err) => console.error("Error al conectar a MongoDB:", err));

// Endpoint para consultar los datos almacenados en MongoDB
app.get("/api/data", async (req, res) => {
    try {
        const data = await ParkingData.find().sort({ timestamp: -1 });
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: "Error al obtener los datos" });
    }
});

// Puerto de escucha para la API
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
