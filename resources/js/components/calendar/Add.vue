<template>
    <div class="card card-default">
        <div class="card-header">Add Event</div>

        <div class="card-body">
            <form  @submit.prevent="add">
                <div class="form-group">
                    <label for="eventName">Event title</label>
                    <input type="text" v-model="event.title" :class="`form-control ${( errors && errors.title ? 'is-invalid' : '')}`" id="eventName" placeholder="Event title">
                    <div class="invalid-feedback">Event title is required.</div>
                </div>
                <div class="form-group">
                    <label for="eventName">Start Date</label>
                    <date-picker 
                        v-model="event.start" 
                        valueType="format" lang="en" 
                        :input-class="`form-control ${( errors && errors.start ? 'is-invalid' : '')}`" 
                        placeholder="Start Date" 
                        width="100%" 
                        />
                    <div :class="`invalid-feedback ${( errors && errors.start ? 'd-block' : '')}`">Start date is required.</div>
                </div>                
                 <div class="form-group">
                    <label for="eventName">End Date</label>
                    <date-picker 
                        v-model="event.end" 
                        valueType="format" 
                        lang="en" 
                        :input-class="`form-control ${( errors && errors.end ? 'is-invalid' : '')}`" 
                        placeholder="End Date" 
                        width="100%" 
                        :not-before="event.start"
                        :disabled="!event.start"
                        />
                    <div :class="`invalid-feedback ${( errors && errors.end ? 'd-block' : '')}`">End date is required.</div>
                </div>               
                <div v-for="(day,index) in days" class="form-check form-check-inline" :key="index">
                    <input class="form-check-input" v-model="event.onDays" type="checkbox" :id="`inlineCheckbox${index}`" :value="index" :disabled="inBetweendays.length && !inBetweendays.includes(index)">
                    <label class="form-check-label" :for="`inlineCheckbox${index}`">{{ day }}</label>
                </div>
                <small class="form-text text-muted">
                    If there's no days selected, events will be applied to all days <strong>[ {{ days.join(', ') }} ]</strong>
                </small>                

                <div class="form-check mt-2">
                    <input class="form-check-input" type="checkbox" v-model="event.override" id="overrideEvents">
                    <label class="form-check-label" for="overrideEvents">
                        Override Overlapping Events within Start & End Date
                    </label>
                </div>                
                <button type="submit" class="btn btn-primary mt-3 float-right" :disabled="!event.end">Save</button>             
            </form>

        </div>
    </div>   
</template>

<script>
    import validate from 'validate.js'
    import Moment from 'moment';
    import { extendMoment } from 'moment-range';
    import DatePicker from 'vue2-datepicker'

    validate.extend(validate.validators.datetime, {
        parse: function(value, options) {
            return +moment.utc(value);
        },
        format: function(value, options) {
            var format = options.dateOnly ? "YYYY-MM-DD" : "YYYY-MM-DD hh:mm:ss";
            return moment.utc(value).format(format);
        }
    });

    const moment = extendMoment(Moment);

    export default {
        name: 'add-event',
        components: {
            DatePicker,
        },
        data(){
            return {
                event:{
                    title: '',
                    start: '',
                    end: '',
                    onDays: [],
                    override: true,
                },
                days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
                errors: null,
            }
        },
        computed:{
            inBetweendays(){
                let dateRange = moment().range(moment(this.event.start), moment(this.event.end));
                let daysRange = Array.from(dateRange.by('days'));
                return daysRange.map( m=> m.day() );
            },

            dateRange(){
                return moment().range(moment(this.event.start), moment(this.event.end));
            },
        },
        methods:{
            add() {
                this.errors = null;
                const constraints = this.getEventConstraints();
                const errors = validate(this.$data.event, constraints);
                if(errors){
                    this.errors = errors;
                    return;
                }

                let insertEvents = [];
                let deleteEventsInDates = [];
                let datesInRange = Array.from(this.dateRange.by('days'));

                datesInRange.forEach( (eventDate) => {
                    //delete only events within date range and also if that day is checked or  onDays is empty (meaning apply to all dates)
                    if(this.event.override && (this.event.onDays.includes(eventDate.day()) || this.event.onDays.length == 0) ){
                        deleteEventsInDates.push(eventDate.format('YYYY-MM-DD HH:mm:ss'));
                    }

                    if((this.event.onDays.includes(eventDate.day()) || this.event.onDays.length == 0)){
                        insertEvents.push({
                            'title' : this.event.title,
                            'start' : eventDate.format('YYYY-MM-DD HH:mm:ss'),
                            'end' : eventDate.format('YYYY-MM-DD HH:mm:ss')
                        })
                    }

                });

                if(deleteEventsInDates.length){
                    //dispatch 
                    this.$store.dispatch('deleteEvents', deleteEventsInDates);
                    //delete events in date
                    axios.post('/api/events/delete', { 
                            'dates' : deleteEventsInDates,
                        })
                        .then((response) => {
                            console.log(response.data);
                        })
                                    
                }

                if(insertEvents.length){
                    //insert new events in database
                    axios.post('/api/events/new', { 
                            'events' : insertEvents, 
                        })
                        .then((response) => {
                            this.event.title = '';
                            this.event.start = '';
                            this.event.end = '';
                            this.event.onDays = [];
                            this.event.override = true;
                            this.$store.dispatch('addEvents', response.data.events );
                        })
                }
            },
            getEventConstraints() {
                return {
                    title: {
                        presence: true,
                        length: {
                            minimum: 1,
                        },
                    },
                    start: {
                        presence: true,
                        date: {
                             dateOnly: true,
                            message: 'Start date is required'
                        },
                       
                    },
                    end: {
                        presence: true,
                        date: {
                            dateOnly: true,
                            message: 'End date is required'
                        },
                       
                    }                                   
                };
            }
        }
    }
</script>