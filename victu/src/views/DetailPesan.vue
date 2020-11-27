<template>
  <div class="detail-pesan" v-if="informasi_pesan.user">
    <v-app-bar color="#28190E" dense dark fixed>
        <v-app-bar-nav-icon @click="back">
          <v-icon>mdi-chevron-left</v-icon>
        </v-app-bar-nav-icon>

        <v-toolbar-title v-if="informasi_pesan.consultation">{{
          userProfile.role == "user"
            ? informasi_pesan.nutritionist.nama
            : informasi_pesan.user.nama
        }}</v-toolbar-title>
        <v-toolbar-title v-else>{{
          userProfile.role == "admin"
            ? informasi_pesan.user.nama
            : informasi_pesan.nutritionist.nama
        }}</v-toolbar-title>
      <v-app-bar-nav-icon @click="detail_user = true" class="ml-auto">
        <v-icon>mdi-information</v-icon>
      </v-app-bar-nav-icon>
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
    <v-dialog
      v-if="informasi_pesan.user.tanggal_lahir && informasi_pesan.consultation"
      v-model="detail_user"
      max-width="90%"
    >
      <v-card dark color="#28190E" class="dialog-card">
        <div class="close-dialog-wrapper">
          <v-btn icon dark @click="detail_user = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>
        <v-card-text class="white--text">
          <div class="detail-title text-center">
            Patient's Information
          </div>
          <v-row class="text-center">
            <v-col class="col-3">
              <div class="detail-item-title">
                Name
              </div>
              <div class="detail-item-subtitle">
                {{ informasi_pesan.user.nama.split(" ")[0] }}
              </div>
            </v-col>
            <v-col class="col-3">
              <div class="detail-item-title">
                Height
              </div>
              <div class="detail-item-subtitle">
                {{ informasi_pesan.user.tinggi }} cm
              </div>
            </v-col>
            <v-col class="col-3">
              <div class="detail-item-title">
                Weight
              </div>
              <div class="detail-item-subtitle">
                {{ informasi_pesan.user.berat }} kg
              </div>
            </v-col>
            <v-col class="col-3">
              <div class="detail-item-title">
                Age
              </div>
              <div class="detail-item-subtitle">
                {{ getAge(informasi_pesan.user.tanggal_lahir.seconds) }}
              </div>
            </v-col>
          </v-row>
          <div class="detail-item-title">
            Latest Calorie Graph
          </div>
          <div class="chart-wrapper d-flex justify-center">
            <Chart :styles="chart_style" :chart-data="chart_data" />
          </div>
          <div class="detail-item-title mt-5">
            Ideal Calorie
          </div>
          <div class="detail-item-subtitle">
            {{
              informasi_pesan.user.kalori_ideal
                ? Math.ceil(informasi_pesan.user.kalori_ideal)
                : 0
            }}
            cals
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import firebase from "../firebase";
import { mapState } from "vuex";
import Chart from "../components/Chart";
import store from "../store";

export default {
  components: {
    Chart
  },
  data() {
    return {
      daftar_pesan: [],
      informasi_pesan: [],
      pesan_baru: "",
      update_counter: 0,
      detail_user: false,
      intakes: [],
      chart_data: {},
      chart_style: {
        width: "300px",
        height: "300px",
        position: "relative"
      }
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
        ).then(() => {
          this.$bind(
            "intakes",
            firebase.db
              .collection("users")
              .doc(this.informasi_pesan.user.id)
              .collection("calorie")
              .orderBy("tanggal_input", "desc")
              .limit(7)
          );
        });
      }
    },
    intakes: {
      handler() {
        let temp = [];
        this.intakes.forEach(element => {
          temp.push(Math.ceil(element.total_kalori));
        });
        let zeros = [];
        if (temp.length < 7) {
          for (let i = temp.length; i < 7; i++) {
            zeros.push(0);
          }
        }
        zeros.push(...temp);
        temp = zeros;
        let data = {
          labels: [
            "Day 1",
            "Day 2",
            "Day 3",
            "Day 4",
            "Day 5",
            "Day 6",
            "Day 7"
          ],
          datasets: [
            {
              label: "Last 7 Day Calorie Intakes",
              data: temp,
              backgroundColor: "#f7b516"
            }
          ]
        };
        this.chart_data = data;
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
    getAge(seconds) {
      var today = new Date();
      var birthDate = new Date(seconds * 1000);
      var age = today.getFullYear() - birthDate.getFullYear();
      var m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age;
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
    let doc = await firebase.db
      .collection("chats")
      .doc(to.params.id)
      .get();

    let data = doc.data();
    if (data.consultation) {
      if (userProfile.role == "nutritionist") {
        let nutritionistRef = await data.nutritionist.get();
        if (currentUser.uid == nutritionistRef.id) {
          next();
        } else {
          next("/chat");
        }
      } else {
        let userRef = await data.user.get();
        if (currentUser.uid == userRef.id) {
          next();
        } else {
          next("/chat");
        }
      }
    } else {
      if (userProfile.role == "admin") {
        let nutritionistRef = await data.nutritionist.get();
        if (currentUser.uid == nutritionistRef.id) {
          next();
        } else {
          next("/chat");
        }
      } else {
        let userRef = await data.user.get();
        if (currentUser.uid == userRef.id) {
          next();
        } else {
          next("/chat");
        }
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

.dialog-card {
  border-radius: 10px !important;
}

.close-dialog-wrapper {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding-right: 10px;
  padding-top: 10px;
}

.detail-title {
  font-family: Roboto;
  font-weight: normal;
  font-size: 20px;
  text-transform: uppercase;
  color: #ffffff;
}

.detail-item-title {
  font-weight: normal;
  opacity: 0.7;
  font-family: Nunito;
  text-transform: uppercase;
  margin-top: 10px;
  margin-bottom: 5px;
}

.detail-item-subtitle {
  font-weight: bold;
  font-family: Roboto;
  font-size: 16px;
}
</style>
