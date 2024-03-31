import React, { ChangeEvent, useEffect, useState } from "react";
import "./VacationList.css";
import { vacationsService } from "../../../Services/VacationsService";
import { notify } from "../../../Utils/Notify";
import { jwtDecode } from "jwt-decode";
import VacationCard from "../VacationCard/VacationCard";
import Pagination from "@mui/material/Pagination";
import { useNavigate } from "react-router-dom";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { useSelector } from "react-redux";
import { AppState } from "../../../Redux/AppState";
import VacationModel from "../../../Models/VacationModel";
import { RoleModel } from "../../../Models/RoleModel";

function List(): JSX.Element {
    let vacations = useSelector((appState: AppState) => appState.vacations)
    let user = useSelector((appState: AppState) => appState.user)
    const [currentPage, setCurrentPage] = useState(1);
    const [vacationsPerPage] = useState(9);
    const [currentVacations, setCurrentVacations] = useState<VacationModel[]>([]);
    const [likedVacations, setLikesVacations] = useState<boolean>(false);
    const [pastVacations, setPastVacations] = useState<boolean>(false);
    const [onGoingVacations, setonGoingVacations] = useState<boolean>(false);
    const [futureVacations, setFutureVacations] = useState<boolean>(false);
    const [filteredVacations, setFilteredVacations] = useState<VacationModel[]>([]);
    // Retrieve token from session storage
    const token = sessionStorage.getItem("token");
    const navigate = useNavigate();

    useEffect(() => {
        try {
            if (!token) {
                // Handle case when token is not found
                navigate("/login");
                return;
            }
            // Decode token to extract user ID
            const decodedToken: any = jwtDecode(token);
            const userId = decodedToken.user.id;

            // Fetch vacations for the user
            vacationsService.getAllVacations(userId)
                .then(v => setCurrentVacations(v.slice(0, 9)))
                .catch(err => {
                    notify.error(err);
                    navigate("/login");
                })
        } catch (error) {
            // Handle decoding error
            notify.error("Server error. Please try again later");

        }
    }, []);


    // Change page
    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
        const startIndex = (value - 1) * vacationsPerPage;
        const endIndex = Math.min(startIndex + vacationsPerPage, filteredVacations.length);
        setCurrentVacations(filteredVacations.slice(startIndex, endIndex));
    }
    function likedVacationsFilter(event: ChangeEvent<HTMLInputElement>): void {
        setLikesVacations(event.target.checked);
    }
    function pastVacationsFilter(event: ChangeEvent<HTMLInputElement>): void {
        setPastVacations(event.target.checked);
    }
    function onGoingVacationsFilter(event: ChangeEvent<HTMLInputElement>): void {
        setonGoingVacations(event.target.checked)
    }
    function futureVacationsFilter(event: ChangeEvent<HTMLInputElement>): void {
        setFutureVacations(event.target.checked)
    }
    useEffect(() => {
        let filteredInfo: VacationModel[] = [];
        if (!likedVacations && !pastVacations && !onGoingVacations && !futureVacations) {
            filteredInfo = [...vacations]; // Use spread operator to create a new array
        }
        if (likedVacations) {
            const likedVacations = vacations.filter(v => v.isLiked === 1);
            filteredInfo = [...filteredInfo, ...likedVacations]; // Use spread operator to concatenate arrays
        }
        if (pastVacations) {
            const pastVacations = vacations.filter(v => (new Date(v.endDate).getTime() < new Date().getTime()));
            filteredInfo = [...filteredInfo, ...pastVacations];
        }
        if (onGoingVacations) {
            const onGoingVacations = vacations.filter(v => (new Date(v.startDate).getTime() <= new Date().getTime()) && (new Date(v.endDate).getTime() >= new Date().getTime()));
            filteredInfo = [...filteredInfo, ...onGoingVacations];
        }
        if (futureVacations) {
            const futureVacations = vacations.filter(v => (new Date(v.startDate).getTime() > new Date().getTime()));
            filteredInfo = [...filteredInfo, ...futureVacations];
        }

        filteredInfo.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
        filteredInfo = Array.from(new Set(filteredInfo));
        setFilteredVacations(filteredInfo);
    }, [likedVacations, pastVacations, onGoingVacations, futureVacations, vacations]);

    useEffect(() => {
        if (filteredVacations.length <= 9) {
            setCurrentPage(1);
            setCurrentVacations(filteredVacations.slice(0, 9))
        }
        else {

            setCurrentVacations(filteredVacations.slice((currentPage - 1) * 9, currentPage * 9));
        }
    }, [filteredVacations])

    return (
        <div className="List">

            <div>

                <FormGroup className="checkboxes">
                    <h2>Filter by:</h2>
                    {user?.roleId === RoleModel.User &&
                        <FormControlLabel control={<Checkbox checked={likedVacations} onChange={likedVacationsFilter} />} label="Liked vacations" />
                    }
                    <FormControlLabel control={<Checkbox checked={pastVacations} onChange={pastVacationsFilter} />} label="Past vacations" />
                    <FormControlLabel control={<Checkbox checked={onGoingVacations} onChange={onGoingVacationsFilter} />} label="Current vacations" />
                    <FormControlLabel control={<Checkbox checked={futureVacations} onChange={futureVacationsFilter} />} label="Future vacations" />
                </FormGroup>
            </div>
            <div>

                <div className="cardsContainer">
                    {currentVacations.length === 0 ? (
                        <h2>Sorry, we don't currently have any vacations of the type you marked </h2>
                    ) : (
                        currentVacations.map((v) => (
                            <VacationCard key={v.id} vacation={v} />
                        ))
                    )}
                </div>
                {/* Pagination */}
                {currentVacations.length === 0 ? (
                    <div></div>
                ) : (
                    <div className="paginationContainer">
                        <Pagination className="pagination"
                            page={currentPage}
                            count={Math.ceil(filteredVacations.length / vacationsPerPage)}
                            onChange={handlePageChange}
                            color="primary"
                        />

                    </div>
                )}
            </div>
        </div>
    );
}

export default List;
