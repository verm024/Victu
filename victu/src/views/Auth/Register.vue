<template>
  <div
    class="register container d-flex align-center justify-center flex-column"
  >
    <div class="logo">
      <img src="@/assets/images/logo.png" alt="Victu" />
    </div>
    <div class="page-title">
      Create Account
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
            v-model="form_register.email"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row class="row-below">
        <v-col class="col-12 col-md-6 offset-md-3">
          <v-text-field
            dense
            label="Password"
            :type="show_password ? 'text' : 'password'"
            outlined
            color="#28190E"
            :append-icon="show_password ? 'mdi-eye-off' : 'mdi-eye'"
            @click:append="show_password = !show_password"
            v-model="form_register.password"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row class="row-below">
        <v-col class="col-12 col-md-6 offset-md-3">
          <v-text-field
            dense
            label="Full Name"
            type="text"
            outlined
            color="#28190E"
            v-model="form_register.nama"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row class="row-below">
        <v-col class="col-12 col-md-6 offset-md-3">
          <v-select
            dense
            label="Gender"
            outlined
            color="#28190E"
            item-color="#28190E"
            :items="genders"
            v-model="form_register.gender"
          ></v-select>
        </v-col>
      </v-row>
      <v-row class="row-below">
        <v-col class="col-12 col-md-6 offset-md-3">
          <v-text-field
            dense
            label="Date of Birth"
            type="text"
            outlined
            readonly
            color="#28190E"
            append-icon="mdi-calendar"
            @click="show_calendar = !show_calendar"
            v-model="form_register.tanggal_lahir"
          ></v-text-field>
          <v-expand-transition>
            <v-date-picker
              v-if="show_calendar"
              class="form-datepicker"
              @click:date="show_calendar = false"
              v-model="form_register.tanggal_lahir"
              color="#28190E"
            ></v-date-picker>
          </v-expand-transition>
        </v-col>
      </v-row>
    </div>
    <div class="button">
      <button @click="register">Register</button>
    </div>
    <div class="bottom-text">
      Already have an account? <router-link to="/login">Login!</router-link>
    </div>
  </div>
</template>

<script>
import firebase from "../../firebase";
import validator from "validator";

export default {
  data() {
    return {
      form_register: {
        email: "",
        password: "",
        nama: "",
        gender: "Male",
        tanggal_lahir: new Date().toISOString().substr(0, 10),
        role: "user"
      },
      show_password: false,
      show_calendar: false,
      genders: ["Male", "Female"]
    };
  },
  methods: {
    async register() {
      let registerData;
      if (
        validator.isEmail(this.form_register.email) &&
        this.form_register.password.length >= 6 &&
        this.form_register.password.length <= 20
      ) {
        if (this.form_register.role == "user") {
          if (
            this.form_register.nama == "" ||
            this.form_register.gender == "" ||
            this.form_register.tanggal_lahir == ""
          ) {
            alert("Harap isi semua form yang wajib diisi");
            return;
          }
          registerData = {
            email: this.form_register.email,
            role: this.form_register.role,
            nama: this.form_register.nama,
            gender: this.form_register.gender,
            tanggal_lahir: new Date(this.form_register.tanggal_lahir),
            kalori_ideal: 0,
            tinggi: 0,
            berat: 0,
            aktivitas: "Moderate"
          };
        } else if (this.form_register.role == "writer") {
          registerData = {
            email: this.form_register.email,
            role: this.form_register.role
          };
        } else if (this.form_register.role == "nutritionist") {
          registerData = {
            email: this.form_register.email,
            role: this.form_register.role
          };
        }
        let user;
        try {
          user = await firebase.auth.createUserWithEmailAndPassword(
            this.form_register.email,
            this.form_register.password
          );
        } catch (error) {
          console.error(error);
          if (error.code.includes("email-already-in-use")) {
            alert("Email sudah pernah dipakai");
          }
          return;
        }
        user = user.user;
        try {
          await firebase.db
            .collection("users")
            .doc(user.uid)
            .set(registerData);
        } catch (error) {
          console.error(error);
        }
        this.$store.commit("setCurrentUser", user);
        await this.$store.dispatch("fetchUserProfile");
        this.$router.push("/" + this.form_register.role);
      } else {
        alert(
          "Format email harus sesuai dengan yang telah ditentukan dan panjang password harus antara 6 hingga 20 karakter"
        );
      }
    }
  }
};
</script>

<style scoped>
.register {
  min-height: 100vh;
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

.form-datepicker {
  width: fit-content;
  height: fit-content;
  margin: auto;
  transition: 0.5s;
}

.row-below {
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
