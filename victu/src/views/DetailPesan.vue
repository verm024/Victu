<template>
  <div class="detail-pesan" v-if="informasi_pesan.user">
    <v-app-bar color="#28190E" dense dark fixed>
      <v-app-bar-nav-icon @click="back">
        <v-icon>mdi-chevron-left</v-icon>
      </v-app-bar-nav-icon>

      <v-toolbar-title>{{
        userProfile.role == "user"
          ? informasi_pesan.nutritionist.nama
          : informasi_pesan.user.nama
      }}</v-toolbar-title>
    </v-app-bar>
    <div class="container-fluid list-pesan">
      <div
        :class="
          index == daftar_pesan.length - 1
            ? 'scroll-to card-detail'
            : 'card-detail'
        "
        v-for="(item, index) in daftar_pesan"
        :key="index"
      >
        <div class="wrapper left" v-if="item.sender != userProfile.role">
          <div
            class="sender"
            v-if="informasi_pesan.user && item.sender == 'user'"
          >
            {{ informasi_pesan.user.nama }}
          </div>
          <div
            class="sender"
            v-if="informasi_pesan.user && item.sender == 'nutritionist'"
          >
            {{ informasi_pesan.nutritionist.nama }}
          </div>
          <div class="content deskripsi">
            {{ item.content }}
          </div>
          <div class="time" v-if="item.tanggal_chat">
            {{ formatDate(item.tanggal_chat.seconds) }}
          </div>
        </div>
        <div class="wrapper right" v-if="item.sender == userProfile.role">
          <div class="content deskripsi">
            {{ item.content }}
          </div>
          <div class="time" v-if="item.tanggal_chat">
            {{ formatDate(item.tanggal_chat.seconds) }}
          </div>
        </div>
      </div>
      <div v-if="daftar_pesan.length == 0" class="empty">
        No message yet
      </div>
    </div>
    <div class="pesan-baru">
      <div class="input">
        <input type="text" v-model="pesan_baru" />
      </div>
      <div class="kirim">
        <button @click="kirimPesan">
          Send
        </button>
      </div>
    </div>
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
    if (this.update_counter <= 4) {
      this.scrollToElement();
    }
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
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

<style scoped>
.detail-pesan .v-toolbar__title {
  padding-left: 0 !important;
}

.card-detail {
  width: 100%;
}

.wrapper {
  width: 75%;
  padding: 20px;
  background: #ffffff;
  border: 1px solid #f1f4f2;
  box-sizing: border-box;
  border-radius: 8px;
  box-shadow: 0px 2px 18px rgba(0, 0, 0, 0.04);
  align-items: center;
  margin-bottom: 20px;
}

.left {
  margin-right: auto;
}

.right {
  margin-left: auto;
}

.sender {
  font-size: 18px;
  color: #28190e !important;
  font-weight: bold;
}

.content {
  margin-top: 10px;
  font-size: 16px;
  color: #28190e;
  opacity: 0.7;
  font-family: Nunito;
  font-weight: normal;
}

.time {
  width: fit-content;
  margin-left: auto;
  font-size: 12px;
  color: #89969f;
  font-weight: 300;
  margin-top: 20px;
  font-family: Nunito;
}

.list-pesan {
  padding: 90px 16px 70px 16px;
}

.pesan-baru {
  z-index: 3;
  bottom: 0;
  padding: 12px;
  position: fixed;
  background-color: #ffffff;
  width: 100%;
  display: flex;
  align-items: center;
  box-shadow: 0px 2px 18px rgba(0, 0, 0, 0.04);
  border-top: 1px solid #f1f4f2;
}

.input {
  width: 100%;
}

.input input {
  border: 1px solid #dee7ee;
  font-size: 18px;
  padding: 8px 12px;
  width: 100%;
  color: #333333;
  outline: none;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
}

.kirim {
  height: 100%;
}

.kirim button {
  outline: none;
  color: white;
  font-weight: 700;
  background: #28190e;
  border: none;
  padding: 10px 13px;
  border-radius: 0px 8px 8px 0px;
}

.empty {
  text-align: center;
  font-size: 16px;
  margin-top: 50px;
  color: #89969f;
}
</style>
