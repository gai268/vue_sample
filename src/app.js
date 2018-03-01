"use strict";
Vue.config.devtools = true;

const app = new Vue({
    router,
    store,
    el: "#app",
    render: h => h(App),
    created: function() {
        this.$store.dispatch('initMemoList');
    }
});
