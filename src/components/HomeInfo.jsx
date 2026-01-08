import React from "react";
import siteInfoData from "../data_storage/SiteInfo";
import styles from "../styles/HomeInfo.module.css";

import slide1 from "../images/slides/slide-1.jpg";
import slide2 from "../images/slides/slide-2.jpg";
import slide3 from "../images/slides/slide-3.jpg";
import slide4 from "../images/slides/slide-4.jpg";
import slide5 from "../images/slides/slide-5.jpg";
import slide6 from "../images/slides/slide-6.jpg";
import slide7 from "../images/slides/slide-7.jpg";

const SLIDE_IMAGES = [slide1, slide2, slide3, slide4, slide5, slide6, slide7];
const AUTOPLAY_MS = 20000;

const HomeInfo = () => {
  const slides = siteInfoData.slice(0, 7);
  const [index, setIndex] = React.useState(0);

  const goTo = (i) => {
    const last = slides.length - 1;
    if (i < 0) return setIndex(last);
    if (i > last) return setIndex(0);
    setIndex(i);
  };

  React.useEffect(() => {
    if (!slides.length) return;

    const t = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, AUTOPLAY_MS);

    return () => clearInterval(t);
  }, [slides.length]);

  if (!slides.length) return null;

  const current = slides[index];
  const bg = SLIDE_IMAGES[index] || SLIDE_IMAGES[0];

  return (
    <section className={styles.section}>
      <div className={styles.slider}>
        <div
          className={styles.slide}
          style={{ backgroundImage: `url(${bg})` }}
        >
          <div className={styles.overlay}>
            <p className={styles.kicker}>ПРО СИСТЕМУ TECHSPEED</p>
            <h3 className={styles.title}>{current.title}</h3>
            <p className={styles.text}>{current.answer}</p>
          </div>
        </div>

        <div className={styles.dots} role="tablist" aria-label="Слайди">
          {slides.map((_, i) => (
            <button
              key={slides[i].id ?? i}
              type="button"
              className={`${styles.dot} ${i === index ? styles.dotActive : ""}`}
              onClick={() => goTo(i)}
              aria-label={`Слайд ${i + 1}`}
              aria-current={i === index ? "true" : "false"}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeInfo;
