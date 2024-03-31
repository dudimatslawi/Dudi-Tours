import { useForm } from "react-hook-form";
import "./EditVacation.css";
import VacationModel from "../../../Models/VacationModel";
import { notify } from "../../../Utils/Notify";
import { vacationsService } from "../../../Services/VacationsService";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, TextField } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import { authService } from "../../../Services/AuthService";
import { appStore } from "../../../Redux/store";
import { RoleModel } from "../../../Models/RoleModel";

function EditVacation(): JSX.Element {

    const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm<VacationModel>();
    const [imageUrl, setImageUrl] = useState<string>();
    const navigate = useNavigate();
    const params = useParams();
    const id = +params.id

    const token = sessionStorage.getItem("token");
    useEffect(() => {
        if (!token) {
            // Handle case when token is not found
            navigate("/login");
            return;
        }
        if (appStore.getState().user?.roleId === RoleModel.User) {
            navigate("/list")
        }
    }, [])

    const startDate = watch("startDate");
    const validateEndDate = (value: string) => {
        const startDateObj = new Date(startDate);
        const endDateObj = new Date(value);
        if (endDateObj <= startDateObj) {
            return "* End date must be greater than start date";
        }
        return true;
    };

    async function edit(vacation: VacationModel): Promise<void> {
        try {
            // extract first image from fileList into product.image
            vacation.image = (vacation.image as unknown as FileList)[0];
            vacation.id = id;
            await vacationsService.updateVacation(vacation);
            notify.success("vacation has been updated.");
            navigate("/vacations/details/" + vacation.id)
        }
        catch (err: any) {
            notify.error(err)
        }
    }

    useEffect(() => {

        vacationsService.getOneVacation(id)
            .then(vacation => {

                // Parse start and end dates into Date objects
                const startDate = new Date(vacation.startDate);
                const endDate = new Date(vacation.endDate);

                // Add one day to the dates
                startDate.setDate(startDate.getDate() + 1);
                endDate.setDate(endDate.getDate() + 1);

                // Convert the updated dates back to string format
                const startDateString = startDate.toISOString().substring(0, 10);
                const endDateString = endDate.toISOString().substring(0, 10);

                setValue("destination", vacation.destination);
                setValue("description", vacation.description);
                setValue("startDate", startDateString);
                setValue("endDate", endDateString);
                setValue("price", vacation.price);
                setImageUrl(vacation.imageUrl);
            })
            .catch(err => notify.error(err))
    }, [])


    return (
        <div className="EditVacation">
            <NavLink className="back" to="/list">🔙</NavLink>

            <form onSubmit={handleSubmit(edit)}>
                <h1>Edit</h1>
                <div className="input-group flex-nowrap">
                    <span className="input-group-text" id="addon-wrapping">Destination:</span>
                    <input type="text" className="form-control" aria-describedby="addon-wrapping" required minLength={2} maxLength={50}  {...register("destination")} />
                </div>

                <div className="input-group flex-nowrap">
                    <span className="input-group-text" id="addon-wrapping">Description: </span>
                    <textarea className="form-control" aria-describedby="addon-wrapping" required minLength={30} maxLength={1500} {...register("description")} />
                </div>

                <div className="input-group flex-nowrap">
                    <span className="input-group-text" id="addon-wrapping">Start date: </span>
                    <input type="date" className="form-control" aria-describedby="addon-wrapping" required {...register("startDate")} />
                </div>

                <div className="input-group flex-nowrap">
                    <span className="input-group-text" id="addon-wrapping">End date: </span>
                    <input type="date" className="form-control" aria-describedby="addon-wrapping"  {...register("endDate", { required: true, validate: validateEndDate })} />
                </div>
                {errors.endDate && <span className="endDateValidation">{errors.endDate.message}</span>}


                <div className="input-group flex-nowrap">
                    <span className="input-group-text" id="addon-wrapping">Price: </span>
                    <input className="form-control" aria-describedby="addon-wrapping" type="number" step={0.01} required min={100} max={9999} {...register("price")} />
                </div>


                <div className="mb-3">
                    <input className="form-control" type="file" id="formFile" {...register("image")} onChange={(image: any) => {
                        if (image.target.files && image.target.files[0]) {
                            setImageUrl(URL.createObjectURL(image.target.files[0]));
                        }

                    }} />
                </div>
                <button className="send-button">
                    <span> Edit </span>
                </button>


                <img className="vacation-image-form" src={imageUrl} />
            </form>

        </div>
    );
}

export default EditVacation;
