<template>
  <div class="detail-pesan">
    Detail pesan (Room Chat)
    <div
      :class="
        index == daftar_pesan.length - 1
          ? 'scroll-to card-detail'
          : 'card-detail'
      "
      v-for="(item, index) in daftar_pesan"
      :key="index"
    >
      {{ item.content }}
      {{ item.sender }}
    </div>
    <input type="text" placeholder="pesan baru" v-model="pesan_baru" />
    <button @click="kirimPesan">Kirim</button>
  </div>
</template>

<script>
import firebase from "../firebase";
import { mapState } from "vuex";
import store from "../store";

export default {
  data() {
    return {
      daftar_pesan: [],
      informasi_pesan: [],
      pesan_baru: "",
      update_counter: 0
    };
  },
  watch: {
    get_daftar_pesan: {
      immediate: true,
      handler() {
        this.$bind(
          "daftar_pesan",
          firebase.db
            .collection("chats")
            .doc(this.$route.params.id)
            .collection("chat")
            .orderBy("tanggal_chat", "asc")
        );
        this.$bind(
          "informasi_pesan",
          firebase.db.collection("chats").doc(this.$route.params.id)
        );
      }
    }
  },
  computed: {
    ...mapState(["currentUser", "userProfile"])
  },
  updated() {
    this.update_counter += 1;
    if (this.update_counter == 4) {
      this.scrollToElement();
    }
  },
  methods: {
    scrollToElement() {
      let el = this.$el.getElementsByClassName("scroll-to")[0];
      if (el) {
        el.scrollIntoView({
          behavior: "smooth"
        });
      }
    },
    formatDate(timestamp) {
      let date = new Date(timestamp * 1000);
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      let hours = date.getHours();
      let minutes = date.getMinutes();
      if (hours < 10) {
        hours = 0 + hours.toString();
      }
      if (minutes < 10) {
        minutes = 0 + minutes.toString();
      }
      date = date.getDate();
      return date + "-" + month + "-" + year + " " + hours + ":" + minutes;
    },
    async kirimPesan() {
      if (this.pesan_baru != "") {
        try {
          await firebase.db
            .collection("chats")
            .doc(this.$route.params.id)
            .update({
              tanggal_chat: new Date()
            });
          await firebase.db
            .collection("chats")
            .doc(this.$route.params.id)
            .collection("chat")
            .add({
              content: this.pesan_baru,
              tanggal_chat: new Date(),
              sender: this.userProfile.role
            });
        } catch (error) {
          console.error(error);
        }
        this.pesan_baru = "";
        this.scrollToElement();
      }
    }
  },
  async beforeRouteEnter(to, from, next) {
    let userProfile = store.state.userProfile;
    let currentUser = store.state.currentUser;
    if (userProfile.role == "nutritionist") {
      let doc = await firebase.db
        .collection("chats")
        .doc(to.params.id)
        .get();
      let data = doc.data();
      let nutritionistRef = await data.nutritionist.get();
      if (currentUser.uid == nutritionistRef.id) {
        next();
      } else {
        next("/chat");
      }
    } else {
      let doc = await firebase.db
        .collection("chats")
        .doc(to.params.id)
        .get();
      let data = doc.data();
      let userRef = await data.user.get();
      if (currentUser.uid == userRef.id) {
        next();
      } else {
        next("/chat");
      }
    }
  }
};
</script>

<style></style>
