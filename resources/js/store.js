import Axios from "axios";
import validate from "validate.js";

export default {
    state: {
        events: [],
        currentMonth: null,
    },
    getters: {
        events(state) {
            return state.events;
        },
        currentMonth(state) {
            return state.currentMonth;
        }
    },
    mutations: {
        updateEvents(state, payload) {
            state.events = payload;
        },
        updateCurrentMonth(state, payload) {
            state.currentMonth = payload;
        }
    },
    actions: {
        getEvents(context, dates) {
            axios.get('/api/events', { params : dates } )
                .then((response) => {
                    let events = response.data.events;
                    let contextEvents = context.getters.events;
                    let eventIds = contextEvents.map((val) => {
                        return val.id;
                    })
                    events.forEach(event => {
                        if(!eventIds.includes(event.id)){
                            contextEvents.push(event);
                        }
                    });

                    context.commit('updateEvents', contextEvents);
                })
        },
        addEvents(context, insertEvents){
            let events = insertEvents;
            let contextEvents = context.getters.events;
            let eventIds = contextEvents.map((val) => {
                return val.id;
            })
            events.forEach(event => {
                if(!eventIds.includes(event.id)){
                    contextEvents.push(event);
                }
            });

            context.commit('updateEvents', contextEvents);

        },
        deleteEvents(context, dates){
            let events = context.getters.events.filter((event) => {
                return !dates.includes(event.start);
            });
            context.commit('updateEvents', events);
        },
        changeMonth(context, month){
            context.commit('updateCurrentMonth', month);
        }
    },
};