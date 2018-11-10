import Vue from 'vue';

export default{
    SET_CURRENT_STEP(state,payload){
        console.log('PAYLOAD: ',payload);
        Vue.set(state.steps[`${payload.key}`],'active',payload.value,);
    },
    SET_ALL_CAMPAIGNS(state,payload){
        Vue.set(state,'campaigns',payload);
    },
    SET_CURRENT_CAMPAIGN(state,payload){
        Vue.set(state,'current_campaign',payload);
    },
    SET_NAME(state,payload){
        Vue.set(state.new_campaign,'name',payload);
    },
    SET_CONDITIONS(state,payload){
        Vue.set(state,'conditions',payload);
    },
    SET_TABLE_INFO(state,payload){
        Vue.set(state,'tables',payload);
    }
}