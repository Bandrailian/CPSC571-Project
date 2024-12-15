import React, { useState } from 'react';
import axios from 'axios';

function Results(){
    return(
        <div className="results">
            <div className="gad-7"></div>

            <div className="phq-9"></div>

            <Link to="/Suggest">
                <button className="next">See Suggestions</button>
            </Link>
        </div>
    );
}

export default Results;