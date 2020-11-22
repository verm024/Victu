<template>
  <div class="search-nutritionist">
    <v-app-bar fixed color="#28190E" dark prominent class="search-app-bar">
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

      <v-toolbar-title class="toolbar-title"
        >Search Nutritionist</v-toolbar-title
      >

      <template v-slot:extension>
        <div class="search-input">
          <v-text-field
            dense
            label="Search..."
            type="text"
            solo
            light
            color="#28190E"
            prepend-inner-icon="mdi-magnify"
            v-model="search"
            clearable
          ></v-text-field>
        </div>
      </template>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" absolute temporary>
      <v-list nav dense>
        <v-list-item-group
          v-model="group"
          active-class="black--text text--accent-4"
        >
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Profile</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-help</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Help</v-list-item-title>
          </v-list-item>

          <v-list-item @click="logout">
            <v-list-item-icon>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <div class="container list-nutritionist">
      <div
        class="card-pesan"
        v-for="(item, index) in filterSearch"
        :key="index"
        @click.stop="handleClickDetail(index); detail_nutritionist = true"
      >
        <div class="icon-wrapper">
          <div class="icon">
            <v-icon large color="white">
              mdi-face
            </v-icon>
          </div>
        </div>
        <div class="content d-flex align-center">
          <div class="judul">{{ item.nama }}</div>
        </div>
        <div
          @click="handleClickHubungi(item.id)"
          class="icon-hubungi-wrapper d-flex align-center"
        >
          <div class="icon-hubungi">
            <v-icon large color="#28190E">
              mdi-message-text-outline
            </v-icon>
          </div>
        </div>
      </div>
    </div>
    <v-dialog
      v-model="detail_nutritionist"
      max-width="290"
    >
      <v-card>
        <v-card-title class="headline">
          {{ detail.nama }}
        </v-card-title>

        <v-card-text>
          Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import firebase from "../firebase";
import { mapState } from "vuex";

export default {
  data() {
    return {
      daftar_nutritionist: [],
      search: "",
      drawer: false,
      group: null,
      detail_nutritionist: false,
      detail: {
        nama: ""
      }
    };
  },
  computed: {
    ...mapState(["currentUser", "userProfile"]),
    filterSearch() {
      return this.daftar_nutritionist.filter(element => {
        if (this.search == "" || this.search == null) {
          return true;
        } else {
          return element.nama.toLowerCase().includes(this.search.toLowerCase());
        }
      });
    }
  },
  watch: {
    get_daftar_nutritionist: {
      immediate: true,
      handler() {
        this.$bind(
          "daftar_nutritionist",
          firebase.db.collection("users").where("role", "==", "nutritionist")
        );
      }
    }
  },
  methods: {
    handleClickDetail(index) {
      this.detail.nama = this.daftar_nutritionist[index].nama
    },
    async logout() {
      try {
        await firebase.auth.signOut();
      } catch (error) {
        console.error(error);
      }
      this.$store.commit("setCurrentUser", null);
      this.$store.commit("setUserProfile", null);
      this.$router.push("/login");
    },
    async handleClickHubungi(id) {
      let data;
      try {
        if (this.userProfile.role == "user") {
          data = await firebase.db
            .collection("chats")
            .where(
              "nutritionist",
              "==",
              firebase.db.collection("users").doc(id)
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
            .where("user", "==", firebase.db.collection("users").doc(id))
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
              nutritionist: firebase.db.collection("users").doc(id),
              user: firebase.db.collection("users").doc(this.currentUser.uid),
              tanggal_chat: new Date()
            });
          } else {
            room = await firebase.db.collection("chats").add({
              user: firebase.db.collection("users").doc(id),
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
  }
};
</script>

<style scoped>
.search-app-bar {
  height: fit-content !important;
}

.toolbar-title {
  text-align: center;
  margin-top: 80px;
  margin-left: -16px;
  padding-right: 20px;
  padding-left: 0 !important;
  width: 100%;
  font-family: Roboto;
  font-weight: 500;
}

.search-input {
  width: 80%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 15px;
}

.search-input input {
  color: #28190e;
}

.list-nutritionist {
  margin-top: 240px;
}

.card-pesan {
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  padding: 24px 28px;
  background: #ffffff;
  border: 1px solid #f1f4f2;
  box-sizing: border-box;
  border-radius: 10px;
  box-shadow: 2px 4px 30px rgba(247, 181, 22, 0.1);
  margin-bottom: 20px;
  border-radius: 10px;
}

.content {
  margin-left: 20px;
  margin-right: 20px;
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

.icon-hubungi-wrapper {
  opacity: 0.25;
  transform: matrix(-1, 0, 0, 1, 0, 0);
}
</style>

<style>
.search-app-bar .v-toolbar__content {
  height: unset !important;
}

.search-app-bar .v-toolbar__extension {
  height: unset !important;
}
</style>
