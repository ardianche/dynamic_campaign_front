import Vue from 'vue';
export default{
    getCampaigns({commit}){
        Vue.$http.get('http://localhost:5000/campaigns/').then(res =>{
            commit('SET_ALL_CAMPAIGNS',res.data);
        });
    },
    getConditions({commit},payload){
        console.log("{A:ASD:A : ",payload );
        Vue.$http.get(`http://localhost:5000/conditions/?id=${payload.id}`).then(res => {
            commit('SET_CONDITIONS',res.data);
        })
    },
}