<template>
    <div class="conditions">
            <div class="condition_row" :id="$index" v-for="(con,$index) in conditions_array">
                <div>
                    <span>
                        Name 
                    </span>
                    <el-input size="small" :placeholder="con.name" :disabled="true">
                    </el-input>
                </div>
                <div>
                    <span>Variable Type</span>
                    <el-select :value="con.type" :disabled="true">
                        <el-option :value="con.type">{{con.type}}</el-option>
                    </el-select>
                </div>
                <div>
                <span>Default Value</span>
                    <el-input :disabled="true"
                        size="small"
                        :placeholder="con.default_value">
                    </el-input>
                </div>
                <div>
                    <span>Visibility</span>
                     <el-select :value="con.visibility" :disabled="true">
                    </el-select>
                </div>
                <div>
                    <span>Effective Date</span>
                    <el-date-picker style="flex-direction:unset !important;"
                        :value="con.effective_date"
                        format="yyyy/MM/dd"
                        value-format="yyyy/MM/dd"
                        :disabled="true">
                    </el-date-picker>
                </div>
            </div>
            <div class="buttons">
                <button v-for="button in button_array" @click="addButton(button)">{{button}}</button>
            </div>
            <div class="select">
                <textarea v-model="select_statement" name="" id="" cols="30" rows="10"></textarea>
            </div>
    </div>
</template>
<script>
    export default{
        mounted(){
            this.retrieveTables();
        },
        computed:{
            listOfTables(){
                return this.$store.state.tables;
            }
        },
        props:['conditions_array'],
        data:()=>{
            return{
                active_index:null,
                button_array:['SELECT','*','FROM','DELETE','UPDATE','SET','JOIN','ON','AND','WHERE'],
                tables:[{
                    name:'Campaign',
                    value:'pwg_campaign',
                },]
                select_statement:'',
            }
        },
        methods:{
            do_something(id){
                console.log('ID ',id);
                if(this.active_index === null){
                    this.active_index = id;
                }
            },
            addButton(keyword){
                if(this.select_statement.includes(keyword)){
                    return;
                }
                if(this.select_statement){
                    this.select_statement += ' ' + keyword + ' ';
                }else{
                    this.select_statement +=keyword;
                }
            },
            retrieveTables(){
                let url = 'http://localhost:5000/tables/info';
                this.$http.get(url).then((res)=>{
                    this.$store.commit('SET_TABLE_INFO');
                });
            },
        },
    }
</script>
<style lang="scss">
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
    .buttons{
        display:flex;
        justify-content: space-between;
        button{
            min-width:60px;
            font-weight:300;
            border:1px solid lightgray;
            border-radius:3px;
        }
    }
    .select{
        width:100%;
        display:flex;
        margin-top:30px;
        textarea{
            width:100%;
            display:flex;
            border:1px solid lightgray;
            border-radius:2px;
        }
    }

</style>
