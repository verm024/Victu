<template>
  <div
    class="d-flex justify-space-between align-center white pa-5 rounded-xl mt-15 mb-8"
  >
    <div>
      <h3 class="text-h5 text-sm-h3 mb-2">
        Welcome,
        <strong>{{
          userProfile.role == "nutritionist"
            ? userProfile.nama.split(" ")[0] +
              " " +
              userProfile.nama.split(" ")[1]
            : userProfile.nama.split(" ")[0]
        }}</strong>
      </h3>
      <p v-if="userProfile.role == 'user'" class="gray--text">
        {{ Math.ceil(kalori_hari.total_kalori) }} calories today
      </p>
      <p v-else class="gray--text">How's your day?</p>
    </div>
    <img src="@/assets/images/user.png" alt="" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import firebase from "../firebase";

export default {
  data() {
    return {
      kalori_hari: {
        total_kalori: 0
      }
    };
  },
  props: ["user"],
  computed: {
    ...mapState(["userProfile", "currentUser"])
  },
  async created() {
    let today = new Date(firebase.timestamp.seconds * 1000);
    today.setHours(0, 0, 1, 0);
    today = today / 1000;
    let doc = await firebase.db
      .collection("users")
      .doc(this.currentUser.uid)
      .collection("calorie")
      .where("tanggal_input", "==", today)
      .get();
    if (doc.empty) {
      this.kalori_hari.total_kalori = 0;
    } else {
      this.$bind(
        "kalori_hari",
        firebase.db
          .collection("users")
          .doc(this.currentUser.uid)
          .collection("calorie")
          .doc(doc.docs[0].id)
      );
    }
  }
};
</script>
