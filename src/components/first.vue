<template>
    <div>
        <div class="inputs">
            <span>First Name</span>
            <input v-model="first_name" type="text">
        </div>
        <div class="inputs">
            <span>Last Name</span>
            <input v-model="last_name" type="text">
        </div>
        <div class="inputs">
            <span>Position</span>
            <input v-model="position" type="text">
        </div>
        <div class="inputs">
            <span>Number</span>
            <input v-model="number" type="number">
        </div>
        <div class="inputs">
            <span>User Name</span>
            <input v-model="user_name" type="text">
        </div>
        <div class="inputs">
            <button @click="submit_form()">
                Submit
            </button>
        </div>

        <button @click="get_courses()">
            Get Courses
        </button>
        <button @click="clear_courses()">
            Clear Courses
        </button>
    </div>
</template>
<script>
import Vue from 'Vue';
    export default{
        data:()=>{
            return{
                first_name:null,
                last_name:null,
                position:null,
                number:null,
                user_name:null,
            }
        },
        methods:{
            submit_form(){
                let payload = {
                    first_name:this.first_name,
                    last_name: this.last_name,
                    position:this.position,
                    number: this.number,
                    user_name:this.user_name,
                };
                this.$http.post('http://localhost:5000/api/courses/insert',payload).then((res)=>{
                    console.log("RES: ",res);
                });
            },
            get_courses(){
                this.$http.get('http://localhost:5000/api/courses/getcourses').then(res=>{
                    console.log("GET RES: ",res);
                });
            },
            clear_courses(){
                this.$http.get('http://localhost:5000/api/courses/clear?name=players').then(res=>{
                    console.log("GET RES: ",res);
                });
            }
        }
    }
</script>

<style lang="scss" scoped>

    div{
        display:flex;
        flex-direction: column;
        justify-content: center;
        max-width: 400px;
        align-items: center;
        .inputs{
            display:flex;
            flex-direction: column;
        }
    }
</style>

