<template>
  <div class="login container d-flex align-center justify-center flex-column">
    <div class="logo">
      <img src="@/assets/images/logo.png" alt="Victu" />
    </div>
    <div class="page-title">
      Account Login
    </div>
    <div class="form">
      <v-row class="row-email">
        <v-col class="col-12 col-md-6 offset-md-3">
          <v-text-field
            dense
            label="Email"
            type="email"
            outlined
            color="#28190E"
            prepend-inner-icon="mdi-email"
            v-model="form_login.email"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row class="row-password">
        <v-col class="col-12 col-md-6 offset-md-3">
          <v-text-field
            dense
            label="Password"
            :type="show_password ? 'text' : 'password'"
            outlined
            color="#28190E"
            prepend-inner-icon="mdi-lock"
            :append-icon="show_password ? 'mdi-eye-off' : 'mdi-eye'"
            @click:append="show_password = !show_password"
            v-model="form_login.password"
          ></v-text-field>
        </v-col>
      </v-row>
    </div>
    <div class="button">
      <button @click="login">Login</button>
    </div>
    <div class="bottom-text">
      Don't have an account?
      <router-link to="/register">Create new one!</router-link>
    </div>
  </div>
</template>

<script>
import firebase from "../../firebase";

export default {
  data() {
    return {
      form_login: {
        email: "",
        password: ""
      },
      show_password: false
    };
  },
  methods: {
    async login() {
      let user;
      try {
        user = await firebase.auth.signInWithEmailAndPassword(
          this.form_login.email,
          this.form_login.password
        );
      } catch (error) {
        console.error(error);
      }
      if (user) {
        user = user.user;
        this.$store.commit("setCurrentUser", user);
        await this.$store.dispatch("fetchUserProfile");
        this.$router.push("/" + this.$store.state.userProfile.role);
      }
    }
  }
};
</script>

<style scoped>
.login {
  height: 100vh;
}

.logo {
  margin-bottom: 40px;
}

.logo img {
  width: 250px;
}

.page-title {
  font-family: Roboto;
  font-weight: bold;
  font-size: 24px;
  color: #28190e;
  border-bottom: 6px solid #28190e;
  padding: 0 8px;
  margin-bottom: 10px;
}

.form {
  width: 100%;
  padding: 16px;
}

.row-password {
  margin-top: -30px;
}

.button {
  margin-top: 00px;
}

.button button {
  font-family: Roboto;
  font-style: normal;
  font-weight: bold;
  font-size: 16px;
  text-align: center;
  background: red;
  background: #f7b516;
  box-shadow: 2px 4px 30px rgba(244, 204, 143, 0.25);
  border-radius: 10px;
  color: white;
  padding: 10px 32px;
}

.bottom-text {
  font-family: Nunito;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  color: #28190e;
  margin-top: 20px;
}

.bottom-text a {
  text-decoration: underline;
  color: #f7b516;
}
</style>

<style>
.v-input__slot {
  background: white !important;
}

.v-input__icon--prepend-inner {
  margin-right: 4px !important;
}
</style>
