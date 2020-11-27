<template>
  <div class="add-content container">
    <v-text-field
      dense
      label="Title"
      type="text"
      outlined
      color="#28190E"
      v-model="form_konten.judul"
    ></v-text-field>
    <v-textarea
      dense
      label="Content"
      type="text"
      outlined
      color="#28190E"
      v-model="form_konten.isi"
    ></v-textarea>
    <input type="file" @change="handleFileChange" />
    <br />
    <div class="button">
      <button @click="addContent">Create Content</button>
    </div>
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
        alert("Tipe file harus berupa gambar");
        this.form_konten.foto = "";
      } else {
        this.form_konten.foto = files[0];
      }
    },
    async addContent() {
      if (
        this.form_konten.judul == "" ||
        this.form_konten.isi == "" ||
        this.form_konten.foto == ""
      ) {
        alert("Form tidak boleh kosong");
      } else {
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
    }
  },
  computed: {
    ...mapState(["currentUser", "userProfile"])
  }
};
</script>

<style scoped>
.add-content {
  margin-top: 60px;
}

.button {
  margin-top: 40px;
  width: 100%;
  text-align: center;
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
</style>

<style>
.add-content {
  margin-top: 20px;
}
</style>
