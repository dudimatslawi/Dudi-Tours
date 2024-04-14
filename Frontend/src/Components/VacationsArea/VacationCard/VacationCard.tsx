import { NavLink, useNavigate } from "react-router-dom";
import VacationModel from "../../../Models/VacationModel";
import "./VacationCard.css"
import { useSelector } from "react-redux";
import { AppState } from "../../../Redux/AppState";
import UserModel from "../../../Models/UserModel";
import { RoleModel } from "../../../Models/RoleModel";
import { vacationsService } from "../../../Services/VacationsService";
import { notify } from "../../../Utils/Notify";
import saleImage from "../../../Assets/Images/sale.png"

type VacationCardProps = {
    vacation: VacationModel
}

function VacationCard(props: VacationCardProps): JSX.Element {
    const user = useSelector<AppState, UserModel>(appState => appState.user);
    const navigate = useNavigate();

    async function deleteVacation(id: number): Promise<void> {
        try {
            const token = sessionStorage.getItem("token");
            if (!token) {
                // Handle case when token is not found
                navigate("/login");
                return
            }
            const sure = window.confirm("Are you sure?");
            if (!sure) return
            await vacationsService.deleteVacation(id);
            notify.success("vacation has been deleted.");
        } catch (err: any) {
            notify.error(err);
        }
    }

    // function for add and remove like:
    async function likeToggle(): Promise<void> {
        try {
            if (props.vacation.isLiked === 0) {
                await vacationsService.addLike(props.vacation);
            } else {
                await vacationsService.unLike(props.vacation);
            }
        } catch (err: any) {
            notify.error(err);
        }
    }

    return (
        <div className="VacationCards">
            <div className="cardDiv">
                <img src={props.vacation.imageUrl} />
                <div className="textWrapper">
                    <div className="destination">{props.vacation.destination}</div>
                    <div className="description">{props.vacation.description.substring(0, 40)}...</div>
                    <div className="date"><strong>Start Date: </strong>{new Date(props.vacation.startDate).toLocaleDateString("en-GB")}</div>
                    <div className="date"><strong>End Date: </strong>{new Date(props.vacation.endDate).toLocaleDateString("en-GB")}</div>
                    <NavLink to={"/vacations/details/" + props.vacation.id} className="card-details-link">
                        <div className={vacationsService.isAugust2024(props.vacation.startDate) && vacationsService.isAugust2024(props.vacation.endDate) ? "price-august" : "price"}>
                            {vacationsService.isAugust2024(props.vacation.startDate) && vacationsService.isAugust2024(props.vacation.endDate) && (
                                <div className="discounted-price">
                                    <strong>${vacationsService.calculateDiscountedPrice(props.vacation.price)}</strong>
                                    <div className="sale-image"><img src={saleImage} /></div>
                                </div>
                            )}
                            <span><strong>${props.vacation.price}</strong></span>
                        </div>
                    </NavLink>
                </div>
                {user?.roleId == RoleModel.User && (
                    <>
                        <div className="likeButton" onClick={likeToggle}>
                            <div className="con-like">
                                <input className="like" type="checkbox" onChange={() => likeToggle} checked={props.vacation.isLiked === 1 ? true : false} title="like" />
                                <div className="checkmark">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="outline" viewBox="0 0 24 24">
                                        <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Zm-3.585,18.4a2.973,2.973,0,0,1-3.83,0C4.947,16.006,2,11.87,2,8.967a4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,11,8.967a1,1,0,0,0,2,0,4.8,4.8,0,0,1,4.5-5.05A4.8,4.8,0,0,1,22,8.967C22,11.87,19.053,16.006,13.915,20.313Z"></path>
                                    </svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="filled" viewBox="0 0 24 24">
                                        <path d="M17.5,1.917a6.4,6.4,0,0,0-5.5,3.3,6.4,6.4,0,0,0-5.5-3.3A6.8,6.8,0,0,0,0,8.967c0,4.547,4.786,9.513,8.8,12.88a4.974,4.974,0,0,0,6.4,0C19.214,18.48,24,13.514,24,8.967A6.8,6.8,0,0,0,17.5,1.917Z"></path>
                                    </svg>
                                    <svg xmlns="http://www.w3.org/2000/svg" height="100" width="100" className="celebrate">
                                        <polygon className="poly" points="10,10 20,20"></polygon>
                                        <polygon className="poly" points="10,50 20,50"></polygon>
                                        <polygon className="poly" points="20,80 30,70"></polygon>
                                        <polygon className="poly" points="90,10 80,20"></polygon>
                                        <polygon className="poly" points="90,50 80,50"></polygon>
                                        <polygon className="poly" points="80,80 70,70"></polygon>
                                    </svg>
                                </div>
                            </div>
                            <div className="likesCount">&nbsp; Likes {props.vacation.likesCount}</div>
                        </div>
                    </>
                )}
                {user?.roleId !== RoleModel.User && (
                    <>
                        <div className="delete-container">
                            <button className="deleteButton" onClick={() => deleteVacation(props.vacation.id)}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 69 14"
                                    className="svgIcon bin-top"
                                >
                                    <g clipPath="url(#clip0_35_24)">
                                        <path
                                            fill="black"
                                            d="M20.8232 2.62734L19.9948 4.21304C19.8224 4.54309 19.4808 4.75 19.1085 4.75H4.92857C2.20246 4.75 0 6.87266 0 9.5C0 12.1273 2.20246 14.25 4.92857 14.25H64.0714C66.7975 14.25 69 12.1273 69 9.5C69 6.87266 66.7975 4.75 64.0714 4.75H49.8915C49.5192 4.75 49.1776 4.54309 49.0052 4.21305L48.1768 2.62734C47.3451 1.00938 45.6355 0 43.7719 0H25.2281C23.3645 0 21.6549 1.00938 20.8232 2.62734ZM64.0023 20.0648C64.0397 19.4882 63.5822 19 63.0044 19H5.99556C5.4178 19 4.96025 19.4882 4.99766 20.0648L8.19375 69.3203C8.44018 73.0758 11.6746 76 15.5712 76H53.4288C57.3254 76 60.5598 73.0758 60.8062 69.3203L64.0023 20.0648Z"
                                        ></path>
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_35_24">
                                            <rect fill="white" height="14" width="69"></rect>
                                        </clipPath>
                                    </defs>
                                </svg>

                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 69 57"
                                    className="svgIcon bin-bottom"
                                >
                                    <g clipPath="url(#clip0_35_22)">
                                        <path
                                            fill="black"
                                            d="M20.8232 -16.3727L19.9948 -14.787C19.8224 -14.4569 19.4808 -14.25 19.1085 -14.25H4.92857C2.20246 -14.25 0 -12.1273 0 -9.5C0 -6.8727 2.20246 -4.75 4.92857 -4.75H64.0714C66.7975 -4.75 69 -6.8727 69 -9.5C69 -12.1273 66.7975 -14.25 64.0714 -14.25H49.8915C49.5192 -14.25 49.1776 -14.4569 49.0052 -14.787L48.1768 -16.3727C47.3451 -17.9906 45.6355 -19 43.7719 -19H25.2281C23.3645 -19 21.6549 -17.9906 20.8232 -16.3727ZM64.0023 1.0648C64.0397 0.4882 63.5822 0 63.0044 0H5.99556C5.4178 0 4.96025 0.4882 4.99766 1.0648L8.19375 50.3203C8.44018 54.0758 11.6746 57 15.5712 57H53.4288C57.3254 57 60.5598 54.0758 60.8062 50.3203L64.0023 1.0648Z"
                                        ></path>
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_35_22">
                                            <rect fill="white" height="57" width="69"></rect>
                                        </clipPath>
                                    </defs>
                                </svg>
                            </button>
                        </div>
                        <div className="edit-container">
                            <NavLink to={"/vacations/edit/" + props.vacation.id}><button className="edit-button">
                                <svg className="edit-svgIcon" viewBox="0 0 512 512">
                                    <path d="M410.3 231l11.3-11.3-33.9-33.9-62.1-62.1L291.7 89.8l-11.3 11.3-22.6 22.6L58.6 322.9c-10.4 10.4-18 23.3-22.2 37.4L1 480.7c-2.5 8.4-.2 17.5 6.1 23.7s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L387.7 253.7 410.3 231zM160 399.4l-9.1 22.7c-4 3.1-8.5 5.4-13.3 6.9L59.4 452l23-78.1c1.4-4.9 3.8-9.4 6.9-13.3l22.7-9.1v32c0 8.8 7.2 16 16 16h32zM362.7 18.7L348.3 33.2 325.7 55.8 314.3 67.1l33.9 33.9 62.1 62.1 33.9 33.9 11.3-11.3 22.6-22.6 14.5-14.5c25-25 25-65.5 0-90.5L453.3 18.7c-25-25-65.5-25-90.5 0zm-47.4 168l-144 144c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l144-144c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6z"></path>
                                </svg>
                            </button></NavLink>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

export default VacationCard;
