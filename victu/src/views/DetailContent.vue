<template>
  <div class="detail-content mb-16">
    <v-app-bar color="#28190E" dense dark fixed>
      <v-app-bar-nav-icon @click="back">
        <v-icon>mdi-chevron-left</v-icon>
      </v-app-bar-nav-icon>

      <v-toolbar-title>Health Content</v-toolbar-title>

      <v-spacer></v-spacer>
      <v-menu left bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item
            v-if="
              userProfile.role == 'nutritionist' &&
                data_konten.status == 'proofreading'
            "
            @click="setujuiKonten"
          >
            <v-list-item-title>Setujui</v-list-item-title>
          </v-list-item>
          <v-list-item
            v-if="
              userProfile.role == 'nutritionist' &&
                data_konten.status == 'proofreading'
            "
            @click="hapusKonten"
          >
            <v-list-item-title>Tolak</v-list-item-title>
          </v-list-item>
          <v-list-item
            v-if="
              userProfile.role == 'admin' && data_konten.status != 'deleted'
            "
            @click="hapusKonten"
          >
            <v-list-item-title>Hapus</v-list-item-title>
          </v-list-item>
          <v-list-item
            v-if="
              userProfile.role == 'writer' &&
                data_konten.status == 'proofreading'
            "
            :to="'/edit-content/' + data_konten.id"
          >
            <v-list-item-title>Edit</v-list-item-title>
          </v-list-item>
          <v-list-item
            v-if="
              userProfile.role == 'writer' &&
                data_konten.status == 'proofreading'
            "
            @click="hapusKonten"
          >
            <v-list-item-title>Hapus</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <div class="content container" v-if="data_konten.writer">
      <div class="judul">
        {{ data_konten.judul }}
      </div>
      <div class="writer">
        <div class="icon">
          <v-icon medium color="white">
            mdi-face
          </v-icon>
        </div>
        <div class="nama">
          {{ data_konten.writer.nama }}
        </div>
        <div class="time">
          {{ formatDate(data_konten.tanggal_diposting.seconds) }}
        </div>
      </div>
      <div class="header">
        <v-img width="100%" height="250px" :src="data_konten.foto"></v-img>
      </div>
      <div class="deskripsi">
        {{ data_konten.isi }}
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
    back() {
      this.$router.go(-1);
    },
    formatDate(timestamp) {
      let date = new Date(timestamp * 1000);
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      date = date.getDate();
      return date + "/" + month + "/" + year;
    },
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
      next("/" + store.state.userProfile.role);
    }
  }
};
</script>

<style scoped>
.detail-content .v-toolbar__title {
  padding-left: 0 !important;
}

.content {
  margin-top: 50px;
}

.judul {
  font-family: Roboto;
  font-weight: bold;
  font-size: 30px;
  color: #28190e;
}

.writer {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 15px;
}

.nama {
  font-family: Nunito;
  font-weight: bold;
  font-size: 12px;
  color: #28190e;
  margin-left: 10px;
}

.time {
  font-family: Nunito;
  font-weight: 300;
  font-size: 12px;
  color: #28190e;
  margin-left: 10px;
}

.icon {
  display: flex;
  width: 30px;
  height: 30px;
  background: #f7b516;
  border-radius: 100px;
  justify-content: center;
}

.deskripsi {
  font-family: Nunito;
  font-weight: normal;
  font-size: 16px;
  text-align: justify;
  color: #28190e;
  margin-top: 15px;
}
</style>
