import { useContext } from "react";
import { IoMenu } from "react-icons/io5";
import { Link } from "react-router-dom";

import { CoinContext } from "../context/CoinContext";
import arrow_icon from "../assets/arrow.png";
import logo from "../assets/logo.png";
import styles from "../styles/Navbar.module.css";

const Navbar = () => {
  const menu = ["Home", "Features", "Pricing", "Blog"];
  const selectOption = ["usd", "eur", "bdt"];

  const { setCurrency } = useContext(CoinContext);

  const currencyHanler = (e) => {
    switch (e.target.value) {
      case "usd": {
        setCurrency({ name: "usd", symbol: "$" });
        break;
      }
      case "eur": {
        setCurrency({ name: "eur", symbol: "€" });
        break;
      }
      case "bdt": {
        setCurrency({ name: "bdt", symbol: "৳" });
        break;
      }

      default: {
        setCurrency({ name: "usd", symbol: "$" });
        break;
      }
    }
  };

  return (
    <header>
      <nav className={`${styles.navbar} container`}>
        <Link to="/" className={`${styles.logo}`} href="">
          <img src={logo} alt="logo" />
        </Link>
        <ul className={`${styles.menu}`}>
          {menu.map((item, index) => (
            <li key={index}>
              <Link to="/">{item}</Link>
            </li>
          ))}
        </ul>
        <div className={`${styles.navOption}`}>
          <select onChange={currencyHanler}>
            {selectOption.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
          <button>
            <span>Sign up</span>
            <img src={arrow_icon} alt="arrow_icon" />
          </button>
        </div>
        <IoMenu className={`${styles.responsiveIcon}`} />
      </nav>
    </header>
  );
};

export default Navbar;
