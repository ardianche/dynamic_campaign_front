// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Vuex from 'vuex';
import Axios from 'Axios';
import ElementUi from 'element-ui';
import locale from 'element-ui/lib/locale/lang/en'
Vue.use(ElementUi,{locale});

Vue.config.productionTip = false
console.log('HEADERS: ',Axios.defaults);
Axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
Axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*';
console.log("AXIOS: ",Axios.defaults.headers);
Vue.$http = Axios;
Object.defineProperty(Vue.prototype, '$http', {
	get() {
		return Axios;
	},
});


/* eslint-disable no-new */
new Vue({
  store,
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
