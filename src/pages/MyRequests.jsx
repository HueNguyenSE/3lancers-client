import React, { Component } from 'react';
import axios from 'axios';
import { MdAttachMoney } from 'react-icons/md' 
import { GiReceiveMoney } from 'react-icons/gi' 
import { NavLink } from 'react-router-dom';
import { Helmet } from "react-helmet";

import { SERVER_URL } from "../components/SERVER_URL"

const REQUESTS_URL = SERVER_URL + "requests.json"


class MyRequests extends Component {
    constructor() {
        super();
        this.state = {
            requests: [],
        };
    }
    componentDidMount() {
        const fetchRequests = () => {
            axios.get(REQUESTS_URL).then((response) => {
                this.setState({requests: response.data});
                console.log(response)
            });
        };
        fetchRequests(); 
    }

    

   

    render() {
        const bidIconHand = <GiReceiveMoney size='25px' color='black' />
        const moneyIcon = <MdAttachMoney size='25px' color='black' />
        const requests = this.state.requests;
        const userID = this.props.user.id;
        const filteredRequests = requests.filter(request => request.user_id === userID);
        let activeStyle = {
            textDecoration: 'underline'
        }
        const dateOptions = { day: "2-digit", month: "short", year: "numeric" };
        return (
            <div>
                <Helmet>
                    <title>3Lancers | My Requests</title>
                </Helmet>
                <h2>My requests</h2>
                <ul className='request-offerToggle'>
                    <li className='request-offerLinks'>
                        <NavLink className='toggle' style={({ isActive}) => isActive ? activeStyle : undefined} to="/my-requests">Requests</NavLink>
                    </li>
                    <li className='request-offerLinks'>
                        <NavLink className='toggle' style={({ isActive}) => isActive ? activeStyle : undefined} to="/my-offers">Offers</NavLink>
                    </li>
                </ul>
                <div id='group-requests'>
                    { filteredRequests.map((r) => {
                        return (
                            <div id='single-request' key={ r.id }>
                                <div className='banner'>
                                    <div className='titleDate'>
                                        <a className='boxedLinks' href={`/requests/${ r.id }`}>{r.title.substring(0, 30)}</a>
                                        <p>{ new Date(r.time.substring(0, 10)).toLocaleDateString("en-AU", dateOptions) }</p>
                                    </div>
                                </div>
                                <div className='status'>
                                    {r.status === 'Open'  ? <p className='green'>{ r.status }</p> : r.status === 'Cancelled'  ? <p className='grey'>{ r.status }</p> : <p className='red'>{ r.status }</p>} 
                                </div>
                                <div className='price'>
                                    {moneyIcon}
                                    Price:
                                    <p className='value P'>${ parseInt(r.budget).toFixed(2) }</p>
                                </div>
                                <div className='bids'>
                                    {bidIconHand}
                                    Bids:
                                    <p className='value B'>{ r.offers.length }</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
}

export default MyRequests;