import { useForm } from "react-hook-form";
import UserModel from "../../../Models/UserModel";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { authService } from "../../../Services/AuthService";
import { appStore } from "../../../Redux/store";
import { notify } from "../../../Utils/Notify";
import "./SignUp.css";
import emailImage from "../../../Assets/Images/email.png";
import passwordImage from "../../../Assets/Images/padlock.png";
import { useEffect } from "react";


function SignUp(): JSX.Element {

    const { register, handleSubmit } = useForm<UserModel>();
    const navigate = useNavigate();
    useEffect(() => {
        if (appStore.getState().user) {
            navigate("/list")
        }
    }, [])



    async function send(user: UserModel): Promise<void> {
        try {
            await authService.register(user);
            const signUpImage = document.querySelector('.SignUp') as HTMLElement;
            const form = document.querySelector('.auth-form') as HTMLElement;

            // Apply the scale transformation
            signUpImage.style.transform = 'scale(1.8)';
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
        <div className="SignUp">
            <form className="auth-form" onSubmit={handleSubmit(send)}>
                <h1>Sign up</h1>

                <input type="text" required minLength={2} maxLength={40} placeholder="first name" {...register("firstName")} />

                <input type="text" required minLength={2} maxLength={55} placeholder="last name" {...register("lastName")} />

                <input type="email" required minLength={8} maxLength={70} placeholder="email" {...register("email")} />
                <span><img src={emailImage} /></span>

                <input type="password" required minLength={6} maxLength={100} placeholder="password" {...register("password")} />
                <span><img src={passwordImage} /></span>

                <button>Sign up</button>

                <span className="LoginSpan">Already have an account? &nbsp; <NavLink to="/login">Login</NavLink></span>

            </form>

        </div>
    )

}
export default SignUp;