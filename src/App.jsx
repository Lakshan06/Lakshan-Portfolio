import Navbar from "./components/Navbar";
import Hero from "./sections/Hero.jsx";
import About from "./sections/About.jsx";
import Projects from "./sections/Projects.jsx";
import Achievements from "./sections/Achievements.jsx";
import Contact from "./sections/Contact.jsx";

function App() {
  return (
    <div className="bg-black text-white min-h-screen">

      {/* Glow Effects */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-purple-500 opacity-30 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-blue-500 opacity-30 blur-3xl"></div>
      <Navbar/>
      <Hero />
      <About />
      <Projects />
      <Achievements />
      <Contact />
    </div>
  );
}

export default App;