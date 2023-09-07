import Vue from 'vue';
import App from './App.vue';
import store from './store';
import router from './router';
import VueAMap from 'vue-amap';
import vuetify from './plugins/vuetify';
import i18n from './plugins/i18n'; //i18n是 Internationalization的简写
import VCharts from 'v-charts';
import VueApexCharts from 'vue-apexcharts';
import '../src/styles/index.scss';
import '@/permission'; // 权限控制

// 阿里icon
import './static/iconfont.css';

// 按需引入全局消息弹框
import 'element-ui/lib/theme-chalk/index.css';
import '@/element/index';

import DatePicker from 'element-ui';
Vue.use(DatePicker);

Vue.use(VCharts);
Vue.use(VueAMap);
Vue.use(VueApexCharts);

Vue.component('apexchart', VueApexCharts);

VueAMap.initAMapApiLoader({
    key: '527a03c5d37f26c924d83b3c68f9ac5c',
    mapStyle: 'amap://styles/3822977fb93c74793f501b1f6cc7bf9b',
    plugin: ['MarkerClusterer', 'AMap.ControlBar']
});

Vue.config.productionTip = false;
new Vue({
    router,
    i18n,
    store,
    vuetify,
    render: h => h(App)
}).$mount('#app');
