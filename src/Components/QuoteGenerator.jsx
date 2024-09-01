import React, { useState } from "react";
import { FaBolt } from "react-icons/fa";

const QuoteGenerator = () => {
  const [loading, setLoading] = useState(false);
  const [quote, setQuote] = useState(null);

  async function fetchQuote() {
    try {
      setLoading(true);
      const response = await fetch("https://api.quotable.io/random", {
        method: "GET",
      });
      const result = await response.json();
      console.log(result); // Log the result to check if it's fetched properly
      setQuote(result); // Set the fetched quote
      audioEffect();
    } catch (error) {
      console.error("Error fetching the quote:", error);
    } finally {
      setLoading(false);
    }
  }

  const glowGEN = {
    boxShadow: "0 0 30px rgba(120, 200, 200, 0.8)",
  };

  const audioEffect = () => {
    const audio = new Audio("src/assets/Select Button Sound Effect.mp3");
    audio.play();
  };

  // const audioEffectForGenerate = () => {
  //   const audio = new Audio("src/assets/app button click sound.mp3");
  //   audio.play();
  // };

  return (
    <div className="m-12 p-2 bg-slate-950 bg-opacity-70 rounded-2xl ">
      <h1 className="text-pink-200 font-bold text-2xl underline">Quote</h1>

      <div className="p-2 text-white">
        {quote ? (
          <>
            <p className="">{quote.content}</p>
            <div className="pt-4 text-sm">
              <p>Author: {quote.author || "Unknown"}</p>
            </div>
          </>
        ) : (
          <p>Click To Generate A Quote!</p>
        )}
      </div>

      <div
        className="p-1 mt-7 mb-7 flex justify-center items-center gap-2 text-white bg-cyan-700 bg-opacity-70 w-48 mx-auto rounded-full hover:bg-cyan-500 cursor-pointer"
        style={glowGEN}
        onClick={fetchQuote} // Trigger the API call on button click
      >
        <button
          disabled={loading}
        >
          {loading ? "Loading.." : "Generate"}
        </button>
        <FaBolt className="text-pink-100" />
      </div>
    </div>
  );
};

export default QuoteGenerator;
