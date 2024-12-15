import React, { useState } from 'react';
import axios from 'axios';

function Suggest(){
    return(
        <div className="suggest">
            <div className="lifestyle"></div>

            
            <Link to="/">
                <button className="next">Home</button>
            </Link>
        </div>
    );
}

export default Suggest;