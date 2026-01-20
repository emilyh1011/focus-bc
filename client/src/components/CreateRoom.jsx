import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, Video, Globe, Book } from 'lucide-react';
import { preventEnterSubmit } from '../helpers/preventEnterSubmit';

import InviteUsers from './InviteUsers';

import { fakeUsers } from "../helpers/fakeUsers";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

import { subjectOptions } from '../helpers/subjectOptions';
import { durationOptions } from '../helpers/durationOptions';

import { fakeIntentions } from '../helpers/fakeIntentions';

function CreateRoom({ onClose, onCreate }) {
    const navigate = useNavigate();
    const currentUser = useContext(CurrentUserContext);
    console.log("from create form", currentUser);

    while (!currentUser) {
        return (
            <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40">
                <div className="rounded-xl border border-slate-200 bg-white shadow-sm backdrop-blur py-8 px-6">
                    <span className="text-slate-500">Loading...</span>
                </div>
            </div>
        );
    }

    const defaultForm = {
        roomId: "",
        hostFirstName: currentUser.firstName,
        hostLastName: currentUser.lastName,
        hostEmail: currentUser.universityEmail,
        roomName: '',
        subject: 'Anything', //default
        description: '',
        intent: 'Silent Study', //default
        duration: 30, //default, in minutes
        cameraRequired: false, //default unless checked
        isPublic: false, //only through invite
        invitees: [], //sends invite to user's inbox when room created
        intentions: [], //fills once session starts and people start adding
        chat: [],
        currentParticipants: [currentUser],
        //Not used until room becomes created and is displayed as a room card. Then, currentParticipants starts changing.
        //Default to 1. Because as soon as room creates, host immediately put in room.
    }

    const [formData, setFormData] = useState(defaultForm);

    const rnMaxLength = 35;
    const [isRNReached, setIsRNReached] = useState(false);
    const dMaxLength = 300;
    const [isDReached, setIsDReached] = useState(false);

    const intentOptions = [
        { label: "silentStudy", name: 'Silent Study', bg: "bg-cyan-100", outline: "border-cyan-400" },
        { label: "collaborative", name: 'Collaborative', bg: "bg-blue-200", outline: "border-blue-500" },
    ]

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Creating room:', formData);
        // Mock creation and redirect
        navigate('/peers');
    };

    return (
        //Black Background
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40">

            {/**Actual Create Room Modal Form */}
            <form onSubmit={handleSubmit} className="flex flex-col w-2/5 h-7/8 gap-5 justify-center rounded-xl border border-slate-200 bg-white shadow-sm backdrop-blur py-8 px-6 overflow-auto">
                <header className="flex flex-col items-center">
                    <span className="text-xl font-extrabold">Create a Study Room</span>
                    <span className="text-slate-500 text-sm">Set the vibes and invite others.</span>
                </header>

                {/* Room Name */}
                <div className="relative">
                    <label className="mb-2 block font-semibold text-sm">Room Name</label>
                    <input
                        type="text"
                        required
                        maxLength="35"
                        placeholder="e.g. Calculus Midterm Prep"
                        value={formData.roomName}
                        onChange={(e) => {
                            setFormData({ ...formData, roomName: e.target.value })
                            if ((e.target.value).length >= rnMaxLength) {
                                setIsRNReached(true);
                            } else {
                                setIsRNReached(false);
                            }
                        }}
                        onKeyDown={(e) => preventEnterSubmit(e)}
                        className={`w-full rounded-md border border-slate-200 bg-transparent px-4 py-2 text-sm text-slate-900 outline-none
                                    ${isRNReached ? "focus:border-red-500" : "focus:border-blue-500"}`}
                    />
                    <label className="absolute text-sm right-4 -bottom-5 text-slate-500">{formData.roomName.length}/{rnMaxLength}</label>
                </div>

                {/**Subject, Intent, Duration */}
                <div className="flex gap-2 justify-between w-full">
                    {/**Subject */}
                    <div>
                        <label className="mb-2 block font-semibold text-sm">Subject</label>
                        <div className="flex items-center gap-3">
                            <Book size={18} className="text-slate-900" />
                            <select
                                required
                                value={formData.subject}
                                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                className="flex-1 rounded-md border border-slate-200 bg-transparent px-4 py-1 text-sm text-slate-900 outline-none hover:cursor-pointer
                                                        focus:border-blue-500 focus:outline-blue-200"
                            >
                                {subjectOptions.map(({ name }) => {

                                    return <option key={name} value={name} className="text-sm">{name}</option>

                                })}
                            </select>
                        </div>
                    </div>

                    {/**Intent */}
                    <div>
                        <label className="mb-2 block font-semibold text-sm">Intent</label>
                        <div className="flex items-center gap-3">

                            <select className="flex-1 rounded-md border border-slate-200 bg-transparent px-4 py-1 text-sm text-slate-900 outline-none hover:cursor-pointer focus:border-blue-500 focus:outline-blue-200"
                                required
                                value={formData.intent}
                                onChange={(e) => {
                                    setFormData({ ...formData, intent: e.target.value })
                                }}>
                                {intentOptions.map((intent) => {
                                    const { name } = intent;

                                    return (
                                        <option key={name} value={name} className="text-sm">{name}</option>
                                    )
                                })}
                            </select>
                        </div>
                    </div>

                    {/* Duration */}
                    <div>
                        <label className="mb-2 block font-semibold text-sm">Duration</label>
                        <div className="flex items-center gap-3">
                            <Clock size={18} className="text-slate-900" />
                            <select
                                required
                                value={formData.duration}
                                onChange={(e) => setFormData({ ...formData, duration: Number(e.target.value) })}
                                className="flex-1 rounded-md border border-slate-200 bg-transparent px-4 py-1 text-sm text-slate-900 outline-none
                                                        focus:border-blue-500 focus:outline-blue-200"
                            >
                                {durationOptions.map(({ minsValue, metric }) => {
                                    if (minsValue < 60) {
                                        return <option key={minsValue} value={minsValue}>{minsValue} Minutes</option>
                                    } else if (minsValue == 60) {
                                        return <option key={minsValue} value={minsValue}>{minsValue / 60} Hour</option>
                                    } else {
                                        return <option key={minsValue} value={minsValue}>{minsValue / 60} Hours</option>
                                    }
                                })}
                            </select>
                        </div>
                    </div>

                </div>

                {/**Room Description */}
                <div className="relative">
                    <label className="mb-2 block font-semibold text-sm">Room Description</label>
                    <textarea
                        rows="5"
                        maxLength="300"
                        placeholder="Set the rules. What kind of vibes do you want in your room? 🤔"
                        value={formData.description}
                        onChange={(e) => {
                            setFormData({ ...formData, description: e.target.value });
                            if ((e.target.value).length >= dMaxLength) {
                                setIsDReached(true);
                            } else {
                                setIsDReached(false);
                            }
                        }}
                        className={`w-full rounded-md border border-slate-200 bg-transparent px-4 py-2 text-sm text-slate-900 outline-none
                                   ${isDReached ? "focus:border-red-500" : "focus:border-blue-500"}`}
                    />
                    <label className="absolute text-sm right-4 -bottom-5 text-slate-500">{formData.description.length}/{dMaxLength}</label>
                </div>

                {/* Grid Settings */}
                <div className="grid grid-cols-2 gap-8">

                    {/* Room Vibes */}
                    <div className="flex flex-col gap-4">


                        {/**Camera Required */}
                        <div className="px-2">
                            <div className="flex items-center gap-2 font-semibold text-sm mb-1">
                                <Video size={18} />
                                <span>Camera Required</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <input
                                    type="checkbox"
                                    checked={formData.cameraRequired}
                                    onChange={(e) => setFormData({ ...formData, cameraRequired: e.target.checked })}
                                    className="focus:ring-blue-400 hover:cursor-pointer"
                                />
                                <div className="text-xs">Participants must have video on</div>

                            </div>
                        </div>

                        {/**Public Listing */}
                        <div className="px-2">
                            <div className="flex items-center gap-2 font-semibold text-sm mb-1">
                                <Globe size={18} />
                                <span>Public Listing</span>
                            </div>
                            <div className="flex items-center gap-3">
                                <input
                                    type="checkbox"
                                    checked={formData.isPublic}
                                    onChange={(e) => setFormData({ ...formData, isPublic: e.target.checked })}
                                    className="focus:ring-blue-400 hover:cursor-pointer"
                                />
                                <div className="text-xs">Anyone can join.</div>

                            </div>
                        </div>

                    </div>

                    {/**Who can Join */}
                    <InviteUsers formData={formData} setFormData={setFormData} />

                </div>

                {/* Actions */}
                <div className="flex justify-end gap-4">
                    <button type="button" className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3
                                                text-sm font-medium transition shadow-sm 
                                                text-slate-500 bg-transparent hover:cursor-pointer hover:bg-slate-100 hover:duration-150"
                        onClick={() => {
                            onClose();
                            setFormData(defaultForm);
                        }}>Cancel</button>
                    <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3
                                                text-sm font-semibold transition
                                                text-white shadow-md transition bg-gradient-to-r from-teal-400 to-blue-500
                                                hover:cursor-pointer hover:shadow-lg hover:-translate-y-[1px]"
                        onClick={() => {
                            if (formData.roomName !== "") {
                                // browser-safe unique ID; later: hostId / hostEmail can come from auth        
                                //We are setting the created room with fake currentParticipants being the invitees and some fake intentions that match the fake invitees                                                          

                                let fakeFilteredIntentions = [];

                                for (const invitee of formData.invitees) {
                                    console.log("invitee ", invitee);
                                    console.log(formData.invitees);
                                    const match = fakeIntentions.filter(i => i.firstName === invitee.firstName && i.lastName === invitee.lastName && i.universityEmail === invitee.universityEmail);
                                    fakeFilteredIntentions = [...fakeFilteredIntentions, ...match];
                                }

                                const newRoom = { ...formData, currentParticipants: [...formData.currentParticipants, ...formData.invitees], roomId: crypto.randomUUID(), intentions: [...fakeFilteredIntentions] };
                                onCreate(newRoom);
                                setFormData(defaultForm);
                            }

                        }}>Create Room</button>
                </div>
            </form>


        </div>
    );
};

export default CreateRoom;
