import { ChakraProvider, Container, Grid, GridItem } from '@chakra-ui/react';
import ParkingStatus from './components/ParkingStatus';
import OccupancyChart from './components/OccupancyChart';
import ParkingMap from './components/ParkingMap';
import EventHistory from './components/EventHistory';

function App() {
  return (
    <ChakraProvider>
      <Container maxW="container.xl" py={5}>
        <Grid
          templateColumns="repeat(2, 1fr)"
          templateRows="repeat(2, 1fr)"
          gap={4}
          h="90vh"
        >
          <GridItem>
            <ParkingStatus />
          </GridItem>
          <GridItem>
            <OccupancyChart />
          </GridItem>
          <GridItem>
            <ParkingMap />
          </GridItem>
          <GridItem>
            <EventHistory />
          </GridItem>
        </Grid>
      </Container>
    </ChakraProvider>
  );
}

export default App;