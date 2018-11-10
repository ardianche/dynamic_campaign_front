import steps from './steps';
export default {
    steps : steps.steps,
    testing:[],
    conditions:null,
    current_campaign:null,
    new_campaign:{
        name:null,
        title:null,
        author:null,
        start_date:null,
        end_date:null,
        conditions:[],
        scripts:[],
    },
    tables:null,
}