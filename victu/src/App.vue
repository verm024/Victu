<template>
  <v-app style="background: #FFFCF2">
    <v-app-bar
      color="#28190E"
      dark
      dense
      fixed
      v-if="
        $route.name != 'Home' &&
          $route.name != 'Login' &&
          $route.name != 'Register' &&
          $route.name != 'Pesan' &&
          $route.name != 'Search Nutritionist' &&
          $route.name != 'Detail Content'
      "
    >
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

      <v-toolbar-title>{{ $route.meta.title }}</v-toolbar-title>
    </v-app-bar>
    <v-navigation-drawer
      v-model="drawer"
      fixed
      temporary
      v-if="
        $route.name != 'Home' &&
          $route.name != 'Login' &&
          $route.name != 'Register' &&
          $route.name != 'Pesan' &&
          $route.name != 'Search Nutritionist' &&
          $route.name != 'Detail Content'
      "
    >
      <v-list nav dense>
        <v-list-item-group
          v-model="group"
          active-class="black--text text--accent-4"
        >
          <v-list-item :to="'/' + userProfile.role">
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>

          <v-list-item to="/profile">
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Profile</v-list-item-title>
          </v-list-item>

          <v-list-item @click="handleClickHelp('oZC9H0DPQ2R3GyNJDBJJax1Ze7X2')">
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

    <v-main class="main">
      <router-view></router-view>
    </v-main>

    <v-bottom-navigation
      color="#28190E"
      class="bottom-nav"
      v-if="
        $route.name != 'Login' &&
          $route.name != 'Register' &&
          $route.name != 'Home' &&
          $route.name != 'Pesan'
      "
      fixed
      grow
    >
      <v-btn :to="'/' + userProfile.role" value="home">
        <span>Home</span>

        <v-icon>mdi-home</v-icon>
      </v-btn>

      <v-btn to="/calorie" v-if="userProfile.role == 'user'" value="calorie">
        <span>Calorie</span>

        <v-icon>mdi-food</v-icon>
      </v-btn>

      <v-btn
        to="/add-content"
        v-if="userProfile.role == 'writer'"
        value="add_content"
      >
        <span>New Content</span>

        <v-icon>mdi-plus-circle</v-icon>
      </v-btn>

      <v-btn
        to="/proofreading"
        v-if="userProfile.role == 'nutritionist'"
        value="proofreading"
      >
        <span>Proofreading</span>

        <v-icon>mdi-calendar-text</v-icon>
      </v-btn>

      <v-btn
        to="/chat"
        v-if="userProfile.role == 'nutritionist' || userProfile.role == 'user'"
        value="consultation"
      >
        <span>Consultation</span>

        <v-icon>mdi-account-box</v-icon>
      </v-btn>

      <v-btn
        to="/notification"
        v-if="userProfile.role == 'writer'"
        value="notification"
      >
        <span>Notification</span>

        <v-icon>mdi-bell</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </v-app>
</template>

<script>
import firebase from "./firebase";
import { mapState } from "vuex";

export default {
  name: "App",

  data() {
    return {
      drawer: false,
      group: null
    };
  },
  methods: {
    async logout() {
      try {
        await firebase.auth.signOut();
      } catch (error) {
        console.error(error);
      }
      this.$store.commit("setCurrentUser", null);
      this.$store.commit("setUserProfile", null);
      this.$router.push("/login");
      this.drawer = false;
    },
    async handleClickHelp(id) {
      let data;
      try {
        if (this.userProfile.role == "admin") {
          data = await firebase.db
            .collection("chats")
            .where(
              "nutritionist",
              "==",
              firebase.db.collection("users").doc(this.currentUser.uid)
            )
            .where("user", "==", firebase.db.collection("users").doc(id))
            .get();
        } else {
          data = await firebase.db
            .collection("chats")
            .where(
              "user",
              "==",
              firebase.db.collection("users").doc(this.currentUser.uid)
            )
            .where(
              "nutritionist",
              "==",
              firebase.db.collection("users").doc(id)
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
          if (this.userProfile.role == "admin") {
            room = await firebase.db.collection("chats").add({
              nutritionist: firebase.db.collection("users").doc(id),
              user: firebase.db.collection("users").doc(this.currentUser.uid),
              tanggal_chat: new Date(),
              consultation: false
            });
          } else {
            room = await firebase.db.collection("chats").add({
              user: firebase.db.collection("users").doc(this.currentUser.uid),
              nutritionist: firebase.db.collection("users").doc(id),
              tanggal_chat: new Date(),
              consultation: false
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
      this.drawer = false;
    }
  },
  computed: {
    ...mapState(["currentUser", "userProfile"])
  },
  watch: {
    $route: {
      immediate: true,
      handler(to, from) {
        document.title = to.meta.title + " - Victu" || "Victu";
      }
    }
  }
};
</script>

<style>
a {
  text-decoration: none;
}
.main {
  background-color: #fffcf2;
}
</style>

<style scoped>
.bottom-nav .v-btn {
  font-family: Roboto;
  font-size: 12px;
  letter-spacing: unset !important;
}

.bottom-nav .v-btn i {
  margin-bottom: 5px;
}
</style>
