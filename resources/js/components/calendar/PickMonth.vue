<template>
  <modal 
    name="pick-month"
    :width="400"
    :height="250"
    >
    <div class="form-group text-center">
    <label for="eventName"><h3>Pick Month/Year</h3></label>
    <date-picker 
        v-model="currentMonth" 
        type="month"
        valueType="format" 
        lang="en" 
        :input-class="`form-control`" 
        placeholder="Month/Year" 
        width="100%" 
        :append-to-body="true"
        />
    </div> 
    <div class="small">Select a month to view</div>
    <div class="float-right mt-3">
        <button class="btn btn-primary" @click.prevent="closeModal">CANCEL</button>
        <button class="btn btn-primary" @click.prevent="goToMonth">OK</button>
    </div>
   


   </modal>
</template>

<script>
    import Moment from 'moment';
    import { extendMoment } from 'moment-range';
    import DatePicker from 'vue2-datepicker'

    const moment = extendMoment(Moment);

    export default {
        name: 'pick-month',
        components: {
            DatePicker,
        },
        data(){
            return {
                currentMonth: '',
            }
        },
        computed:{

        },
        methods:{
            closeModal() {
                this.$modal.hide('pick-month');
            },

            goToMonth(){
                this.$store.dispatch('changeMonth', moment(this.currentMonth).format('YYYY-MM-DD'));
                this.closeModal();
            }
        }   
    }
</script>

<style>
    .v--modal{
        border-radius: 0px !important;
        padding: 20px !important;
        padding-top: 30px !important;
    }
</style>