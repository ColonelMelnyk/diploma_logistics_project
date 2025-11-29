import React from "react";
import siteInfoData from "../data_storage/SiteInfo";

const HomeInfo = () => {
  return (
    <section>
      <h2>Про систему TechSpeed</h2>

      <div>
        {siteInfoData.map((item) => (
          <div key={item.id}>
            <h3>{item.title}</h3>
            <p>{item.answer}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HomeInfo;
