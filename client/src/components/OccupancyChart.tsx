import { Box, Heading } from '@chakra-ui/react';
import { Line } from 'react-chartjs-2';
import { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface OccupancyData {
  labels: string[];
  occupied: number[];
}

export default function OccupancyChart() {
  const [occupancyData, setOccupancyData] = useState<OccupancyData>({
    labels: [],
    occupied: []
  });

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:3000/api/occupancy');
      const data = await response.json();
      setOccupancyData(data);
    };

    fetchData();
    const interval = setInterval(fetchData, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  const data = {
    labels: occupancyData.labels,
    datasets: [
      {
        label: 'Espacios Ocupados',
        data: occupancyData.occupied,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  };

  return (
    <Box p={5} shadow="md" borderWidth="1px" borderRadius="lg" bg="white">
      <Heading size="md" mb={4}>Ocupación del Estacionamiento</Heading>
      <Line data={data} />
    </Box>
  );
}