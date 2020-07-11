import React from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Home from "./pages/Home";
import './style.scss';
import Provider from "./utils/Provider";
import 'flickity/dist/flickity.min.css';
import Single from "./pages/Single";
import List from "./pages/List";
import Collection from "./pages/Collection";
import Person from "./pages/Person";
import TopMenu from "./components/TopMenu";
import OtherRoutes from "./utils/OtherRoutes";
function App() {
    return (
        <BrowserRouter>
            <Provider>
                <div className="container-fluid">
                    <div className="row p-0">
                        <TopMenu/>
                    </div>
                    <div className="row p-0">
                        <Switch>
                            <Route path="/" exact component={({location}) => {
                                if(location['state'] && location['state']['showList'] === true) {
                                    return <List {...location['state']} />;
                                }
                                return <Home/>;
                            }}/>
                            <Route path={'/:type/:id([0-9]+):name'} exact={true} component={Single}/>
                            <Route path={'/collection-:id([0-9]+)-:name'} exact={true} component={Collection}/>
                            <Route path={'/person-:id([0-9]+)-:name'} exact={true} component={Person}/>
                            <Route path={'*'} component={OtherRoutes}/>
                        </Switch>
                    </div>
                </div>
            </Provider>

        </BrowserRouter>
    );
}

export default App;
