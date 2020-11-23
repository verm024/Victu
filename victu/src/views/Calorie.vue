<template>
  <v-container>
    <Welcome />

    <div class="text-center">
      <h6 class="mb-6 text-h6">What do you want to do with your calorie?</h6>
      <Button
        text="Check Calorie"
        @click.native="$router.push('/input-food')"
        className="pa-5"
      />
      <h6 class="my-3 text-h6">or</h6>
      <Button
        text="Plot Calorie Graph"
        @click.native="$router.push('/calorie-graph')"
        className="pa-5"
      />
    </div>
  </v-container>
</template>

<script>
import Welcome from "../components/Welcome";
import Button from "../components/Button";

export default {
  components: {
    Button,
    Welcome
  }
};
</script>
