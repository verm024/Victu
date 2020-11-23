<template>
  <v-container>
    <Welcome :user="user" />

    <div class="mb-7">
      <SectionHeader header="Published" />

      <carousel
        :perPageCustom="[
          [330, 1.2],
          [560, 2],
          [768, 3]
        ]"
        :paginationEnabled="true"
      >
        <slide class="mr-5" v-for="(review, i) in reviews" :key="i">
          <Review :review="review" />
        </slide>
      </carousel>
    </div>

    <div class="mb-16">
      <SectionHeader header="Content to be Reviewed" />
      <carousel
        :perPageCustom="[
          [330, 1.2],
          [560, 2],
          [768, 3]
        ]"
        :paginationEnabled="false"
      >
        <slide
          class="mr-5"
          v-for="(article, i) in daftar_proofreading"
          :key="i"
        >
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
import SectionHeader from "../../components/SectionHeader";
import Welcome from "../../components/Welcome";
import Review from "../../components/Review";
import Article from "../../components/Article";
import { Carousel, Slide } from "vue-carousel";
import firebase from "../../firebase";
export default {
  components: {
    SectionHeader,
    Welcome,
    Review,
    Article,
    Carousel,
    Slide
  },
  watch: {
    get_daftar_proofreading: {
      immediate: true,
      handler() {
        this.$bind(
          "daftar_proofreading",
          firebase.db
            .collection("contents")
            .where("status", "==", "proofreading")
            .orderBy("tanggal_diposting", "desc")
            .limit(5)
        );
      }
    }
  },
  data() {
    return {
      user: {
        nama: "John"
      },
      daftar_proofreading: [],
      reviews: [
        {
          rating: 4.5,
          reviewer: "Anna Johnson",
          date: "15 November 2020",
          time: "10:30 WIB",
          review: "Dokternya baik uwu"
        },
        {
          rating: 5,
          reviewer: "Surya Ginanjar",
          date: "14 November 2020",
          time: "15:21 WIB",
          review: "Dokternya keren uwu"
        },
        {
          rating: 4,
          reviewer: "Paul Pogba",
          date: "13 November 2020",
          time: "20:59 WIB",
          review: "Dokternya nice uwu"
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
