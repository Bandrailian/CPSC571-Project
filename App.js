import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './Pages/Home';

import SignIn from './Pages/Sign-in';
import SignUp from './Pages/Sign-up';

import Quiz from './Pages/Quiz';
import Results from './Pages/Results';
import Suggest from './Pages/Suggest';

import Log from './Pages/Log';
import Track from './Pages/Track';

function App() {
    return (
        <div className="app">
            <Router>
                <Route path="/" element={<Home />} />

                <Route path="/SignIn" element={<SignIn />} />
                <Route path="/SignUp" element={<SignUp />} />

                <Route path="/Quiz" element={<Quiz />} />
                <Route path="/Results" element={<Results />} />
                <Route path="/Suggest" element={<Suggest />} />

                <Route path="/Log" element={<Log />} />
                <Route path="/Track" element={<Track />} />
            </Router>
        </div>
    );
}

export default App;