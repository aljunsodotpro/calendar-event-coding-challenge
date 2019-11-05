<template>
    <div class="container-fluid">
        <h3>{{ currentMonth | monthDisplay }}</h3>
        <table class="table table-striped">
            <template v-if="calendarDates">
                <thead>
                    <th>Date</th>
                    <th>Event</th>
                </thead>
                <tbody>
                    <tr v-for="(calDate,index) in calendarDates" :key="index">
                        <td width="10%">{{ calDate | dateDisplay }}</td>
                        <td v-html="getDateEvent(calDate)"></td>
                    </tr>
                </tbody>
            </template>
        </table>
    </div>    
</template>
 
<script>
    import Moment from 'moment';
    import { extendMoment } from 'moment-range';

    const moment = extendMoment(Moment);

    export default {
        name: 'List',
		mounted() {
            if(!this.currentMonth){
                this.$store.dispatch('changeMonth', moment().format('YYYY-MM-DD'));
                this.$store.dispatch('getEvents', this.viewDates );
            }
		},        
        computed:{
            calendarDates(){
                let dateRange = moment().range(moment(this.viewDates.start), moment(this.viewDates.end));
                return Array.from(dateRange.by('days'));
                // let daysRange = Array.from(dateRange.by('days'));
                // return daysRange.map( m=> m.day() );
            },
            calendarEvents() {
                let dateRange = moment().range(moment(this.viewDates.start), moment(this.viewDates.end));
                return this.$store.getters.events.filter((event) =>{
                    return dateRange.contains(moment(event.start));
                });
            },
            currentMonth() {
                return this.$store.getters.currentMonth;
            },
            viewDates(){
                let start = moment(this.currentMonth).startOf('month').format('YYYY-MM-DD');
                let end = moment(this.currentMonth).endOf('month').format('YYYY-MM-DD');
                return {
                    start,
                    end
                }
            }
        },
        methods:{
            getDateEvent(date){
                let dateFormatted = moment(date).format('YYYY-MM-DD');
                let dayEvents = this.calendarEvents.filter((event) => {
                    return moment(event.start).format('YYYY-MM-DD') == dateFormatted;
                })

                 if(!dayEvents.length){
                    return `<ul class="day-events"><li></li></ul>`;
                }
                let temp = `
                <ul class="day-events">
                    ${dayEvents.map((event) => `
                        <li>${event.title}</li>
                    `).join('')}
                </ul>`;
                return temp;
            },
        },

        filters:{
            dateDisplay: function (date) {
                return moment(date).format('DD ddd');
            },
            monthDisplay: function (date) {
                return moment(date).format('MMMM YYYY');
            },

        }        
    }
</script>

<style>
    .day-events{
        list-style-type: none;
        padding-left: 0px;
    }
</style>