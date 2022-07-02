import React from 'react';
import { Dashboard, Header, Sidebar } from './layout';
import { Navigate, Route, Routes } from 'react-router-dom';
import { AddVisitor, VisitorList } from '@components';

function App() {
  try {
    var currentUser: any = JSON.parse(localStorage.getItem('token') ?? '');

    if (!currentUser) {
      return <Navigate to={`/auth/login`} />;
    }
  } catch (error) {
    return <Navigate to={`/auth/login`} />;
  }

  return (
    <>
      <Header />
      {/* <Navbar /> */}

      <div className="main-container" id="container">
        <div className="overlay" />
        <div className="search-overlay" />

        <Sidebar />
        <div id="content" className="main-content" >
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/visitor/new" element={<AddVisitor />} />
            <Route path="/visitor/list" element={<VisitorList />} />
          </Routes>
        </div>
      </div>

    </>
  );
}

export default App;
