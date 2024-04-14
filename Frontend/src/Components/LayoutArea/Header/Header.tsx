import Logout from "../../AuthArea/Logout/Logout";
import "./Header.css";
import flightIcon from "../../../Assets/Images/flight.png"
import { useSelector } from "react-redux";
import { AppState } from "../../../Redux/AppState";
import UserModel from "../../../Models/UserModel";
import userImage from "../../../Assets/Images/profile-user.png"


function Header(): JSX.Element {
    // get user from redux
    const user = useSelector<AppState, UserModel>(appState => appState.user);

    return (
        <div className="Header">
            <h1>Dudi Tours <img src={flightIcon} /> </h1>
            <Logout />
            <div className="username">
                <span>{user.firstName} {user.lastName} &nbsp;<img className="user-image" src={userImage} /></span>
            </div>

        </div>
    );
}

export default Header;
