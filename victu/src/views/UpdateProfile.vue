<template>
  <div
    class="container pt-16 mt-5 d-flex flex-column align-center justify-center pb-16"
  >
    <div class="profile__image rounded-circle mb-5">
      <img src="@/assets/images/profile.png" width="150px" height="150px" />
      <v-list-item-icon class="profile__camera grey rounded-circle pa-1">
        <v-icon class="white--text">mdi-camera</v-icon>
      </v-list-item-icon>
    </div>

    <v-text-field
      dense
      label="Name"
      type="text"
      outlined
      color="#28190E"
      v-model="user_data.nama"
    ></v-text-field>

    <div class="profile__second white py-8 px-5 pb-8 rounded-lg">
      <v-text-field
        dense
        label="Email Address"
        type="email"
        outlined
        color="#28190E"
        readonly
        v-model="currentUser.email"
      ></v-text-field>

      <v-select
        dense
        label="Gender"
        outlined
        color="#28190E"
        item-color="#28190E"
        :items="genders"
        v-model="user_data.gender"
      ></v-select>

      <v-text-field
        v-if="userProfile.role == 'user' || userProfile.role == 'writer'"
        dense
        label="Date-of-Birth"
        type="date"
        outlined
        v-model="user_data.tanggal_lahir"
        color="#28190E"
      ></v-text-field>

      <v-text-field
        v-if="userProfile.role == 'nutritionist'"
        dense
        label="Hospital"
        type="text"
        v-model="user_data.rumah_sakit"
        outlined
        color="#28190E"
      ></v-text-field>

      <v-text-field
        dense
        label="Change Password"
        type="password"
        outlined
        v-model="password"
        color="#28190E"
      ></v-text-field>

      <v-text-field
        dense
        label="Retype Password"
        type="password"
        outlined
        v-model="retype"
        color="#28190E"
      ></v-text-field>
      <div class="button-wrapper text-center">
        <Button text="Save Changes" @click.native="saveChanges" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import firebase from "../firebase";
import Button from "../components/Button";

export default {
  computed: {
    ...mapState(["userProfile", "currentUser"])
  },
  components: {
    Button
  },
  data() {
    return {
      user_data: [],
      password: "",
      retype: "",
      genders: ["Male", "Female"]
    };
  },
  async created() {
    this.user_data = this.userProfile;
    if (this.userProfile.role == "user" || this.userProfile.role == "writer") {
      this.user_data.tanggal_lahir = await this.formatDate(
        this.user_data.tanggal_lahir.seconds
      );
    }
  },
  methods: {
    async formatDate(timestamp) {
      let date = new Date(timestamp * 1000);
      let month = date.getMonth() + 1;
      let year = date.getFullYear();
      date = date.getDate();
      if (date < 10) {
        date = 0 + date.toString();
      }
      return year + "-" + month + "-" + date;
    },
    async saveChanges() {
      if (
        this.user_data.nama == "" ||
        this.user_data.gender == "" ||
        this.user_data.tanggal_lahir == ""
      ) {
        alert("Input tidak boleh kosong");
        return;
      } else {
        try {
          if (
            this.userProfile.role == "user" ||
            this.userProfile.role == "writer"
          ) {
            this.user_data.tanggal_lahir = new Date(
              this.user_data.tanggal_lahir
            );
          }
          await firebase.db
            .collection("users")
            .doc(this.currentUser.uid)
            .update(this.user_data);
        } catch (error) {
          console.error(error);
        }
      }
      if (this.password != "") {
        if (this.password == this.retype) {
          if (this.password.length >= 6 && this.password.length <= 20) {
            try {
              await firebase.auth.currentUser.updatePassword(this.password);
            } catch (error) {
              alert(
                "Pengubahan password gagal, harap lakukan relogin terlebih dahulu"
              );
              console.error(error);
              return;
            }
          } else {
            alert("Panjang password harus di antara 6 hingga 20 karakter");
            return;
          }
        } else {
          alert("Password baru dan Retype Password harus sama");
          return;
        }
      }
      await this.$store.dispatch("fetchUserProfile");
      this.$router.push("/" + this.userProfile.role);
    }
  }
};
</script>

<style scoped>
.profile__image {
  position: relative;
  width: fit-content;
}

.profile__camera {
  position: absolute;
  bottom: 0;
  right: 5%;
}

.profile__second {
  border: 2px solid #000;
  box-shadow: 2px 4px 30px rgba(0, 0, 0, 0.1);
  width: 80%;
  margin-bottom: 30px;
}
</style>
