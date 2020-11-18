<template>
  <div class="add-content">
    <input type="text" placeholder="judul" v-model="form_konten.judul" />
    <input type="text" placeholder="isi" v-model="form_konten.isi" />
    <input type="file" @change="handleFileChange" />
    <button @click="addContent">Add</button>
  </div>
</template>

<script>
import firebase from "../firebase";
import { mapState } from "vuex";

export default {
  data() {
    return {
      form_konten: {
        judul: "",
        isi: "",
        foto: ""
      }
    };
  },
  methods: {
    handleFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) {
        return;
      }
      if (!files[0].type.includes("image")) {
        this.form_konten.foto = "";
      } else {
        this.form_konten.foto = files[0];
      }
    },
    async addContent() {
      let contentData = {
        judul: this.form_konten.judul,
        isi: this.form_konten.isi,
        writer: firebase.db.collection("users").doc(this.currentUser.uid),
        status: "proofreading",
        tanggal_diposting: firebase.timestamp
      };
      let doc;
      try {
        doc = await firebase.db.collection("contents").add(contentData);
      } catch (error) {
        console.error(error);
      }
      if (doc.id) {
        try {
          let ref = await firebase.storage
            .ref()
            .child(
              "/contents/" +
                doc.id +
                "." +
                this.form_konten.foto.type.split("/")[1]
            );
          let task = await ref.put(this.form_konten.foto);
          let url = await task.ref.getDownloadURL();
          if (url) {
            try {
              await firebase.db
                .collection("contents")
                .doc(doc.id)
                .update({ foto: url });
            } catch (error) {
              console.error(error);
            }
            this.$router.push("/writer");
          }
        } catch (error) {
          console.error(error);
        }
      }
    }
  },
  computed: {
    ...mapState(["currentUser", "userProfile"])
  }
};
</script>

<style></style>
