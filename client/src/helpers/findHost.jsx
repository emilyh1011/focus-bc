import {fakeUsers} from "./fakeUsers.jsx";

export default function findHost(hFN, hLN, hEmail){
  for (const user of fakeUsers){
    if(hFN === user.firstName && hLN === user.lastName && user.universityEmail === hEmail){
      return user;
    }
  }
   return null;
};

