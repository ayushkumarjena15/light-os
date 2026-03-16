import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Showcase } from "@/components/Showcase";
import { Latest } from "@/components/Latest";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { CursorGlow } from "@/components/CursorGlow";

export default function Home() {
  return (
    <>
      <CursorGlow />
      <Navbar />
      <main>
        <Hero />
        <Latest />
        <About />
        <Showcase />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
