import {Route, Routes, useLocation} from 'react-router-dom';
import NotesListPage from './NotesListPage';
import Header from '../components/Header';
import NotePage from './NotePage';
import React from 'react';



function MainPage() {
  const location = useLocation();

  return (
    <div>
      <Header />
      <Routes  location={location} key={location.pathname}>
          <Route path='/' exact element={<NotesListPage />} />
          <Route path='/note/:id' element={<NotePage props />} />
      </Routes>
    </div>
  )
}

export default MainPage