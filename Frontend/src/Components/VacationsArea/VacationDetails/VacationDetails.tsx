import { NavLink, useNavigate, useParams } from "react-router-dom";
import "./VacationDetails.css";
import { useEffect, useState } from "react";
import VacationModel from "../../../Models/VacationModel";
import { vacationsService } from "../../../Services/VacationsService";
import { notify } from "../../../Utils/Notify";
import { authService } from "../../../Services/AuthService";

function VacationDetails(): JSX.Element {
    const params = useParams();
    const [vacation, setVacation] = useState<VacationModel>();
    const [startDate, setStartDate] = useState<string>();
    const [endDate, setEndDate] = useState<string>();
    const navigate = useNavigate();

    const token = sessionStorage.getItem("token");
    useEffect(() => {
        if (!token) {
            // Handle case when token is not found
            navigate("/login");
            return;
        }
        // get all right details
        const id = +params.id;
        vacationsService.getOneVacation(id)
            .then(v => {
                const startDate = new Date(v.startDate);
                const endDate = new Date(v.endDate);
                startDate.setDate(startDate.getDate() + 1);
                endDate.setDate(endDate.getDate() + 1);
                const startDateString = startDate.toISOString().substring(0, 10);
                const endDateString = endDate.toISOString().substring(0, 10);
                setStartDate(startDateString);
                setEndDate(endDateString);
                setVacation(v);
            })
            .catch(err => notify.error(err));
    }, []); // Include params.id as a dependency

    return (
        <div className="VacationDetails">
            <NavLink className="back" to="/list">🔙</NavLink>
            <img className="VacationDetailsImage" src={vacation?.imageUrl} />
            <div className="details-content">
                <h1>{vacation?.destination}</h1>
                <p>{vacation?.description}</p>
                <div className="date-div"><strong>Start Date: </strong>{startDate}</div>
                <div className="date-div"><strong>End Date: </strong>{endDate}</div>
                <div className="price-div">
                    <strong>Price: </strong>
                    {vacationsService.isAugust2024(vacation?.startDate) ? (
                        <span>${vacationsService.calculateDiscountedPrice(vacation?.price)}</span>
                    ) : (
                        <span>${vacation?.price}</span>
                    )}
                </div>
            </div>
        </div>
    );
}

export default VacationDetails;
