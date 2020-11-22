<template>
    <v-container>
        <Welcome />
        
        <div class="text-center">
            <h6 class="mb-5 text-h6">What do you want to do with your calorie?</h6>
            <Button text="Check Calorie" className="pa-5" />
            <h6 class="my-5 text-h6">OR</h6>
            <Button text="Plot Calorie Graph" className="pa-5" />
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
