import { useSelector } from "react-redux";
import "./Modal.css";
import { AppState } from "../../../Redux/AppState";
import UserModel from "../../../Models/UserModel";
import VacationModel from "../../../Models/VacationModel";
import { Button } from "@mui/material";

function Modal({ onClose }: { onClose: () => void }): JSX.Element {

    // get data from redux:
    const user = useSelector<AppState, UserModel>(appState => appState.user);
    const vacations = useSelector<AppState, VacationModel[]>(appState => appState.vacations);

    // create variables for august dates
    const startDateAugust2024 = new Date('2024-07-31');
    const endDateAugust2024 = new Date('2024-08-31');

    // Sort the August holidays to display them in modal
    const discountVacations = vacations.filter(vacation => {
        const startDate = new Date(vacation.startDate);
        return startDate >= startDateAugust2024 && startDate <= endDateAugust2024;
    });

    return (
        <div className="Modal">
            <div className='visible-modal'>
                <h2>Hello {user.firstName}, we happy to see you!</h2>
                <h4>For your information, we currently have promotions on all August vacations.</h4>
                <h5><span className="number-ten">10%</span> discount on vacations to: </h5>
                <div className="modal-vacations">{discountVacations.map(v =>
                    <div key={v.id}>
                        {v.destination} <br />
                        <img src={v.imageUrl} /></div>)}
                </div>

                <Button className="modal-close-button" variant="contained" sx={{
                    backgroundColor: 'rgb(46, 233, 189)',
                    '&:hover': {
                        backgroundColor: 'rgb(36, 186, 151)'
                    }
                }}
                    onClick={onClose}>Close</Button>
            </div>
        </div>
    );
}

export default Modal;
