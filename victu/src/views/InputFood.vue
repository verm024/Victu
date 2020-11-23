<template>
  <v-container class="input-food">
    <Welcome />

    <div>
      <SectionHeader header="Check Ideal Calorie" />
      <div class="input-ideal">
        <v-select
          dense
          label="Activity Level"
          outlined
          color="#28190E"
          item-color="#28190E"
          :items="levels"
          v-model="ideal.aktivitas"
        ></v-select>
        <v-text-field
          dense
          label="Weight (kg)"
          type="number"
          outlined
          color="#28190E"
          v-model="ideal.berat"
        ></v-text-field>
        <v-text-field
          dense
          label="Height (cm)"
          type="number"
          outlined
          color="#28190E"
          v-model="ideal.tinggi"
        ></v-text-field>
      </div>
      <Button text="Check Ideal" @click.native="checkIdeal" className="pa-3" />
      <p class="ideal-calorie">
        Your Ideal Calorie:
        <strong
          >{{
            userProfile.kalori_ideal ? Math.ceil(userProfile.kalori_ideal) : 0
          }}
          calories</strong
        >
      </p>
      <SectionHeader header="Check Food Calorie" />

      <div class="d-flex flex-column flex-md-row input-autocomplete-food">
        <v-autocomplete
          v-model="food_dipilih"
          :items="foods"
          outlined
          dense
          label="Select Foods"
          multiple
          color="#28190E"
          item-text="food_name"
          :search-input.sync="search"
          return-object
        ></v-autocomplete>
      </div>
      <div class="selected" v-if="food_dipilih.length != 0" >
        <div class="selected-judul">
          Choosen food:
        </div>
        <ul>
          <li v-for="(item, index) in food_dipilih" :key="index">
            {{ capitalizeFirstLetter(item.food_name) }} ({{
              item.full_nutrients[0].value
            }}
            cal)
          </li>
        </ul>
      </div>
      <p v-if="melebihi" class="calorie-exceed mb-0">
        <strong style="color: red">Warning!</strong> <br />
        Your total food calories has exceeded your ideal calorie! Please take
        care of your calorie intake.
      </p>
      <Button v-if="food_dipilih.length > 0" text="Save" @click.native="saveFoodIntake" className="pa-3 mt-4" />
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
    Welcome,
    SectionHeader
  },
  data() {
    return {
      total_kalori: 0,
      melebihi: false,
      food_dipilih: [],
      foods: [],
      nFoods: 1,
      search: "",
      levels: ["Low", "Moderate", "High"],
      ideal: {
        aktivitas: "Moderate",
        berat: 0,
        tinggi: 0
      },
      kalori_hari: {}
    };
  },
  computed: {
    ...mapState(["currentUser", "userProfile"])
  },
  mounted() {
    this.ideal.berat = this.userProfile.berat
      ? parseInt(this.userProfile.berat)
      : 0;
    this.ideal.tinggi = this.userProfile.tinggi
      ? parseInt(this.userProfile.tinggi)
      : 0;
    this.ideal.aktivitas = this.userProfile.aktivitas
      ? this.userProfile.aktivitas
      : "Moderate";
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
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    async getAge(seconds) {
      var today = new Date();
      var birthDate = new Date(seconds * 1000);
      var age = today.getFullYear() - birthDate.getFullYear();
      var m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age;
    },
    async saveFoodIntake() {
      let today = new Date(firebase.timestamp.seconds * 1000)
      today.setHours(0, 0, 1, 0)
      today = today / 1000;
      try {
        let doc = await firebase.db.collection("users").doc(this.currentUser.uid).collection("calorie").where("tanggal_input", "==", today).get()
        if (doc.empty) {
          let newDoc = await firebase.db.collection("users").doc(this.currentUser.uid).collection("calorie").add({tanggal_input: today, total_kalori: this.total_kalori})
        }
        else {
          await firebase.db.collection("users").doc(this.currentUser.uid).collection("calorie").doc(doc.docs[0].id).collection("inputs").add({total_kalori: this.total_kalori, makanan: this.food_dipilih})
          await firebase.db.collection("users").doc(this.currentUser.uid).collection("calorie").doc(doc.docs[0].id).update({total_kalori: this.kalori_hari.total_kalori + this.total_kalori})
        }
      } catch (error) {
        console.error(error)
      }
    },
    async checkIdeal() {
      let factor = 1;
      if (this.ideal.aktivitas == "Low") {
        factor = 1.2;
      } else if (this.ideal.aktivitas == "Moderate") {
        factor = 1.3;
      } else {
        factor = 1.4;
      }
      let age = await this.getAge(this.userProfile.tanggal_lahir.seconds);
      let idealCalorie = 0;
      if (this.userProfile.gender == "Male") {
        idealCalorie =
          (factor * (66.5 + 13.8 * this.ideal.berat + 5 * this.ideal.tinggi - (6.8 * age)));
      } else {
        idealCalorie =
          (factor *
            (655.1 + 9.6 * this.ideal.berat + 1.9 * this.ideal.tinggi - (4.7 * age)));
      }
      try {
        await firebase.db
          .collection("users")
          .doc(this.currentUser.uid)
          .update({
            kalori_ideal: idealCalorie,
            berat: this.ideal.berat,
            tinggi: this.ideal.tinggi,
            aktivitas: this.ideal.aktivitas
          });
        this.$store.dispatch("fetchUserProfile");
      } catch (error) {
        console.error(error);
      }
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
    },
    total_kalori: {
      handler() {
        console.log(this.kalori_hari.total_kalori + this.total_kalori)
        if (!this.userProfile.kalori_ideal) {
          this.userProfile.kalori_ideal = 0;
        } else {
          if (this.userProfile.kalori_ideal < (this.kalori_hari.total_kalori + this.total_kalori)) {
            this.melebihi = true;
          } else {
            this.melebihi = false;
          }
        }
      }
    },
    get_today_calorie: {
      immediate: true,
      async handler () {
        let today = new Date(firebase.timestamp.seconds * 1000)
        today.setHours(0, 0, 1, 0)
        today = today / 1000;
        let doc = await firebase.db.collection("users").doc(this.currentUser.uid).collection("calorie").where("tanggal_input", "==", today).get()
        if (doc.empty) {
          this.kalori_hari.total_kalori = 0
        }
        else {
          this.$bind("kalori_hari", firebase.db.collection("users").doc(this.currentUser.uid).collection("calorie").doc(doc.docs[0].id))
        }
      }
    }
  }
};
</script>

<style scoped>
.input-food {
  margin-top: 30px;
  margin-bottom: 40px;
}

.selected {
  margin-top: -10px;
}

.ideal-calorie {
  margin-top: 15px;
  margin-bottom: 25px;
}

.calorie-exceed {
  margin-top: 15px;
}
</style>

<style>
.input-food .input-autocomplete-food .v-select__selection {
  display: none !important;
}
</style>
