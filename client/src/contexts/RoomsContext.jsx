import {createContext} from 'react';

//1. From external file, create our context RoomsContext with default value null
//2. Use our context in child components that need it: ex: Peers.jsx , 
    // import RoomsContext from external file; 
    // const {rooms, setRooms} = useContext(RoomsContext);
//3. Provide our context in a context provider in parent component that will specify the data: Layout.jsx
  // Layout.jsx specifies the data: const [rooms, setRooms] = useState([alwaysOpenRoom]);
  //Layout.jsx provides the specified data in context provider: 
    //<RoomsContext value = {{rooms, setRooms}}>
    //        <Outlet/>
    //</RoomsContext>

export const RoomsContext = createContext(null);
