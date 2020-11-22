<template>
    <v-container>
        <Welcome />
        
        <div class="text-center">
            <h6 class="mb-5 text-h6">What do you want to do with your calorie?</h6>
            <Button text="Check Calorie" />
            <h6 class="my-5 text-h6">OR</h6>
            <Button text="Plot Calorie Graph" />
        </div>
    </v-container>
</template>

<script>
import Welcome from '../components/Welcome'
import Button from '../components/Button'

export default {
    components: {
        Button,
        Welcome
    }
}
</script>