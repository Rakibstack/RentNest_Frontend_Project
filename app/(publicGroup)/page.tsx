import React from "react";
import Hero from "./_components/Home/hero";
import FeaturedProperties from "./_components/Home/featured-properties";
import HowItWorks from "./_components/Home/how-it-works";
import PopularLocations from "./_components/Home/popular-locations";

const RootPage = () => {
  return (
    <main>
      <Hero></Hero>
      <FeaturedProperties></FeaturedProperties>
      <HowItWorks></HowItWorks>
      <PopularLocations></PopularLocations>
    </main>
  );
};

export default RootPage;
