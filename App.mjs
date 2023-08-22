import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import TipDetails from './tipdetails.mjs';

function App() {
  const [tips, setTips] = useState([]);
  const [newTip, setNewTip] = useState({ title: '', content: '' });

  const fetchTips = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/tips');
      setTips(response.data);
    } catch (error) {
      console.error('Error fetching tips:', error);
    }
  };

  const submitTip = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/tips', newTip);
      console.log('Tip submitted:', response.data);
      setTips([...tips, response.data]);
      setNewTip({ title: '', content: '' });
    } catch (error) {
      console.error('Error submitting tip:', error);
    }
  };

  useEffect(() => {
    fetchTips();
  }, []);

  return (
    <Router>
      <div className="App">
        <div className="TitlePanel">
          <h1>Camping & Survival Tips</h1>
        </div>
        <div className="Container">
          <div className="SidePanel">
            <h2>Tips Categories</h2>
            <ul>
              {tips.map((tip) => (
                <li key={tip._id}>
                  <Link to={`/tips/${tip._id}`}>{tip.title}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="Content">
            <Routes>
              <Route
                path="/"
                element={
                  <div>
                    <h2>Select a Tip from the SidePanel</h2>
                    <form onSubmit={submitTip}>
                      <label>
                        Title:
                        <input
                          type="text"
                          id="tipTitle"
                          value={newTip.title}
                          onChange={(e) =>
                            setNewTip({ ...newTip, title: e.target.value })
                          }
                        />
                      </label>
                      <label>
                        Content:
                        <textarea
                          id="tipContent"
                          value={newTip.content}
                          onChange={(e) =>
                            setNewTip({ ...newTip, content: e.target.value })
                          }
                        />
                      </label>
                      <button type="submit">Submit Tip</button>
                    </form>
                  </div>
                }
              />
              <Route path="/tips/:tipId" element={<TipDetails />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
