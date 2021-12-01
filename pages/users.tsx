import { useAuth } from '../firebase/initFirebase'
import styles from '../styles/Home.module.css'
import Link from '@mui/material/Link'

const NotLogged = () => {
    return (
        <div className={styles.main}>
            <h1 className={styles.title}>
                 You need to log in to see this page
            </h1>
            <Link href="/login" underline="hover" className={styles.link}>
                Go to login page
            </Link>
        </div>
    )
}

const Users = ({ users } : { users : unknown }) => {
    const user = useAuth()

    return (
        <div>
            {!user 
                ? <NotLogged />
                : <pre>{JSON.stringify(users, null, 2)}</pre>
            }
        </div>
   )
}

export async function getStaticProps(){
    const users = await (await fetch('https://jsonplaceholder.typicode.com/users')).json()

    if (!users) {
        return {
          notFound: true,
        }
      }

    return {
        props: { users }
    }
}

export default Users