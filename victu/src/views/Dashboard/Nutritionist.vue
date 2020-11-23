<template>
  <!-- <div class="nutritionist">
    Dashboard Nutritionist
    <br />
    <router-link to="/chat">
      Daftar chat masuk
    </router-link>
    <br />
    <router-link to="/proofreading">
      Content butuh proofreading
    </router-link>
  </div> -->
  <v-container>
    <Welcome :user="user" />

    <div class="mb-15">
      <SectionHeader header="Published" />

      <carousel
        :perPageCustom="[
          [330, 1],
          [560, 2],
          [768, 3]
        ]"
        :navigationEnabled="true"
      >
        <Review v-for="(review, i) in reviews" :key="i" :review="review" />
      </carousel>
    </div>

    <div class="mb-15">
      <carousel
        :perPageCustom="[
          [330, 1],
          [560, 2],
          [768, 3]
        ]"
        :navigationEnabled="true"
      >
        <Article
          v-for="(article, i) in toBeReviewed"
          :key="i"
          :article="article"
        />
      </carousel>
    </div>
  </v-container>
</template>

<script>
import SectionHeader from "../../components/SectionHeader";
import Welcome from "../../components/Welcome";
import Review from "../../components/Review";
import Article from "../../components/Article";
import { Carousel } from "vue-carousel";
export default {
  components: {
    SectionHeader,
    Welcome,
    Review,
    Article,
    Carousel
  },
  data() {
    return {
      user: {
        nama: "John"
      },
      reviews: [
        {
          rating: 4.5,
          reviewer: "Anna Johnson",
          date: "15 November 2020",
          time: "10:30 WIB",
          review: "Dokternya baik uwu"
        },
        {
          rating: 4.5,
          reviewer: "Anna Johnson",
          date: "15 November 2020",
          time: "10:30 WIB",
          review: "Dokternya baik uwu"
        }
      ],
      toBeReviewed: [
        {
          title: "Sehat tapi Enak, Apa itu?",
          details:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita illo at dignissimos unde, omnis nemo maxime possimus laudantium eos odio, animi blanditiis odit! Placeat aperiam voluptatem iure quia? Qui, minus.",
          src: "food.png"
        },
        {
          title: "Sehat tapi Enak, Apa itu?",
          details:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita illo at dignissimos unde, omnis nemo maxime possimus laudantium eos odio, animi blanditiis odit! Placeat aperiam voluptatem iure quia? Qui, minus.",
          src: "food.png"
        },
        {
          title: "Sehat tapi Enak, Apa itu?",
          details:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita illo at dignissimos unde, omnis nemo maxime possimus laudantium eos odio, animi blanditiis odit! Placeat aperiam voluptatem iure quia? Qui, minus.",
          src: "food.png"
        }
      ]
    };
  }
};
</script>

<style></style>
