<template>
    <slide class="mr-3">
        <v-card class="mx-auto" max-width="300">
            <img class="recommendedFood__image" :src="require(`@/assets/images/${food.src}`)" alt="" />

            <div class="pa-3">
                <div class="card-title"><strong>{{food.name}}</strong></div>
                <div class="card-subtitle grey--text">{{food.calories}}</div>
            </div>
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

<style scoped>
    .recommendedFood__image {
        width: 100%;
        height: auto;
    }
</style>