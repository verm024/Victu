<template>
  <v-container>
    <Welcome :user="user" />
    <div class="search-nutritionist">
      <SectionHeader header="Serve you with the best" />
      <!-- <div v-for="(item, index) in daftar_konten" :key="index">
        <router-link :to="'/content/' + item.id">
          {{ item.judul }}
          {{ item.isi }}
          {{ item.id }}
        </router-link>
      </div> -->
      <div class="d-flex flex-wrap">
        <Article
            v-for="(item, index) in daftar_konten" 
            :key="index"
            :article="item"
          />
      </div>
    </div>
  </v-container>
</template>

<script>
import firebase from "../firebase";
import { mapState } from "vuex";
import Welcome from "../components/Welcome";
import SectionHeader from "../components/SectionHeader";
import Article from "../components/Article";

export default {
  components: {
    Welcome,
    SectionHeader,
    Article
  },
  data() {
    return {
      user: {
        nama: "John"
      },
      daftar_konten: []
    };
  },
  computed: {
    ...mapState(["currentUser", "userProfile"])
  },
  watch: {
    get_daftar_nutritionist: {
      immediate: true,
      handler() {
        this.$bind(
          "daftar_konten",
          firebase.db
            .collection("contents")
            .where("status", "==", "posted")
            .orderBy("tanggal_diposting", "desc")
        );
      }
    }
  }
};
</script>

<style></style>
