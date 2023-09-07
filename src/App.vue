<template>
    <v-app>
        <router-view />
    </v-app>
</template>
<script>
export default {
    updated() {
        const dom = document.getElementById('loading');
        if (dom) {
            dom.remove();
        }
    },
    created() {
        // console.log(process.env);
    }
};
</script>

<style>
    @import url(./assets/download/font_2326140_co4jnpl8gxw/iconfont.css);
</style>