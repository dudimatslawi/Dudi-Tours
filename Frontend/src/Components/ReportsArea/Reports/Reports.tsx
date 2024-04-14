import { useSelector } from 'react-redux';
import { AppState } from '../../../Redux/AppState';
import VacationModel from '../../../Models/VacationModel';
// @ts-ignore
import CanvasJSReact from '@canvasjs/react-charts';
import { useEffect, useState } from 'react';
import { vacationsService } from '../../../Services/VacationsService';
import UserModel from '../../../Models/UserModel';
import { notify } from '../../../Utils/Notify';
import "./Reports.css";
import { useNavigate } from 'react-router-dom';
import { appStore } from '../../../Redux/store';
import { RoleModel } from '../../../Models/RoleModel';
import { Button } from '@mui/material';

const CanvasJSChart = CanvasJSReact.CanvasJSChart as React.ComponentType<CanvasJSReact.CanvasJSChartOptions>;

function Reports(): JSX.Element {
    const user = useSelector<AppState, UserModel>(appState => appState.user);
    const [vacations, setVacations] = useState<VacationModel[]>([]);
    const navigate = useNavigate()


    const token = sessionStorage.getItem("token");
    useEffect(() => {
        if (!token) {
            // Handle case when token is not found
            navigate("/login");
            return;
        }
        if (appStore.getState().user?.roleId === RoleModel.User) {
            // Handle case when not admin try to Browse this site
            navigate("/list")
            return;
        }

        // get all vacations
        vacationsService.getAllVacations(user.id)
            .then(v => setVacations(v))
            .catch(err => notify.error(err));
    }, []);

    async function createCSV() {
        const user = appStore.getState().user;
        let vacations = [];

        if (user) {
            vacations = await vacationsService.getAllVacations(user.id);
        } else {
            vacations = appStore.getState().vacations;
        }

        // Create a CSV content string
        const csvContent = "Destination,Likes Count\n" +
            vacations.map(v => `${v.destination.replace(",", "_")}, ${v.likesCount}`).join("\n");

        // Create a blob with the CSV content
        const blob = new Blob([csvContent], { type: "text/csv" });

        // Create a temporary URL for the blob
        const url = window.URL.createObjectURL(blob);

        // Create a temporary link element
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "vacations.csv");

        // Simulate a click on the link to trigger the download
        document.body.appendChild(link);
        link.click();

        // Clean up
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
    }

    // create array to canvas colors:
    const colors = ["#E0CF9A", "#9BE0CF", "rgb(46, 233, 189)"];

    // canvas options:
    const options: CanvasJSReact.CanvasJSChartOptions = {
        theme: "dark2",
        title: {
            text: "Vacations by Likes"
        },
        data: [
            {
                type: "column",
                dataPoints: vacations.map((vacation, index) => ({
                    label: vacation.destination,
                    y: vacation.likesCount,
                    color: colors[index % colors.length] // Assign color based on index
                }))
            }
        ]
    };
    return (
        <div className='Reports'>
            <div className='reports-container'>
                <CanvasJSChart options={options} />
            </div>
            <div className='csv-container'>
                <Button
                    className='csv-button'
                    onClick={createCSV}
                    variant="contained"
                    sx={{
                        backgroundColor: 'rgb(46, 233, 189)',
                        '&:hover': {
                            backgroundColor: 'rgb(36, 186, 151)'
                        }
                    }}
                >
                    Download CSV
                </Button>
            </div>
        </div>

    );

}

export default Reports;
