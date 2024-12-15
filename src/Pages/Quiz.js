import React, { useState } from 'react';
import axios from 'axios';

import { Link } from 'react-router-dom';

function Quiz(){
    return(
        <div className="quiz">
            <div className="page-1">
                <Question></Question>
                <Question></Question>
                <Question></Question>
                <Question></Question>
                <Question></Question>
                <Question></Question>
                <Question></Question>
                <Question></Question>
                <button className="next">Next</button>
            </div>
            <div className="page-2">
                <Question></Question>
                <Question></Question>
                <Question></Question>
                <Question></Question>
                <Question></Question>
                <Question></Question>
                <Question></Question>
                <Question></Question>
                <Question></Question>
                <Question></Question>
                <button className="back">Back</button>
                <button className="next">Next</button>
            </div>
            <div className="page-3">
                <Question></Question>
                <Question></Question>
                <Question></Question>
                <Question></Question>
                <Question></Question>
                <Question></Question>
                <Question></Question>
                <Question></Question>
                <button className="back">Back</button>
                <Link to="/Results">
                    <button className="next">See Results</button>
                </Link>
            </div>
        </div>
    );
}

export default Quiz;