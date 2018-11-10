<style lang="scss" scoped>
    div {
        display:flex;
        position:relative;
        align-items: center;
        justify-content: center;
        background-color:white;
        input{
            border:1px solid lightgray;
            border-radius:3px;
            padding:7px;
            box-shadow:0px 0px 10px 2px lightgray;
            width:100%;
        }
        svg{
            position:absolute;
            right:4px;
            &:hover{
                cursor:pointer;
                border-color:#dc1921;
                stroke:#dc1921;
            }
        }
    }
</style>
<template>
    <div>
        <input v-model="entered_name" :type="type" :name="name">
        <check-icon @click="enable_inputs();"></check-icon>
    </div>
</template>
<script>
    import { CheckCircleIcon   } from 'vue-feather-icons'
    export default{
        props:['type','name'],
        data:()=>{
            return {
                entered_name:"",
            }
        },
        components:{
            CheckIcon: CheckCircleIcon  
        },
        computed:{

        },
        methods:{
            enable_inputs(){
                this.$store.commit('SET_NAME',this.entered_name);
            },
        }
    }
</script>
