"use strict";
Vue.config.devtools = true;

const app = new Vue({
    router,
    store,
    el: "#app",
    created: function() {
        this.$store.dispatch('initMemoList');
    }
});
