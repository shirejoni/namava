import React from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Home from "./pages/Home";
import './style.scss';
function App() {
    return (
        <BrowserRouter>
            <Switch>

                <Route path="/" exact>
                    <Home/>
                </Route>

            </Switch>
        </BrowserRouter>
    );
}

export default App;
