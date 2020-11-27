<template>
    <div class="container pt-16 d-flex flex-column align-center justify-center pb-16">
        <div class="profile__image rounded-circle mb-5">
            <img
            src="@/assets/images/profile.png"
            width="150px"
            height="150px"
            />
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
        ></v-text-field>

        <div class="profile__second white pa-5 rounded-lg">
            <v-text-field
                dense
                label="Email Address"
                type="email"
                outlined
                color="#28190E"
            ></v-text-field>

            <v-text-field
                dense
                label="Gender"
                type="text"
                outlined
                color="#28190E"
            ></v-text-field>

            <v-text-field
                v-if="userProfile.role == 'user' || userProfile.role == 'writer'"
                dense
                label="Date-of-Birth"
                type="date"
                outlined
                color="#28190E"
            ></v-text-field>

            <v-text-field
                v-if="userProfile.role == 'nutritionist'"
                dense
                label="Hospital"
                type="text"
                outlined
                color="#28190E"
            ></v-text-field>

            <v-text-field
                dense
                label="Change Password"
                type="password"
                outlined
                color="#28190E"
            ></v-text-field>

            <v-text-field
                dense
                label="Retype Password"
                type="password"
                outlined
                color="#28190E"
            ></v-text-field>
        </div>

    </div>

</template>

<script>
import { mapState } from "vuex";
export default {
    computed: {
        ...mapState(["userProfile", "currentUser"])
    },
}
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
    box-shadow: 0 3px 8px rgba(0, 0, 0, .5);
}
</style>