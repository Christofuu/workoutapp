import { useState } from "react";
import styles from "../styles/login.module.css";

export default function Login() {
    const [data, setData] = useState({
        username:"",
        password:""
    });

    const [isRegistering, setIsRegistering] = useState(false);

    const {username, password} = data;

    const changeHandler = e => {
        setData({...data, [e.target.name]:[e.target.value]})
    }

    const submitHandler = e => {
        console.log(data.username, data.password);
    }

    const registerHandler = e => {

    }

    return(
    <div className={styles.login_wrapper}>
        <h1>LiftBuddy</h1>
            {isRegistering ? (
                <div className={styles.login_menu}>
                <h2>REGUISTER</h2>
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
                    <input type="button" value="ROGIN! " onClick={()=>setIsRegistering(false)}/>
                </form>
            </div>
            ) : (
            <div className={styles.login_menu}>
                <h2>LOGIN.</h2>
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
                    <input type="button" value="Register " onClick={()=>setIsRegistering(true)}/>
                </form>
            </div>)}
        </div>
    );
}
