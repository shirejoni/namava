import React from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Home from "./pages/Home";
import './style.scss';
import Provider from "./utils/Provider";
import 'flickity/dist/flickity.min.css';
import Single from "./pages/Single";
function App() {
    return (
        <BrowserRouter>
            <Provider>
                <Switch>

                    <Route path="/" exact>
                        <Home/>
                    </Route>
                    <Route path={'/:type/:id([0-9]+):name'} exact={true} component={Single}/>
                </Switch>
            </Provider>

        </BrowserRouter>
    );
}

export default App;
