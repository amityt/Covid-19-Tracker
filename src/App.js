import React from 'react';
import './App.css';

const App = () => {
  localStorage.setItem('isDark', "");
  return(
    <div className="App">
      <h1>Working Properly!!</h1>
      <p>This is the App.js</p>
    </div>
  );
};

export default App;