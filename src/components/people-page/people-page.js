import React, {Component} from 'react'
import ItemList from "../item-list";
import PersonDetails from "../person-details";
import ErrorIndicator from "../error-indicator";
import SwapiService from "../../services/swapi-service";
import Row from "../row";
import ErrorBoundary from "../error-boundary";
import './people-page.css'


export default class PeoplePage extends Component {
    swapiService = new SwapiService();

    state = {
        selectedPerson: 4,
        hasError: false
    };


    onPersonSelected = (id) => {
        this.setState({
            selectedPerson: id
        })
    };

    render() {
        if (this.state.hasError) {
            return <ErrorIndicator/>
        }
        const {selectedPerson} = this.state;
        const itemList =
            <ItemList
                onItemSelected={this.onPersonSelected}
                getData={this.swapiService.getAllPeople} >

                {(i) =>
                `${i.name} (${i.birthYear})`}

            </ItemList>;
        const personDetails =
            <ErrorBoundary>
                <PersonDetails personId={selectedPerson}/>
            </ErrorBoundary>

        return (
             <Row left = {itemList} right = {personDetails} />
        )
    }
}