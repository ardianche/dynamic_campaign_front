import Vue from 'vue';
import Vuex from 'vuex';
import state from './state';
import steps from './steps';
import actions from './actions';
import mutations from './mutations';
import createLogger from 'vuex/dist/logger';
Vue.use(Vuex);
const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
	actions,
	
	mutations,
	state,
	strict: debug,
	plugins: debug ? [createLogger()] : [],
});