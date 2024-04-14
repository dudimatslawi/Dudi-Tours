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


    // Function to handle pagination change
    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value); // Update the current page number
        const startIndex = (value - 1) * vacationsPerPage; // Calculate the start index for slicing
        const endIndex = Math.min(startIndex + vacationsPerPage, filteredVacations.length); // Calculate the end index for slicing, ensuring it doesn't go beyond the filteredVacations array length
        setCurrentVacations(filteredVacations.slice(startIndex, endIndex)); // Update the currentVacations array with the sliced portion of filteredVacations
    }

    function likedVacationsFilter(event: ChangeEvent<HTMLInputElement>): void {
        setLikesVacations(event.target.checked); // Update the likedVacations state based on the checkbox value
    }

    function pastVacationsFilter(event: ChangeEvent<HTMLInputElement>): void {
        setPastVacations(event.target.checked); // Update the pastVacations state based on the checkbox value
    }

    function onGoingVacationsFilter(event: ChangeEvent<HTMLInputElement>): void {
        setonGoingVacations(event.target.checked) // Update the onGoingVacations state based on the checkbox value
    }

    function futureVacationsFilter(event: ChangeEvent<HTMLInputElement>): void {
        setFutureVacations(event.target.checked) // Update the futureVacations state based on the checkbox value
    }

    // useEffect hook to filter vacations based on the selected filters
    useEffect(() => {
        let filteredInfo: VacationModel[] = [];

        // If no filter is selected, set filteredInfo to all vacations
        if (!likedVacations && !pastVacations && !onGoingVacations && !futureVacations) {
            filteredInfo = [...vacations];
        }

        // Filter for liked vacations
        if (likedVacations) {
            const likedVacations = vacations.filter(v => v.isLiked === 1);
            filteredInfo = [...filteredInfo, ...likedVacations];
        }

        // Filter for past vacations
        if (pastVacations) {
            const pastVacations = vacations.filter(v => (new Date(v.endDate).getTime() < new Date().getTime()));
            filteredInfo = [...filteredInfo, ...pastVacations];
        }

        // Filter for ongoing vacations
        if (onGoingVacations) {
            const onGoingVacations = vacations.filter(v => (new Date(v.startDate).getTime() <= new Date().getTime()) && (new Date(v.endDate).getTime() >= new Date().getTime()));
            filteredInfo = [...filteredInfo, ...onGoingVacations];
        }

        // Filter for future vacations
        if (futureVacations) {
            const futureVacations = vacations.filter(v => (new Date(v.startDate).getTime() > new Date().getTime()));
            filteredInfo = [...filteredInfo, ...futureVacations];
        }

        // Sort the filteredInfo array by startDate in ascending order
        filteredInfo.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());

        // Remove duplicate vacations from the filteredInfo array
        filteredInfo = Array.from(new Set(filteredInfo));

        // Update the filteredVacations state with the filtered array
        setFilteredVacations(filteredInfo);
    }, [likedVacations, pastVacations, onGoingVacations, futureVacations, vacations]);

    // useEffect hook to handle pagination
    useEffect(() => {
        // If the number of filtered vacations is less than or equal to 9, set the currentPage to 1 and display all filtered vacations
        if (filteredVacations.length <= 9) {
            setCurrentPage(1);
            setCurrentVacations(filteredVacations.slice(0, 9))
        } else {
            // Otherwise, slice the filteredVacations array based on the currentPage and vacationsPerPage, and update the currentVacations state
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
