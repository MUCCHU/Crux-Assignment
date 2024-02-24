import React from 'react';
import './SignIn.css'; // Make sure to create a corresponding CSS file

export default function LoginNew() {
    return (
        <div className="login-container">
            <div className="welcome-section">
                <h1>Welcome to Crux</h1>
                <p>
                    Here, we believe that building a strong professional network begins with your participation.
                    We are delighted to offer a modern and user-friendly service to ensure you have the best experience.
                </p>
                <button className="join-now-btn">Join Now!</button>
                {/* Insert your illustration here */}
            </div>
            <div className="sign-in-section">
                <div className="sign-in-box">
                    <h2>Sign in</h2>
                    <input type="text" placeholder="Enter Email or Phone" />
                    <input type="password" placeholder="Password" />
                    <div className="forgot-password">Recover Password?</div>
                    <button className="sign-in-btn">Sign in</button>
                    <div className="or-continue-with">Or Continue with</div>
                    <div className="social-icons">
                        {/* Replace these with actual icons */}
                        <span>G</span>
                        <span>T</span>
                        <span>F</span>
                        <span>A</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

