<template>
    <div class="wrapper">
        <h2 style="text-align:left;margin-bottom:25px;">List of current <b>campaigns</b> :</h2>
        <table class="bottomBorder" v-if="campaigns.length > 0">
            <th>Title</th> <th>Description</th> <th>Start Date</th>
             <th style="">End Date</th>
             <th style="">Created Date</th>
             <th>Conditions</th>
            <tr v-for="(campaign,$index) in campaigns">
                <td>{{campaign.title}}</td>
                <td>{{campaign.description}}</td>
                <td  @mouseover="change_status($index, true)" @mouseleave="change_status($index,false)">{{$index !== curr_index ? format_date(campaign.start_date) : ''}} 
                    <div class="icons" v-if="show_options && $index === curr_index" @click="open_modal(campaign,'edit')">
                       <span style="font-weight:700;">Edit</span> <edit style="height:15px;"></edit>
                    </div>
                </td>
                <td @mouseover="change_status($index, true)" @mouseleave="change_status($index,false)">{{$index !== curr_index ? format_date(campaign.end_date) : ' '}}
                    <div class="icons" v-if="show_options && $index === curr_index" @click="open_modal(campaign,'read')">
                        <span style="font-weight:700;">More</span> <more style="height:15px;"></more>
                    </div>
                </td>
                <td  @mouseover="change_status($index, true)" @mouseleave="change_status($index,false)">{{$index !== curr_index ? format_date(campaign.created_date) : ' '}}
                    <div class="icons" v-if="show_options && $index === curr_index" @click="remove(campaign.ID)">
                        <span style="font-weight:700;">Remove</span> <remove style="height:15px;"></remove>
                    </div>
                </td>
                <td>
                    <el-button @click="open_conditions(campaign)" style="background-color:white;border-color:black;border:1px solid;">View Conditions</el-button>
                </td>
            </tr>
        </table>
    </div>
</template>

<script>
import moment from 'moment';
import {EventBus} from '../common/eventBus';
import {EditIcon,MoreVerticalIcon,XCircleIcon} from 'vue-feather-icons';
import {ElButton} from 'element-ui';
export default {
    props:['campaigns'],
    data:()=>{
        return{
            show_options:false,
            curr_index:null,
        }
    },
    components:{
        edit: EditIcon,
        more: MoreVerticalIcon,
        remove:XCircleIcon,
    },
    computed:{

    },
    methods:{
        format_date(date){
            return moment(date,"YYYY-MM-DDTHH:mm:ss.SSSZ").format('ddd DD, MMM YYYY');
        },
        change_status(index,condition){
            if(!condition){
                this.curr_index = null;
            }
            else{
                this.curr_index = index;
                this.show_options = condition;
            }
        },
        open_modal(campaign,activity){

            if(activity === 'edit'){
                EventBus.$emit('edit',campaign);
            }
        },
        remove(ident){
            let payload = {
                id: ident,
            }
            let url = `http://localhost:5000/campaigns/remove`;
            this.$http.post(url,payload).then(result=>{
                this.$store.dispatch('getCampaigns');
            });
        },
        open_conditions(campaign){
            console.log('PO HIN');
            EventBus.$emit('campaign',campaign);
            this.$emit('conditions',campaign);
        },
    }
}
</script>

<style lang="scss" scoped>
  table.bottomBorder { 
    border-collapse: collapse; 
  }
  table.bottomBorder td, 
  table.bottomBorder th { 
    border-bottom: 1px solid #dc1921; 
    padding: 10px; 
    text-align: left;
  }
table{
        border-radius:3px;
        padding: 29px;
        th{
            border-bottom:1px solid black;
        }
        tr{
            max-height:10px;
            td{
    min-width: 169px;
    max-width: 190px;
        }
        }
        tr:hover{
            cursor:pointer;

        }
}
.icons{
    display: flex;
    justify-content: center;
    align-items: center;
  transition-timing-function: ease-in;
  transition: 0.2s;
    svg{
        font-weight:700;
    }
    svg:hover{
        transform:scale(1.1);
        color:red;
    }
}
.wrapper{
    min-width:400px;
    background-color:white;
    .row{
        padding:10px;
        display:flex;
        background-color:lightgray;
    }
}
</style>

