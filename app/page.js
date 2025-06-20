import { personalData } from "@/utils/data/personal-data";
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
      
      {/* Optional Blog Section - only renders if blogs exist */}
      {blogs.length > 0 && (
        <Blog blogs={blogs} />
      )}
      
     
    </div>
  );
}