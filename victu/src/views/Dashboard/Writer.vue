<template>
  <!-- <div class="writer">
    Dashboard Writer
    <br />
    <router-link to="/add-content">Buat konten baru</router-link>
    <br />
    <br />
    Daftar Konten Menunggu proofreading
    <div v-for="item in filterProofreading" :key="item.id">
      <router-link :to="'/content/' + item.id">
        Judul: {{ item.judul }}, Isi: {{ item.isi }}
      </router-link>
    </div>
    <div v-if="filterProofreading.length == 0">
      Belum ada
    </div>
    <br />
    <br />
    Daftar Konten Sudah Diposting/disetujui
    <div v-for="item in filterPosted" :key="item.id">
      <router-link :to="'/content/' + item.id">
        Judul: {{ item.judul }}, Isi: {{ item.isi }}
      </router-link>
    </div>
    <div v-if="filterPosted.length == 0">
      Belum ada
    </div>
    <br />
    <br />
    Daftar Konten Sudah Dihapus
    <div v-for="item in filterDeleted" :key="item.id">
      <router-link :to="'/content/' + item.id">
        Judul: {{ item.judul }}, Isi: {{ item.isi }}
      </router-link>
    </div>
    <div v-if="filterDeleted.length == 0">
      Belum ada
    </div>
  </div> -->
  <v-container>
    <Welcome :user="user" />

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
        
        <Article v-for="(article, i) in requestedArticles" :key="i" :article="article" />
      </carousel>
    </div>

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
        <Article v-for="(article, i) in publishedArticles" :key="i" :article="article" />
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
      user: {
        nama: "John",
      },
      daftar_konten: "",
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
