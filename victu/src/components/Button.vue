<template>
    <button class="button white--text pa-5 rounded-lg">{{text}}</button>
</template>

<script>
export default {
    props: ['text']
}
</script>

<style scoped>
    .button {
        font-weight: bold;
        background-color: #F7B516;
    }
</style>