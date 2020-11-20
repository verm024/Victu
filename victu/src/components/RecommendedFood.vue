<template>
    <slide>
        <v-card class="mr-5" max-width="200">
            <!-- <v-img
                height="100"
                :src="require(food.src)"
            ></v-img> -->
            <img height="100" :src="require(`@/assets/images/${food.src}`)" alt="" />

            <div class="card-title">{{food.name}}</div>
            <div class="card-subtitle">Calorie: {{food.calories}}</div>
        </v-card>
    </slide>
</template>

<script>
import { Slide } from 'vue-carousel';
export default {
    props: ['food'],
    components: {
        Slide
    }
}
</script>