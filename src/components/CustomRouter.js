import React, { Component } from 'react';
import {Route, Redirect} from "react-router-dom";
import Cookies from "universal-cookie";

import LoginPage from "./Pages/LoginPage";
import ConfirmationPage from "./Pages/ConfirmationPage";
import TrainerPages from "./Pages/TrainerPages";
import TraineePages from "./Pages/TraineePages";
import Flash from "./Games/Flash";
import Columns from "./Games/Columns";


class CustomRouter extends Component {
    render(){
        return (
            <div>
                {/* 404 */}
                {/*<Route exact path="*" render={() => this.getMainGate()}/>*/}

                <Route exact path="/" render={() => this.getMainGate()}/>
                <Route exact path = "/login" component={LoginPage} />
                <Route exact path = "/confirm/:id"    render={this.getConfirmationPage} />



                {/* Trainer pages */}
                {/*<Route exact path = "/trainer"          render={() => this.getTrainerComponent('loader-blank')} />*/}
                <Route exact path = "/trainer"          render={() => this.getTrainerComponent('main')} />
                <Route exact path = "/groups"           render={() => this.getTrainerComponent('groups')} />
                <Route exact path = "/groups/:id"       render={this.getGroupPrefsPage} />
                <Route exact path = "/users/:id"        render={this.getUserPrefsPage} />
                <Route exact path = "/users"            render={() => this.getTrainerComponent('users')} />
                <Route exact path = "/statistic"        render={() => this.getTrainerComponent('loader-blank')} />
                {/*<Route exact path = "/statistic"        render={() => this.getTrainerComponent('statistic')} />*/}
                <Route exact path = "/rating"           render={() => this.getTrainerComponent('loader-blank')} />
                {/*<Route exact path = "/rating"           render={() => this.getTrainerComponent('rating')} />*/}
                <Route exact path = "/help"             render={() => this.getTrainerComponent('help')} />
                <Route exact path = "/profile"          render={() => this.getTrainerComponent('profile')} />


                {/*/!* Trainer pages *!/*/}
                {/*/!*<Route exact path = "/trainer"          render={() => this.getTrainerComponent('loader-blank')} />*!/*/}
                <Route exact path = "/trainee"          render={() => this.getTraineeComponent('main')} />
                <Route exact path = "/mygroup"          render={() => this.getTraineeComponent('mygroup')} />
                {/*<Route exact path = "/groups/:id"       render={this.getGroupPrefsPage} />*/}
                {/*<Route exact path = "/users/:id"        render={this.getUserPrefsPage} />*/}
                {/*<Route exact path = "/users"            render={() => this.getTrainerComponent('users')} />*/}
                {/*<Route exact path = "/statistic"        render={() => this.getTrainerComponent('loader-blank')} />*/}
                {/*/!*<Route exact path = "/statistic"        render={() => this.getTrainerComponent('statistic')} />*!/*/}
                {/*<Route exact path = "/rating"           render={() => this.getTrainerComponent('loader-blank')} />*/}
                {/*/!*<Route exact path = "/rating"           render={() => this.getTrainerComponent('rating')} />*!/*/}
                {/*<Route exact path = "/help"             render={() => this.getTrainerComponent('help')} />*/}
                {/*<Route exact path = "/profile"          render={() => this.getTrainerComponent('profile')} />*/}


                {/* Change paths to actual games components */}
                {/*<Route exact path = "/game/flash"       render={() => this.getTrainerComponent('loader-blank')} />*/}
                <Route exact path = "/game/flash"       render={() => this.getGameFlash()} />
                {/*<Route exact path = "/game/columns"     render={() => this.getTrainerComponent('loader-blank')} />*/}
                <Route exact path = "/game/columns"     render={() => this.getGameColumns()} />
                <Route exact path = "/game/uniqum"      render={() => this.getTrainerComponent('loader-blank')} />
            </div>
        )
    }

    isAuthorized = () => {
        const cookies = new Cookies();
        const UID = cookies.get('UID');
        const URID = cookies.get('URID');

        if(UID !== undefined && URID !== undefined){
            return parseInt(URID, 10);
        }else{
            return -1;
        }
    };

    getMainGate = () => {
        switch(this.isAuthorized()){
            case -1:    return <Redirect to="/login"/>;
            case 1:     return <Redirect to="/admin"/>;
            case 2:     return <Redirect to="/trainer"/>;
            case 3:     return <Redirect to="/trainee"/>;
            default:    return <Redirect to="/404"/>;
        }
    };

    getGroupPrefsPage = ({match}) => {
        const { id } = match.params;
        return <TrainerPages page='group-prefs' id={id}/>
    };

    getUserPrefsPage = ({match}) => {
        const { id } = match.params;
        return <TrainerPages page='user-prefs' id={id}/>
    };

    getConfirmationPage = ({match}) => {
        const { id } = match.params;
        return <ConfirmationPage id={id}/>
    };

    getTrainerComponent = (type) => {
        return <TrainerPages page={type}/>;
    };

    getTraineeComponent = (type) => {
        return <TraineePages page={type}/>;
    };

    getGameFlash = () => {
        return <Flash />;
    };

    getGameColumns = () => {
        return <Columns />;
    };
}

export default CustomRouter;