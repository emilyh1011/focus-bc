import React, { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, X, BookOpenText, Book, Clock, Video, University } from 'lucide-react';

import RoomCard from '../components/RoomCard.jsx';
import SelectedRoomDetails from '../components/SelectedRoomDetails.jsx';

import { RoomsContext } from '../contexts/RoomsContext.jsx';
import { CurrentUserContext } from '../contexts/CurrentUserContext.jsx';

import { preventEnterSubmit } from '../helpers/preventEnterSubmit.jsx';
import findHost from "../helpers/findHost.jsx";

import UniversitySelection from '../components/peers/UniversitySelection.jsx';
import Keywords from '../components/peers/Keywords.jsx';
import Intent from '../components/peers/Intent.jsx';
import Subject from '../components/peers/Subject.jsx';
import SearchBar from '../components/peers/SearchBar.jsx';
import Cancel from '../components/peers/Cancel.jsx';

const Peers = () => {
  const currentUser = useContext(CurrentUserContext);
  const { rooms, setRooms } = useContext(RoomsContext);

  //Study Hall will always exist
  const [selectedRoomId, setSelectedRoomId] = useState(rooms[0].roomId);
  const [isNoRoomsFound, setIsNoRoomsFound] = useState(false);


  const defaultFilters = {
    intent: "", //If user applies filters, rooms --> filteredRooms. Search query will now be based on filteredRooms.
    keywords: [],
    subject: "",
    university: "All Universities",
  };

  const [filteredRooms, setFilteredRooms] = useState(rooms);
  const [appliedFilters, setAppliedFilters] = useState(defaultFilters);
  const [showFilters, setShowFilters] = useState(false);


  //Recalculates on function re-renders
  //Selected Room is selectedRoomId
  //OR if there is no current selectedRoomId in that user selected from filteredResults possibly from a filters result that doesn't include user selectedId, so selectedRoom will become first filtered result,
  //OR if no other student rooms open OR couldn't find any rooms to match filters, set selectedRoom to be the "Study Hall". Will be an error message for this
  const selectedRoom = filteredRooms.find((visibleRoom) => visibleRoom.roomId == selectedRoomId) || filteredRooms[0] || rooms[0];

  const intentOptions = {
    "Silent Study": 'bg-teal-500',
    Collaborative: 'bg-blue-500',
  }


  //Run this effect anytime rooms change. Lets us see if a session ended then we can drop these empty rooms
  useEffect(() => {
    if (!rooms || rooms.length === 0) return;

    //Always keep studyHall even if its empty
    const studyHallId = rooms[0].roomId;

    //Delete room from rooms state
    const removeIds = [];
    for (const r of rooms) {
      if (r.roomId !== studyHallId && r.currentParticipants.length == 0) {
        removeIds.push(r.roomId);
      }
    }

    const removedRooms = rooms.filter(r => !removeIds.includes(r.roomId));

    //Prevent infinite loop, only call setRooms if something actually changed
    if (rooms.length != removedRooms.length) {
      setRooms(removedRooms);
    }

  }, [rooms, setRooms])

  return (
    <div className="grid grid-cols-2 gap-8 p-12">
      <div className="flex flex-col gap-4">
        {/* Header*/}
        <header className=" flex flex-col items-center w-full gap-2">
          <div className="flex flex-col items-center">
            <h1 className="mb-2 text-4xl font-extrabold">Happening Now</h1>
            <p className="text-slate-500">Join others and stay accountable.</p>
          </div>

          {/* Filters & Search */}
          <div className="flex flex-col w-full items-center">

            <SearchBar appliedFilters={appliedFilters} setAppliedFilters={setAppliedFilters}
              setFilteredRooms={setFilteredRooms} setShowFilters={setShowFilters}
              defaultFilters={defaultFilters} setIsNoRoomsFound={setIsNoRoomsFound} />

            {showFilters &&
              <form className="flex flex-col mb-4 bg-white rounded-lg border border-slate-200 w-full px-6 py-4 gap-6">

                <div className="flex items-center gap-6">
                  <Intent appliedFilters={appliedFilters} setAppliedFilters={setAppliedFilters} />
                  <Subject appliedFilters={appliedFilters} setAppliedFilters={setAppliedFilters} />
                </div>

                <div className="flex flex-col gap-2">
                  <Keywords appliedFilters={appliedFilters} setAppliedFilters={setAppliedFilters} />
                  <Cancel setShowFilters={setShowFilters} />
                </div>

              </form>
            }
            {/**Specific All Universities vs My Univeristy */}
            <UniversitySelection appliedFilters={appliedFilters} setAppliedFilters={setAppliedFilters} />

          </div>

        </header>

        {/**Always render filteredRooms. 
          * If no filters applied, filteredRooms default value is rooms.*/}
        <div className="grid gap-4 grid-cols-1">
          {filteredRooms.map((room) => {
            if (room.isPublic)
              return <RoomCard key={room.roomId} room={room} selectedRoomId={selectedRoomId}
                onClick={() => {
                  setSelectedRoomId(room.roomId);
                }} />
          })}
          {isNoRoomsFound ?
            <div>
              <div className="flex flex-col gap-1 items-center mb-4">
                <span className="text-lg font-medium">We couldn't find a room with those filters. </span>
                <span className="">Do you want to join Better Campus' Study Hall instead?</span>
              </div>

              <RoomCard key={rooms[0].roomId} room={rooms[0]} selectedRoomId={selectedRoomId} />

            </div>
            : null}
        </div>

      </div>

      {/**Right Side of Screen */}
      <SelectedRoomDetails selectedRoom={selectedRoom} selectedRoomId={selectedRoomId} intentOptions={intentOptions} />
    </div>
  );
};

export default Peers;