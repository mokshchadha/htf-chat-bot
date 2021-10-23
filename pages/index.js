import Head from "next/head";
import Image from "next/image";
import React from "react";
import styles from "../styles/Home.module.css";
import io from "socket.io-client";

export default class Home extends React.Component {
  state = { text: "", conversations: [], socket:{} };

  componentDidMount() {
    this.socket = io('http://localhost:3000', {secure: true})
    this.socket.on("now", (data) => {
      console.log("data", data);
    });
    this.socket.on("chat-bot-reply", (data) => {
      console.log("chat bot recieved ", data);
      const { conversations } = this.state;
      this.setState({
        conversations: [
          ...conversations,
          { person: "chat-bot", value: data.text },
        ],
      });
    });
  }

  componentDidUpdate() {
    
  }

  handleInput(e) {
    this.setState({ text: e.target.value });
  }

  sendText() {
   const {conversations, text} = this.state
    this.setState({conversations:[...conversations, {person:"You", value: text}]})
    this.socket.emit("user-query-text", { text: text });
    console.log("emit done");
    this.setState({ text: "" });
  }

  render() {
    return ( 
      <div className={styles.container}>
        <div>
          {this.state.conversations.length > 0
            ? this.state.conversations.map((e) => (
                <p key={e.value}>
                  <span>{e.person}</span>
                  <span>{e.value}</span>
                </p>
              ))
            : "Hi Lets's start chatting!!!"}
        </div>
        <div>
          <input
            type="text"
            value={this.state.text}
            onChange={(e) => this.handleInput(e)}
          />
          <button onClick={() => this.sendText()}>Send</button>
        </div>
      </div>
    );
  }
}
