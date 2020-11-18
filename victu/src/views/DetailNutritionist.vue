<template>
  <div class="detail-nutritionist">
    {{ data_nutritionist.email }}
    <button @click="handleClickHubungi">Hubungi</button>
  </div>
</template>

<script>
import store from "../store";
import firebase from "../firebase";
import { mapState } from "vuex";

export default {
  data() {
    return {
      data_nutritionist: []
    };
  },
  watch: {
    get_data_nutritionist: {
      immediate: true,
      handler() {
        this.$bind(
          "data_nutritionist",
          firebase.db.collection("users").doc(this.$route.params.id)
        );
      }
    }
  },
  computed: {
    ...mapState(["currentUser", "userProfile"])
  },
  methods: {
    async handleClickHubungi() {
      let data;
      try {
        if (this.userProfile.role == "user") {
          data = await firebase.db
            .collection("chats")
            .where(
              "nutritionist",
              "==",
              firebase.db.collection("users").doc(this.$route.params.id)
            )
            .where(
              "user",
              "==",
              firebase.db.collection("users").doc(this.currentUser.uid)
            )
            .get();
        } else {
          data = await firebase.db
            .collection("chats")
            .where(
              "user",
              "==",
              firebase.db.collection("users").doc(this.$route.params.id)
            )
            .where(
              "nutritionist",
              "==",
              firebase.db.collection("users").doc(this.currentUser.uid)
            )
            .get();
        }
      } catch (error) {
        console.error(error);
      }
      if (data.docs.length > 0) {
        this.$router.push("/chat/" + data.docs[0].id);
      } else {
        let room;
        try {
          if (this.userProfile.role == "user") {
            room = await firebase.db.collection("chats").add({
              nutritionist: firebase.db
                .collection("users")
                .doc(this.$route.params.id),
              user: firebase.db.collection("users").doc(this.currentUser.uid),
              tanggal_chat: new Date()
            });
          } else {
            room = await firebase.db.collection("chats").add({
              user: firebase.db.collection("users").doc(this.$route.params.id),
              nutritionist: firebase.db
                .collection("users")
                .doc(this.currentUser.uid),
              tanggal_chat: new Date()
            });
          }
        } catch (error) {
          console.error(error);
        }
        if (room) {
          this.$router.push("/chat/" + room.id);
        } else {
          alert("Terjadi error, coba lagi nanti");
        }
      }
    }
  },
  async beforeRouteEnter(to, from, next) {
    let doc = await firebase.db
      .collection("users")
      .doc(to.params.id)
      .get();
    if (doc.exists) {
      let data = doc.data();
      if (data.role == "nutritionist") {
        next();
      } else {
        next("/" + store.state.userProfile.role);
      }
    } else {
      next("/" + store.state.userProfile.role);
    }
  }
};
</script>

<style></style>
