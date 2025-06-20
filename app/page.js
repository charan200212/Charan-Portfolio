import AboutSection from "./components/homepage/about";
import Education from "./components/homepage/education";
import HeroSection from "./components/homepage/hero-section";
import Projects from "./components/homepage/projects";
import Skills from "./components/homepage/skills";


   export default async function Home() {
  const blogs = await getBlogs();

  return (
    <div suppressHydrationWarning>
      <HeroSection />
      <AboutSection />
      <Skills />
      <Projects />
      <Education />
       
    </div>
  );
}