import "./App.css";
import Login from "./components/Login";
import Mainmenu from "./components/Mainmenu";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

function App() {
    const isLoggedIn = false;
    if (isLoggedIn) {
        return <Mainmenu />;
    } else return <Login />;
}

export default App;
