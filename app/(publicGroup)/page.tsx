import React from "react";
import Hero from "./_components/Home/hero";
import FeaturedProperties from "./_components/Home/featured-properties";
import HowItWorks from "./_components/Home/how-it-works";
import PopularLocations from "./_components/Home/popular-locations";
import WhyRentNest from "./_components/Home/why-rentnest";
import CtaSection from "./_components/Home/cta-section";
import Footer from "@/components/shared/footer";

const RootPage = () => {
  return (
    <main>
      <Hero></Hero>
      <FeaturedProperties></FeaturedProperties>
      <HowItWorks></HowItWorks>
      <PopularLocations></PopularLocations>
      <WhyRentNest></WhyRentNest>
      <CtaSection></CtaSection>
      <Footer></Footer>
    </main>
  );
};

export default RootPage;
