import { useSelector } from "react-redux";
import Header from "../Header/Header";
import Menu from "../Menu/Menu";
import Routing from "../Routing/Routing";
import "./Layout.css";
import { AppState } from "../../../Redux/AppState";
import UserModel from "../../../Models/UserModel";
import { RoleModel } from "../../../Models/RoleModel";
import { useEffect, useState } from "react";
import Modal from "../Modal/Modal";

function Layout(): JSX.Element {
    const user = useSelector<AppState, UserModel>(appState => appState.user);
    const [visible, setVisible] = useState<boolean>(false);

    useEffect(() => {
        setTimeout(() => {
            setVisible(true)
        }, 5000)
    }, [])


    if (user?.roleId === RoleModel.Admin) {
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
    }
    else if (user?.roleId === RoleModel.User) {
        return (
            <div className="LayoutUser">
                <header>
                    <Header />
                </header>
                <main>
                    {visible && (
                        <div className='visible-modal'>
                            <Modal />
                        </div>
                    )}
                    <Routing />
                </main>
            </div>
        )
    }
    return (
        <Routing />
    )
}

export default Layout;
