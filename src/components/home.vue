<template>
<div class="layout">
  <div class="header">
    <span>
      Ipko Campaigns
    </span>
    <img src="@/assets/ipko.png" alt="">
    <span>
      Log out
    </span>
  </div>
  <div class="content">
    <div class="content_section">
      <keep-alive>
        <list-campaigns @conditions="open_conditions()" :campaigns="campaigns" v-if="!show_modal && !view_details"></list-campaigns>
        <initial-component v-if="show_modal" :campaign="curr_campaign"></initial-component>
        <conditions :campaign="curr_campaign" v-if="view_details && !operations"></conditions>
        <operations v-if="operations"></operations>
      </keep-alive>
      <div v-if="!show_modal && !view_details">
        <el-button style="background-color:white;border-color:black;border:1px solid;margin-top:25px;" @click="change();">
          Add New Campaign
        </el-button>
      </div>
    </div>
  </div>
  <div class="footer">
    Copyright ipko @ 2018
  </div>
</div>
</template>

<script>
import {EventBus} from './common/eventBus';
import {ElButton} from 'element-ui';
import initialComponent from '@/components/dynamic_components/initial_data.vue';
import secondComponent from '@/components/dynamic_components/second_step.vue';
import listCampaigns from '@/components/dynamic_components/campaigns.vue';
import operations from '@/components/operations/operations.vue';
import conditions from '@/views/conditions.vue';
export default {
  name: 'Home',
  data () {
    return {
      add:false,
      show_modal:false,
      curr_campaign:null,
      view_details:false,
      operations:false,
    }
  },
  mounted(){
    let payload = {
      key:'first_screen',
      value : true,
    };
    this.$store.dispatch('getCampaigns');
    this.$store.commit('SET_CURRENT_STEP',payload);
    console.log('Steps',this.$store.state.steps);
    EventBus.$on('campaign',campaign => {
      this.curr_campaign = campaign;
    });
    EventBus.$on('edit',state=>{
      if(state && state.hasOwnProperty('title')) {
        this.show_modal = !this.show_modal; 
      this.curr_campaign = state;
      }
      else {
        this.show_modal = false;
      }
    });
    EventBus.$on('operations',()=>{
      console.log('Po hin');
      this.operations = !this.operations;
    });
  },
  components:{
    initialComponent: initialComponent,
    secondComponent,
    listCampaigns,
    conditions,
    operations,
  },
  computed:{
    campaigns(){
      return this.$store.state.campaigns;
    },
    current_campaign(){
      return this.$store.state.current_campaign;
    },
    current_step(){
      let current_step = null;
      
      for(var key in this.$store.state.steps){
         if(key.active){
            current_step = key;
          } 
      }
      return current_step;
    },
    change(){
      this.show_modal = !this.show_modal;
    },
    open_conditions(){
      this.view_details = !this.view_details;
    },
  },
}
</script>
<style>
html,body{
  height:100%;
  margin:0;
  padding:0;
}
h1, h2 {
  font-weight: normal;
}
button{
    padding: 10px;
    border: 1px solid black;
    border-radius: 5px;
    color: #dc1921;
    background-color: white;
    margin-top: 25px;
    font-weight: 700;
}
button:hover{
  border-color:black;
  transform: scale(1.03);
  background-color:#dc1921;
  color:white;
  cursor:pointer;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
