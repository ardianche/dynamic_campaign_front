<template>
    <div class="layout">
        <div class="parameters">
            <div class="headers">
                <h2>List of available parameters for: <b>{{campaigns.title}}</b> </h2>
            </div>
            <div class="parameters_content">
                <parameters :conditions_array="parameters"></parameters>
            </div>
        </div>
    </div>
</template>
<script>
    import parameters from '@/components/parameters.vue';
    export default{
        components:{
            parameters,
        },
        computed:{
            campaigns(){
                return this.$store.state.current_campaign;
            },
            parameters(){
                return this.$store.state.conditions;
            }
        }
    }
</script>
<style lang="scss" scoped>
    .layout{
        width:100%;
        height:100%;
        display:flex;
        justify-content:center;
        align-items:center;
        flex-direction:column;
    }
</style>

