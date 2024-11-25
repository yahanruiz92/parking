import { Box, Heading, SimpleGrid, Text, Badge } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { socket } from '../socket';

interface ParkingData {
  Espacio1: boolean;
  Espacio2: boolean;
  Espacio3: boolean;
  Hora: string;
  Fecha: string;
}

export default function ParkingStatus() {
  const [parkingData, setParkingData] = useState<ParkingData | null>(null);

  useEffect(() => {
    socket.on('parkingUpdate', (data: ParkingData) => {
      setParkingData(data);
    });

    return () => {
      socket.off('parkingUpdate');
    };
  }, []);

  return (
    <Box p={5} shadow="md" borderWidth="1px" borderRadius="lg">
      <Heading size="md" mb={4}>Estado del Estacionamiento</Heading>
      <Text mb={4}>
        Última actualización: {parkingData?.Fecha} {parkingData?.Hora}
      </Text>
      <SimpleGrid columns={3} spacing={4}>
        <Box p={3} borderWidth="1px" borderRadius="md">
          <Text>Espacio 1</Text>
          <Badge colorScheme={parkingData?.Espacio1 ? 'red' : 'green'}>
            {parkingData?.Espacio1 ? 'Ocupado' : 'Libre'}
          </Badge>
        </Box>
        <Box p={3} borderWidth="1px" borderRadius="md">
          <Text>Espacio 2</Text>
          <Badge colorScheme={parkingData?.Espacio2 ? 'red' : 'green'}>
            {parkingData?.Espacio2 ? 'Ocupado' : 'Libre'}
          </Badge>
        </Box>
        <Box p={3} borderWidth="1px" borderRadius="md">
          <Text>Espacio 3</Text>
          <Badge colorScheme={parkingData?.Espacio3 ? 'red' : 'green'}>
            {parkingData?.Espacio3 ? 'Ocupado' : 'Libre'}
          </Badge>
        </Box>
      </SimpleGrid>
    </Box>
  );
}