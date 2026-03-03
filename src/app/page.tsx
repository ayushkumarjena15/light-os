import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { About } from "@/components/About";
import { Showcase } from "@/components/Showcase";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { StarsCanvas } from "@/components/StarsCanvas";
import { CursorGlow } from "@/components/CursorGlow";

export default function Home() {
  return (
    <>
      <StarsCanvas />
      <CursorGlow />
      <Navbar />
      <main>
        <Hero />
        <Features />
        <About />
        <Showcase />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
