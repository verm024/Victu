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
    <Welcome />

    <div class="mb-15">
      <SectionHeader header="Requested" />
      <carousel
        :perPageCustom="[
          [330, 1],
          [560, 2],
          [768, 3]
        ]"
        :navigationEnabled="true"
      >
        
        <Article v-for="(article, i) in requestedArticles" :key="i" article="article" />
      </carousel>
    </div>
<!-- 
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
        <Article v-for="(article, i) in publishedArticles" :key="i" article="article" />
      </carousel>
    </div> -->
    
  </v-container>
</template>

<script>
import SectionHeader from "../../components/SectionHeader";
import Welcome from "../../components/Welcome";
import Article from "../../components/Article";
import { Carousel } from "vue-carousel";
export default {
  components: {
    SectionHeader,
    Welcome,
    Article,
    Carousel
  },
  data() {
    return {
      requestedArticles: [
        {
          title: "Sehat tapi Enak, Apa itu?",
          details: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita illo at dignissimos unde, omnis nemo maxime possimus laudantium eos odio, animi blanditiis odit! Placeat aperiam voluptatem iure quia? Qui, minus.",
          src: "food.png"
        },
        {
          title: "Sehat tapi Enak, Apa itu?",
          details: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita illo at dignissimos unde, omnis nemo maxime possimus laudantium eos odio, animi blanditiis odit! Placeat aperiam voluptatem iure quia? Qui, minus.",
          src: "food.png"
        },
        {
          title: "Sehat tapi Enak, Apa itu?",
          details: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita illo at dignissimos unde, omnis nemo maxime possimus laudantium eos odio, animi blanditiis odit! Placeat aperiam voluptatem iure quia? Qui, minus.",
          src: "food.png"
        },
      ],
      publishedArticles: [
        {
          title: "Makan Oatmeal Secara Rutin",
          details: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita illo at dignissimos unde, omnis nemo maxime possimus laudantium eos odio, animi blanditiis odit! Placeat aperiam voluptatem iure quia? Qui, minus.",
          src: "food.png"
        },
        {
          title: "Makan Oatmeal Secara Rutin",
          details: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita illo at dignissimos unde, omnis nemo maxime possimus laudantium eos odio, animi blanditiis odit! Placeat aperiam voluptatem iure quia? Qui, minus.",
          src: "food.png"
        },
        {
          title: "Makan Oatmeal Secara Rutin",
          details: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita illo at dignissimos unde, omnis nemo maxime possimus laudantium eos odio, animi blanditiis odit! Placeat aperiam voluptatem iure quia? Qui, minus.",
          src: "food.png"
        },
      ]
    }
  }
};
</script>

<style></style>
