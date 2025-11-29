import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer>
      <div>
        <div>
          {/* Лого */}
          <div>
            <a href="/" >
              Tech<span>Speed</span>
            </a>
          </div>

          <p>
            Increase the flow of customers and sales for your business
            with digital logistics and growth solutions.
          </p>
        </div>

        {/* Соцмережі */}
        <div>
          <h3>Social Media</h3>
          <ul>
            <li>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer nofollow"
              >
                <svg width="24" height="24">
                  <use href="../images/sprite/social-links.svg#instagram"></use>
                </svg>
              </a>
            </li>

            <li>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer nofollow"
              >
                <svg width="24" height="24">
                  <use href="../images/sprite/social-links.svg#twitter"></use>
                </svg>
              </a>
            </li>

            <li>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer nofollow"
              >
                <svg width="24" height="24">
                  <use href="../images/sprite/social-links.svg#facebook"></use>
                </svg>
              </a>
            </li>

            <li>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer nofollow"
              >
                <svg width="24" height="24">
                  <use href="../images/sprite/social-links.svg#linkedin"></use>
                </svg>
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div>
        <p>© {currentYear} TechSpeed® — All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
