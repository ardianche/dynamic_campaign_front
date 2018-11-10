<style lang="scss" scoped>

input,textarea{
    padding:8px;
    border-radius: 2px;
    border:1px solid lightgray;
    background-color:white;
}

textarea{
        font-family: 'Raleway', sans-serif;
    padding: unset;
    min-height: 33px;
    max-height:150px;
    min-width: 461px;
    max-width:461px;
}

.layout{
    display:flex;
    align-items:center;
    justify-content: center;
    width:100%;
    .campaign_name{
        display:flex;
        flex-direction:column;
        background-color: white;
        padding:20px 40px;
        box-shadow: 0px 0px 20px;
        .campaign_details{
            display:flex;
            flex-direction:column;
            margin-bottom: 25px;
        }
        div{
            display:flex;
            justify-content:space-between;
            flex-direction: column;
            div{
                display:flex;
            }
            div:not(:last-child){
                margin-right:20px;
            }
        }
        .button{
            display:unset;
            margin-top:25px;
            text-align: right;
        }
    }
}
</style>

<template>
    <div class="layout">
        <div class="campaign_name">
            <div class="campaign_details" style="border-bottom: 1px solid lightgray;padding: 14px;">    
                <span style="font-weight:600;">Campaign Details</span>
            </div>
            <div class="campaign_details">
                
                <span>Name your campaign below:</span>
                <input type="text" v-model="name">
            </div>
            <div class="campaign_details">
                <span>Give a description about the campaign</span>
                <textarea v-model="description"></textarea>
            </div>
            <div>
                <span>Dates</span>
                <div style="display:flex;width:100%;">
                    <el-date-picker style="flex-direction:unset !important; padding:0px 10px;"
                        v-model="date"
                        type="daterange"
                        align="right"
                        start-placeholder="Start Date"
                        end-placeholder="End Date"
                        :default-value="new Date()"
                        format="yyyy/MM/dd"
                        value-format="yyyy/MM/dd">
                    </el-date-picker>
                </div>
            </div>
            <div class="button">
                <el-button @click="add_campaign()" class="eli_button" v-if="!edit">
                    Add Campaign
                </el-button>
                <el-button @click="edit_campaign()" class="eli_button" v-if="edit">
                    Edit Campaign
                </el-button>
            </div>
        </div>
    </div>
</template>
<script>
    import {EventBus} from '../common/eventBus';
    import { ElDatePicker,ElButton } from 'element-ui';
    import 'element-ui/lib/theme-chalk/index.css'
    import input from '@/components/common/inputboxes.vue';
    export default{
        props:['campaign'],
        data:()=>{
            return{
                date:[],
                name:null,
                description:null,
                edit:false,
            }
        },
        mounted(){
            if(!!this.campaign){
                this.date[0] = this.campaign.start_date;
                this.date[1] = this.campaign.end_date;
                this.name = this.campaign.title;
                this.description = this.campaign.description;
                this.edit = true;
            }
        },
        components:{
            inputs: input,
            //datepicker: ElDatePicker,
        },
        computed:{
            start_date(){
                return this.date[0];
            },
            end_date(){
                return this.date[1];
            },
        },
        methods:{
            add_campaign(){
                let payload = {
                    title: this.name,
                    description: this.description,
                    start_date: this.start_date, 
                    end_date: this.end_date,
                }
                
                let url = `http://localhost:5000/campaigns/add`;
                this.$http.post(url,payload).then(result=>{
                    this.$store.dispatch('getCampaigns');
                    EventBus.$emit('edit',false);
                    this.$destroy();
                });
            },
            edit_campaign(){
                EventBus.$emit('edit',false);
                this.$destroy();
            },
        }
    }
</script>
