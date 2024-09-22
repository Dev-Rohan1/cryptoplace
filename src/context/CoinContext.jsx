/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";

export const CoinContext = createContext();

const CoinContextProvider = (props) => {
  const [allCoins, setAllCoins] = useState([]);
  const [currency, setCurrency] = useState({
    name: "usd",
    symbol: "$",
  });

  useEffect(() => {
    const fetchAllCoin = async () => {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          "x-cg-demo-api-key": "CG-AqNwyh6XoVR5K9WPfjqkfZ68	",
        },
      };

      fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`,
        options
      )
        .then((response) => response.json())
        .then((response) => setAllCoins(response))
        .catch((err) => console.error(err));
    };

    fetchAllCoin();
  }, [currency]);

  const contextValue = {
    allCoins,
    currency,
    setCurrency,
  };

  return (
    <CoinContext.Provider value={contextValue}>
      {props.children}
    </CoinContext.Provider>
  );
};

export default CoinContextProvider;
