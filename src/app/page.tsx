import Image from "next/image";
import styles from "./page.module.css";
import Hero from "../components/Hero";
import Features from "../components/Features";
import ForWhom from "../components/ForWhom";
import ScreensCarousel from "../components/ScreensCarousel";
import Testimonials from "../components/Testimonials";
import FinalCTA from "../components/FinalCTA";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Features />
      <ForWhom />
      <ScreensCarousel />
      <Testimonials />
      <FinalCTA />
    </main>
  );
}
