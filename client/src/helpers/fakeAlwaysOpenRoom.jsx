import sbProfile from "../../public/sebastienBProfile.png";
import eBHProfile from "../../public/emilyBHProfile.png";
import aLProfile from "../../public/alexandraLProfile.png";
import willLProfile from "../../public/willLProfile.png";
import senjunLProfile from "../../public/senjunLProfile.png";
import helenFProfile from "../../public/helenFProfile.png";
import dennisZProfile from "../../public/dennisZProfile.png";
import jSilverProfile from "../../public/jSilverProfile.png";
import haleyNProfile from "../../public/haleyNProfile.png";
import lisaLProfile from "../../public/lisaLProfile.png";
import miriamGProfile from "../../public/miriamGProfile.png";
import avaGProfile from "../../public/avaGProfile.png";
import sydneyDProfile from "../../public/sydneyDProfile.png";
import oliviaJProfile from "../../public/oliviaJProfile.png";
import emilyProfilePic from "../../public/emilyProfilePic.jpeg";
import { fakeIntentions } from "./fakeIntentions";
import { fakeChat } from "./fakeChat";

export const fakeAlwaysOpenRoom = {
        roomId: "study-hall", //special case for the always open room. In all other cases, generates random roomId on creation.
        hostFirstName: "Jake",
        hostLastName: "Silver",
        hostEmail: "jsilver@bettercampus.com",
        hostUniversity: "Better Campus",
        roomName: 'Study Hall',
        subject: 'Anything', 
        description: 'This is the Better Campus official hosted study room. Join our study hall :)', 
        intent: "Silent Study", 
        duration: 1440, 
        cameraRequired: true, 
        isPublic: true, 
        invitees: [],
        intentions: [...fakeIntentions],
        chat: [...fakeChat],
        currentParticipants: [ {universityEmail: "jsilver@bettercampus.com", picture: `${jSilverProfile}`, firstName: "Jake", lastName: "Silver", year: "cofounder", university: "Better Campus", major: ""},
        {universityEmail: "sgb9066@stern.nyu.edu", picture: `${sbProfile}`, firstName: "Sebastien", lastName: "Bazizi", year: "3", university: "New York University", major: "BPE & Finance"},
        {universityEmail: "ebh@purdueu.edu", picture: `${eBHProfile}`, firstName: "Emily", lastName: "Hershey", year: "3", university: "Purdue University", major: "Computer Science & Data Science"},
        {universityEmail: "axl@fsu.edu", picture: `${aLProfile}`, firstName: "Alexandra", lastName: "Lu", year: "3", university: "Florida State University", major: "Nursing"},
        {universityEmail: "sal@indianau.edu", picture: `${senjunLProfile}`, firstName: "Senjun", lastName: "Lu", year: "1", university: "Indiana University", major: "Accounting & Finance"},
        {universityEmail: "willl@dartmouth.edu", picture: `${willLProfile}`, firstName: "Will", lastName: "Lynch", year: "4", university: "Dartmouth University", major: "Economics & Native American Studies"},
        {universityEmail: "dennisz@duke.edu", picture: `${dennisZProfile}`, firstName: "Dennis", lastName: "Zhan", year: "4", university: "Duke University", major: "Math & Economics"},
        {universityEmail: "helenqf@jilinu.edu", picture: `${helenFProfile}`, firstName: "Helen", lastName: "Feng", year: "4", university: "Jilin University", major: "Mathematics"},
        {universityEmail: "hn@nyu.edu", picture: `${haleyNProfile}`, firstName: "Haley", lastName: "Ngai", year: "3", university: "New York University", major: "Interactive Media Arts"},
        {universityEmail: "lcl@wesleyanu.edu", picture: `${lisaLProfile}`, firstName: "Lisa", lastName: "Lu", year: "3", university: "Wesley University", major: "Art & Psychology"},
        {universityEmail: "oerj@nyu.edu", picture: `${oliviaJProfile}`, firstName: "Olivia", lastName: "Jackson", year: "3", university: "New York University", major: "Biology"},
        {universityEmail: "alg@berkleemusic.edu", picture: `${avaGProfile}`, firstName: "Ava", lastName: "Green", year: "3", university: "Berklee College of Music", major: "Audio Engineering"},
        {universityEmail: "sbd@americanu.edu", picture: `${sydneyDProfile}`, firstName: "Sydney", lastName: "Dakss", year: "3", university: "American University", major: "Communication and Media Studies"},
        {universityEmail: "mg@brandeisu.edu", picture: `${miriamGProfile}`, firstName: "Miriam", lastName: "Grodin", year: "3", university: "Brandeis University", major: "English, Creative Writing, & Environmental Studies"},
        ] //Pretend all my fake users except me in it right now
  }