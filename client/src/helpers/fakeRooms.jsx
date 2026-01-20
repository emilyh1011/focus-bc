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



export const fakeRooms = [
    {
        roomId: crypto.randomUUID(),
        hostFirstName: "Sebastien",
        hostLastName: "Bazizi",
        hostEmail: "sgb9066@stern.nyu.edu",
        roomName: "Consulting Interview Prep",
        subject: "Anything",
        description: "Did anyone else cancel their study abroad because they're graduating a year early? If you relate and are studying for upcoming consulting interviews, join me, and let's ace our case together.", 
        intent: "Silent Study", 
        duration: 180, 
        cameraRequired: false, 
        isPublic: true, 
        invitees: [{universityEmail: "willl@dartmouth.edu", picture: `${willLProfile}`, firstName: "Will", lastName: "Lynch", year: "4", university: "Dartmouth University", major: "Economics & Native American Studies"},
                {universityEmail: "dennisz@duke.edu", picture: `${dennisZProfile}`, firstName: "Dennis", lastName: "Zhan", year: "4", university: "Duke University", major: "Math & Economics"},
              {universityEmail: "js@vanderbiltu.edu", picture: `${jSilverProfile}`, firstName: "Jake", lastName: "Silver", year: "4", university: "Vanderbilt University", major: "Human and Organizational Development & Medicine, Health, and Society"},], 
        intentions: [ 
      { intentionId: crypto.randomUUID(), firstName: "Sebastien", lastName: "Bazizi", universityEmail: "sgb9066@stern.nyu.edu", picture: `${sbProfile}`, university: "New York University", major: "BPE & Finance", intention: "Preparing for my full-time consulting case interviews", kudos: 1, kudosFrom: [], done: true, assignment: null },
      { intentionId: crypto.randomUUID(), firstName: "Sebastien", lastName: "Bazizi", universityEmail: "sgb9066@stern.nyu.edu", picture: `${sbProfile}`, university: "New York University", major: "BPE & Finance", intention: "Send 10 cold emails.", kudos: 0, kudosFrom: [], done: false, assignment: null },
      { intentionId: crypto.randomUUID(), firstName: "Will", lastName: "Lynch", universityEmail: "willl@dartmouth.edu", picture: `${willLProfile}`, university: "Dartmouth University", major: "Economics & Native American Studies", intention: "Applying for MBA programs. Can't wait to be a Product Manager afterwards.", kudos: 1, kudosFrom: [], done: false, assignment: null },
      { intentionId: crypto.randomUUID(), firstName: "Dennis", lastName: "Zhan", universityEmail: "dennisz@duke.edu", picture: `${dennisZProfile}`, university: "Duke University", major: "Math & Economics", intention: "Doing my analysis homework.", kudos: 0, kudosFrom: [], done: true, assignment: { courseNumber: "MATH-UA325", courseName: "Analysis", entry: "Problem Set 3" } },
      { intentionId: crypto.randomUUID(), firstName: "Dennis", lastName: "Zhan", universityEmail: "dennisz@duke.edu", picture: `${dennisZProfile}`, university: "Duke University", major: "Math & Economics", intention: "Reading a poker stategy book for my next poker club tournament.", kudos: 2, kudosFrom: [], done: false, assignment: null },
    ],
      chat:[
        {chatId: crypto.randomUUID(), firstName: "Dennis", lastName: "Zhan", universityEmail: "dennisz@duke.edu",  picture: `${dennisZProfile}`, university: "Duke University", chat: "Ya we got this guys! Anyone going to the poker tournament in Maryland next weekend?"},
      ],
      currentParticipants: [{universityEmail: "sgb9066@stern.nyu.edu", picture: `${sbProfile}`, firstName: "Sebastien", lastName: "Bazizi", year: "3", university: "New York University", major: "BPE & Finance"},
            {universityEmail: "willl@dartmouth.edu", picture: `${willLProfile}`, firstName: "Will", lastName: "Lynch", year: "4", university: "Dartmouth University", major: "Economics & Native American Studies"},
              {universityEmail: "dennisz@duke.edu", picture: `${dennisZProfile}`, firstName: "Dennis", lastName: "Zhan", year: "4", university: "Duke University", major: "Math & Economics"},
              {universityEmail: "js@vanderbiltu.edu", picture: `${jSilverProfile}`, firstName: "Jake", lastName: "Silver", year: "4", university: "Vanderbilt University", major: "Human and Organizational Development & Medicine, Health, and Society"}, ] 
    },
    {
        roomId: crypto.randomUUID(),
        hostFirstName: "Alexandra",
        hostLastName: "Lu",
        hostEmail: "axl@fsu.edu",
        roomName: 'pharma hell',
        subject: 'Nursing',
        description: 'i am studying for pharmacology and i have to grind out… every. single. fucking. class.', 
        intent: "Collaborative", 
        duration: 60, 
        cameraRequired: true, 
        isPublic: true, 
        invitees: [
          { universityEmail: "sal@indianau.edu", picture: `${senjunLProfile}`, firstName: "Senjun", lastName: "Lu", year: "1", university: "Indiana University", major: "Accounting & Finance" },
          { universityEmail: "eh3244@nyu.edu", picture: `${emilyProfilePic}`, firstName: "Emily", lastName: "Han", year: "3", university: "New York University", major: "Computer Science" },
          {universityEmail: "oerj@nyu.edu", picture: `${oliviaJProfile}`, firstName: "Olivia", lastName: "Jackson", year: "3", university: "New York University", major: "Biology"},
          {universityEmail: "ebh@purdueu.edu", picture: `${eBHProfile}`, firstName: "Emily", lastName: "Hershey", year: "3", university: "Purdue University", major: "Computer Science & Data Science"},
        ], 
        intentions:[
          {intentionId: crypto.randomUUID(), firstName: "Alexandra", lastName: "Lu", universityEmail: "axl@fsu.edu", picture: `${aLProfile}`, university: "Florida State University", major: "Nursing", intention: "6 exams next 2 weeks. No breaks. pharm, and all my nursing classes. Can't catch a break.", kudos:3, kudosFrom: [], done: false, assignment: {courseNumber: "PHARM201", courseName: "Pharmacology", entry: "Pharmacology Final"}},
          {intentionId: crypto.randomUUID(), firstName: "Olivia", lastName: "Jackson", universityEmail: "oerj@nyu.edu", picture: `${oliviaJProfile}`, university: "New York University", major: "Biology", intention: "Studying for my majors organic chemistry. I should've just taken the regular organic chemistry.", kudos:0, kudosFrom: [], done: false, assignment: {courseNumber: "CHEM-UA227", courseName: "Majors Organic Chemistry", entry: "Lab Journal 1"}},
        ],
        chat:[
              {chatId: crypto.randomUUID(), firstName: "Alexandra", lastName: "Lu", universityEmail: "axl@fsu.edu", picture: `${aLProfile}`, university: "Florida State University", chat: "We got this!"},
              {chatId: crypto.randomUUID(), firstName: "Alexandra", lastName: "Lu", universityEmail: "axl@fsu.edu", picture: `${aLProfile}`, university: "Florida State University", chat: "Just gotta stop procrasinating first..."},   
        ],
        currentParticipants: [  {universityEmail: "axl@fsu.edu", picture: `${aLProfile}`, firstName: "Alexandra", lastName: "Lu", year: "3", university: "Florida State University", major: "Nursing"},
          { universityEmail: "sal@indianau.edu", picture: `${senjunLProfile}`, firstName: "Senjun", lastName: "Lu", year: "1", university: "Indiana University", major: "Accounting & Finance" },
          {universityEmail: "oerj@nyu.edu", picture: `${oliviaJProfile}`, firstName: "Olivia", lastName: "Jackson", year: "3", university: "New York University", major: "Biology"},
          {universityEmail: "ebh@purdueu.edu", picture: `${eBHProfile}`, firstName: "Emily", lastName: "Hershey", year: "3", university: "Purdue University", major: "Computer Science & Data Science"},
        ] 
    },
    {
        roomId: crypto.randomUUID(),
        hostFirstName: "Emily",
        hostLastName: "Hershey",
        hostEmail: "ebh@purdueu.edu",
        roomName: 'become an SQL Pro in 2 weeks‼️',
        subject: 'Data Science',
        description: "I have a final round interview in 2 weeks, and this is my biggest opportunity yet. I need to become an SQL pro and maximize all my skills. SQL in silence for 2.5 hours.", 
        intent: "Collaborative", 
        duration: 150, 
        cameraRequired: true, 
        isPublic: true, 
        invitees: [ {universityEmail: "axl@fsu.edu", picture: `${aLProfile}`, firstName: "Alexandra", lastName: "Lu", year: "3", university: "Florida State University", major: "Nursing"},
          { universityEmail: "sal@indianau.edu", picture: `${senjunLProfile}`, firstName: "Senjun", lastName: "Lu", year: "1", university: "Indiana University", major: "Accounting & Finance" },
          { universityEmail: "helenqf@jilinu.edu", picture: `${helenFProfile}`, firstName: "Helen", lastName: "Feng", year: "4", university: "Jilin University", major: "Mathematics" },
          { universityEmail: "hn@nyu.edu", picture: `${haleyNProfile}`, firstName: "Haley", lastName: "Ngai", year: "3", university: "New York University", major: "Interactive Media Arts" },
          { universityEmail: "lcl@wesleyanu.edu", picture: `${lisaLProfile}`, firstName: "Lisa", lastName: "Lu", year: "3", university: "Wesley University", major: "Art & Psychology" },
          {universityEmail: "alg@berkleemusic.edu", picture: `${avaGProfile}`, firstName: "Ava", lastName: "Green", year: "3", university: "Berklee College of Music", major: "Audio Engineering"},
          {universityEmail: "sbd@americanu.edu", picture: `${sydneyDProfile}`, firstName: "Sydney", lastName: "Dakss", year: "3", university: "American University", major: "Communication and Media Studies"},
          {universityEmail: "mg@brandeisu.edu", picture: `${miriamGProfile}`, firstName: "Miriam", lastName: "Grodin", year: "3", university: "Brandeis University", major: "English, Creative Writing, & Environmental Studies"},
        ], 
        chat:[
          {chatId: crypto.randomUUID(), firstName: "Alexandra", lastName: "Lu", universityEmail: "axl@fsu.edu", picture: `${aLProfile}`, university: "Florida State University", chat: "We got this!"},
              {chatId: crypto.randomUUID(), firstName: "Alexandra", lastName: "Lu", universityEmail: "axl@fsu.edu", picture: `${aLProfile}`, university: "Florida State University", chat: "Just gotta stop procrasinating first..."},
              {chatId: crypto.randomUUID(), firstName: "Lisa", lastName: "Lu", universityEmail: "lcl@wesleyanu.edu", picture: `${lisaLProfile}`,university: "Wesleyan University", chat: "Hahaha I don't play poker, but I will be in Maryland this weekend for my art showcase."},
                 {chatId: crypto.randomUUID(), firstName: "Haley", lastName: "Ngai", universityEmail: "hn@nyu.edu", picture: `${haleyNProfile}`, university: "New York University", chat: "LISA COME TO NEW YORK"},
                 {chatId: crypto.randomUUID(), firstName: "Lisa", lastName: "Lu", universityEmail: "lcl@wesleyanu.edu", picture: `${lisaLProfile}`,university: "Wesleyan University", chat: "I will come after the showcase:)"},
             
        ],
        intentions: [
          {intentionId: crypto.randomUUID(), firstName: "Emily", lastName: "Hershey", universityEmail:"ebh@purdueu.edu", picture: `${eBHProfile}`, university: "Purdue University", major: "Computer Science & Data Science", intention: "Master my SQL.", kudos:1, kudosFrom: [], done: false, assignment: null},
          {intentionId: crypto.randomUUID(), firstName: "Alexandra", lastName: "Lu", universityEmail: "axl@fsu.edu", picture: `${aLProfile}`, university: "Florida State University", major: "Nursing", intention: "6 exams next 2 weeks. No breaks. pharm, and all my nursing classes. Can't catch a break.", kudos:3, kudosFrom: [], done: false, assignment: {courseNumber: "PHARM201", courseName: "Pharmacology", entry: "Pharmacology Final"}},
          {intentionId: crypto.randomUUID(), firstName: "Lisa", lastName: "Lu", universityEmail: "lcl@wesleyanu.edu", picture: `${lisaLProfile}`,university: "Wesleyan University", major: "Art & Psychology", intention: "Booking my all-around Asia trip. Have to book my flights to China, Japan, and Hong Kong.",kudos:5, kudosFrom: [], done: false, assignment: null},
          {intentionId: crypto.randomUUID(), firstName: "Haley", lastName: "Ngai", universityEmail: "hn@nyu.edu", picture: `${haleyNProfile}`, university: "New York University", major: "Interactive Media Arts", intention: "Looking over my events app google form user research. Need to summarize these findings into actionable designs", kudos:3, kudosFrom: [], done: false, assignment: null},
        ],
        currentParticipants: [{universityEmail: "ebh@purdueu.edu", picture: `${eBHProfile}`, firstName: "Emily", lastName: "Hershey", year: "3", university: "Purdue University", major: "Computer Science & Data Science"},
          {universityEmail: "axl@fsu.edu", picture: `${aLProfile}`, firstName: "Alexandra", lastName: "Lu", year: "3", university: "Florida State University", major: "Nursing"},
          { universityEmail: "sal@indianau.edu", picture: `${senjunLProfile}`, firstName: "Senjun", lastName: "Lu", year: "1", university: "Indiana University", major: "Accounting & Finance" },
          { universityEmail: "helenqf@jilinu.edu", picture: `${helenFProfile}`, firstName: "Helen", lastName: "Feng", year: "4", university: "Jilin University", major: "Mathematics" },
          { universityEmail: "hn@nyu.edu", picture: `${haleyNProfile}`, firstName: "Haley", lastName: "Ngai", year: "3", university: "New York University", major: "Interactive Media Arts" },
          { universityEmail: "lcl@wesleyanu.edu", picture: `${lisaLProfile}`, firstName: "Lisa", lastName: "Lu", year: "3", university: "Wesley University", major: "Art & Psychology" },
          {universityEmail: "alg@berkleemusic.edu", picture: `${avaGProfile}`, firstName: "Ava", lastName: "Green", year: "3", university: "Berklee College of Music", major: "Audio Engineering"},
          {universityEmail: "sbd@americanu.edu", picture: `${sydneyDProfile}`, firstName: "Sydney", lastName: "Dakss", year: "3", university: "American University", major: "Communication and Media Studies"},
          {universityEmail: "mg@brandeisu.edu", picture: `${miriamGProfile}`, firstName: "Miriam", lastName: "Grodin", year: "3", university: "Brandeis University", major: "English, Creative Writing, & Environmental Studies"},
        ] 
    },
    {
        roomId: crypto.randomUUID(),
        hostFirstName: "Dennis",
        hostLastName: "Zhan",
        hostEmail: "dennisz@duke.edu",
        roomName: 'Apply for Masters Finance Programs',
        subject: 'Finance',
        description: 'I decided I want to go back to school to study more specialized skills in fixed income trading. Hopefully, I will be an ETF trader in a hedge fund in the future.', 
        intent: "Silent Study", 
        duration: 30, 
        cameraRequired: true, 
        isPublic: true, 
        invitees: [ {universityEmail: "willl@dartmouth.edu", picture: `${willLProfile}`, firstName: "Will", lastName: "Lynch", year: "4", university: "Dartmouth University", major: "Economics & Native American Studies"},
                {universityEmail: "helenqf@jilinu.edu", picture: `${helenFProfile}`, firstName: "Helen", lastName: "Feng", year: "4", university: "Jilin University", major: "Mathematics"},
               ], 
        intentions: [
          {intentionId: crypto.randomUUID(), firstName: "Dennis", lastName: "Zhan", universityEmail: "dennisz@duke.edu",  picture: `${dennisZProfile}`, university: "Duke University", major: "Math & Economics", intention: "Finish Princeton Masters of Finance application.", kudos:2, kudosFrom: [], done: false, assignment: null},
          {intentionId: crypto.randomUUID(), firstName: "Will", lastName: "Lynch", universityEmail: "willl@dartmouth.edu", picture: `${willLProfile}`, university: "Dartmouth University", major: "Economics & Native American Studies", intention: "Applying for MBA programs. Can't wait to be a Product Manager afterwards.", kudos:1, kudosFrom: [], done: false, assignment: null},
        ],
        chat:[
            {chatId: crypto.randomUUID(), firstName: "Dennis", lastName: "Zhan", universityEmail: "dennisz@duke.edu",  picture: `${dennisZProfile}`, university: "Duke University", chat: "Ya we got this guys! Anyone going to the poker tournament in Maryland next weekend?"},
        ],
        currentParticipants: [{universityEmail: "dennisz@duke.edu", picture: `${dennisZProfile}`, firstName: "Dennis", lastName: "Zhan", year: "4", university: "Duke University", major: "Math & Economics"},
        {universityEmail: "willl@dartmouth.edu", picture: `${willLProfile}`, firstName: "Will", lastName: "Lynch", year: "4", university: "Dartmouth University", major: "Economics & Native American Studies"},
                {universityEmail: "helenqf@jilinu.edu", picture: `${helenFProfile}`, firstName: "Helen", lastName: "Feng", year: "4", university: "Jilin University", major: "Mathematics"},
               ]
    },
    {
        roomId: crypto.randomUUID(),
        hostFirstName: "Senjun",
        hostLastName: "Lu",
        hostEmail: "sal@indianau.edu",
        roomName: "I'm a freshman looking for friends.",
        subject: 'Anything',
        description: "Hello, my name is Senjun (Alex) Lu, and I'm a freshman at Indiana University studying Accounting and Finance. In my free time, I like playing basketball and soccer. I also like video games.", 
        intent: "Collaborative", 
        duration: 60, 
        cameraRequired: false, 
        isPublic: true, 
        invitees: [], 
        intentions: [ {intentionId: crypto.randomUUID(), firstName: "Senjun", lastName: "Lu", universityEmail: "sal@indianau.edu", picture: `${senjunLProfile}`, university: "Indiana University", major: "Accounting & Finance", intention: "Make 5 friends today.", kudos:2, kudosFrom: [], done: false, assignment: null},],
        currentParticipants: [{intentionId: crypto.randomUUID(), firstName: "Senjun", lastName: "Lu", universityEmail: "sal@indianau.edu", picture: `${senjunLProfile}`, university: "Indiana University", major: "Accounting & Finance", intention: "Make 5 friends today.", kudos:2, kudosFrom: [], done: false, assignment: null},]
    },
    {
        roomId: crypto.randomUUID(),
        hostFirstName: "Haley",
        hostLastName: "Ngai",
        hostEmail: "hn@nyu.edu",
        roomName: "UI/UX Interview Prep",
        subject: 'Computer Science',
        description: "All things design and frontend.", 
        intent: "Collaborative", 
        duration: 60, 
        cameraRequired: false, 
        isPublic: true, 
        invitees: [], 
        intentions: [ {intentionId: crypto.randomUUID(), firstName: "Lisa", lastName: "Lu", universityEmail: "lcl@wesleyanu.edu", picture: `${lisaLProfile}`,university: "Wesleyan University", major: "Art & Psychology", intention: "Booking my all-around Asia trip. Have to book my flights to China, Japan, and Hong Kong.",kudos:5, kudosFrom: [], done: false, assignment: null},
            {intentionId: crypto.randomUUID(), firstName: "Haley", lastName: "Ngai", universityEmail: "hn@nyu.edu", picture: `${haleyNProfile}`, university: "New York University", major: "Interactive Media Arts", intention: "Looking over my events app google form user research. Need to summarize these findings into actionable designs", kudos:3, kudosFrom: [], done: false, assignment: null},
           ],
           chat:[
             {chatId: crypto.randomUUID(), firstName: "Haley", lastName: "Ngai", universityEmail: "hn@nyu.edu", picture: `${haleyNProfile}`, university: "New York University", chat: "LISA COME TO NEW YORK"},
                {chatId: crypto.randomUUID(), firstName: "Lisa", lastName: "Lu", universityEmail: "lcl@wesleyanu.edu", picture: `${lisaLProfile}`,university: "Wesleyan University", chat: "I will come after the showcase:)"},
           ],
        currentParticipants: [ {intentionId: crypto.randomUUID(), firstName: "Lisa", lastName: "Lu", universityEmail: "lcl@wesleyanu.edu", picture: `${lisaLProfile}`,university: "Wesleyan University", major: "Art & Psychology", intention: "Booking my all-around Asia trip. Have to book my flights to China, Japan, and Hong Kong.",kudos:5, kudosFrom: [], done: false, assignment: null},
            {intentionId: crypto.randomUUID(), firstName: "Haley", lastName: "Ngai", universityEmail: "hn@nyu.edu", picture: `${haleyNProfile}`, university: "New York University", major: "Interactive Media Arts", intention: "Looking over my events app google form user research. Need to summarize these findings into actionable designs", kudos:3, kudosFrom: [], done: false, assignment: null},
          ]
    }
];