<template>
    <v-col class="feature mr-5 white rounded-xl text-center">
        <div class="mb-3">
            <img class="feature__image" :src="require(`@/assets/images/${feature.src}`)" alt="" />
        </div>
        <div class="features-title">
            {{feature.feature}}
        </div>
    </v-col>
</template>

<script>
export default {
    props: ['feature']
}
</script>

<style>
    .feature__image {
        width: 25px;
        height: auto;
    }
</style>