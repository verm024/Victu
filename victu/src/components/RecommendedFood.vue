<template>
  <v-card class="mx-auto" max-width="300">
    <v-img
      class="recommendedFood__image"
      :src="food.foto"
      width="300px"
      height="170px"
      ><v-overlay absolute></v-overlay
    ></v-img>

    <div class="pa-3">
      <div class="card-title">
        <strong>{{ food.nama }}</strong>
      </div>
      <div class="card-subtitle grey--text recommendedFood__details">{{ food.kalori }}</div>
    </div>
  </v-card>
</template>

<script>

export default {
  props: ["food"],
};
</script>

<style scoped>
.recommendedFood__image {
  width: 100%;
  height: auto;
}
.recommendedFood__details {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  margin-bottom: 20px !important;
  max-height: 24px;
}
</style>

<style>
.recommendedFood__image .v-overlay__scrim {
  background-color: #f7b516 !important;
  opacity: 0.1 !important;
}
</style>
