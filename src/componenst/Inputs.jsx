import React, { useState, useRef, useEffect } from "react";

export default function Inputs({
  label,
  amount,
  onAmountChange,
  currencyOption = [],
  selectcurrency,
  onCurrencyChange,
  amountDisable,
}) {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const filteredOptions = currencyOption.filter((currency) =>
    currency.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
        setSearch("");
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="mb-6 relative w-full max-w-md mx-auto" ref={dropdownRef}>
      <label className="block text-white font-semibold mb-2 text-lg">{label}</label>

      <input
        type="number"
        value={amount !== undefined && amount !== null ? amount : ""}
        onChange={(e) => onAmountChange(Number(e.target.value))}
        disabled={amountDisable}
        className={`w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 ${
          amountDisable ? "bg-gray-100 cursor-not-allowed text-gray-400" : "bg-white text-black"
        }`}
        placeholder="Enter amount"
      />

      <div className="mt-3 relative">
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="w-1/3 bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 flex justify-between items-center ml-auto"
        >
          <span className="block truncate font-medium text-gray-900">{selectcurrency.toUpperCase()}</span>
          <svg
            className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
              open ? "transform rotate-180" : ""
            }`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {open && (
          <div className="absolute right-0 z-10 mt-1 w-1/2 bg-white shadow-lg rounded-md max-h-60 overflow-auto ring-1 ring-black ring-opacity-5">
            <input
              type="text"
              placeholder="Search currency..."
              className="w-full p-2 border-b border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-t-md ml-auto"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              autoFocus
            />
            {filteredOptions.length > 0 ? (
              filteredOptions.map((currency) => (
                <button
                  key={currency}
                  onClick={() => {
                    onCurrencyChange(currency);
                    setOpen(false);
                    setSearch("");
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-blue-600 hover:text-white cursor-pointer"
                >
                  {currency.toUpperCase()}
                </button>
              ))
            ) : (
              <div className="px-4 py-2 text-gray-500">No currencies found</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
