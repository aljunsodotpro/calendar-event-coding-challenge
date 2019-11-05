<template>
    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-12">
                <div class="card card-default">
                    <div class="card-header">Calendar View</div>

                    <div class="card-body">
                        <div class="row">
                            <div class="col-3">
                                <add-event />
                            </div>
                            <div class="col">
                                 <calendar-view />
                            </div>
                        </div>
                        
                       
                    </div>
                </div>
            </div>
        </div>
    </div>    
</template>
 
<script>
    import CalendarView from './calendar/Calendar.vue'
    import AddEvent from './calendar/Add.vue'

    export default {
        name: 'Home',
        components: { 
            CalendarView,
            AddEvent
        }
    }
</script>