import React, { useState } from 'react';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import app from '../../firebase/firebase.init';
import { GithubAuthProvider } from 'firebase/auth/cordova';
const Login = () => {
    const [user, setUser] = useState(null);

    const auth = getAuth(app);
    const googleProvider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider();

    const handelGoogleSignIn = () => {

        signInWithPopup(auth, googleProvider)
            .then(result => {
                const loggedInUser = result.user;
                console.log(loggedInUser);
                setUser(loggedInUser)
            })
            .catch(error => {
                console.log('error', error.message)
            })

    }

    const handelGithubSignIn = () => {
        signInWithPopup (auth, githubProvider)
        .then ( result => {
            const loggedUser = result.user;
            console.log(loggedUser);
            setUser(loggedUser);
        })
        .catch(error => {
            console.log(error)
        })
    }

    const handelSignOut = () => {
        signOut(auth)
            .then(result => {
                console.log(result);
                setUser(null);
            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <div>
            {user ?
                <button onClick={handelSignOut}>SignOut</button> :
                <>
                    <button onClick={handelGoogleSignIn}>Google login</button>
                    <button onClick={handelGithubSignIn}>Github Login</button>
                </>
            }

            {
                user && <div>
                    <h3>User: {user.displayName}</h3>
                    <p>Email:{user.email}</p>
                    <img src={user.photoURL} alt="" />
                </div>
            }
        </div>
    );
};

export default Login;