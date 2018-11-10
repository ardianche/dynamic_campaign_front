<template>
    <div class="wrapper">
        <div style="border-bottom:1px solid lightgray; padding:20px;align-items:center;display:flex;justify-content:space-between;">
        <h2 >List of parameters for : <b>{{campaign.title}}</b></h2>
        <button @click="go_to()">Go to Operations</button>
        </div>
        <parameters :conditions_array="conditions_array"></parameters>
        <div class="conditions">
            <div class="condition_row" v-for="($index,cond) in conditions">
                <div>
                    <span>Name</span>
                    <el-input
                        size="small"
                        v-model="condition.name">
                    </el-input>
                </div>
                <div>
                    <span>Variable Type</span>
                    <el-select v-model="condition.type">
                        <el-option value="String">String</el-option>
                        <el-option value="Integer">Integer</el-option>
                        <el-option value="Float">Float</el-option>
                        <el-option value="Boolean">Boolean</el-option>
                        <el-option value="Char">Char</el-option>
                    </el-select>
                </div>
                <div>
                    <span>Default Value</span>
                    <el-input
                        size="small"
                        v-model="condition.default_value">
                    </el-input>
                </div>
                <div>
                    <span>Visibility</span>
                     <el-select v-model="condition.visibility">
                        <el-option value="IN">IN</el-option>
                        <el-option value="OUT">OUT</el-option>
                        <el-option value="IN/OUT">IN/OUT</el-option>
                    </el-select>
                </div>
                <div>
                    <span>Effective Date</span>
                    <el-date-picker style="flex-direction:unset !important;"
                        v-model="condition.effective_date"

                        :default-value="new Date()"
                        format="yyyy/MM/dd"
                        value-format="yyyy/MM/dd">
                    </el-date-picker>
                </div>
            </div>
        </div>
        <add class="add" @click="add_condition(condition)"></add>
    </div>
</template>

<script>
import {EventBus} from '@/components/common/eventBus';
import { PlusCircleIcon } from 'vue-feather-icons'
import{ElInput,ElDropdown,ElSelect} from 'element-ui';
import parameters from '@/components/parameters.vue';
export default {
    props:['campaign'],
    data:()=>{
        return{
            condition:{
                name:null,
                type:null,
                default_value: null,
                visibility:null,
                effective_date:null,
            },
            conditions:[
            ],
        }
    },
    mounted(){
        let payload = {
            id: this.campaign.ID,
        };
        this.$store.dispatch('getConditions',payload);
        let condition = null;
        if(!!this.$store.state.conditions){
            condition = this.$store.state.conditions;
        } 
        if(this.conditions.length === 0){
        this.conditions.push(condition);
        }
    },
    components:{
        add: PlusCircleIcon,
        parameters,
    },
    computed:{
        conditions_array(){
            return this.$store.state.conditions;
        }
    },
    methods:{
        add_condition(new_condition){
            this.condition = {
                name:null,
                type:null,
                effective_date:null,
                default_value:null,
                visibility:null,
            };
            // this.conditions.push(new_condition);
            let url = 'http://localhost:5000/conditions/add';
            new_condition.campaign_ref = this.campaign.ID;
            let payload = {
                id: new_condition.campaign_ref,
            };
            console.log('NEW : ',new_condition);
            this.$http.post(url,new_condition).then(res=>{
                this.$store.dispatch('getConditions',payload);
            });
        },
        go_to(){
            this.$store.commit('SET_CURRENT_CAMPAIGN',this.campaign);
            EventBus.$emit('operations');
        },
    }
}
</script>

<style lang="scss" scoped>
.add:hover{
    transform:scale(1.1);
    cursor:pointer;
    transition: ease-in 1s;
    color:#dc1921;
}
    .conditions{
        padding:28px;
        min-width: 720px;
    }
    .condition_row{
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        padding: 11px;
        border-radius: 3px;
        border:1px solid lightgray;
        div{
            display:flex;
            flex-direction: column;
            align-self: flex-end;
            input{
                max-width:100px;
            }
            span{
                text-align:left;
                margin-bottom:10px;
            }
        }
    }

</style>
