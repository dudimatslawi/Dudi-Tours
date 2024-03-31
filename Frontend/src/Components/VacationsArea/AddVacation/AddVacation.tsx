import { set, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import "./AddVacation.css";
import VacationModel from "../../../Models/VacationModel";
import { vacationsService } from "../../../Services/VacationsService";
import { notify } from "../../../Utils/Notify";
import { NavLink, useNavigate } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import { authService } from "../../../Services/AuthService";
import { appStore } from "../../../Redux/store";
import { RoleModel } from "../../../Models/RoleModel";



function AddVacation(): JSX.Element {

    const { register, handleSubmit, formState: { errors }, watch } = useForm<VacationModel>();
    const [imageUrl, setImageUrl] = useState<string>();

    // Retrieve token from session storage
    const navigate = useNavigate()

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

    async function send(vacation: VacationModel): Promise<void> {
        // Extract first image from fileList into product.image
        vacation.image = (vacation.image as unknown as FileList)[0];



        try {
            await vacationsService.addVacation(vacation);
            notify.success("Vacation has been added. ✈️");
            navigate("/list");
        } catch (err: any) {
            notify.error(err);
        }
    }

    const validateEndDate = (value: string) => {
        const startDateObj = new Date(startDate);
        const endDateObj = new Date(value);
        if (endDateObj <= startDateObj) {
            return "* End date must be greater than start date";
        }
        return true;
    };

    return (
        <div className="addVacation">
            <form onSubmit={handleSubmit(send)}>
                <h1>Add vacation</h1>
                <div className="input-group flex-nowrap">
                    <span className="input-group-text" id="addon-wrapping">Destination:</span>
                    <input type="text" className="form-control" aria-describedby="addon-wrapping" required minLength={2} maxLength={50}  {...register("destination")} />
                </div>

                <div className="input-group flex-nowrap">
                    <span className="input-group-text" id="addon-wrapping">Description: </span>
                    <textarea  className="form-control" aria-describedby="addon-wrapping" required minLength={30} maxLength={1500} {...register("description")} />
                </div>

                <div className="input-group flex-nowrap">
                    <span className="input-group-text" id="addon-wrapping">Start date: </span>
                    <input type="date"
                        className="form-control"
                        aria-describedby="addon-wrapping"
                        required min={new Date().toISOString().split("T")[0]}
                        {...register("startDate")} />
                </div>

                <div className="input-group flex-nowrap">
                    <span className="input-group-text" id="addon-wrapping">End date: </span>
                    <input
                        type="date"
                        className="form-control"
                        aria-describedby="addon-wrapping"
                        min={new Date().toISOString().split("T")[0]}
                        {...register("endDate", { required: true, validate: validateEndDate })} />
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
                    <span> Add </span>
                </button>
                <img className="vacation-image-form" src={imageUrl} />


            </form>

        </div>
    );
}

export default AddVacation;
