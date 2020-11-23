<template>
  <v-card :class="search ? 'mx-auto mb-5' : 'mr-auto'" width="300" flat>
    <v-img
      class="article__image"
      :src="article.foto"
      width="300px"
      height="170px"
      ><v-overlay absolute></v-overlay
    ></v-img>

    <div class="pa-3">
      <div class="card-title">
        <strong>{{ article.judul }}</strong>
      </div>
      <div class="card-subtitle grey--text article__details">
        {{ article.isi }}
      </div>
    </div>
  </v-card>
</template>

<script>
export default {
  props: ["article", "search"]
};
</script>

<style scoped>
.article__image {
  width: 100%;
  height: auto;
}
.article__details {
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
.article__image .v-overlay__scrim {
  background-color: #f7b516 !important;
  opacity: 0.1 !important;
}
</style>
