import styles from "../styles/Footer.module.css";
import { ReactComponent as LogoIcon } from "../images/sprites/logo-2.svg";
import { ReactComponent as InstagramIcon } from "../images/sprites/instagram.svg";
import { ReactComponent as TwitterIcon } from "../images/sprites/twitter.svg";
import { ReactComponent as FacebookIcon } from "../images/sprites/facebook.svg";
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <div className={styles.brand}>
          <a href="/" className={styles.logo}>
             <LogoIcon className={styles.logo_icon} aria-hidden="true" />
            Tech<span className={styles.logoAccent}>Speed</span>
          </a>
          <p className={styles.desc}>
            Внутрішня логістична система для керування складом і мережею
            магазинів електроніки.
          </p>
        </div>

        <div className={styles.social}>
          <p className={styles.socialTitle}>Соцмережі:</p>
          <ul className={styles.socialList}>
            <li>
              <a className={styles.socialLink} href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                  <InstagramIcon className={styles.icon} aria-hidden="true" />
              </a>
            </li>
            <li>
              <a className={styles.socialLink} href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                  <TwitterIcon className={styles.icon} aria-hidden="true" />
              </a>
            </li>
            <li>
              <a className={styles.socialLink} href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                  <FacebookIcon className={styles.icon} aria-hidden="true" />
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.bottom}>
        © {currentYear} TECHSPEED - ALL RIGHTS RESERVED
      </div>
    </footer>
  );
};

export default Footer;
