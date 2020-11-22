<template>
  <v-container>
    <Welcome />

    <div>
      <SectionHeader header="Ideal Calorie" />

      <h6 class="mb-5 text-h6">Last activity level</h6>
      <v-radio-group class="transparent" v-model="radioGroup">
        <v-radio
          class="transparent"
          v-for="(level, i) in activityLevel"
          :key="i"
          :label="level"
          :value="calculateIdealCalorie.activityLevel"
        ></v-radio>
      </v-radio-group>

      <h6 class="mb-5 text-h6">Current weight</h6>
      <v-text-field
        dense
        label="Weight"
        type="number"
        outlined
        color="#28190E"
        v-model="calculateIdealCalorie.weight"
      ></v-text-field>

      <h6 class="mb-5 text-h6">Current height</h6>
      <v-text-field
        dense
        label="Height"
        type="number"
        outlined
        color="#28190E"
        v-model="calculateIdealCalorie.height"
      ></v-text-field>

      <Button text="Calculate" className="pa-3" />
    </div>
  </v-container>
</template>

<script>
import Welcome from "../components/Welcome";
import Button from "../components/Button";
import SectionHeader from "../components/SectionHeader";

export default {
  components: {
    SectionHeader,
    Button,
    Welcome
  },
  data() {
    return {
      activityLevel: ["low", "moderate", "high"],
      calculateIdealCalorie: {
        activityLevel: "",
        weight: null,
        height: null
      }
    };
  }
};
</script>
