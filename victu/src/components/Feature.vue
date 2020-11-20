<template>
    <v-col class="features-card mr-3 white rounded-xl text-center">
        <div class="features-image mb-3">
            <img :src="require(`@/assets/images/${feature.src}`)" alt="" />
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