import { Box, Heading } from '@chakra-ui/react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

export default function ParkingMap() {
  // Coordenadas del estacionamiento (ajusta según tu ubicación)
  const position: [number, number] = [19.4326, -99.1332];

  return (
    <Box p={5} shadow="md" borderWidth="1px" borderRadius="lg" bg="white">
      <Heading size="md" mb={4}>Ubicación del Estacionamiento</Heading>
      <Box h="400px">
        <MapContainer
          center={position}
          zoom={15}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={position}>
            <Popup>
              Estacionamiento Inteligente
            </Popup>
          </Marker>
        </MapContainer>
      </Box>
    </Box>
  );
}