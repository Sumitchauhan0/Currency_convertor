import React, { useState } from "react";
import Inputs from "./componenst/inputs";
import useCurrencyInfo from "./hooks/usecurrencyinfo";

function App() {
  const [amount, setAmount] = useState(); // Ensure a number (controlled)
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("INR");
  const [convertedAmount, setConvertedAmount] = useState(0);

  const currencyInfo = useCurrencyInfo(from) || {};
  const options = Object.keys(currencyInfo);

  const swap = () => {
    setFrom(to);
    setTo(from);
    setConvertedAmount(amount);
    setAmount(convertedAmount);
  };

  const convert = (e) => {
    e.preventDefault();
    if (!currencyInfo[to]) return;
    setConvertedAmount(amount * currencyInfo[to]);
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4"
    >
      <div className="bg-gray-600 bg-opacity-90 backdrop-blur-lg rounded-xl shadow-2xl max-w-lg w-full p-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-white">
          Currency Converter
        </h1>

        <form onSubmit={convert} className="space-y-6">
          <Inputs
            label="From"
            amount={amount}
            onAmountChange={setAmount}
            currencyOption={options}
            onCurrencyChange={setFrom}
            selectcurrency={from}
          />

          <div className="flex justify-center">
            <button
              type="button"
              onClick={swap}
              aria-label="Swap currencies"
              className="flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white rounded-full p-3 shadow-lg transition-transform transform hover:scale-110"
            >
              
                Swap
            </button>
          </div>

          <Inputs
            label="To"
            amount={convertedAmount}
            onAmountChange={() => {}}
            currencyOption={options}
            onCurrencyChange={setTo}
            selectcurrency={to}
            amountDisable
          />

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-3 rounded-lg font-semibold shadow-lg transition duration-300 hover:scale-[1.02]"
           value={convert}>            Convert
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
