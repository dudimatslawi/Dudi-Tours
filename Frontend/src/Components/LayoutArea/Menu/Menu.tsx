import { NavLink } from "react-router-dom";
import "./Menu.css";
import Header from "../Header/Header";

function Menu(): JSX.Element {

    return (
        <div className="Menu">
            
            <nav className="navbar navbar-expand-lg ">
                <div className="container-fluid">
                    <Header />
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <NavLink className="nav-link" to="/list">List</NavLink>
                            <NavLink className="nav-link" to="/addVacation">New</NavLink>
                            <NavLink className="nav-link" to="/reports">Reports</NavLink>
                        </div>
                    </div>
                </div>
            </nav>


        </div>
    );
}

export default Menu;
