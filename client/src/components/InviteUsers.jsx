import { useState } from 'react';
import {X, ContactRound} from 'lucide-react'
import { preventEnterSubmit } from "../helpers/preventEnterSubmit";
import { fakeUsers } from '../helpers/fakeUsers';

//CreateRoom Form's Invite Users section
function InviteUsers({formData, setFormData}){
    
    const [userSearchQuery, setUserSearchQuery] = useState(""); //For filtering the user searchbar
    
    //Hide filtered results when user loses focus(onblur) from search bar input field
    const [hideFilteredResults, setHideFilteredResults] = useState(false);
    const [filteredUsers, setFilteredUsers] = useState([]);

    function handleSearch(e){
        setUserSearchQuery(e.target.value);
        console.log(e.target.value);

        const query = e.target.value.toLowerCase();

        const matches = fakeUsers.filter((user) => {
            //Check to make sure the the userSearchQuery is actually not empty
            //Filter search results if we see the first name, last name, or username start to match.
            const matchedUser = e.target.value && (user.firstName.toLowerCase().includes(query) ||
                user.lastName.toLowerCase().includes(query) ||
                user.universityEmail.toLowerCase().includes(query));
            return matchedUser;

        }).slice(0, 5); //Only display at most 5 matched results
        setFilteredUsers(matches);
    }
    
    return (
        <div className="flex flex-col gap-3">
            {/* Invite Only or Invite & Random */}
            <div className="flex flex-col rounded-lg justify-center">
                <span className="text-sm font-semibold mb-2">Invite Friends</span>

                {/**Search Bar & FilteredResults*/}
                <div className="flex w-full">

                    {/**User Search Bar Wrapper, only apply outline when focus-within(the inner input is focused) */}
                    <div className="flex rounded-lg px-3 py-2  w-full gap-2 items-center bg-slate-50 drop-shadow-md hover:bg-slate-50 hover:cursor-pointer focus-within:outline focus-within:outline-blue-500">

                        <ContactRound size={18} />
                        {/**Actual Input Bar */}
                        <input type="text"
                            value={userSearchQuery}
                            placeholder="Get to know your classmates."
                            className="w-full text-sm focus:outline-none hover:cursor-pointer"
                            onChange={(e) => {
                                handleSearch(e);
                            }}
                            onBlur={() => {
                                setHideFilteredResults(true);
                            }}
                            onFocus={() => {
                                setHideFilteredResults(false);
                            }}
                            onKeyDown={(e) => preventEnterSubmit(e)}
                        />
                    </div>

                </div>


                {/**Filtered Results */}
                <div className="flex flex-col w-full mt-1">
                    {/**Once we select a user, stop showing filtered search results & clear the search query
                                     * Or once a user loses focus from search bar, stop showing filtered search results
                                     */}
                    {!hideFilteredResults && userSearchQuery && filteredUsers.length > 0 && filteredUsers.map((user) => {
                        return (
                            <div key={user.universityEmail} className="flex rounded-xl bg-white p-1 gap-2 items-center hover:bg-slate-50 hover:cursor-pointer active:bg-slate-100"
                                //OnClick fires after onMouseDown and possible onFocus/onBlur --> Problem: Think clicked on search result but onblur(hid filtered search results). 
                                // Result clicked on disappears from underneath before could click to add user.
                                onMouseDown={(e) => {     //onMouseDown fires instantly after clicking to add user
                                    e.preventDefault(); //Prevent onBlur default behavior of re-rendering(from updating hilteredResults state) that hid list long enough to add user

                                    //Only add selected user if not already in invitees list, check by comparing unique email addresses.
                                    const isUserInInvitees = formData.invitees.some((invitee) => invitee.universityEmail === user.universityEmail);
                                    console.log(isUserInInvitees);

                                    if (isUserInInvitees) {
                                        //Don't add, already invited.
                                    } else {
                                        setFormData({ ...formData, invitees: [...formData.invitees, user] }); //Like Google Drive, after click on user, rendered in a list
                                    }

                                    setUserSearchQuery('');
                                    setFilteredUsers([]);
                                }}>

                                <img src={user.picture} className="w-6 h-6 rounded-lg" />

                                <div className="flex flex-col">
                                    <span className="text-xs text-slate-900">{user.firstName} {user.lastName}</span>
                                    <span className="text-xs text-slate-500">{user.universityEmail}</span>
                                </div>
                            </div>
                        )
                    })}
                </div>


                <div className="flex flex-wrap w-full items-center mt-2 gap-1">
                    {/**Render the invitees */}
                    {formData.invitees && formData.invitees.map((user) => {
                        return (
                            <div key={user.universityEmail} className="flex rounded-lg items-center bg-white py-1 px-2 gap-1 outline outline-slate-400 hover:bg-slate-50 hover:duration-150 hover:cursor-pointer">
                                <div className="flex items-center gap-1">
                                    <img src={user.picture}
                                        className="w-6 h-6 rounded-lg" />
                                    <span className="text-xs text-slate-900">{user.firstName} {user.lastName}</span>
                                </div>

                                <X size={18}
                                    className="text-slate-500 hover:cursor-pointer hover:bg-slate-100 hover:duration-150"
                                    onClick={() => {
                                        //Remove user from invitee list. Keep invitees who aren't the same as user
                                        const withoutInvitee = formData.invitees.filter((invitee) => invitee.universityEmail !== user.universityEmail);
                                        setFormData({ ...formData, invitees: withoutInvitee });
                                    }} />
                            </div>
                        );
                    })}

                </div>

            </div>

        </div>
    )
}

export default InviteUsers;