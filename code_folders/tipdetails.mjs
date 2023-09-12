/* .js code for creating relation between app.js and submitted tips */


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function TipDetails() {
  const { tipId } = useParams();
  const [tipDetails, setTipDetails] = useState({});

  useEffect(() => {
    const fetchTipDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/tips/${tipId}`); /* getting tip ID's from server*/
        setTipDetails(response.data);
      } catch (error) {
        console.error('Error fetching tip details:', error);
      }
    };

    fetchTipDetails();
  }, [tipId]);

  return (
    <div>
      <h2>Tip Details</h2>
      <h3>{tipDetails.title}</h3>
      <p>{tipDetails.content}</p>
    </div>
  );
}

export default TipDetails;





