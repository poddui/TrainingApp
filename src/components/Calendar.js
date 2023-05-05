import FullCalendar from '@fullcalendar/react'
import React, { useEffect, useState } from 'react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid';

export default function Calendar() {

    const [training, setTraining] = useState([]);
    
    useEffect(() => 
      fetchData(), []);
  
    const fetchData = () => {
      fetch('https://traineeapp.azurewebsites.net/gettrainings')
        .then(response => response.json())
        .then(data => setTraining(data));
    }

    const events = training.map(item => ({
        title: item.activity,
        start: new Date(item.date),
        end: new Date(new Date(item.date).getTime() + item.duration * 60000),
        textColor: '#ffffff'
    }));

  return (
    <div style={{ width: '100%', marginTop: '1%' }}>
        <FullCalendar
            events={events}
            eventContent={(event) => {
                return(
                    <div>
                        <p>{event.event._def.title}</p>
                        {event.event.start && event.event.end && <p>{event.event.start.toLocaleString('de-DE', {hour: 'numeric', minute: 'numeric'})} - {event.event.end.toLocaleString('de-DE', {hour: 'numeric', minute: 'numeric'})}</p>}
                    </div>
                )
            }}
            aspectRatio={3}
            plugins={[ dayGridPlugin, timeGridPlugin]}
            initialView="timeGridWeek"
            headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'timeGridDay,timeGridWeek,dayGridMonth'
            }}
            titleFormat={{
                year: 'numeric', 
                month: 'long', 
                day: 'numeric'
            }}
            firstDay={1}
            selectable={true}
            allDaySlot={false}
            dayHeaderFormat={{
                weekday: 'long', 
                month: '2-digit', 
                day: '2-digit',
                year: 'numeric',
                omitCommas: true
            }}
            slotLabelInterval="01:00"
            slotDuration="00:15"
            slotLabelFormat={{
                hour12: false,
                hour: '2-digit',
                minute: '2-digit',
                omitZeroMinute: false,
            }}
        />
    </div>
  )
}
