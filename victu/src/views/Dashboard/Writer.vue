<template>
  <div class="writer">
    Dashboard Writer
  </div>
</template>

<script>
import firebase from "../../firebase";
import { mapState } from "vuex";

export default {
  data() {
    return {
      daftar_konten: ""
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
