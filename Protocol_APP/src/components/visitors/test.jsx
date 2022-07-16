import React, { useState, useEffect } from "react"; // Add useEffect
import { HubConnectionBuilder } from "@microsoft/signalr";
import { Button, Input, notification } from "antd";

import addNotification from "react-push-notification";
import { Notifications } from "react-push-notification";

const Test = () => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState(["test message 1", "test message 2"]);

  // Add: Our SignalR Hub
  const [hubCx, setHubCx] = useState(null);

  // When our component loads... let's set up our signalR connection
  useEffect(() => {
    (async () => {
      const newConnection = new HubConnectionBuilder()
        .withUrl("https://localhost:7243/chatHub") // Ensure same as BE
        .withAutomaticReconnect()
        .build();
      await newConnection.start();

      // Let's also setup our receiving method...
      newConnection.on("ReceiveMessage", (message) => {
        notification.open({
          message: "New Notification",
          description: message,
        });
      });
      setHubCx(newConnection);
    })(); // Just a way to run an async func in useEffect...
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Remove:
    // setChat(m => [`${name}: ${message}`, ...m]);
    // Add:
    hubCx.invoke("SendMessage", name, message);
    setMessage("");
  };

  const renderMessages = () => {
    let i = 0;
    return chat.map((m) => <div key={`${i++}`}>{m}</div>);
  };

  function buttonOnClick() {
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
  }

  return (
    <div>
      <h1>Chat Test</h1>
      <div>
        <h2>Send Message</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Name"
          />
          &nbsp;
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Message"
          />
          &nbsp;
          <input type="submit" value="Submit" />
        </form>
      </div>
      <hr />
      <h2>Chat Log</h2>
      <div>{renderMessages()}</div>

      <Notifications />
      <h1>Hey Geek!</h1>
      <button onClick={buttonOnClick}>Push Notification</button>
    </div>
  );
};

export default Test;
