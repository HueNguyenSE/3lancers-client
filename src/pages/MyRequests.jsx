import React, { Component } from 'react';
import axios from 'axios';

const Requests_URL = 'http://localhost:3000/requests.json';

class MyRequests extends Component {
    constructor() {
        super();
        this.state = {
            requests: [],
        };
    }
    componentDidMount() {
        const fetchRequests = () => {
            axios.get(Requests_URL).then((response) => {
                this.setState({requests: response.data});
                console.log(response)
            });
        };
        fetchRequests(); 
    }

    render() {
        const requests = this.state.requests;
        const userID = this.props.user.id;
        const filteredRequests = requests.filter(request => request.user_id === userID);
        return (
            <div>
                <h2>My Requests</h2>
                <div id='group requests'>
                    { filteredRequests.map((r) => {
                        return (
                            <div id='single request' key={ r.id }>
                            <a href={`/requests/${ r.id }`}>{r.title}</a>
                                <p>{ r.time }</p>
                                <p>Price: { r.budget }</p>
                                <p>{ r.status }</p>
<<<<<<< HEAD
                                <p>Bids: { r.offers.length }</p>
=======
                                <p>Currently { r.offers.length } offer(s)</p>
>>>>>>> ea4371acb42c1621fcaed1c5c9c13c704a6a0dd7
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
}

export default MyRequests;