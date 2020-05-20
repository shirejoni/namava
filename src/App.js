import React from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Home from "./pages/Home";
import './style.scss';
import Provider from "./utils/Provider";

function App() {
    return (
        <BrowserRouter>
            <Provider>
                <Switch>

                    <Route path="/" exact>
                        <Home/>
                    </Route>

                </Switch>
            </Provider>

        </BrowserRouter>
    );
}

export default App;
