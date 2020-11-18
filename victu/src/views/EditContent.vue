<template>
  <div class="edit-content">
    Edit content
    <input type="text" placeholder="judul" v-model="form_konten.judul" />
    <input type="text" placeholder="isi" v-model="form_konten.isi" />
    <input type="file" @change="handleFileChange" />
    <button @click="updateContent">Add</button>
  </div>  
</template>

<script>
import firebase from "../firebase";
import { mapState } from "vuex";
import store from "../store"

export default {
  data() {
    return {
      form_konten: {
        judul: "",
        isi: "",
        foto: "",
        new_foto: ""
      }
    }
  },
  computed: {
    ...mapState(["currentUser", "userProfile"])
  },
  methods: {
    handleFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) {
        return;
      }
      if (!files[0].type.includes("image")) {
        this.form_konten.new_foto = "";
      } else {
        this.form_konten.new_foto = files[0];
      }
    },
    async updateContent() {
      let contentData = {
        judul: this.form_konten.judul,
        isi: this.form_konten.isi,
        writer: firebase.db.collection("users").doc(this.currentUser.uid),
        status: "proofreading",
        tanggal_diposting: firebase.timestamp
      };
      try {
        await firebase.db.collection("contents").doc(this.$route.params.id).update(contentData);
      } catch (error) {
        console.error(error);
      }
      if (this.$route.params.id) {
        if (this.form_konten.new_foto != "") {
          try {
            let ref = await firebase.storage
              .ref()
              .child(
                "/contents/" +
                  this.$route.params.id +
                  "." +
                  this.form_konten.new_foto.type.split("/")[1]
              );
            let task = await ref.put(this.form_konten.new_foto);
            let url = await task.ref.getDownloadURL();
            if (url) {
              try {
                await firebase.db
                  .collection("contents")
                  .doc(this.$route.params.id)
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
        else {
          this.$router.push("/writer");
        }
      }
    }
  },
  async created() {
    let doc
    try {
      doc = await firebase.db.collection("contents").doc(this.$route.params.id).get()
      let data = doc.data()
      this.form_konten = data
      this.form_konten.new_foto = ""
    } catch (error) {
      console.error(error)
    }
  },
  async beforeRouteEnter(to, from, next) {
    let doc = await firebase.db
      .collection("contents")
      .doc(to.params.id)
      .get();
    if (doc.exists) {
      let data = doc.data();
      if (data.writer.id == store.state.currentUser.uid) {
        if(data.status == "proofreading") {
          next()
        }
        else {
          next("/writer")
        }
      } else {
        next("/writer");
      }
    } else {
      next("/writer");
    }
  },
}
</script>

<style>

</style>