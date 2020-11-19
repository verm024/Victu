<template>
  <div class="home container d-flex align-center justify-center flex-column">
    <div class="logo">
      <img src="@/assets/images/logo.png" alt="Victu" />
    </div>
    <div class="features">
      <v-row class="features-row mb-3">
        <v-col class="features-card mr-3">
          <div class="features-image">
            <img src="@/assets/images/feature1.png" alt="" />
          </div>
          <div class="features-title">
            Check Food <br />
            Calorie
          </div>
        </v-col>
        <v-col class="features-card ml-3">
          <div class="features-image">
            <img src="@/assets/images/feature2.png" alt="" />
          </div>
          <div class="features-title">
            Plot Daily <br />
            Calorie
          </div>
        </v-col>
      </v-row>
      <v-row class="features-row mt-6">
        <v-col class="features-card mr-3">
          <div class="features-image">
            <img src="@/assets/images/feature3.png" alt="" />
          </div>
          <div class="features-title">
            Healthy <br />
            Contents
          </div>
        </v-col>
        <v-col class="features-card ml-3">
          <div class="features-image">
            <img src="@/assets/images/feature4.png" alt="" />
          </div>
          <div class="features-title">
            1-on-1 <br />
            Consultation
          </div>
        </v-col>
      </v-row>
    </div>
    <div class="button">
      <router-link to="/login">
        <button>Getting Started</button>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home"
};
</script>

<style scoped>
.home {
  height: 100vh;
}

.logo {
  margin-bottom: 20px;
}

.logo img {
  width: 250px;
}

.features {
  padding: 16px;
}

.features-card {
  background: #ffffff;
  box-shadow: 2px 4px 30px rgba(247, 181, 22, 0.1);
  border-radius: 20px;
  padding: 20px 0;
  width: 180px;
  text-align: center;
}

.features-title {
  font-family: Nunito;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  color: #daa526;
  margin-top: 10px;
}

.button {
  margin-top: 20px;
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
