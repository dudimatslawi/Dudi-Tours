import axios from "axios";
import { jwtDecode } from "jwt-decode";
import UserModel from "../Models/UserModel";
import { appStore } from "../Redux/store";
import { authActionCreators } from "../Redux/AuthSlice";
import { appConfig } from "../Utils/AppConfig";
import CredentialsModel from "../Models/CredentialsModel";
import { notify } from "../Utils/Notify";

class AuthService {
    public timerId: any;
    // create constructor:
    public constructor() {
        const token = sessionStorage.getItem("token");
        if (token) {
            // extract user from the token:
            const loggedInUser = jwtDecode<{ user: UserModel }>(token).user;

            // update global state:
            appStore.dispatch(authActionCreators.login(loggedInUser));
        }
    }

    public async register(user: UserModel): Promise<void> {

        // send the new user to the backend:
        const response = await axios.post<string>(appConfig.registerUrl, user);

        // extract the jwt token:
        const token = response.data;

        // extract user from the token:
        const registeredUser = jwtDecode<{ user: UserModel }>(token).user;

        setTimeout(() => {
            // update global state:
            appStore.dispatch(authActionCreators.register(registeredUser));

            // save the token in local storage:
            sessionStorage.setItem("token", token);
        }, 1000);

        this.timerId = setTimeout(() => {
            this.logout();
            notify.error("The authorization time has passed, for entering the site please log in")
        }, 18000000 - 2000)


    }

    public async login(credentials: CredentialsModel): Promise<void> {
        // send credentials to the backend:
        const response = await axios.post<string>(appConfig.loginUrl, credentials);

        // extract the jwt token:
        const token = response.data;

        // extract user from the token:
        const loggedInUser = jwtDecode<{ user: UserModel }>(token).user;

        setTimeout(() => {
            // update global state:
            appStore.dispatch(authActionCreators.login(loggedInUser));

            // delay setting sessionStorage by 1 second:
            // save the token in local storage:
            sessionStorage.setItem("token", token);
        }, 1000);
        this.timerId = setTimeout(() => {
            this.logout();
            notify.error("The authorization time has passed, for entering the site please log in")
        }, 18000000 - 2000)
    }

    public logout(): void {

        // update global state:
        appStore.dispatch(authActionCreators.logout());

        // remove token from local storage:
        sessionStorage.removeItem("token");
        clearTimeout(this.timerId)
    }
}

export const authService = new AuthService();
