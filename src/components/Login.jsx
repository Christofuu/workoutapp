import styles from "../styles/login.module.css";

export default function Login() {
    return(
    <div className={styles.login_wrapper}>
        <h1>LiftBuddy</h1>
            <div className={styles.login_menu}>
                <h2>To use LiftBuddy, sign in with...</h2>
                <button >Google</button>
                <button >Facebook</button>
                <button >Discord</button>
                <button >Email</button>
            </div>
        </div>
    );
}
