import LoginForm from '../components/LoginForm'
import styles from '../styles/Home.module.css'

const Login = () => {

    return (
        <div>
            <h1 className={styles.title}>Log in with email</h1>
            <LoginForm />
        </div>
    )
}

export default Login