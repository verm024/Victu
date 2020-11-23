<template>
  <v-container>
    <Welcome :user="user" />

    <div class="mb-7">
      <SectionHeader header="Requested" />
      <carousel
        :perPageCustom="[
          [330, 1.2],
          [560, 2],
          [768, 3]
        ]"
        :paginationEnabled="false"
      >
        <slide class="mr-3" v-for="(article, i) in filterProofreading" :key="i">
          <Article
            :article="article"
            @click.native="$router.push('/content/' + article.id)"
          />
        </slide>
      </carousel>
    </div>

    <div class="mb-16">
      <SectionHeader header="Published" />
      <carousel
        :perPageCustom="[
          [330, 1.2],
          [560, 2],
          [768, 3]
        ]"
        :paginationEnabled="false"
      >
        <slide class="mr-5" v-for="(article, i) in filterPosted" :key="i">
          <Article
            :article="article"
            @click.native="$router.push('/content/' + article.id)"
          />
        </slide>
      </carousel>
    </div>
  </v-container>
</template>

<script>
import firebase from "../../firebase";
import { mapState } from "vuex";

import SectionHeader from "../../components/SectionHeader";
import Welcome from "../../components/Welcome";
import Article from "../../components/Article";
import { Carousel, Slide } from "vue-carousel";

export default {
  components: {
    SectionHeader,
    Welcome,
    Article,
    Carousel,
    Slide
  },
  data() {
    return {
      user: {
        nama: "John"
      },
      daftar_konten: "",
      requestedArticles: [
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
      ],
      publishedArticles: [
        {
          title: "Makan Oatmeal Secara Rutin",
          details:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita illo at dignissimos unde, omnis nemo maxime possimus laudantium eos odio, animi blanditiis odit! Placeat aperiam voluptatem iure quia? Qui, minus.",
          src: "food.png"
        },
        {
          title: "Makan Oatmeal Secara Rutin",
          details:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita illo at dignissimos unde, omnis nemo maxime possimus laudantium eos odio, animi blanditiis odit! Placeat aperiam voluptatem iure quia? Qui, minus.",
          src: "food.png"
        },
        {
          title: "Makan Oatmeal Secara Rutin",
          details:
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita illo at dignissimos unde, omnis nemo maxime possimus laudantium eos odio, animi blanditiis odit! Placeat aperiam voluptatem iure quia? Qui, minus.",
          src: "food.png"
        }
      ]
    };
  },
  watch: {
    get_daftar_konten: {
      immediate: true,
      handler() {
        this.$bind(
          "daftar_konten",
          firebase.db
            .collection("contents")
            .where(
              "writer",
              "==",
              firebase.db.collection("users").doc(this.currentUser.uid)
            )
            .orderBy("tanggal_diposting", "desc")
        );
      }
    }
  },
  computed: {
    ...mapState(["currentUser", "userProfile"]),
    filterProofreading() {
      return this.daftar_konten.filter(element => {
        return element.status == "proofreading";
      });
    },
    filterPosted() {
      return this.daftar_konten.filter(element => {
        return element.status == "posted";
      });
    },
    filterDeleted() {
      return this.daftar_konten.filter(element => {
        return element.status == "deleted";
      });
    }
  }
};
</script>

<style></style>
