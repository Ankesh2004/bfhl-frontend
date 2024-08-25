import React, { useState } from 'react';
import Select from 'react-select';
import './App.css';

const filterOptions = [
  { value: 'Numbers', label: 'Numbers' },
  { value: 'Alphabets', label: 'Alphabets' },
  { value: 'Highest lowercase alphabet', label: 'Highest lowercase alphabet' }
];

function App() {
  const [input, setInput] = useState('{"data":["M","1","334","4","B"]}');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([filterOptions[0]]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setResponse(null);

    try {
      const parsedInput = JSON.parse(input);
      const res = await fetch('https://bfhl-ezeg.onrender.com/bfhl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(parsedInput),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      setResponse(data);
    } catch (err) {
      setError('Invalid JSON input or API error');
      console.error('Error:', err);
    }
  };

  const handleOptionChange = (selectedOptions) => {
    setSelectedOptions(selectedOptions);
  };

  const renderFilteredResponse = () => {
    if (!response) return null;

    let filteredResponse = {};

    selectedOptions.forEach(option => {
      switch(option.value) {
        case 'Alphabets':
          filteredResponse.Alphabets = response.alphabets.join(',');
          break;
        case 'Numbers':
          filteredResponse.Numbers = response.numbers.join(',');
          break;
        case 'Highest lowercase alphabet':
          filteredResponse['Highest lowercase alphabet'] = response.highest_lowercase_alphabet.join(',');
          break;
        default:
          break;
      }
    });

    return (
      <div className="filtered-response">
        <h3>Filtered Response</h3>
        {Object.entries(filteredResponse).map(([key, value]) => (
          <p key={key}>{key}: {value}</p>
        ))}
      </div>
    );
  };

  return (
    <div className="app">
      <h1>21BCE5800</h1> {/* Replace with your actual roll number */}
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label htmlFor="api-input">API Input</label>
          <textarea
            id="api-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='Enter JSON (e.g., {"data": ["A","C","z"]})'
          />
        </div>
        <button type="submit" className="submit-btn">Submit</button>
      </form>
      {error && <p className="error">{error}</p>}
      {response && (
        <div className="response-container">
          <div className="multi-filter">
            <label>Multi Filter</label>
            <Select
              isMulti
              name="filters"
              options={filterOptions}
              className="basic-multi-select"
              classNamePrefix="select"
              value={selectedOptions}
              onChange={handleOptionChange}
            />
          </div>
          {renderFilteredResponse()}
        </div>
      )}
    </div>
  );
}

export default App;