import "./Calendar.css";
import {useEffect,useState} from "react";
import BASE_URL from "../../api/api";

function Calendar(){

const [events,setEvents]=useState([]);

const days=[
"","","","1","2","3","4",
"5","6","7","8","9","10","11",
"12","13","14","15","16","17","18",
"19","20","21","22","23","24","25",
"26","27","28","29","30","31"
];

useEffect(()=>{

fetch(`${BASE_URL}/dashboard/calendar`)

.then(res=>res.json())

.then(data=>{

setEvents(data);

})

.catch(err=>console.log(err));

},[]);

return(

<div className="calendar-card">

<div className="calendar-header">

<h3>July 2026</h3>

<div>

❮ ❯

</div>

</div>

<div className="week">

<span>Sun</span>

<span>Mon</span>

<span>Tue</span>

<span>Wed</span>

<span>Thu</span>

<span>Fri</span>

<span>Sat</span>

</div>

<div className="dates">

{

days.map((day,index)=>{

const hasEvent=

events.find(

event=>

new Date(event.date)

.getDate()

.toString()===day

);

return(

<div

key={index}

className={

hasEvent

?

"active-day"

:

"date"

}

>

{day}

</div>

);

})

}

</div>

</div>

);

}

export default Calendar;
