import React, { useState, onClick } from 'react';
import { Link, NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Settings} from 'lucide-react';
import { HiUser } from "react-icons/hi";
import { MdKeyboardArrowRight } from "react-icons/md";

import canvasWhiteLogo from "../../public/canvasWhite.png"
import rainbowUser from "../../public/rainbowUser.png"
import lightRainbowUser from "../../public/lightRainbowUser.png"

import CreateRoom from "./CreateRoom.jsx";

import { currentUserData } from '../helpers/currentUserData.jsx';
import { CurrentUserContext } from '../contexts/CurrentUserContext.jsx';

import { fakeRooms } from '../helpers/fakeRooms.jsx';
import { fakeAlwaysOpenRoom } from '../helpers/fakeAlwaysOpenRoom.jsx';

import {RoomsContext} from "../contexts/RoomsContext.jsx"

import { widgetIcons } from '../helpers/LayoutHelpers/widgetIcons.jsx';
import { pageIcons } from '../helpers/LayoutHelpers/pageIcons.jsx';
import { headerIcons } from '../helpers/LayoutHelpers/headerIcons.jsx';
import { courses } from '../helpers/LayoutHelpers/courses.jsx';

const Layout = () => {

  const navigate = useNavigate();
  const location = useLocation();

  //On Peers, we will only  display the "Create Room" in header
  const isPeers = location.pathname === "/peers" || location.pathname === "/peers/";

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  
  // 1. CreateRoom, returns a room to add to rooms --> Prop drill onCreate(formDataFromChild) which will update parent rooms
  //2. Peers, uses rooms to render each room card --> Context, pass our rooms and setRooms down
  const [rooms, setRooms] = useState([fakeAlwaysOpenRoom,...fakeRooms]);
  const currentUser = currentUserData;
  console.log("from layout", currentUser);
 
  console.log("Initial rooms ", rooms[0]);

  const [activeHeaderIcon, setActiveHeaderIcon] = useState("Todo"); //By default, the Todo is the active header icon

  // Extract the page name, "dashboard", "peers", "solo", etc.
  const pathSegment = location.pathname.split('/')[1] || '';

  // Only page whose pageRoute matches current path segment count as selected
  const selectedPage = pageIcons.find((p) => p.pageRoute === pathSegment) || courses.find((p) => p.pageRoute === pathSegment) || null;

  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar */}
      <aside
        className="
          sticky top-0 flex h-screen w-[260px] flex-col
          border-r border-slate-200
          bg-sidebar-background px-6 py-6
          shadow-sm backdrop-blur gap-8
        "
      >
        {/* Logo */}
        <div className="flex items-center place-content-between px-2">
          <img src={canvasWhiteLogo} className = "w-10 h-10" />
          
          <div className = "flex items-center gap-2">
             <img src = {rainbowUser} className = "w-10 h-10 rounded-md"/>
             <img src = {currentUser.picture} className="w-10 h-10 rounded-3xl"/>
          </div>
         
        </div>

        {/**Widgets */}
        <div className = "flex flex-col justify-center gap-1">

          <div className = "flex place-content-between items-center px-2">
            <span className="text-sm font-semibold text-zinc-500">Widgets</span>
            <HiUser size={18} className="text-zinc-500"/>
          </div>
         

          <div className="grid grid-cols-3 gap-2">
            {widgetIcons.map(({ id, Icon }) => {
              return (
                <button key={id}
                  type="button"
                  className="flex items-center justify-center rounded-lg w-16 h-12 bg-widget-background 
                  hover:cursor-pointer hover:bg-neutral-400 hover:duration-150 
                  active:duration-150 active:bg-blue-500 active:duration-150"
                >
                  <Icon size={20} />
                </button>
              )
            })}
          </div>
        </div>

        {/* Pages */}
        <div className="flex flex-col justify-center gap-1">
          <span className="text-sm font-semibold text-zinc-500 px-2">Pages</span>
          <nav className="space-y-1">

            {pageIcons.map(({ label, Icon, pageRoute, UserIcon }) => {

              const isCurrent = selectedPage?.pageRoute === pageRoute;

              return (
                <NavLink
                  key={label}
                  to={`/${pageRoute}`}
                  className={() =>
                    [
                      'flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium',
                      isCurrent
                        ? 'transition duration-150 bg-gray-700 text-white'
                        : 'transition duration-150 text-gray-700 hover:bg-slate-100 hover:text-slate-900 hover:duration-150',
                    ].join(' ')
                  }
                >
                  <Icon size={18} />
                  <span>{label}</span>
                  {UserIcon &&
                    <UserIcon size={18}/>
                  }
                  
                </NavLink>
              )
            })}

          </nav>
          <button 
            type = "button"
            className = "px-3 py-2 rounded-md text-center text-sm text-gray-700 hover:cursor-pointer hover:bg-slate-100 hover:text-slate-900 hover:duration-150">... Show hidden</button>
        </div>

        {/* Courses */}
        <div className="flex flex-col justify-center gap-1">
          <span className="text-sm font-semibold text-zinc-500">Courses</span>
          <nav className="space-y-1">
            {courses.map(({ courseNumber, color, pageRoute }) => {

              const isCurrent = selectedPage?.pageRoute === pageRoute;

              return (
                <NavLink
                  key={courseNumber}
                  to={`/${pageRoute}`}
                  className={() =>
                    [
                      'flex items-center place-content-between rounded-md px-3 py-2 text-sm font-medium',
                      isCurrent
                        ? 'transition duration-150 bg-gray-700 text-white'
                        : 'transition duration-150 text-gray-700 hover:bg-slate-100 hover:text-slate-900 hover:duration-150',
                    ].join(' ')
                  }
                >
                  <div className = "flex items-center gap-2">
                    <div className = {`${color} rounded-lg w-3 h-3`}></div>
                    <span>{courseNumber}</span>
                  </div>
                  <MdKeyboardArrowRight/>
                  
                </NavLink>
              )
            })}
          </nav>
          <button 
            type = "button"
            className = "px-3 py-2 rounded-md text-center text-sm font-semibold text-gray-700 hover:cursor-pointer hover:bg-slate-100 hover:text-slate-900 hover:duration-150">--Give Feedback--</button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto relative">

        <header className="w-full border-b-1 border-slate-200 bg-white py-2 px-4 flex place-content-between items-center">


          {(selectedPage && selectedPage.sliderLeft && selectedPage.sliderRight) ?
            
            
            <div className="flex bg-slate-200 p-1 rounded-md">

              {/**end: Changes the matching logic for the active and pending states to only match to the "end" of the NavLinkProps.to 
               * Ex: Only active on exact match to /peers
              */}
              <NavLink
                to={`/${selectedPage.pageRoute}`}
                end
                className={({ isActive }) =>
                  [
                    'flex justify-center items-center gap-1 rounded-sm px-4 py-2 text-sm',
                    isActive
                      ? 'transition duration-150 bg-white text-blue-600 font-semibold'
                      : 'transition duration-150 text-slate-500 font-medium hover:bg-slate-100 hover:text-slate-90',
                  ].join(' ')
                }
              >
                <selectedPage.sliderLeftIcon size={20} />
                <span>{selectedPage.sliderLeft}</span>
              </NavLink>


                {/*Ex: only active on /peers/solo. /peers not active*/}
              <NavLink
                to={`/${selectedPage.pageRoute}/${selectedPage.sliderRightRoute}`}
                end
                className={({ isActive }) =>
                  [
                    'flex justify-center items-center gap-1 rounded-sm px-4 py-2 text-sm',
                    isActive
                      ? 'transition duration-150 bg-white text-blue-600 font-semibold'
                      : 'transition duration-150 text-slate-500 font-medium hover:bg-slate-100 hover:text-slate-90',
                  ].join(' ')
                }
              >
                <selectedPage.sliderRightIcon size={20} />
                <span>{selectedPage.sliderRight}</span>
              </NavLink>

            </div> : null

          }

          <div className="flex justify-center items-center">
            <img src={lightRainbowUser}
              class="w-10 h-10 rounded-log" />
           

            {headerIcons.map(({ label, Icon }) => {
              return (
                <button
                  key = {label}
                  type="button"
                  className={`inline-flex items-center justify-center px-6 py-2 rounded-3xl hover:cursor-pointer ${activeHeaderIcon == label ? "transition duration-150 bg-primary text-white": "transition duration-150 bg-white text-primary"}`}
                  onClick={()=>{
                    setActiveHeaderIcon(label);
                  }}
                >
                  <Icon size={20} />
                </button>

              )
            })}
            
          </div>


          {isPeers && <button
            onClick = {()=>{
              setIsCreateOpen(true);
            }}
            className="inline-flex items-center justify-center gap-2 rounded-full
            text-sm font-medium shadow-sm px-4 py-2 hover:cursor-pointer
            
            transition duration-150 text-white shadow-md bg-gradient-to-r 
            from-teal-400 to-blue-500 hover:shadow-lg hover:-translate-y-[1px]"
          >
            + Create Room
          </button>

          }


        </header>


        <div className="">
          <CurrentUserContext value={currentUser}>
            <RoomsContext value={{ rooms, setRooms }}>
              <Outlet />
               {/**Modal for Create Room */}
          {isCreateOpen ? 
          <CreateRoom
            onClose={()=>{
              setIsCreateOpen(false);
              console.log("I didn't create a room, here is my rooms ", rooms);
            }}
            onCreate={(formDataFromChild)=>{
              setRooms([...rooms, formDataFromChild]);
              setIsCreateOpen(false);

              //Add to host's sessions attended. Of course never attended a newly created room of theirs
              currentUser.sessionsAttended = [...currentUser.sessionsAttended, formDataFromChild.roomId];
              console.log("i haven't attended my newly created", formDataFromChild.roomName, "yet. Adding it to my attended array");
              console.log("my attended rooms", currentUser.sessionsAttended);
                 

              navigate(`/peers/${formDataFromChild.roomId}`); //On create, place host in the created room
              console.log("Created room: ", formDataFromChild, "\n My rooms state: ", rooms);
            }}
            ></CreateRoom>: null  
        }

            </RoomsContext>
          </CurrentUserContext>
        </div>
       
        
      </main>
    </div>
  );
};

export default Layout;
