<template>
  <v-app style="background: #FFFCF2">
    <v-app-bar
      v-if="
        $route.name != 'Home' &&
          $route.name != 'Login' &&
          $route.name != 'Register'
      "
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>

      <router-link to="/">
        <v-btn text>
          Home
        </v-btn>
      </router-link>
      <router-link
        v-if="currentUser && userProfile"
        :to="'/' + userProfile.role"
      >
        <v-btn text>
          Dashboard
        </v-btn>
      </router-link>
      <v-btn class="mr-7" v-if="currentUser" @click="logout" text>
        <span class="mr-2">Logout</span>
        <v-icon>mdi-logout</v-icon>
      </v-btn>
      <router-link v-if="!currentUser" to="/login">
        <v-btn text>
          Login
        </v-btn>
      </router-link>
      <router-link v-if="!currentUser" to="/register">
        <v-btn class="mr-7" text>
          Register
        </v-btn>
      </router-link>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import firebase from "./firebase";
import { mapState } from "vuex";

export default {
  name: "App",

  data() {
    return {};
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
    }
  },
  computed: {
    ...mapState(["currentUser", "userProfile"])
  }
};
</script>

<style>
a {
  text-decoration: none;
}
</style>
