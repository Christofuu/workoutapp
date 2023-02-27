import { useState } from "react";
import styles from "../styles/login.module.css";

export default function Login() {
    const [data, setData] = useState({
        username: "",
        password: "",
    });

    const [registerData, setRegisterData] = useState({
        username: "",
        password: "",
        confirmPassword: "",
    });

    const [error, setError] = useState({
        username: "",
        password: "",
        confirmPassword: "",
    });

    const [isRegistering, setIsRegistering] = useState(false);

    const changeHandler = (e) => {
        setData({ ...data, [e.target.name]: [e.target.value] });
    };

    const submitHandler = (e) => {
        e.preventDefault();
        console.log(data.username, data.password);
    };

    const registerHandler = (e) => {
        const { name, value } = e.target;
        setRegisterData((prev) => ({
            ...prev,
            [name]: value,
        }));
        validateInput(e);
    };

    const validateInput = (e) => {
        let { name, value } = e.target;

        setError((prev) => {
            const stateObj = { ...prev, [name]: "" };

            switch (name) {
                case "username":
                    if (!value) {
                        stateObj[name] = "Please enter username.";
                    }
                    break;

                case "password":
                    if (!value) {
                        stateObj[name] = "Please enter Password.";
                    } else if (
                        registerData.confirmPassword &&
                        value !== registerData.confirmPassword
                    ) {
                        stateObj["confirmPassword"] =
                            "Password and Confirm Password does not match.";
                    } else {
                        stateObj["confirmPassword"] =
                            registerData.confirmPassword
                                ? ""
                                : error.confirmPassword;
                    }
                    break;

                case "confirmPassword":
                    if (!value) {
                        stateObj[name] = "Please confirm password.";
                    } else if (
                        registerData.password &&
                        value !== registerData.password
                    ) {
                        stateObj[name] =
                            "Password and confirm password do not match.";
                    }
                    break;

                default:
                    break;
            }
            return stateObj;
        });
    };

    return (
        <div className={styles.login_wrapper}>
            <h1>LiftBuddy</h1>
            {isRegistering ? (
                <div className={styles.login_menu}>
                    <h2>Register an account</h2>
                    <form onSubmit={submitHandler} method={"GET"}>
                        <label>Username:</label>
                        {error.username && <span>{error.username}</span>}
                        <input
                            type="text"
                            name="username"
                            value={registerData.username}
                            onChange={registerHandler}
                            onBlur={validateInput}
                        />
                        <label>Password:</label>
                        {error.password && <span>{error.password}</span>}
                        <input
                            type="password"
                            name="password"
                            value={registerData.password}
                            onChange={registerHandler}
                            onBlur={validateInput}
                        />
                        <label>Confirm Password:</label>
                        {error.confirmPassword && (
                            <span>{error.confirmPassword}</span>
                        )}
                        <input
                            type="password"
                            name="confirmPassword"
                            value={registerData.confirmPassword}
                            onChange={registerHandler}
                            onBlur={validateInput}
                        />
                        <input
                            type="submit"
                            value="Register"
                            onClick={registerHandler}
                        />
                        <input
                            type="button"
                            value="Back to login"
                            onClick={() => setIsRegistering(false)}
                        />
                    </form>
                </div>
            ) : (
                <div className={styles.login_menu}>
                    <h2>Login</h2>
                    <form onSubmit={submitHandler}>
                        <label>Username:</label>
                        <input
                            type="text"
                            name="username"
                            value={data.username}
                            onChange={changeHandler}
                        />
                        <label>Password:</label>
                        <input
                            type="text"
                            name="password"
                            value={data.password}
                            onChange={changeHandler}
                        />
                        <input type="submit" value="Login" />
                        <input
                            type="button"
                            value="Register "
                            onClick={() => setIsRegistering(true)}
                        />
                    </form>
                </div>
            )}
        </div>
    );
}
