import openai from 'openai';
import { useState, useEffect } from 'react';

export const Respose = ({handleSubmit}) => {
  const [response, setResponse] = useState('');
  const [prompt, setPrompt] = useState('');
console.log(handleSubmit)
 

    // openai.apiKey = "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";
    // openai
    //   .Completion
    //   .create({
    //     engine: "text-davinci-002",
    //     prompt: prompt,
    //   })
    //   .then(response => {
    //     console.log(response);
    //     setResponse(response.choices[0].text);
    //   });
  

  return (
    <form onSubmit={()=>handleSubmit(prompt)}>
      <input type="text" value={prompt} onChange={e => setPrompt(e.target.value)} />
      <button type="submit">Submit</button>
    </form>
  )
}