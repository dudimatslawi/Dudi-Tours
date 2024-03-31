import { useForm } from "react-hook-form";
import CredentialsModel from "../../../Models/CredentialsModel";
import { notify } from "../../../Utils/Notify";
import { authService } from "../../../Services/AuthService";
import { appStore } from "../../../Redux/store";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import "./Login.css";
import emailImage from "../../../Assets/Images/email.png";
import passwordImage from "../../../Assets/Images/padlock.png";
import { useEffect } from "react";

function Login(): JSX.Element {

    // use form for Login form:
    const { register, handleSubmit } = useForm<CredentialsModel>();

    const navigate = useNavigate();
    useEffect(() => {
        if (appStore.getState()?.user) {
            navigate("/list")
        }
    }, [])

    async function send(credentials: CredentialsModel): Promise<void> {
        try {

            const loginImage = document.querySelector('.Login') as HTMLElement;
            const form = document.querySelector('.auth-form') as HTMLElement;

            await authService.login(credentials);
            // Apply the scale transformation
            loginImage.style.transform = 'scale(1.8)';
            form.style.transition = 'opacity 1s ease';
            form.style.opacity = '0'

            setTimeout(async () => {
                const firstName = appStore.getState().user.firstName;
                const lastName = appStore.getState().user.lastName;
                notify.success(`Welcome back ${firstName} ${lastName}!`);
                navigate("/list");
            }, 1000);
        } catch (err: any) {
            notify.error(err);
        }
    }

    return (
        <div className="Login">

            <form className="auth-form" onSubmit={handleSubmit(send)}>
                <h1>Login</h1>

                <input type="email" {...register("email")} required minLength={8} maxLength={70} placeholder="email" />
                <span><img src={emailImage} /></span>

                <input type="password" {...register("password")} required minLength={6} maxLength={100} placeholder="password" />
                <span><img src={passwordImage} /></span>

                <button>Login</button>

                <span className="SignUpSpan">Don't have an account? &nbsp;<NavLink className="signUplink" to="/signUp"> Sign up</NavLink></span>

            </form>

        </div>
    );
}

export default Login;
