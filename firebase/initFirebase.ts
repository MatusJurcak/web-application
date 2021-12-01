import { initializeApp } from 'firebase/app'
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut, User } from "firebase/auth"
import "firebase/firestore"
import { useState, useEffect } from 'react'

const config = {
    apiKey: process.env.NEXT_PUBLIC_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_APP_ID,
}

const app = initializeApp(config)
const auth = getAuth()

export function signIn(email : string, password : string) {
    return signInWithEmailAndPassword(auth, email, password);
}

export const useAuth = () : User | null => {
    const [currentUser, setCurrentUser] = useState<User|null>(null)

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, user => setCurrentUser(user))
        return unsub
    }, [])

    return currentUser
}

export const logOut = () => {
    return signOut(auth)
}

export default app