<template>
  <div class="notifikasi-writer container mb-14">
    <div
      class="card-notifikasi"
      v-for="(item, index) in daftar_notifikasi"
      :key="index"
    >
      <div class="icon-wrapper">
        <div class="icon">
          <v-icon large color="white">
            {{ item.icon }}
          </v-icon>
        </div>
      </div>
      <div class="content">
        <div class="judul">{{ item.judul }}</div>
        <div class="deskripsi">
          {{ item.pesan }}
        </div>
        <div class="time">
          {{ formatDate(item.tanggal_notifikasi.seconds) }}
        </div>
      </div>
    </div>
    <div class="empty" v-if="daftar_notifikasi.length == 0">
      No notification yet
    </div>
  </div>
</template>

<script>
import firebase from "../firebase";
import { mapState } from "vuex";

export default {
  data() {
    return {
      daftar_notifikasi: []
    };
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
  computed: {
    ...mapState(["currentUser", "userProfile"])
  },
  watch: {
    get_daftar_notifikasi: {
      immediate: true,
      handler() {
        this.$bind(
          "daftar_notifikasi",
          firebase.db
            .collection("users")
            .doc(this.currentUser.uid)
            .collection("notifikasi")
            .orderBy("tanggal_notifikasi", "desc")
            .limit(10)
        );
      }
    }
  }
};
</script>

<style scoped>
.notifikasi-writer {
  margin-top: 60px;
}

.card-notifikasi {
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
}

.notifikasi-writer .deskripsi {
  font-family: Nunito;
  font-weight: normal;
  font-size: 16px;
  margin-top: 5px;
  color: #28190e;
  opacity: 0.7;
  max-height: 24px;
  overflow: hidden;
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
</style>
