import React, { useState } from "react";
import "../../assets/styles/rrhCalendar.css";
import Button from "@mui/material/Button";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { IconButton } from "@mui/material";

function Calendar() {
  const [date, setDate] = useState(new Date());
  // get current month and year
  const month = date.getMonth();
  const year = date.getFullYear();

  // get number of days in current month
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // create array of day names
  const dayNames = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  // get index of first day of month (0 = Monday, 1 = Tuesday, etc.)
  const firstDayOfMonth = new Date(year, month, 1).getDay();

  // create array of day numbers with blank elements for days before the first of the month
  const days = [];
  for (let i = 0; i < firstDayOfMonth - 1; i++) {
    days.push("");
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  // sample list of events (replace with data from database)
  const events = [
    { date: "2023-04-04", name: "Event 1", desc: "Description of Event 1" },


  ];

  // create an object to group events by date
  const eventsByDate = {};
  events.forEach((event) => {
    if (eventsByDate[event.date]) {
      eventsByDate[event.date].push({ name: event.name, desc: event.desc });
    } else {
      eventsByDate[event.date] = [{ name: event.name, desc: event.desc }];
    }
  });


// go to previous month (if not before current date or initial date)
const prevMonth = () => {
  const initialDate = new Date(); // set initial date to current date
  initialDate.setDate(1); // set to first day of month for comparison
  const currentMonth = date.getMonth();
  const currentYear = date.getFullYear();
  if (currentMonth === initialDate.getMonth() && currentYear === initialDate.getFullYear()) {
    return; // do nothing if current date is already at initial date
  }
  const newDate = new Date(currentYear, currentMonth - 1, 1);
  setDate(newDate);
};


  // go to next month
  const nextMonth = () => {
    const newDate = new Date(year, month + 1, 1);
    setDate(newDate);
  };
  //<div>{`${year}-${(month + 1).toString().padStart(2, '0')}`}</div>

  return (
    <div className="calendar">
      <div style={{textAlign:"right"}}><Button href="/rrh2">Retour</Button></div>
      <div className="Calendar_Menu">
      {`${new Intl.DateTimeFormat('fr-FR', { month: 'long' }).format(date)} ${year}`}
      <IconButton onClick={prevMonth} sx={{color:"black"}}><ArrowBackIosNewIcon/></IconButton>
      <IconButton onClick={nextMonth} sx={{color:"black"}}><ArrowForwardIosIcon/></IconButton>
      </div>


      <div className="day-names">
        {dayNames.map((day) => (
          <div key={day} className="day-name">
            {day}
          </div>
        ))}
      </div>
      <div className="days">
        {days.map((day, index) => (
          <div key={index} className="day">
            {day}
            {eventsByDate[
              `${year}-${(month + 1).toString().padStart(2, "0")}-${day
                .toString()
                .padStart(2, "0")}`
            ] && (
              <ul>
                {eventsByDate[
                  `${year}-${(month + 1).toString().padStart(2, "0")}-${day
                    .toString()
                    .padStart(2, "0")}`
                ].map((event, index) => (
                  <li key={index}>
                    <div>{event.name}</div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Calendar;
