import React, { useState } from 'react';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import app from '../../firebase/firebase.init';
const Login = () => {
    const [user, setUser] = useState(null);

    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();

    const handelGoogleSignIn = () => {
        
        signInWithPopup(auth, provider)
            .then(result => {
                const loggedInUser = result.user;
                console.log(loggedInUser);
            })
            .catch(error => {
                console.log('error', error.message)
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
            { user ?
                <button onClick={handelSignOut}>SignOut</button> :
                <button onClick={handelGoogleSignIn}>Google login</button>
                
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