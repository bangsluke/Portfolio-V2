import { Component } from "preact";
import Flicking from "@egjs/preact-flicking";
import { AutoPlay } from "@egjs/flicking-plugins";

export default () => {
  const plugins = [new AutoPlay({ duration: 3000, direction: "NEXT", stopOnHover: true })];

  const carouselItems = [
    {
      image: "/images/portfolio.webp",
      title: "Portfolio Showcase",
      description: "Modern web development projects"
    },
    {
      image: "/images/profilePicture.webp", 
      title: "Professional Profile",
      description: "Frontend Developer & Tech Enthusiast"
    },
    {
      image: "/images/projects/neonmint.webp",
      title: "Neon Mint Project",
      description: "Innovative design solutions"
    },
    {
      image: "/images/posts/animated-borders-tailwind.webp",
      title: "Technical Blog",
      description: "Sharing knowledge & insights"
    },
    {
      image: "/images/posts/markdown.webp",
      title: "Content Creation",
      description: "Writing about development"
    }
  ];

  return (
    <section className="py-8 px-8 max-sm:px-4">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-blacktext dark:text-mint-50 mb-2">
            Companies and <span className="bg-linear-to-r from-riptide-500 to-mint-500 dark:from-riptide-300 dark:to-mint-200 text-transparent bg-clip-text">Clients</span>
          </h2>
          <p className="text-lg text-blacktext dark:text-gray-200">
            The companies and clients I have worked with
          </p>
        </div>
        
        <Flicking 
          plugins={plugins}
          className="flicking-viewport"
          style={{ height: "400px" }}
        >
          {carouselItems.map((item, index) => (
            <div key={index} className="plugins-panel mx-2">
              <div className="relative group overflow-hidden rounded-2xl bg-linear-to-r from-mint-300 dark:from-mint-600 to-mint-50 dark:to-mint-200/5 p-[.2rem] hover:to-mint-300/30 dark:hover:to-mint-600/30 transition-all duration-300 hover:scale-105">
                <div className="relative h-full w-full overflow-hidden rounded-2xl bg-linear-to-tr from-riptide-100 to-white dark:from-mint-950 dark:to-zinc-950">
                  <img 
                    className="panel-image w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                    src={item.image} 
                    alt={item.title}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <h3 className="text-xl font-bold mb-1">{item.title}</h3>
                      <p className="text-sm text-gray-200">{item.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Flicking>
      </div>
    </section>
  );
};
  
