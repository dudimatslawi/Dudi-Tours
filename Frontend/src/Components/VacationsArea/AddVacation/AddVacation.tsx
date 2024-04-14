import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import "./AddVacation.css";
import VacationModel from "../../../Models/VacationModel";
import { vacationsService } from "../../../Services/VacationsService";
import { notify } from "../../../Utils/Notify";
import { useNavigate } from "react-router-dom";
import { appStore } from "../../../Redux/store";
import { RoleModel } from "../../../Models/RoleModel";



function AddVacation(): JSX.Element {
    // useForm and useState hooks for form handling and image preview
    const { register, handleSubmit, formState: { errors }, watch } = useForm<VacationModel>();
    const [imageUrl, setImageUrl] = useState<string>();

    // useNavigate hook for navigation
    const navigate = useNavigate();

    // Check if the user is authenticated (token exists) and has the correct role
    const token = sessionStorage.getItem("token");
    useEffect(() => {
        if (!token) {
            navigate("/login");
            return;
        }

        if (appStore.getState().user?.roleId === RoleModel.User) {
            navigate("/list");
        }
    }, []);

    // Watch the "startDate" field for validation
    const startDate = watch("startDate");

    async function send(vacation: VacationModel): Promise<void> {
        // Extract the first image from the FileList
        vacation.image = (vacation.image as unknown as FileList)[0];

        try {
            // Function to handle form submission and add a new vacation
            await vacationsService.addVacation(vacation);
            notify.success("Vacation has been added. ✈️");
            navigate("/list");
        } catch (err: any) {
            notify.error(err);
        }
    }

    // Custom validation function for the "endDate" field
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
