<template>
    
    <v-container>
        <Welcome :user="user" />

        <div class="mt-10 text-center">
            <p class="font-weight-bold mb-0">It's time to look at your daily calorie intake!</p>
            <p class="font-weight-bold">Does it show good progress? Let's check it!</p>
            <small>* 1 to 7 days</small>

            <div class="d-flex align-center mt-8">
                <p class="mx-5">from</p>
                <v-text-field
                    dense
                    label="From"
                    :type="'date'"
                    outlined
                    color="#28190E"
                    v-model="date.from"
                ></v-text-field>
                <p class="mx-5">to</p>
                <v-text-field
                    dense
                    label="From"
                    :type="'date'"
                    outlined
                    color="#28190E"
                    v-model="date.to"
                ></v-text-field>
            </div>


        </div>
    </v-container>

</template>

<script>
import firebase from "../../firebase";
import { mapState } from "vuex";
import { Line } from 'vue-chartjs'
import Welcome from "../components/Welcome";

export default {
    extends: Line,
    mounted () {
        this.renderChart([5, 6, 10])
    },
    components: {
        Welcome,
    },
    data() {
        return {
            user: {
                nama: "John"
            },
            date: {
                from: '',
                to: ''
            }
        }
    }
}
</script>