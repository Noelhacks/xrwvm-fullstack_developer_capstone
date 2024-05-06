import React, { useState, useEffect } from 'react';
import "./Dealers.css";
import "../assets/style.css";
import Header from '../Header/Header';
import review_icon from "../assets/reviewicon.png"

const Dealers = () => {
  const [dealersList, setDealersList] = useState([]);
  const [states, setStates] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [originalDealers, setOriginalDealers] = useState([]);

  const dealerUrl = "/djangoapp/get_dealers";
  let dealerUrlByState = "/djangoapp/get_dealers/";

  useEffect(() => {
    getDealers();
  }, []);

  const getDealers = async () => {
    const res = await fetch(dealerUrl, {
      method: "GET"
    });
    const retobj = await res.json();
    if (retobj.status === 200) {
      const allDealers = Array.from(retobj.dealers);
      const states = allDealers.map(dealer => dealer.state);
      setStates(Array.from(new Set(states)));
      setDealersList(allDealers);
      setOriginalDealers(allDealers);
    }
  }

  const filterDealers = async (state) => {
    dealerUrlByState = dealerUrlByState + state;
    const res = await fetch(dealerUrlByState, {
      method: "GET"
    });
    const retobj = await res.json();
    if (retobj.status === 200) {
      const stateDealers = Array.from(retobj.dealers);
      setDealersList(stateDealers);
    }
  }

  const handleInputChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    const filtered = originalDealers.filter(dealer =>
      dealer.state.toLowerCase().includes(query.toLowerCase())
    );
    setDealersList(filtered);
  };

  const handleLostFocus = () => {
    if (!searchQuery) {
      setDealersList(originalDealers);
    }
  }

  const isLoggedIn = sessionStorage.getItem("username") != null;

  return (
    <div>
      <Header />
      <table className='table'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Dealer Name</th>
            <th>City</th>
            <th>Address</th>
            <th>Zip</th>
            <th>
              <input type="text" placeholder="Search states..." onChange={handleInputChange} onBlur={handleLostFocus} value={searchQuery} />
            </th>
            {isLoggedIn && <th>Review Dealer</th>}
          </tr>
        </thead>
        <tbody>
          {dealersList.map(dealer => (
            <tr key={dealer.id}>
              <td>{dealer.id}</td>
              <td><a href={`/dealer/${dealer.id}`}>{dealer.full_name}</a></td>
              <td>{dealer.city}</td>
              <td>{dealer.address}</td>
              <td>{dealer.zip}</td>
              <td>{dealer.state}</td>
              {isLoggedIn && (
                <td><a href={`/postreview/${dealer.id}`}><img src={review_icon} className="review_icon" alt="Post Review" /></a></td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Dealers;
