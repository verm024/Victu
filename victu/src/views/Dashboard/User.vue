<template>
  <!-- <div class="user d-flex align-center flex-column">
    
  </div> -->
  <v-container>
    <div class="d-flex justify-space-between align-center white pa-5 rounded-xl mt-5">
      <div>
        <h3 class="text-h4 text-sm-h3 mb-2">Welcome, <strong>John</strong></h3>
        <p class="gray--text">1029 calories today</p>
      </div>
      <img src="@/assets/images/user.png" alt="">
    </div>

    <div class="mt-10">
      <SectionHeader header="What do you want to do?" />
      <v-row class="features-row mb-3">
        <Feature v-for="(feature, i) in features" :key="i" :feature="feature" />
      </v-row>
    </div>

  </v-container>
</template>

<script>
import SectionHeader from '../../components/SectionHeader'
import Feature from '../../components/Feature'
export default {
  components: {
    SectionHeader,
    Feature
  },
  data() {
    return {
      features: [
        {
          feature: 'Check Calorie',
          src: 'feature1.png'
        },
        {
          feature: 'Healthy Contents',
          src: 'feature3.png'
        },
        {
          feature: '1-on-1 Consultation',
          src: 'feature4.png'
        },
        {
          feature: 'Plot Daily Calorie',
          src: 'feature2.png'
        }
      ]
    }
  }
}
</script>

<style scoped>
.user {
  min-height: 100vh;
  margin: 0;
}

.logo {
  margin-bottom: 40px;
}

.logo img {
  width: 150px;
}

.profile {
  background: #f9edee;
}

.profile-title {
  font-family: Roboto;
  font-size: 14px;
  color: #28190e;
  padding: 0 8px;
  margin-bottom: 3px;
}

.profile-right-title {
  font-family: Roboto;
  font-size: 14px;
  color: #b5adad;
  padding: 0 8px;
}

.profile-right-content {
  font-family: Roboto;
  font-size: 14px;
  color: #28190e;
  padding: 0 8px;
  margin-bottom: 3px;
}

.card-title {
  font-family: Roboto;
  font-size: 14px;
  color: #28190e;
  padding: 0 8px;
  margin-bottom: 3px;
  margin-top: 3px;
}

.card-subtitle {
  font-family: Roboto;
  font-size: 12px;
  color: #28190e;
  padding: 0 8px;
  margin-bottom: 3px;
  margin-top: 3px;
}
</style>
