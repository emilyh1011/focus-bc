import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';

//Focus related pages
import Peers from './pages/Peers';

import RoomSession from './pages/RoomSession';
import Solo from './pages/Solo';

//Pages
import Dashboard from './betterCampusPages/Dashboard'
import Assignments from './betterCampusPages/assignments';
import Notes from './betterCampusPages/Notes'
import Grades from './betterCampusPages/Grades'
import Courses from './betterCampusPages/Courses'
import Calendar from './betterCampusPages/Calendar';
import Inbox from './betterCampusPages/Inbox'
import Help from './betterCampusPages/Help'

import CalendarSlider from './betterCampusPages/CalendarSlider';

import ENGL101 from './betterCampusPages/ENGL101';
import MATH101 from './betterCampusPages/MATH101';


// Placeholder components for now
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          
          
          
         
          <Route path="assignments" element={<Assignments/>}/>
          
          <Route path="dashboard">
            <Route index element={<Dashboard />} />
            <Route path="calendarSlider" element={<CalendarSlider />} />
          </Route>
          <Route path="assignments">
            <Route index element={<Assignments />} />
            <Route path="calendarSlider" element={<CalendarSlider />} />
          </Route>
         <Route path="notes">
            <Route index element={<Notes />} />
            <Route path="calendarSlider" element={<CalendarSlider />} />
          </Route>
          <Route path="grades">
            <Route index element={<Grades />} />
            <Route path="calendarSlider" element={<CalendarSlider />} />
          </Route>
          <Route path="courses">
            <Route index element={<Courses />} />
            <Route path="calendarSlider" element={<CalendarSlider />} />
          </Route>
          <Route path="calendar">
            <Route index element={<Calendar />} />
            <Route path="calendarSlider" element={<CalendarSlider />} />
          </Route>
          <Route path="inbox">
            <Route index element={<Inbox />} />
            <Route path="calendarSlider" element={<CalendarSlider />} />
          </Route>
          <Route path="help">
            <Route index element={<Help />} />
            <Route path="calendarSlider" element={<CalendarSlider />} />
          </Route>
          
          <Route path="engl101">
            <Route index element={<ENGL101 />} />
            <Route path="calendarSlider" element={<CalendarSlider />} />
          </Route>
          <Route path="math101">
            <Route index element={<MATH101 />} />
            <Route path="calendarSlider" element={<CalendarSlider />} />
          </Route>
          
          <Route path = "peers">
            <Route index element = {<Peers/>}/>
            
            <Route path=":id" element={<RoomSession />} />
            <Route path="solo" element={<Solo />} />
          </Route>


         
          
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
