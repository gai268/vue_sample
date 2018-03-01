"use strict";

Vue.use(Vuex)
const store = new Vuex.Store({
    modules: {
        memo: memoStore
    }
})