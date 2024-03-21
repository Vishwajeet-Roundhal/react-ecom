import React from "react";
import HeroSection from "./components/HeroSection";
import { useProvider } from "./context/provideContext";
function About() {
  const {smth} = useProvider();
  return (
    <>
      <HeroSection name="something" content="lorem" />
      {smth}
    </>
  );
}

export default About;
