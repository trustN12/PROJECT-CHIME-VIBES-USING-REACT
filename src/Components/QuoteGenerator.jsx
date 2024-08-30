import React, { useState } from "react";
import { FaBolt } from "react-icons/fa";

const QuoteGenerator = () => {
  const [loading, setLoading] = useState(false);
  const [quote, setQuote] = useState(null);

  async function fetchQuote() {
    try {
      setLoading(true);
      const response = await fetch("https://api.api-ninjas.com/v1/quotes", {
        method: "GET",
        headers: {
          "X-Api-Key": "H9JmcQzcsUyu7jtl1f0Yee1oQmCX7tjgTZ79ph3Y", // Replace with your actual API key
        },
      });
      const result = await response.json();
      console.log(result); // Log the result to check if it's fetched properly
      setQuote(result[0]); // Assuming the API returns an array, take the first element
    } catch (error) {
      console.error("Error fetching the quote:", error);
    } finally {
      setLoading(false);
    }
  }

  const glowGEN = {
    boxShadow: "0 0 30px rgba(120, 200, 200, 0.8)",
  };

  return (
    <div className="m-12 p-2 bg-slate-950 bg-opacity-70 rounded-2xl">
      <h1 className="text-pink-200 font-bold text-2xl underline">Quote</h1>

      <div className="p-2 text-white">
        {quote ? (
          <>
            <p className="">{quote.quote}</p>
            <div className="pt-4 text-sm">
              <p>Category: {quote.category}</p>
              <p>Author: {quote.author} </p>
            </div>
          </>
        ) : (
          <p>No quote generated yet.</p>
        )}
      </div>

      <div
        className="p-1 mt-7 mb-7 flex justify-center items-center gap-2 text-white bg-cyan-700 bg-opacity-70 w-48 mx-auto rounded-full hover:bg-cyan-500 cursor-pointer"
        style={glowGEN}
        onClick={fetchQuote} // Trigger the API call on button click
      >
        <button disabled={loading}>
          {loading ? "Loading..." : "Generate"}
        </button>
        <FaBolt className="text-pink-100" />
      </div>
    </div>
  );
};

export default QuoteGenerator;

//MINE : H9JmcQzcsUyu7jtl1f0Yee1oQmCX7tjgTZ79ph3Y
//RESPONSE_API: https://api.api-ninjas.com/v1/quotes
