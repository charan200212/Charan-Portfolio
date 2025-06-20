import { personalData } from "@/utils/data/personal-data";
import AboutSection from "./components/homepage/about";
import Education from "./components/homepage/education";
import HeroSection from "./components/homepage/hero-section";
import Projects from "./components/homepage/projects";
import Skills from "./components/homepage/skills";

// Mock blog data fallback
const mockBlogs = [
  {
    title: "My Latest Blog Post",
    url: "#",
    cover_image: "/placeholder-blog.jpg",
    description: "This is a placeholder blog post"
  }
];

async function getBlogs() {
  // Skip fetching if no devUsername provided
  if (!personalData.devUsername) return mockBlogs;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000); // 8-second timeout

    const res = await fetch(
      `https://dev.to/api/articles?username=${personalData.devUsername}`,
      {
        signal: controller.signal,
        next: { revalidate: 3600 } // Cache for 1 hour
      }
    );

    clearTimeout(timeoutId);

    if (!res.ok) {
      console.error(`API Error: ${res.status} ${res.statusText}`);
      return mockBlogs;
    }

    const data = await res.json();
    return data
      .filter((item) => item?.cover_image)
      .slice(0, 3); // Limit to 3 featured blogs

  } catch (error) {
    console.error("Blog fetch failed, using mock data:", error);
    return mockBlogs;
  }
}

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