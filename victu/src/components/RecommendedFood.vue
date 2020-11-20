<template>
    <slide>
        <v-card class="mr-5" max-width="200">

            <div class="card-title">{{food.name}}</div>
            <div class="card-subtitle">Calorie: {{food.calorie}}</div>
        </v-card>
    </slide>
</template>

<script>
import { Slide } from 'vue-carousel';
export default {
    props: ['food']
}
</script>