import React, { Component } from 'react'
import ItemList from "../item-list/item-list";
import PersonDetails from "../person-details/person-details";
import ErrorIndicator from "../error-indicator/error-indicator";


export default class PeoplePage extends Component {

    state = {
        selectedPerson: 4,
        hasError: false
    };
    componentDidCatch() {
        this.setState({
            hasError: true
        })
    }

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
        return(
            <div className="row mb2">
                <div className="col-md-6">
                    <ItemList onItemSelected = { this.onPersonSelected }/>
                </div>
                <div className="col-md-6">
                    <PersonDetails personId = { selectedPerson } />
                </div>
            </div>
        )
    }
}