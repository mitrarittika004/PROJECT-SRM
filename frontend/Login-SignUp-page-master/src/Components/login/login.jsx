import React, { useState } from 'react';
import GoogleLogin from 'react-google-login';
import emailIcon from '../assets/email.png';
import passwordIcon from '../assets/password.png';
import personIcon from '../assets/person.png';
import './login.css';

const Login = () => {
    const [action, setAction] = useState("login");
    const responseGoogle = (response) => {
        // Handle the Google login response here
        console.log(response);
    };
    return (
        <div className='container'>
            <h2>Welcome to Education</h2>
            <div className='header'>
                <div className='text'>{action}</div>
                <div className='underline'></div>
            </div> 
            <div className='inputs'>
                {action === "Sign Up" ? (
                    <div className="input">
                        <img src={personIcon} alt="user icon" />
                        <input type="text" placeholder='Username' />
                    </div>
                ) : null}
                <div className="input">
                    <img src={emailIcon} alt="email icon" />
                    <input type="email" placeholder='Email Id'/>
                </div>
                <div className="input">
                    <img src={passwordIcon} alt="password icon" />
                    <input type="password" placeholder='Password'/>
                </div>
            </div>
            {action === "Sign Up" ? (
                <div className="forgot-password">
                    <span>Forgot Password?</span>
                </div>
            ) : null}
            <div className='submit-container'>
                <div className={action === "Sign Up" ? "submit gray" : "submit"} onClick={() => setAction("Login")}>Login</div>
                <div className={action === "Login" ? "submit gray" : "submit"} onClick={() => setAction("Sign Up")}>Sign Up </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <GoogleLogin
                    clientId="YOUR_GOOGLE_CLIENT_ID" // Replace with your Google client ID
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={'single_host_origin'}
                    render={(renderProps) => (
                        <button
                            onClick={renderProps.onClick}
                            disabled={renderProps.disabled}
                            style={{
                                background: 'transparent',
                                padding: '10px',
                                borderRadius: '50%',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                cursor: 'pointer',
                                border: 'none',
                                outline: 'none',
                            }}
                        >
                            <img
                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/2048px-Google_%22G%22_logo.svg.png" // Replace with the URL of the Google logo
                                alt="Google Logo"
                                style={{
                                    width: '40px', // Set the width of the Google logo
                                    height: '40px', // Set the height of the Google logo
                                    borderRadius: '50%', // Ensure the logo is circular
                                }}
                            />
                        </button>
                    )}
                />
            </div>
        </div>
    );
};

export default Login;
