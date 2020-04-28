<script>
/* eslint-disable */
import { Line } from 'vue-chartjs';


export default {
  extends: Line,
  props: {
    chartdata: {
      type: Object,
      default: null,
    },
    options: {
      fill: false,
    },
  },
  mounted() {
    this.renderChart(this.chartdata, {
      default: null,
      maintainAspectRatio: false,
      legend: {
        // hides the legend
        display: true,
      },
      scales: {
        // hides the y axis
        yAxes: [
          {
            display: true,
          },
        ],
      },
    });
  },

  methods: {
    update() {
      this.$data._chart.data.datasets[0].data = this.data;
      this.$data._chart.update();
    },
  },
};
</script>
