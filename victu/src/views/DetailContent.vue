<template>
  <div class="detail-content">
    Detail Content
    {{ data_konten.judul }}
    {{ data_konten.isi }}
  </div>
</template>

<script>
import firebase from "../firebase";
import { mapState } from "vuex";
import store from "../store";

export default {
  data() {
    return {
      data_konten: ""
    };
  },
  watch: {
    get_data_konten: {
      immediate: true,
      handler() {
        this.$bind(
          "data_konten",
          firebase.db.collection("contents").doc(this.$route.params.id)
        );
      }
    }
  },
  async beforeRouteEnter(to, from, next) {
    let doc = await firebase.db
      .collection("contents")
      .doc(to.params.id)
      .get();
    if (doc.exists) {
      let data = doc.data();
      if (store.state.userProfile.role == "user") {
        if (data.status == "proofreading" || data.status == "deleted") {
          next("/user");
        } else {
          next();
        }
      } else if (store.state.userProfile.role == "writer") {
        if (data.status == "proofreading" || data.status == "deleted") {
          if (data.writer.id == store.state.currentUser.uid) {
            next();
          } else {
            next("/writer");
          }
        } else {
          next();
        }
      } else {
        next();
      }
    } else {
      next("/writer");
    }
  }
};
</script>

<style></style>
