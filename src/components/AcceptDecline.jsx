import { Component } from "react";
import axios from 'axios'

// const OFFER_URL = 'http://localhost:3000/offers.json'

export default class AcceptDecline extends Component {
    constructor() {
        super();
        this.state = {
            offer: null,
        };
        this.declineOffer = this.declineOffer.bind(this);
    }

    declineOffer(status) {
        // decline the offer on the server via AJAX
        
        let token = localStorage.getItem("token");
    
        // If the token exists, set the authorization header with the token
        let headers = {};
        if (token) {
            headers.Authorization = `Bearer ${token}`;
        }  
        axios.put(`http://localhost:3000/offers/${this.props.offer.request_id}.json`, { status: 'Declined'}).then((response) => {
            // decline the offer in the state
            let offer = this.props.offer;
            offer = response.data;
            this.setState({ offer: offer });
        });
    };

    render() {


        return(
        <div>
            <a href="#">Accept</a> <a href="#" onClick={() => this.declineOffer}>Decline</a>
        </div>
        )

    }




}