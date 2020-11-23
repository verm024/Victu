<template>
    <slide class="mr-3">
        <v-card class="mx-auto" max-width="300">
            <img
                class="article__image"
                :src="require(`@/assets/images/${article.src}`)"
                alt=""
            />

            <div class="pa-3">
                <div class="card-title">
                    <strong>{{ article.title }}</strong>
                </div>
                <div class="card-subtitle grey--text article__details">{{ article.details }}</div>
            </div>
        </v-card>
    </slide>
</template>

<script>
import { Slide } from "vue-carousel";
export default {
  props: ["article"],
  components: {
    Slide
  }
};
</script>

<style>
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
}
</style>