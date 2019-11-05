<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CalendarEvents extends Model
{
    protected $table = 'calendar_events';
    
    protected $fillable = [
        'title',
        'start',
        'end'
    ];
}
