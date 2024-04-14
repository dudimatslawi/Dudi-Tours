import { useSelector } from "react-redux";
import Header from "../Header/Header";
import Menu from "../Menu/Menu";
import Routing from "../Routing/Routing";
import "./Layout.css";
import { AppState } from "../../../Redux/AppState";
import UserModel from "../../../Models/UserModel";
import { RoleModel } from "../../../Models/RoleModel";
import { useState, useEffect } from "react";
import Modal from "../Modal/Modal";

function Layout(): JSX.Element {
    const user = useSelector<AppState, UserModel>(appState => appState.user);
    // Get the current user data from the Redux store

    const [showModal, setShowModal] = useState<boolean>(false);
    // State variable to control the visibility of the modal

    let createModal = true;
    // Flag to determine whether to create the modal or not

    useEffect(() => {
        const sessionStorageData = sessionStorage.getItem("modalShown");
        if (sessionStorageData !== null) {
            createModal = JSON.parse(sessionStorageData);
        }
    }, []);
    // Check the sessionStorage for the "modalShown" value and update the createModal flag accordingly

    useEffect(() => {
        if (user?.roleId === RoleModel.User && createModal) {
            const timer = setTimeout(() => {
                setShowModal(true);
            }, 5000); // Show modal after 5 seconds

            return () => clearTimeout(timer); // Cleanup timer on component unmount or state change
        }
    }, [user]);
    // If the user has the "User" role and createModal is true, show the modal after 5 seconds

    if (user?.roleId === RoleModel.Admin) {
        // If the user has the "Admin" role, render the admin layout
        return (
            <div className="LayoutAdmin">
                <nav>
                    <Menu />
                </nav>
                <main>
                    <Routing />
                </main>
            </div>
        );
    } else if (user?.roleId === RoleModel.User) {
        // If the user has the "User" role, render the user layout
        return (
            <div className="LayoutUser">
                <header>
                    <Header />
                </header>
                <main>
                    <Routing />
                </main>
                {showModal && (
                    <Modal
                    // close modal and make him not show up anymore until get new user
                        onClose={() => {
                            setShowModal(false);
                            createModal = false;
                            sessionStorage.setItem("modalShown", JSON.stringify(createModal));
                        }}
                    />
                )}
            </div>
        );
    }

    return <Routing />;
}

export default Layout;