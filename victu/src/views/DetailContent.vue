<template>
  <div class="detail-content">
    Detail Content
    {{ data_konten.judul }}
    {{ data_konten.isi }}
    <button
      v-if="
        userProfile.role == 'nutritionist' &&
          data_konten.status == 'proofreading'
      "
      @click="setujuiKonten"
    >
      Setuju
    </button>
    <button
      v-if="
        userProfile.role == 'nutritionist' &&
          data_konten.status == 'proofreading'
      "
      @click="hapusKonten"
    >
      Tolak
    </button>
    <button
      v-if="userProfile.role == 'admin' && data_konten.status != 'deleted'"
      @click="hapusKonten"
    >
      Hapus
    </button>
    <button
      v-if="
        userProfile.role == 'writer' && data_konten.status == 'proofreading'
      "
      @click="hapusKonten"
    >
      Hapus
    </button>
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
  methods: {
    async setujuiKonten() {
      try {
        await firebase.db
          .collection("contents")
          .doc(this.$route.params.id)
          .update({ status: "posted", tanggal_diposting: firebase.timestamp });
      } catch (error) {
        console.error(error);
      }
    },
    async hapusKonten() {
      try {
        await firebase.db
          .collection("contents")
          .doc(this.$route.params.id)
          .update({ status: "deleted" });
      } catch (error) {
        console.error(error);
      }
    }
  },
  computed: {
    ...mapState(["currentUser", "userProfile"])
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