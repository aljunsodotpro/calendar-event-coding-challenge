<?php

namespace App\Http\Controllers;

use App\CalendarEvents;
use Illuminate\Http\Request;
use App\Http\Requests\CreateCalendarEventRequest;
use App\Http\Requests\DeleteCalendarEventRequest;

class CalendarEventsController extends Controller
{
    public function all(Request $request){
        $start = $request->get('start');
        $end = $request->get('end');
        $events = CalendarEvents::whereBetween('start',[$start, $end])->get();

        return response()->json([
            'events' => $events
        ], 200);
    }

    public function create(CreateCalendarEventRequest $request){
       $events = $request->input('events');

       $createdEvents = [];
       if(!empty($events)){
            foreach($events as $event){
                $createdEvents[] = CalendarEvents::create($event);
            }
            
       }
       
       return response()->json([
           'events' => $createdEvents
       ], 200);
    }

    public function delete(DeleteCalendarEventRequest $request){
        $dates = $request->input('dates');

        if(is_array($dates)){
            CalendarEvents::whereIn('start', $dates)->delete();
        }else{
            CalendarEvents::where('start', $dates)->delete();
        }

        return response()->json([
            'deleted' => true
        ], 200);
    }
}
