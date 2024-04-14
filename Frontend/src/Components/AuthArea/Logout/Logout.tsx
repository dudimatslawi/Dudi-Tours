import { useSelector } from "react-redux";
import { AppState } from "../../../Redux/AppState";
import UserModel from "../../../Models/UserModel";
import { NavLink } from "react-router-dom";
import { notify } from "../../../Utils/Notify";
import { authService } from "../../../Services/AuthService";
import imageSource from "../../../Assets/Images/log-out.png";
import "./Logout.css";

function Logout(): JSX.Element {

    // get user from redux:
    const user = useSelector<AppState, UserModel>(appState => appState.user);

    // apply logout function from the service:
    async function logMeOut() {
        notify.success(`bye bye ${user.firstName}`)
        authService.logout();
    }

    if (user) {
        return (
            <div className="Logout">
                <NavLink to="/login" onClick={logMeOut}>
                    <span className="logout-text">Logout</span>
                    <img className="image" src={imageSource} />
                </NavLink>
            </div>
        )
    }
    return (
        <div className="Logout">

        </div>
    )
}

export default Logout;
