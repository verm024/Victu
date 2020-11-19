<template>
  <div class="search-nutritionist">
    Daftar konten
    <div v-for="(item, index) in daftar_konten" :key="index">
      <router-link :to="'/content/' + item.id">
        {{ item.judul }}
        {{ item.isi }}
        {{ item.id }}
      </router-link>
    </div>
  </div>
</template>

<script>
import firebase from "../firebase";
import { mapState } from "vuex";

export default {
  data() {
    return {
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
