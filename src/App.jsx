import { useState } from "react";
import { Configuration, OpenAIApi } from "openai";
import jdf3Logo from './assets/jdf3Logo.png';

// OpenAI config
const configuration = new Configuration({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
});
const apiClient = new OpenAIApi(configuration);

const App = () => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");

  const handlePromptChange = (event) => {
    setPrompt(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const completions = await apiClient.createCompletion({
        model: "text-davinci-003",
        prompt: `Write a detailed Reddit post about: ${prompt}`,
        max_tokens: 880,
        temperature: 0.7,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });
      setResponse(completions.data.choices[0].text);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black px-100 sm:p-0">
      <img src={jdf3Logo} alt="JDF3 Logo" className="h-24 mb-10 mt-40" />
      <form onSubmit={handleSubmit} className="w-full max-w-lg">
        <div className="flex items-center border-b-2 border-gold py-2">
          <input
            className="appearance-none bg-transparent border-none w-full text-white mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="text"
            placeholder="Enter a topic you want to write about on Reddit."
            value={prompt}
            onChange={handlePromptChange}
          />
          <button
            className="flex-shrink-0 bg-gold hover:bg-gold-dark border-gold hover:border-gold-dark text-sm border-4 text-white py-1 px-2 rounded"
            type="submit"
          >
            Generate
          </button>
        </div>
      </form>
      {response && (
        <div className="w-full max-w-lg mt-4">
          <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <p className="text-gray-700 text-base">{response}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
