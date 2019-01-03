import React, {Component} from 'react';
import Header from '../header';
import RandomPlanet from '../random-planet';
import './app.css';
import ErrorIndicator from "../error-indicator/error-indicator";
import SwapiService from "../../services/swapi-service";
import  DummySwapiService from "../../services/dummy-swapi-service";
import {SwapiServiceProvider} from "../swapi-service-context";
import {PeoplePage, PlanetsPage, StarshipsPage} from "../pages";

export default class App extends Component {


    state = {
        showRandomPlanet: true,
        hasError: false,
        swapiService: new SwapiService()
    };
    onServiceChange = () => {
        this.setState(({swapiService}) => {

            const Service = swapiService instanceof SwapiService ?
                DummySwapiService : SwapiService;
            return {
                swapiService: new Service()
            }
        })
    };

    componentDidCatch() {
        this.setState({hasError: true})
    }

    render() {
        if (this.state.hasError) {
            return <ErrorIndicator/>
        }
        return (
            <div>
                <SwapiServiceProvider value={this.state.swapiService}>
                    <Header onServiceChange={this.onServiceChange}/>

                    <RandomPlanet/>
                    <PeoplePage/>
                    <PlanetsPage/>
                    <StarshipsPage/>
                </SwapiServiceProvider>
            </div>
        )
    }
};

