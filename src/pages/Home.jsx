import { useContext, useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import { CoinContext } from "../context/CoinContext";
import { Link } from "react-router-dom";

const Home = () => {
  const [displayCoin, setDisplayCoin] = useState([]);
  const [input, setInput] = useState("");
  const { allCoins, currency } = useContext(CoinContext);

  const inputHandle = (e) => {
    setInput(e.target.value);

    if (e.target.value === "") {
      setDisplayCoin(allCoins);
    }
  };

  const searchHandler = async (e) => {
    e.preventDefault();
    const searchData = await allCoins.filter((item) => {
      return item.name.toLowerCase().includes(input.toLocaleLowerCase());
    });

    setDisplayCoin(searchData);

    console.log(setDisplayCoin(searchData));
  };

  useEffect(() => {
    setDisplayCoin(allCoins);
  }, [allCoins]);

  return (
    <section>
      <div className="container">
        <div className={`${styles.sectionTitle}`}>
          <h1>
            Largest <br />
            Crypto Marketplace
          </h1>
          <p>
            Welcome to the world's largest cryptocurrency marketplace. Sign up
            to explore more about cryptos.
          </p>
        </div>
        <form onSubmit={searchHandler}>
          <input
            type="text"
            placeholder="Search Crypto..."
            onChange={inputHandle}
            value={input}
            required
          />
          <input type="submit" value="Search" />
        </form>
        <div className={`${styles.cryptoTable}`}>
          <div className={`${styles.tableLayout}`}>
            <p>Rank</p>
            <p>Coins</p>
            <p>Price</p>
            <p style={{ textAlign: "center" }}>24H Change</p>
            <p className={styles.marketCap} style={{ textAlign: "right" }}>
              Market Cap
            </p>
          </div>
          {displayCoin.slice(0, 20).map((item, index) => {
            return (
              <Link
                to={`/coin/${item.id}`}
                className={`${styles.tableLayout}`}
                key={index}
              >
                <p>{item.market_cap_rank}</p>
                <p
                  style={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <img
                    className={`${styles.coinImage}`}
                    src={item.image}
                    alt="coin_image"
                  />{" "}
                  <span>{item.name + " - " + item.symbol}</span>
                </p>
                <p>
                  {currency.symbol + " " + item.current_price.toLocaleString()}
                </p>
                <p style={{ textAlign: "center" }}>
                  {Math.floor(item.market_cap_change_percentage_24h * 100) /
                    100}
                </p>
                <p
                  className={styles.marketCap}
                  style={{ textAlign: "right" }}
                >{`${currency.symbol} ${item.market_cap.toLocaleString()}`}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Home;
