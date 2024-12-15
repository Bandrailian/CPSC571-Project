import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Home(){
    return(
        <div className="home">
            <div className="user-box">
                <t>
                    In order to use the mental health tracking feature please
                    log in or create a free account.
                </t>
                <Link to="/SignIn">
                    <button className="left">Sign In</button>
                </Link>
                <Link to="/SignUp">
                    <button className="right">Sign Up</button>
                </Link>
            </div>

            <div className="log-box">
                <t>
                    By clicking the 'Log Entry' button you can input some 
                    values representing your well being and lifestyle. The
                    'Track' button allows you to see how changes are being
                    made to your mental well being as your lifestyle habits
                    change.
                </t>
                <Link to="/Track">
                    <button className="left">Track</button>
                </Link>
                <Link to="/Log">
                    <button className="right">Log Entry</button>
                </Link>
            </div>

            <div className="quiz-box">
                <t>
                    The free quiz will ask you to answer a few questions.
                    It will look at symptoms of Anxiety and Depression in 
                    order to determine if there is a chance that either could
                    be having an impact on your life. It will use the GAD-7 and
                    the PHQ-9 in order to check this. There will then be questions
                    related to your lifestyle. Together, the quiz will tell you
                    about your results and highlight some lifestyle changes
                    that could be helpful to increasing your quality of life by
                    creating changes to attempt improving your mental health status.
                </t>
                <Link to="/Quiz">
                    <button className="start">Start Quiz</button>
                </Link>
            </div>
        </div>
    );
}

export default Home;