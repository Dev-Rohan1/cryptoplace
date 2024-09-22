import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ColorRing } from "react-loader-spinner";

import styles from "../styles/Coin.module.css";
import { CoinContext } from "../context/CoinContext";
import LineChart from "../components/LineChart";

const Coin = () => {
  const { coinId } = useParams();
  const [coinData, setCoinData] = useState();
  const [chartData, setChartData] = useState();
  const { currency } = useContext(CoinContext);

  useEffect(() => {
    const fetchCoinData = async () => {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          "x-cg-demo-api-key": "CG-AqNwyh6XoVR5K9WPfjqkfZ68	",
        },
      };

      fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`, options)
        .then((response) => response.json())
        .then((response) => setCoinData(response))
        .catch((err) => console.error(err));
    };

    const fetchChartData = async () => {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          "x-cg-demo-api-key": "CG-AqNwyh6XoVR5K9WPfjqkfZ68	",
        },
      };

      fetch(
        `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=5&interval=daily`,
        options
      )
        .then((response) => response.json())
        .then((response) => setChartData(response))
        .catch((err) => console.error(err));
    };

    fetchCoinData();
    fetchChartData();
  }, [coinId, currency.name]);

  return (
    <section>
      <div className="container">
        {coinData && chartData ? (
          <div className={`${styles.coinWrapper}`}>
            <img src={coinData.image.large} alt="coin_image" />
            <h2>
              {coinData.name} ({coinData.symbol.toUpperCase()})
            </h2>
            <div style={{ width: "100%", marginBottom: "30px" }}>
              <LineChart chartData={chartData} />
            </div>
            <div className={`${styles.coinInfo}`}>
              <ul>
                <li>
                  <span>Crypto Market Rank</span>
                  <span>{coinData.market_cap_rank}</span>
                </li>
                <li>
                  <span>Current Price</span>
                  <span>
                    {`
                    ${currency.symbol} ${coinData?.market_data?.current_price[
                      currency.name
                    ].toLocaleString()}`}
                  </span>
                </li>
                <li>
                  <span>Market cap</span>
                  <span>
                    {`${currency.symbol}  ${coinData?.market_data?.market_cap[
                      currency.name
                    ].toLocaleString()}
                    `}
                  </span>
                </li>
                <li>
                  <span>24 Hour high</span>
                  <span>{`${currency.symbol}  ${
                    coinData?.market_data.high_24h[currency.name]
                  }`}</span>
                </li>
                <li>
                  <span>24 Hour low</span>
                  <span>{`${currency.symbol}  ${
                    coinData?.market_data.low_24h[currency.name]
                  }`}</span>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <div className={`${styles.sppiner}`}>
            <ColorRing
              visible={true}
              height="90"
              width="90"
              ariaLabel="color-ring-loading"
              wrapperStyle={{}}
              wrapperClass="color-ring-wrapper"
              colors={["#fff", "#fff", "#fff", "#fff", "#fff"]}
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default Coin;
