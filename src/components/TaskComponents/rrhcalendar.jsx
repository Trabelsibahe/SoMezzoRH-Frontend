import React, { useState } from "react";
import "../../assets/styles/rrhCalendar.css";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { IconButton } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { GetAllTask, supprimerTask } from "../../actions/task.action";
import formatDate from "../formatdate";
import { Collapse, Button } from "@mui/material";





function Calendar() {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.task.tasks);
 
  useEffect(() => {
    dispatch(GetAllTask());
  }, [dispatch]);
  useEffect(() => {
    dispatch(supprimerTask());
  }, []);
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

  // sample list of events (replace with data from database) (already replaced with tasks from db)
  const events = [
    { date: "2023-04-04", name: "Event 1", desc: "Description of Event 1" },
  ];

  // create an object to group events by date
  const eventsByDate = {};
  tasks.forEach((task) => {

    if (eventsByDate[formatDate(task.dateSuppression)]) {
      eventsByDate[formatDate(task.dateSuppression)].push({
        titre: task.titre,
        desc: task.description,
      });
    } else {
      eventsByDate[formatDate(task.dateSuppression)] = [
        { titre: task.titre, desc: task.description },
      ];
    }
  });

  // go to previous month (if not before current date or initial date)
  const prevMonth = () => {
    const initialDate = new Date(); // set initial date to current date
    initialDate.setDate(1); // set to first day of month for comparison
    const currentMonth = date.getMonth();
    const currentYear = date.getFullYear();
    if (
      currentMonth === initialDate.getMonth() &&
      currentYear === initialDate.getFullYear()
    ) {
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
  const dateString = (year, month, day) => {
    return `${year}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
  }
  const [openId, setOpenId] = React.useState(null);

  const handleClick = (id) => {
  setOpenId(openId === id ? null : id);
  };

return (
  <div className="calendar">

    <div className="Calendar_Menu">
      <h4 className="calendar_date">{`${new Intl.DateTimeFormat("fr-FR", {
        month: "long",
      }).format(date)} ${year}`}</h4>
      <div className="calendar_buttons">
        <IconButton
          onClick={prevMonth}
          sx={{ color: "#343433; ", background: "#ebf0f7" }}
        >
          <ArrowBackIosNewIcon />
        </IconButton>
        <IconButton
          onClick={nextMonth}
          sx={{ color: "#343433; ", background: "#ebf0f7" }}
        >
          <ArrowForwardIosIcon />
        </IconButton>
      </div>
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
          <span style={{ padding: "0.8em" }}>{day}</span>
          {eventsByDate[dateString(year, month + 1, day)] && (
            <div>
              <Collapse in={openId === day} collapsedSize={39}>
                <ul>
                  {eventsByDate[dateString(year, month + 1, day)].map((task) => (
                    <div className="calendar_datenumber" key={task.id} onClick={() => handleClick(day)}>
                      <span className="calendar_datetask" style={{ textAlign: "left" }}>
                        {task.titre}
                      </span>
                    </div>
                  ))}
                </ul>
              </Collapse>
            </div>
          )}
        </div>
      ))}
    </div>
  </div>
)}
export default Calendar;
