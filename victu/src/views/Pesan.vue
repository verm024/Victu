<template>
  <div class="pesan container mb-14">
    <div
      class="new-consultation"
      v-if="userProfile.role == 'user' && daftar_pesan.length != 0"
    >
      <router-link to="/search-nutritionist">
        Start a <u>new consultation!</u>
      </router-link>
    </div>
    <div
      class="card-pesan"
      v-for="(item, index) in daftar_pesan"
      :key="index"
      @click="$router.push('/chat/' + item.id)"
    >
      <div class="icon-wrapper">
        <div class="icon">
          <v-icon large color="white">
            mdi-face
          </v-icon>
        </div>
      </div>
      <div class="content" v-if="userProfile.role == 'nutritionist'">
        <div class="judul">{{ item.user.nama }}</div>
        <div class="deskripsi" v-if="last_pesan[index]">
          {{ last_pesan[index].content.slice(0, 20) }}
        </div>
        <div class="time">{{ formatDate(item.tanggal_chat.seconds) }}</div>
      </div>
      <div class="content" v-else-if="userProfile.role == 'user'">
        <div class="judul">
          {{ item.nutritionist.nama }}
        </div>
        <div class="deskripsi" v-if="last_pesan[index]">
          {{ last_pesan[index].content.slice(0, 20) }}
        </div>
        <div class="time">{{ formatDate(item.tanggal_chat.seconds) }}</div>
      </div>
    </div>
    <div
      v-if="daftar_pesan.length == 0 && userProfile.role == 'user'"
      class="empty"
    >
      <router-link to="/search-nutritionist">
        <span>No message yet,</span> <u>start a new consultation!</u>
      </router-link>
    </div>
    <div
      v-else-if="daftar_pesan.length == 0 && userProfile.role == 'nutritionist'"
      class="empty"
    >
      No message yet
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
  methods: {
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
    }
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
              .where("consultation", "==", true)
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
              .where("consultation", "==", true)
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

<style scoped>
.pesan {
  margin-top: 60px;
}

.new-consultation {
  margin-bottom: 25px;
}

.new-consultation a {
  font-family: Roboto;
  font-weight: 500 !important;
  font-size: 18px;
  color: #28190e;
}

.new-consultation a u {
  color: #f7b516;
}

.card-pesan {
  display: flex;
  flex-direction: row;
  width: 100%;
  padding: 20px;
  background: #ffffff;
  border: 1px solid #f1f4f2;
  box-sizing: border-box;
  border-radius: 10px;
  box-shadow: 2px 4px 30px rgba(247, 181, 22, 0.1);
  margin-bottom: 20px;
}

.content {
  margin-left: 20px;
  width: 100%;
}

.icon {
  display: flex;
  width: 50px;
  height: 50px;
  background: #f7b516;
  border-radius: 100px;
  justify-content: center;
}

.judul {
  color: #28190e;
  font-weight: 600;
  font-size: 18px;
  max-height: 27px;
  overflow: hidden;
}

.pesan .deskripsi {
  font-family: Nunito;
  font-weight: normal;
  font-size: 16px;
  margin-top: 5px;
  color: #28190e;
  opacity: 0.7;
}

.time {
  width: fit-content;
  margin-left: auto;
  font-size: 12px;
  color: #89969f;
  font-weight: 300;
  margin-top: 10px;
  font-family: Nunito;
}

.empty {
  text-align: center;
}

.empty a span {
  font-size: 16px;
  color: #28190e;
  opacity: 0.8;
}

.empty a u {
  font-size: 16px;
  color: #f7b516;
  font-weight: 500 !important;
}
</style>
