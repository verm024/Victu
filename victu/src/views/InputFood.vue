<template>
  <!-- <div class="input-food">
    Input new food
    <v-autocomplete
      v-model="food_dipilih"
      :items="foods"
      outlined
      dense
      label="Outlined"
      multiple
      item-text="food_name"
      :search-input.sync="search"
      return-object
    ></v-autocomplete>
  </div> -->
  <v-container>
    <Welcome />

    <div>
      <SectionHeader header="Ideal Calorie" />
      <p>Your Ideal Clorie <strong>900 calories</strong></p>
      <SectionHeader header="Check Food Calorie" />

      <div v-for="i in nFoods" :key="i" class="d-flex flex-column flex-md-row">
        <v-text-field
          class="mr-5"
          dense
          label="Food"
          type="text"
          outlined
          color="#28190E"
        ></v-text-field>
        <v-text-field
          dense
          label="Quantity"
          type="number"
          outlined
          color="#28190E"
        ></v-text-field>
      </div>
      <button @click="increaseNFood" class="mr-5 font-weight-bold">
        Add more
      </button>
      <Button text="Calculate" className="pa-3" />
    </div>
  </v-container>
</template>

<script>
import firebase from "../firebase";
import { mapState } from "vuex";
import axios from "axios";
import Welcome from "../components/Welcome";
import Button from "../components/Button";
import SectionHeader from "../components/SectionHeader";
axios.defaults.headers.common["x-app-id"] = "74235cca";
axios.defaults.headers.common["x-app-key"] = "d3bb7dc8e20ca26ab13f8983c42e95f7";

export default {
  components: {
    // SectionHeader,
    Button,
    Welcome
  },
  data() {
    return {
      total_kalori: 0,
      melebihi: false,
      food_dipilih: [],
      foods: [],
      nFoods: 1,
      search: ""
    };
  },
  computed: {
    ...mapState(["currentUser", "userProfile"])
  },
  methods: {
    calculateCalorie() {
      this.total_kalori = 0;
      this.food_dipilih.forEach(element => {
        if (element.full_nutrients[0].value) {
          this.total_kalori += element.full_nutrients[0].value;
        }
      });
    },
    increaseNFood() {
      this.nFoods++;
    }
  },
  watch: {
    async search(val) {
      this.foods = [];
      let res;
      try {
        res = await axios.get(
          `https://trackapi.nutritionix.com/v2/search/instant?query=${val}&detailed=true`
        );
        res.data.common.forEach(element => {
          this.foods.push(element);
        });
      } catch (error) {
        console.error(error);
      }
    },
    food_dipilih(val) {
      this.food_dipilih.forEach((element, index) => {
        let newVal = [];
        for (let i = 0; i < element.full_nutrients.length; i++) {
          if (element.full_nutrients[i].attr_id == 208) {
            newVal.push(element.full_nutrients[i]);
          }
        }
        if (newVal.length == 0) {
          newVal = [{ attr_id: 208, value: 0 }];
        }
        this.food_dipilih[index].full_nutrients = newVal;
      });
      this.calculateCalorie();
    }
  }
};
</script>

<style></style>
