<template>
	<div class='fullcalendar-app'>
	<FullCalendar
		themeSystem="bootstrap"
		class='fullcalendar-app-calendar'
		ref="fullCalendar"
		defaultView="dayGridMonth"
		:header="{
			left: 'prev,next today',
			center: 'title',
			right: 'pickMonthButton' 
		}"
		:plugins="calendarPlugins"
		:weekends="calendarWeekends"
		:events="calendarEvents"
		:customButtons="customButtons"
		:height="750"
		:displayEventTime="false"
		@datesRender="getMonthEvents"
		:defaultDate="this.currentMonth"
		/>

		<PickMonth ref="pickMonth"/>
	</div>
</template>

<script>
	import FullCalendar from '@fullcalendar/vue'
	import dayGridPlugin from '@fullcalendar/daygrid'
	import timeGridPlugin from '@fullcalendar/timegrid'
	import interactionPlugin from '@fullcalendar/interaction'
	import PickMonth from './PickMonth.vue'
	import moment from 'moment'

	export default {
		components: {
			FullCalendar,
			PickMonth
		},
		data(){
			const that = this;
			return {
				calendarPlugins: [ 
					dayGridPlugin,
					timeGridPlugin,
					interactionPlugin 
				],
				calendarWeekends: true,
				customButtons: {
					pickMonthButton: {
						text: 'Pick Month',
						click: function() {
							that.showModal();
						}
					}
				},
				calendarApi : null,
				atInit: true,
				currentMonthChanged: false,
			}
		},
		mounted() {
			this.calendarApi = this.$refs.fullCalendar.getApi();
            if(!this.currentMonth){
				this.$store.dispatch('changeMonth', moment().format('YYYY-MM-DD'));
				this.$store.dispatch('getEvents', this.viewDates );
			}		
			this.atInit = false;	
		},
		computed:{
			calendarEvents() {
				return this.$store.getters.events;
			},
			currentMonth() {
				return this.$store.getters.currentMonth;
			},
			viewDates() {
				return {
					start: moment(this.calendarApi.view.activeStart).format('YYYY-MM-DD'),
					end: moment(this.calendarApi.view.activeEnd).format('YYYY-MM-DD')
				};
			}
		},
		watch:{
			currentMonth(newVal){
				if(!this.atInit){
					this.calendarApi.gotoDate(this.currentMonth);
					this.currentMonthChanged = true;
				}
			}
		},
		methods: {
			getMonthEvents() {
				if(this.atInit){
					return;
				}
				this.$store.dispatch('changeMonth', this.calendarApi.view.currentStart);
				this.$store.dispatch('getEvents', this.viewDates );				

				return;


			},
			showModal(){
				this.$modal.show('pick-month');
			}
		}
	}
</script>

<style lang='scss'>
	@import '~@fullcalendar/core/main.css';
	@import '~@fullcalendar/daygrid/main.css';
	@import '~@fullcalendar/timegrid/main.css';

	.fullcalendar-app {
		font-family: Arial, Helvetica Neue, Helvetica, sans-serif;
		font-size: 14px;
	}

	.demo-app-top {
		margin: 0 0 3em;
	}

	.fullcalendar-calendar {
		margin: 0 auto;
		max-width: 100%;
	}
</style>