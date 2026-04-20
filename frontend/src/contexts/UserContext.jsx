//UserContext
import {createContext} from "react";
export const UserContext = createContext();

//Provide Context
import { UserContext } from "./UserContext";

function App() {
    const user = "Mokshith";

  return (
    <UserContext.Provider value={user}>
      <Parent />
    </UserContext.Provider>
  );
}

//Consume Context
import { useContext } from "react";
import { UserContext } from "./UserContext";


function GrandChild() {
  const user = useContext(UserContext);
  return <h1>Hello {user}</h1>;
}

const [user, setUser] = useState("Mokshith");

<UserContext.Provider value={{user, setUser}}>

</UserContext.Provider>