import styles from "../styles/Footer.module.css"
const Footer = () => {
  return (
    <footer>
      <div className="container">
        <span className={`${styles.line}`}></span>
        <p className={`${styles.footerText}`}>Copyright @ 2024, ❤️‍🩹Rohan❤️‍🩹 - All Right Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
