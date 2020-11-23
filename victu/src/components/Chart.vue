<script>
import { Bar, mixins } from "vue-chartjs";
const { reactiveProp } = mixins;

export default {
  extends: Bar,
  mixins: [reactiveProp],
  data() {
    return {};
  },
  mounted() {
    this.renderChart(this.chartData);
  }
};
</script>
