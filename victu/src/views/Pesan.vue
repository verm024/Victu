<template>
  <div class="pesan">
    daftar pesan masuk
    <div v-for="(item, index) in daftar_pesan" :key="index">
      <router-link :to="'/chat/' + item.id">
        <div class="content" v-if="userProfile.role == 'user'">
          <div class="judul">{{ item.nutritionist.email }}</div>
          <div class="deskripsi" v-if="last_pesan[index]">
            {{ last_pesan[index].content.slice(0, 20) }}
          </div>
        </div>
        <div class="content" v-else-if="userProfile.role == 'nutritionist'">
          <div class="judul">
            {{ item.user.email }}
          </div>
          <div class="deskripsi" v-if="last_pesan[index]">
            {{ last_pesan[index].content.slice(0, 20) }}
          </div>
        </div>
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
      daftar_pesan: [],
      last_pesan: []
    };
  },
  computed: {
    ...mapState(["currentUser", "userProfile"])
  },
  watch: {
    get_daftar_pesan: {
      immediate: true,
      async handler() {
        if (this.userProfile.role == "user") {
          await this.$bind(
            "daftar_pesan",
            firebase.db
              .collection("chats")
              .where(
                "user",
                "==",
                firebase.db.collection("users").doc(this.currentUser.uid)
              )
              .orderBy("tanggal_chat", "desc")
          );
        } else {
          let self = this;
          await this.$bind(
            "daftar_pesan",
            firebase.db
              .collection("chats")
              .where(
                "nutritionist",
                "==",
                firebase.db.collection("users").doc(this.currentUser.uid)
              )
              .orderBy("tanggal_chat", "desc")
          );
        }
        this.daftar_pesan.forEach(element => {
          firebase.db
            .collection("chats")
            .doc(element.id)
            .collection("chat")
            .limit(1)
            .orderBy("tanggal_chat", "desc")
            .get()
            .then(doc => {
              if (doc.docs.length > 0) {
                let data = doc.docs[0].data();
                this.last_pesan.push(data);
              } else {
                this.last_pesan.push({ content: "" });
              }
            });
        });
        for (let i = 0; i < this.daftar_pesan.length; i++) {
          if (typeof this.daftar_pesan[i].user == "string") {
            let id = this.daftar_pesan[i].user.split("/")[1];
            let data;
            try {
              data = await firebase.db
                .collection("users")
                .doc(id)
                .get();
            } catch (error) {
              console.error(error);
            }
            data = data.data();
            this.daftar_pesan[i].user = data;
          }
          if (typeof this.daftar_pesan[i].nutritionist == "string") {
            let id = this.daftar_pesan[i].nutritionist.split("/")[1];
            let data;
            try {
              data = await firebase.db
                .collection("users")
                .doc(id)
                .get();
            } catch (error) {
              console.error(error);
            }
            data = data.data();
            this.daftar_pesan[i].nutritionist = data;
          }
        }
      }
    }
  }
};
</script>

<style></style>
