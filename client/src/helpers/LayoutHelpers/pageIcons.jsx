import {LayoutDashboard, Users, User, Clock, ListChecks, Calendar, NotepadText, ChartColumnBig, Book, CalendarDays, Inbox, CircleQuestionMark, StickyNote} from "lucide-react";
import { HiUser } from "react-icons/hi";

export const pageIcons = [
    { label: 'Dashboard', Icon: LayoutDashboard, pageRoute: 'dashboard', UserIcon: null, sliderLeft: "Tasks", sliderRight: "Calendar", sliderLeftIcon: ListChecks, sliderRightIcon: Calendar, sliderRightRoute: 'calendarSlider'},
    { label: 'Assignments', Icon: NotepadText, pageRoute: 'assignments', UserIcon: HiUser, sliderLeft: "Tasks", sliderRight: "Calendar", sliderLeftIcon: ListChecks, sliderRightIcon: Calendar, sliderRightRoute: 'calendarSlider' },
    { label: 'Notes', Icon: StickyNote, pageRoute: 'notes', UserIcon: HiUser, sliderLeft: "Tasks", sliderRight: "Calendar", sliderLeftIcon: ListChecks, sliderRightIcon: Calendar, sliderRightRoute: 'calendarSlider'  },
    { label: 'Grades', Icon: ChartColumnBig, pageRoute: 'grades', UserIcon: HiUser, sliderLeft: "Tasks", sliderRight: "Calendar", sliderLeftIcon: ListChecks, sliderRightIcon: Calendar, sliderRightRoute: 'calendarSlider' },
    { label: 'Courses', Icon: Book, pageRoute: 'courses', UserIcon: null, sliderLeft: "Tasks", sliderRight: "Calendar", sliderLeftIcon: ListChecks, sliderRightIcon: Calendar, sliderRightRoute: 'calendarSlider' },
    { label: 'Calendar', Icon: CalendarDays , pageRoute: 'calendar', UserIcon: null, sliderLeft: "Tasks", sliderRight: "Calendar", sliderLeftIcon: ListChecks, sliderRightIcon: Calendar, sliderRightRoute: 'calendarSlider' },
    { label: 'Inbox', Icon: Inbox, pageRoute: 'inbox', UserIcon: null, sliderLeft: "Tasks", sliderRight: "Calendar", sliderLeftIcon: ListChecks, sliderRightIcon: Calendar, sliderRightRoute: 'calendarSlider'},
    { label: 'Focus', Icon: Clock, pageRoute: 'peers', UserIcon: null, sliderLeft: "Peers", sliderRight: "Solo", sliderLeftIcon: Users, sliderRightIcon: User, sliderRightRoute: 'solo' },  //Should Focus page widget lead to Peers on default?
    { label: 'Help', Icon: CircleQuestionMark, pageRoute: 'help', UserIcon: null, sliderLeft: "Tasks", sliderRight: "Calendar", sliderLeftIcon: ListChecks, sliderRightIcon: Calendar, sliderRightRoute: 'calendarSlider'  },
  ]