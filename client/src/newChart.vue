<script>
/* eslint-disable */
import { Line, mixins } from 'vue-chartjs';

export default {
  name: 'line-chart',
  extends: Line,

  props: ['data', 'options'],
  mounted() {
    this.renderLineChart();
  },
  computed: {
    chartData() {
      return this.data;
    },
  },

  methods: {
    renderLineChart() {
      this.renderChart(
        {
          labels: this.chartData.labels,
          datasets: [
            {
              label: 'Upstream',
              backgroundColor: '#f54b42',
              data: this.chartData.up,
              fill: false,
              borderColor: '#f54b42',
            },
            {
              label: 'Downstream',
              backgroundColor: '#f87972',
              data: this.chartData.down,
              fill: false,
            },
            {
              label: 'Latency',
              backgroundColor: '#f87979',
              data: this.chartData.ping,
              fill: false,
            },
          ],
        },
        { responsive: true, maintainAspectRatio: false },
      );
    },
  },
  watch: {
    data() {
      this._data._chart.destroy();
      console.log(this.data);
      console.log(this.options);
      // this.renderChart(this.data, this.options);
      this.renderLineChart();
    },
  },
};
</script>
