import { Respose } from "./component/Response";
import { useEffect, useState } from "react";
import "./App.css";
import "./normal.css";
import ChatBot from "react-simple-chatbot";
const { Configuration, OpenAIApi } = require("openai");

function App() {
  const [response, setResponse] = useState("");
  const [prompt, setPrompt] = useState("");
  const [question, setQuestion] = useState([]);
  const [resp, setResp] = useState([]);
  const refresh = () => window.location.reload(true)
  //steps
  const steps = [
    {
      id: "0",
      message: "Welcome to chatbot!",
      trigger: "1",
    },
    {
      id: "1",
      message: "Please select your profession?",
      trigger: "2",
    },
    {
      id: "2",
      // message: 'Bye!',
      user: true,
      trigger: "3",
      // end: true,
    },
    {
      id: "3",
      message: "That's Good!!",
      end: true,
    },
  ];
// console.log(process.env.REACT_APP_API_KEY,key)
  const configuration = new Configuration({
    apiKey: process.env.REACT_APP_API_KEY,
  }); console.log(configuration,'config')
  // const prompt = "What is the capital of France?";
  const handleSubmit = (prompt) => {
    console.log(prompt, "text");
    question.push({ id: 0, message: prompt });
    console.log(question, "question");
    // e.preventDefault();
    getAiResponse(prompt);
    setPrompt("");
    console.log(question, "question  2");
  };

  async function getAiResponse(topic) {
    const openai = new OpenAIApi(configuration);
    console.log(openai,'testopen')
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: topic,
      max_tokens: 1024,
      n: 1,
      stop: null,
      temperature: 0.7,
    });
    console.log(completion.data.choices[0].text);
    setResponse(completion.data.choices[0].text);
    question.push({ id: 1, message: completion.data.choices[0].text });
  }
  const handleOnChange = (event) => {
    event.preventDefault();
    console.log(event.target.value);
    setPrompt(event.target.value);
  };

  // enter key submit
  useEffect(() => {
    const keyDownHandler = (event) => {
      console.log("User pressed: ", event.key);

      if (event.key === "Enter") {
        event.preventDefault();

        // 👇️ call submit function here
        handleSubmit(prompt);
      }
    };

    document.addEventListener("keydown", keyDownHandler);

    return () => {
      document.removeEventListener("keydown", keyDownHandler);
    };
  }, [prompt]);

  return (
    <div className="App">
      <aside className="sidemenu">
        <div className="side-menu-button" onClick={refresh}>
          <span >+</span>New Chat
        </div>
      </aside>

      <section className="chatbox">
        {/* <div><Respose handleSubmit={handleSubmit}></Respose></div> */}
        <div className="chat-message">
          {/* <div className='chat-message-text'>{response}</div> */}
          <ChatBot steps={steps} floating={true} />
        </div>

        <div>
          {Array.isArray(question)
            ? question?.map((q, i) => {
                return q?.id === 0 ? (
                  <div key={i} className="chat-textarea">
                    {q.message}
                  </div>
                ) : (
                  <div key={i} className="chat-message-text">
                    {q.message}
                  </div>
                );
              })
            : null}
        </div>

        {/* <div className='chat-message-text'>{
         Array.isArray(question)  ? question?.map((r,i)=>{
           return <div key={i}>{r.message}</div>
         }) : null
        }</div> */}

        <div className="chat-input-holder">
          <textarea
            rows={2}
            className="chat-textarea"
            value={prompt}
            onChange={(event) => handleOnChange(event)}
          ></textarea>
          <button className="button-click" onClick={(e) => handleSubmit(prompt)}>Click here</button>
        </div>
      </section>
    </div>
  );
}

export default App;
