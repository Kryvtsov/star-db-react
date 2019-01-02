import React, {Component} from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';

import './app.css';
import ErrorButton from "../error-button/error-button";
import ErrorIndicator from "../error-indicator/error-indicator";
import PeoplePage from "../people-page";
import SwapiService from "../../services/swapi-service";
import  DummySwapiService from "../../services/dummy-swapi-service";
import Row from "../row";
import ItemDetails, {Record} from "../item-details/item-details";
import {
    PersonList,
    PlanetList,
    StarshipList,
    PersonDetails,
    PlanetDetails,
    StarshipDetails
} from "../sw-components";
import {SwapiServiceProvider} from "../swapi-service-context";

export default class App extends Component {


    state = {
        showRandomPlanet: true,
        hasError: false,
        swapiService: new SwapiService()
    };
    toggleRandomPlanet = () => {
        this.setState((state) => {
            return {
                showRandomPlanet: !state.showRandomPlanet
            }
        });
    };
    onServiceChange = () => {
        this.setState(({swapiService}) => {

            const Service = swapiService instanceof SwapiService ?
                DummySwapiService : SwapiService;
            return {
                swapiService: new Service()
            }
        })
    }

    componentDidCatch() {
        console.log('componentDidCatch()');
        this.setState({hasError: true})
    }

    render() {
        if (this.state.hasError) {
            return <ErrorIndicator/>
        }
        const planet = this.state.showRandomPlanet ?
            <RandomPlanet/> :
            null;

        const {
            getPerson,
            getStarship,
            getPersonImage,
            getStarshipImage,
        } = this.state.swapiService;
        const personDetails = (
            <ItemDetails
                itemId={11}
                getData={getPerson}
                getImageUrl={getPersonImage}>
                <Record field="gender" label="Gender"/>
                <Record field="eyeColor" label="Eye Color"/>

            </ItemDetails>

        );
        const starshipDetails = (
            <ItemDetails
                itemId={5}
                getData={getStarship}
                getImageUrl={getStarshipImage}>
                <Record field="model" label="Model"/>
                <Record field="length" label="Length"/>
                <Record field="costInCredits" label="Cost"/>

            </ItemDetails>
        );
        return (
            <div>
                <SwapiServiceProvider value={this.state.swapiService}>
                    <Header onServiceChange={this.onServiceChange}/>
                    {planet}
                    <button
                        className="toggle-planet btn btn-warning btn-lg"
                        onClick={this.toggleRandomPlanet}>
                        Toggle Random Planet
                    </button>
                    <Row
                        left={<PersonDetails itemId={11}/>}
                        right={<StarshipDetails itemId={9}/>}
                        center={<PlanetDetails itemId={8}/>}
                    />
                    <PersonList/>
                    <StarshipList/>
                    <PlanetList/>
                </SwapiServiceProvider>
            </div>
        )
    }

};

