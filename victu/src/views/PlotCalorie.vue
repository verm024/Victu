<template>
  <v-container class="plot-calorie">
    <Welcome />

    <div class="mt-10 text-center">
      <p class="font-weight-bold mb-0">
        It's time to look at your daily calorie intake!
      </p>
      <p class="font-weight-bold">
        Does it show good progress? Let's check it!
      </p>

      <div class="chart-wrapper d-flex justify-center">
        <Chart :styles="chart_style" :chart-data="chart_data" />
      </div>
    </div>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import Welcome from "../components/Welcome";
import Chart from "../components/Chart";
import firebase from "../firebase";

export default {
  components: {
    Welcome,
    Chart
  },
  data() {
    return {
      intakes: [],
      chart_data: {},
      chart_style: {
        width: "300px",
        height: "300px",
        position: "relative"
      }
    };
  },
  watch: {
    get_intakes: {
      immediate: true,
      handler() {
        this.$bind(
          "intakes",
          firebase.db
            .collection("users")
            .doc(this.currentUser.uid)
            .collection("calorie")
            .orderBy("tanggal_input", "desc")
            .limit(7)
        );
      }
    },
    intakes: {
      handler() {
        let temp = [];
        this.intakes.forEach(element => {
          temp.push(Math.ceil(element.total_kalori));
        });
        let zeros = [];
        if (temp.length < 7) {
          for (let i = temp.length; i < 7; i++) {
            zeros.push(0);
          }
        }
        zeros.push(...temp);
        temp = zeros;
        let data = {
          labels: [
            "Day 1",
            "Day 2",
            "Day 3",
            "Day 4",
            "Day 5",
            "Day 6",
            "Day 7"
          ],
          datasets: [
            {
              label: "Last 7 Day Calorie Intakes",
              data: temp,
              backgroundColor: "#f7b516"
            }
          ]
        };
        this.chart_data = data;
      }
    }
  },
  computed: {
    ...mapState(["userProfile", "currentUser"])
  }
};
</script>

.<style>
.plot-calorie {
  margin-bottom: 90px;
}
</style>

<style>
.chart-wrapper canvas {
  background: white;
  padding: 20px;
  border-radius: 10px;
}
</style>
