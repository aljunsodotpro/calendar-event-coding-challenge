<template>
    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-12">
                <div class="card card-default">
                    <div class="card-header">List View</div>

                    <div class="card-body">
                        <div class="row">
                            <div class="col-3">
                                <add-event />
                            </div>
                            <div class="col">
                                 <list-view />
                            </div>
                        </div>
                        
                       
                    </div>
                </div>
            </div>
        </div>
    </div>    
</template>
 
<script>
    import ListView from './calendar/List.vue'
    import AddEvent from './calendar/Add.vue'

    export default {
        name: 'List',
        components: { 
            ListView,
            AddEvent
        }
    }
</script>