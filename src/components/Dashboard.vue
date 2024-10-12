<template>
  <div class="flex">
    <SideBar />
    <div class="flex-1">
      <NavBar />
      <div class="p-4">
        <h1 class="text-2xl font-bold text-center">Statistics Charts</h1>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <!-- Bar Chart -->
          <div class="card expanded-card">
            <h3 class="card-title">Bar Chart</h3>
            <canvas id="barChart" class="chart-canvas expanded-chart"></canvas>
          </div>
          <!-- Donut Chart -->
          <div class="card">
            <h3 class="card-title">Donut Chart</h3>
            <canvas id="donutChart" class="chart-canvas"></canvas>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted } from 'vue';
import Axios from 'axios';
import Chart from 'chart.js/auto';
import NavBar from './Layout/partials/NavBar.vue';
import SideBar from './Layout/partials/SideBar.vue';

export default {
  components: {
    NavBar,
    SideBar,
  },
  setup() {
    const fetchData = async () => {
      try {
        const response = await Axios.get("https://localhost:7241/api/Account/degree", {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem('token1')}`
          }
        });

        if (response.data.status === 200) {
          const labels = Object.keys(response.data.data);
          const dataValues = Object.values(response.data.data);
          renderCharts(labels, dataValues);
        } else {
          console.error('Failed to retrieve data:', response.data.message);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    const renderCharts = (labels, dataValues) => {
      // Bar Chart with blue color
      const barChartCanvas = document.getElementById('barChart').getContext('2d');
      new Chart(barChartCanvas, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: 'Jumlah Degree',
            data: dataValues,
            backgroundColor: '#007bff', // Set to blue color
            borderColor: 'rgba(60,141,188,0.8)',
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });

      // Donut Chart with multiple colors
      const donutChartCanvas = document.getElementById('donutChart').getContext('2d');
      const chartColors = ['#f56954', '#00a65a', '#f39c12', '#00c0ef', '#3c8dbc'];
      new Chart(donutChartCanvas, {
        type: 'doughnut',
        data: {
          labels: labels,
          datasets: [{
            data: dataValues,
            backgroundColor: chartColors,
          }]
        },
        options: {
          maintainAspectRatio: false,
          responsive: true,
        }
      });
    };

    onMounted(fetchData); // Fetch data when the component is mounted

    return {};
  },
};
</script>

<style scoped>
.chart-canvas {
  max-width: 100%;
  max-height: 400px; /* Adjust as needed */
  margin: 0 auto;
}

.expanded-chart {
  width: 75%; /* Makes the chart take up full width within the card */
}

.card {
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.expanded-card {
  width: 100%; /* Expands the card to full available width */
  max-width: 100%; /* Ensures it takes the full width within its container */
}
</style>
