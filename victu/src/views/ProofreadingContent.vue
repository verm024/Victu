<template>
  <div class="proofreading">
    Daftar Konten yang harus diproofreading
    <div v-for="(item, index) in daftar_konten" :key="index">
      {{ item.judul }}
      {{ item.isi }}
      {{ item.id }}
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
  watch: {
    get_daftar_konten: {
      immediate: true,
      handler() {
        this.$bind(
          "daftar_konten",
          firebase.db
            .collection("contents")
            .where("status", "==", "proofreading")
            .orderBy("tanggal_diposting", "desc")
        );
      }
    }
  },
  computed: {
    ...mapState(["currentUser", "userProfile"])
  }
};
</script>

<style></style>
