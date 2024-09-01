import React, { useState } from "react";
import { FaBolt } from "react-icons/fa";

const QuoteGenerator = () => {
  const [loading, setLoading] = useState(false);
  const [quote, setQuote] = useState(null);
  const [error, setError] = useState(null); // New state for errors

  async function fetchQuote() {
    try {
      setLoading(true);
      setError(null); // Reset error state
      const response = await fetch("https://api.quotable.io/random", {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      const result = await response.json();
      console.log("Fetched Quote:", result); // Log the result to check if it's fetched properly
      setQuote(result); // Set the fetched quote
      audioEffect();
    } catch (error) {
      console.error("Error fetching the quote:", error);
      // setError("Failed to fetch quote. Please try again."); // Set error message
      setQuote({
        content: "Failed to fetch quote. Please try again.",
        author: "",
      }); // Set error message
    } finally {
      setLoading(false);
    }
  }

  const glowGEN = {
    boxShadow: "0 0 30px rgba(120, 200, 200, 0.7)",
  };

  const audioEffect = () => {
    try {
      const audio = new Audio("/assets/Select Button Sound Effect.mp3");
      audio.volume = 1;
      audio.play().catch((err) => {
        console.error("Audio playback failed:", err);
      });
    } catch (err) {
      console.error("Error initializing audio effect:", err);
    }
  };

  return (
    <div className="m-12 p-2 bg-slate-950 bg-opacity-70 rounded-2xl ">
      <h1 className="text-pink-200 font-bold text-2xl underline">Quote</h1>

      <div className="p-2 text-white">
        {error ? (
          <p className="text-red-500">{error}</p>
        ) : quote ? (
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
          aria-label="Generate new quote"
          className="flex items-center gap-2 focus:outline-none"
        >
          {loading ? "Loading.." : "Generate"}
          <FaBolt className="text-pink-100" />
        </button>
      </div>
    </div>
  );
};

export default QuoteGenerator;
