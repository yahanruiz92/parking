import { Box, Heading, VStack, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { socket } from '../socket';

interface ParkingEvent {
  timestamp: string;
  event: string;
}

export default function EventHistory() {
  const [events, setEvents] = useState<ParkingEvent[]>([]);

  useEffect(() => {
    socket.on('parkingUpdate', (data) => {
      const newEvent = {
        timestamp: `${data.Fecha} ${data.Hora}`,
        event: `Estado: Espacio1: ${data.Espacio1 ? 'Ocupado' : 'Libre'}, 
                Espacio2: ${data.Espacio2 ? 'Ocupado' : 'Libre'}, 
                Espacio3: ${data.Espacio3 ? 'Ocupado' : 'Libre'}`
      };
      setEvents(prev => [newEvent, ...prev].slice(0, 10));
    });

    return () => {
      socket.off('parkingUpdate');
    };
  }, []);

  return (
    <Box p={5} shadow="md" borderWidth="1px" borderRadius="lg" bg="white">
      <Heading size="md" mb={4}>Historial de Eventos</Heading>
      <VStack align="stretch" spacing={3}>
        {events.map((event, index) => (
          <Box key={index} p={3} borderWidth="1px" borderRadius="md">
            <Text fontWeight="bold">{event.timestamp}</Text>
            <Text>{event.event}</Text>
          </Box>
        ))}
      </VStack>
    </Box>
  );
}