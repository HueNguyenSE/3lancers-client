import React, { Component, useState, useEffect } from 'react';
import axios from 'axios'
import { useParams } from "react-router-dom";
import { FiEdit2 } from 'react-icons/fi'

import Map from "../components/Map"
import Comments from "../components/Comments";
import Offers from "../components/Offers";
import CancelReopenComplete from "../components/CancelReopenComplete"
import MakeOffer from "../components/MakeOffer"
// import MessageButton from "../components/MessageButton"
import SendMessage from "../components/SendMessage"

const URL = 'http://localhost:3000'
const REQUESTS_URL = URL + '/requests.json'

export default class RequestId extends Component {
    constructor() {
        super();
        this.state = {
            requests: []
        }
    }

    componentDidMount() {
        const fetchRequests = () => {
            axios.get(REQUESTS_URL).then((response) => {
                this.setState({ requests:response.data })
                setTimeout(fetchRequests, 2500)
            })
        }
        fetchRequests()
    }

    render() {

        return(
            <div>
                <RequestInfo requests={this.state.requests} user={this.props.user}/>
            </div>
        )
    }
}







const RequestInfo = (props) => {
    const { id } = useParams();
    const [showElementC, setShowElementC] = useState(false);
    const handleClickC = () => {
        setShowElementC(true);
        setShowElementO(false);
    };
    const [showElementO, setShowElementO] = useState(true);
    const handleClickO = () => {
        setShowElementO(true);
        setShowElementC(false);
    };
    const OFFERS_URL = 'http://localhost:3000/offers.json'
    const [offers, setOffers] = useState([]);
    useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(OFFERS_URL);
      const offers = response.data
      const filteredOffers = offers.filter(offer => offer.request_id == id);
      setOffers(filteredOffers);
    };

    const intervalId = setInterval(fetchData, 1500);




    return () => clearInterval(intervalId);
  }, []);


    const editIcon = <FiEdit2 className='edit'
    size='25px' color='#8A2BE2'
    cursor='pointer'
    onClick={() => window.location.href = `/requests/${id}/edit`}
    />


    let mapLocation
    for (let i = 0; i < props.requests.length; i++) {
        if (props.requests[i].id == id) {
            mapLocation = (props.requests[i].location).replace(/\s+/g, '+')
        }
    }




    if (props.requests) {
    for (let i = 0; i < props.requests.length; i++) {
      if (props.requests[i].id == id) {
        const r = props.requests[i]
        const dateOptions = { day: "2-digit", month: "short", year: "numeric" };
        return(
            <div>
                <h3>{r.title}</h3>{(props.user.id == r.user_id || props.user.admin === true) && editIcon}
                <h3>Request status: {r.status}</h3>
                <p>Location: {r.location}</p>
                <Map mapLocation={mapLocation}/>
                <p>Description: {r.description}</p>
                <p>Date: {new Date(r.time).toLocaleDateString("en-AU", dateOptions)}</p>
                <p>Budget: <b>${parseInt(r.budget).toFixed(2)}</b></p>
                <div>
                    {(props.user.id == r.user_id || props.user.admin === true) && (
                        <div>
                        <CancelReopenComplete request={r} offers={offers} />
                        </div>
                    )}
                    {(props.user.id) && (
                        <div>
                            <SendMessage creator_id={r.user_id} current_user_id={props.user.id} request_id={r.id}/>
                        </div>
                    )}
                    <div></div>
                    {r.user_id != props.user.id && (
                        <MakeOffer user={props.user} request={r} offers={offers} />
                    )}



                </div>
                <div>
                    <div>
                        <button onClick={handleClickC}>
                            Comments
                        </button>
                        <button onClick={handleClickO}>
                            Offers
                        </button>
                    </div>
                    {showElementC && <Comments user={props.user} request={r} />}
                    {showElementO && <Offers user={props.user} request={r} offers={offers}/>}
                </div>

            </div>
        )
      }
    }
    }
    else {
        return(<div>Loading...</div>)
    }
}

