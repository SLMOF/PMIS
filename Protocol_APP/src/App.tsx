import React, { useState, useEffect } from "react"; // Add useEffect
import { HubConnection, HubConnectionBuilder } from "@microsoft/signalr"; import { Dashboard, Header, Sidebar } from './layout';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { AddVisitor, VisitorDetails, VisitorList, AddNewVisitorPop, Test } from '@components';
import addNotification from "react-push-notification";
function App() {
  const { state } = useLocation();

  // useEffect(() => { }, [state]);
  // try {
  //   var currentUser: any = JSON.parse(localStorage.getItem('token') ?? '');

  //   if (!currentUser) {
  //     return <Navigate to={`/auth/login`} />;
  //   }
  // } catch (error) {
  //   return <Navigate to={`/auth/login`} />;
  // }
  const [message, setMessage] = useState("");
  const [hubCx, setHubCx] = useState<HubConnection>();

  useEffect(() => {
    (async () => {
      const newConnection = new HubConnectionBuilder()
        .withUrl("https://localhost:7243/chatHub") // Ensure same as BE
        .withAutomaticReconnect()
        .build();
      await newConnection.start();

      // Let's also setup our receiving method...
      newConnection.on("ReceiveMessage", (message) => {
        addNotification({
          title: "Success",
          subtitle: "You have successfully submitted",
          message: "Welcome to GeeksforGeeks",
          theme: "light",
          closeButton: "X",
          backgroundTop: "green",
          backgroundBottom: "yellowgreen",
          native: true,
          onClick: () => console.log("here i am"), //optional, onClick callback.
          duration: 30000,
        });
      });
      setHubCx(newConnection);
    })(); // Just a way to run an async func in useEffect...
  }, []);

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
            {/* <Route path="/visitor/newPop" element={<Test />} /> */}
            <Route path="/visitor/newPop" element={<AddNewVisitorPop />} />
            <Route path="/visitor/details" element={<VisitorDetails visitorId={state as number} />} />
            <Route path="/visitor/list" element={<VisitorList />} />
          </Routes>
        </div>
      </div>

    </>
  );
}

export default App;
