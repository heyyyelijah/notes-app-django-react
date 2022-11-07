import './App.css';
import MainPage from './pages/MainPage';
import { HashRouter } from "react-router-dom";
import React from 'react'


function App() {
  return (
      <div className="container dark">
        <div className='app'>
          <HashRouter>
            <MainPage />
          </HashRouter>
        </div>
      </div>
  );
}

export default App;
