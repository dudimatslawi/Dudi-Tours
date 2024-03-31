import { Route, Routes } from "react-router-dom";
import Page404 from "../page404/page404";
import "./Routing.css";
import Login from "../../AuthArea/Login/Login";
import SignUp from "../../AuthArea/SignUp/SignUp";
import List from "../../VacationsArea/VacationList/VacationList";
import AddVacation from "../../VacationsArea/AddVacation/AddVacation";
import VacationDetails from "../../VacationsArea/VacationDetails/VacationDetails";
import EditVacation from "../../VacationsArea/EditVacation/EditVacation";
import Reports from "../../ReportsArea/Reports/Reports";


function Routing(): JSX.Element {
    return (
        <div className="Routing">

            <Routes>


                {/* List: */}
                <Route path="/list" element={<List />} />

                {/* Add: */}
                <Route path="/addVacation" element={<AddVacation />} />

                {/* vacation details */}
                <Route path="/vacations/details/:id" element={<VacationDetails />} />

                {/* vacation details */}
                <Route path="/vacations/edit/:id" element={<EditVacation />} />

                {/* vacation details */}
                <Route path="/reports" element={<Reports />} />

                {/* Login */}
                <Route path="/login" element={<Login />} />

                {/* signUp */}
                <Route path="/signUp" element={<SignUp />} />

                {/* Default Route: */}
                <Route path="/" element={<Login />} />

                {/* Page not found route: */}
                <Route path="*" element={<Page404 />} />

            </Routes>

        </div>
    );
}

export default Routing;
