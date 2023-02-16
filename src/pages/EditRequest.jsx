import React, { useState, useEffect  } from "react";
import axios from 'axios'
import { useParams } from "react-router-dom";

export default function EditRequest() {
  const [request, setRequest] = useState({});
  const { id } = useParams();
  useEffect(() => {
    const URL = 'http://localhost:3000'
    const REQUEST_URL = URL + "/requests/" + id +".json"
    let token = localStorage.getItem("token");
    if (token) {
      fetch(REQUEST_URL, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((result) => {
          if (result.id) {
            setRequest(result);
          }
        });
    }
  }, []);

  const saveRequest = () => {
    // Implement saveRequest logic here
  };

  let token = localStorage.getItem("token");

  if (token) {
    return (
      <div>
        <RequestForm request={request} onSubmit={saveRequest} />
      </div>
    )
  } else {
    return null;
  }
}




const RequestForm = (props) => {
    const [request, setRequest] = useState({
        title: '',
        time: '',
        location: '',
        description: '',
        budget: ''
    });






    const { id } = useParams();

    const [title, setTitle] = useState('');
    const [time, setTime] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const [budget, setBudget] = useState('');

    function _handleTitle(e) {
        setTitle(e.target.value)
    };

    function _handleTime(e) {
        setTime(e.target.value);
    };

    function _handleLocation(e) {
        setLocation(e.target.value)
    };

    function _handleDescription(e) {
        setDescription(e.target.value)
    };

    function _handleBudget(e) {
        setBudget(Number(e.target.value))
    };


    function _handleInputFocus(event) {
    event.target.select();
    }
    const requestDate = String(props.request.time).slice(0,10);

    let token = localStorage.getItem("token");
    let headers = {};
    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }
    const _handleSubmit = (event) => {
        event.preventDefault(); // prevent the form from reloading the page
        const requestData = {
          title: title || props.request.title,
          date: time || requestDate,
          location: location || props.request.location,
          description: description || props.request.description,
          budget: budget || parseFloat(props.request.budget).toFixed(2),
        };
        axios.put(`http://localhost:3000/requests/${id}.json`, requestData, {headers})
          .then((response) => {
            setRequest(response.data); // update the request state with the response data from the server
          })
          .catch((error) => {
            console.log(error); // handle any errors that occur during the AJAX request
          })
          .then(()=>{
            window.location.href = `/requests/${id}`
          })
      };



    return (

        
        <div>
            <h2 className='newRequestTitle'>Edit request</h2>
            <div className='newRequestForm'>
              <form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={_handleSubmit}>
                  <label className='newRequest'>
                      In a few words, what do you need done?
                      <input className='newRequestInput'  type="text" name='title' id='title' value={title || props.request.title} onInput={_handleTitle} onFocus={_handleInputFocus} required />
                  </label>
                  <label className='newRequest'>
                      When do you need this done? 
                      <input className='newRequestInput'  type="date" name='time' id='time' value={time || requestDate} onInput={_handleTime} required />
                  </label>
                  <label className='newRequest'>
                      Where do you need this done?
                      <input className='newRequestInput'  type="text" name='location' id="location" value={location || props.request.location} onInput={_handleLocation} onFocus={_handleInputFocus} required />
                  </label>
                  <label className='newRequest'>
                      Provide more details of the request
                      <textarea className='newRequestInput'  name="description" id="description" cols="30" rows="10" value={description || props.request.description} onInput={_handleDescription} onFocus={_handleInputFocus}></textarea>
                  </label>
                  <label className='newRequest'>
                      What is your budget for this request?
                      <input  className='newRequestInput' type="number" value={budget|| parseInt(props.request.budget).toFixed(2)} onInput={_handleBudget} onFocus={_handleInputFocus} required />
                  </label>
                  <input className='signupBtn' type="submit" value="Edit request" />
              </form>
            </div>
        </div>
    )
}