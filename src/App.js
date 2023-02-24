import "./App.css";
import Login from "./components/Login";
import Mainmenu from "./components/Mainmenu";

function App() {
    const isLoggedIn = false;
    if (isLoggedIn) {
        return <Mainmenu />;
    } else return <Login />;
}

export default App;
