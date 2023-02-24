import { useState } from "react";
import styles from "../styles/login.module.css";

export default function Login() {
    const [data, setData] = useState({
        username:"",
        password:""
    });

    const {username, password} = data;

    const changeHandler = e => {
        setData({...data, [e.target.name]:[e.target.value]})
    }

    const submitHandler = e => {
        // e.preventDefault();
        console.log(data);
    }

    return(
    <div className={styles.login_wrapper}>
        <h1>LiftBuddy</h1>
            <div className={styles.login_menu}>
                <h2>To use LiftBuddy, create an account.</h2>
                <form onSubmit={submitHandler}>
                    <label>
                        Username: 
                        <input type="text" name="username" value={username} onChange={changeHandler} />
                    </label>
                    <label>
                        Password: 
                        <input type="text" name="password" value={password} onChange={changeHandler} />
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        </div>
    );
}
