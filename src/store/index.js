import Vue from 'vue';
import Vuex from 'vuex';
import app from './modules/app';
import permission from './modules/permission'
import user from './modules/user';
import auth from './modules/auth';
import getters from './getters';
Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        app,
        auth,
        user,
        permission
    },
    getters
});
export default store;
