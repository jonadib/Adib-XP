import { useState } from 'react';
import { Search, Linkedin, Instagram, Github, User, Heart } from 'lucide-react';
import ModernXPToolbar from './ModernXPToolbar';

interface Project {
  id: string;
  title: string;
  category: string;
  type: string;
  image: string;
  items: number;
  avatar: string;
  url: string;
}

interface WindowControls {
  onExit: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onRestore: () => void;
  isMaximized: boolean;
  title: string;
}

interface ProjectsWindowProps {
  windowControls?: WindowControls;
  favorites: string[];
  onToggleFavorite: (projectId: string) => void;
}

const ProjectsWindow = ({ windowControls, favorites, onToggleFavorite }: ProjectsWindowProps) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);

  // Icon URLs provided by you
  const iconHome = "https://files.softicons.com/download/toolbar-icons/soft-icons-by-lokas-software/ico/0007-home.ico";

  const categories = [
    { id: 'All', icon: () => <HomeIcon customSrc={iconHome} /> },
    { id: 'Web', icon: () => <span className="text-base">🌐</span> },
    { id: 'App', icon: () => <span className="text-base">📱</span> },
    { id: 'Tools', icon: () => <span className="text-base">🛠️</span> },
    { id: 'Personal', icon: () => <span className="text-base">💡</span> },
  ];

  const isMobile = window.innerWidth < 768;

  const projects: Project[] = [
    // ... projects data (lines 49-97 remain the same)
    {
      id: '1',
      title: 'Personal Portfolio',
      category: 'Personal',
      type: 'Portfolio • React',
      url: 'https://mujahidulislamadib.vercel.app/',
      image: '/portfolio.png',
      items: 1,
      avatar: '/Black Red Grunge Moon Light Music Album Cover.jpg',
    },
    {
      id: '2',
      title: 'RU Market',
      category: 'Web',
      type: 'E-Commerce • Marketplace',
      url: 'https://ru-market.vercel.app/',
      image: '/ru-market.png',
      items: 12,
      avatar: '/Black Red Grunge Moon Light Music Album Cover.jpg',
    },
    {
      id: '3',
      title: 'RU CSE Q&A',
      category: 'Web',
      type: 'Educational • Forum',
      url: 'https://ru-cse-q-a.vercel.app/',
      image: '/ru-cse-qa.png',
      items: 5,
      avatar: '/Black Red Grunge Moon Light Music Album Cover.jpg',
    },
    {
      id: '4',
      title: 'RUCSU Info Portal',
      category: 'Web',
      type: 'Information • University',
      url: 'https://jonadib.github.io/RUCSU/',
      image: '/rucsu.png',
      items: 8,
      avatar: '/Black Red Grunge Moon Light Music Album Cover.jpg',
    },
    {
      id: '5',
      title: 'DS Visualizer',
      category: 'Tools',
      type: 'Algorithms • Visualization',
      url: 'https://jonadib.github.io/DS-Visualizer/',
      image: '/ds-visualizer.png',
      items: 1,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop',
    },
  ];

  const filteredProjects = projects.filter((project) => {
    const matchesCategory = activeCategory === 'All' || project.category === activeCategory;
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase());
    const isSaved = favorites.includes(project.id);
    const matchesFavorites = !showOnlyFavorites || isSaved;
    return matchesCategory && matchesSearch && matchesFavorites;
  });

  // Helper component for the Home icon
  const HomeIcon = ({ customSrc }: { customSrc: string }) => (
    <img src={customSrc} alt="Home" className="w-4 h-4 object-contain grayscale opacity-80" />
  );

  const handleProjectClick = (url: string) => {
    window.open(url, '_blank');
  };

  // Toggle favorite logic
  const toggleFavorite = (e: React.MouseEvent, projectId: string) => {
    e.stopPropagation(); // Prevent opening the URL when clicking the heart
    onToggleFavorite(projectId);
  };

  return (
    <div className={`flex flex-col h-full font-sans select-none ${isDarkMode ? 'bg-[#0a0a0a]' : 'bg-[#f4f4f4]'}`}>

      <ModernXPToolbar
        windowControls={windowControls}
        address="C:\Documents and Settings\Adib\Projects"
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        showDarkMode={true}
        onFavoritesClick={() => setShowOnlyFavorites(!showOnlyFavorites)}
        favoritesIcon="https://icons.iconarchive.com/icons/hopstarter/sleek-xp-basic/128/Heart-icon.png"
        favoritesIconSize="w-8 h-8"
      />

      {/* 3. Main Content Area */}
      <div className={`flex flex-col flex-1 overflow-hidden ${isDarkMode ? 'bg-[#1a1a1a] text-white' : 'bg-white text-gray-900'}`}>

        {/* Header (Logo & Search) */}
        <div className={`flex items-center justify-between px-4 sm:px-6 py-4 sm:py-6 border-b border-transparent`}>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center shadow-sm shrink-0 border border-white/20">
              <img src="/Black Red Grunge Moon Light Music Album Cover.jpg" alt="User" className="w-full h-full object-cover" />
            </div>
            <span className="text-xl sm:text-2xl font-bold tracking-tight whitespace-nowrap">MyProjects</span>
          </div>

          {!isMobile && (
            <div className="flex-1 max-w-md mx-8 relative">
              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full px-4 py-2 rounded-full text-sm outline-none border transition-all ${isDarkMode
                  ? 'bg-[#2a2a2a] border-gray-700 focus:border-gray-500 placeholder-gray-500'
                  : 'bg-gray-100 border-gray-200 focus:border-gray-300 placeholder-gray-400'
                  }`}
              />
              <Search className={`absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} />
            </div>
          )}

          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:opacity-75 transition-opacity"><Linkedin className={`w-5 h-5 sm:w-6 sm:h-6 ${isDarkMode ? 'text-white' : 'text-black'}`} /></a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:opacity-75 transition-opacity"><Instagram className={`w-5 h-5 sm:w-6 sm:h-6 ${isDarkMode ? 'text-white' : 'text-black'}`} /></a>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:opacity-75 transition-opacity"><Github className={`w-5 h-5 sm:w-6 sm:h-6 ${isDarkMode ? 'text-white' : 'text-black'}`} /></a>
          </div>
        </div>

        {/* Split View: Sidebar + Grid */}
        <div className="flex flex-1 overflow-hidden">

          {/* Sidebar - Hidden on mobile */}
          {!isMobile && (
            <div className="w-56 flex flex-col gap-1 p-4 overflow-y-auto shrink-0">
              {categories.map((cat) => {
                const IconComponent = cat.icon;
                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setActiveCategory(cat.id);
                      setShowOnlyFavorites(false);
                    }}
                    className={`flex items-center gap-3 px-4 py-2.5 rounded-full text-sm font-medium transition-colors ${activeCategory === cat.id && !showOnlyFavorites
                      ? isDarkMode
                        ? 'bg-[#2a2a2a] text-white'
                        : 'bg-gray-100 text-black'
                      : isDarkMode
                        ? 'text-gray-400 hover:text-white hover:bg-white/5'
                        : 'text-gray-500 hover:text-black hover:bg-black/5'
                      }`}
                  >
                    <IconComponent />
                    <span>{cat.id}</span>
                  </button>
                );
              })}
            </div>
          )}

          {/* Project Grid */}
          <div
            className="flex-1 overflow-y-auto p-4 pr-6"
            style={{
              backgroundImage: isDarkMode
                ? `linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)`
                : `linear-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 0, 0, 0.1) 1px, transparent 1px)`,
              backgroundSize: '20px 20px',
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => {
                const isFavorited = favorites.includes(project.id);
                return (
                  <div
                    key={project.id}
                    className="group cursor-pointer"
                    onClick={() => handleProjectClick(project.url)}
                  >
                    {/* Card Image */}
                    <div className={`relative aspect-[16/10] rounded-xl overflow-hidden mb-3 shadow-md border ${isDarkMode ? 'border-gray-800' : 'border-gray-100'}`}>
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />

                      {/* === FAVOURITE OVERLAY BUTTON === */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 bg-black/20">
                        <button
                          onClick={(e) => toggleFavorite(e, project.id)}
                          className="bg-black/70 backdrop-blur-md text-white px-4 py-2 rounded-full flex items-center gap-2 hover:bg-black/90 transition-colors transform translate-y-2 group-hover:translate-y-0 duration-300"
                        >
                          <Heart
                            className={`w-4 h-4 transition-colors ${isFavorited ? 'fill-red-500 text-red-500' : 'text-white'}`}
                          />
                          <span className="text-xs font-semibold">
                            {isFavorited ? 'Saved' : 'Add favourite'}
                          </span>
                        </button>
                      </div>

                      {/* Visit Badge */}
                      <div className="absolute bottom-2 right-2 bg-black/80 backdrop-blur-sm text-white text-[10px] px-2 py-0.5 rounded shadow-sm flex items-center gap-1 z-20">
                        <span>🔗</span> Visit
                      </div>
                    </div>

                    {/* Card Info */}
                    <div className="flex items-center gap-3 px-1">
                      <img
                        src={project.avatar}
                        alt=""
                        className="w-8 h-8 rounded-full object-cover border border-white/20"
                      />
                      <div>
                        <h3 className="font-bold text-sm leading-tight group-hover:text-blue-500 transition-colors">{project.title}</h3>
                        <p className={`text-xs mt-0.5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          {project.type}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="h-8" /> {/* Bottom Spacer */}
          </div>
        </div>
      </div>

      {/* Footer Status Bar */}
      <div className="h-6 bg-[#ece9d8] border-t border-[#aca899] flex items-center px-2 text-[11px] text-[#444]">
        <span>
          {showOnlyFavorites ? 'Showing only saved projects.' : 'Select a project to visit the website.'}
          ({favorites.length} saved)
        </span>
      </div>
    </div>
  );
};

export default ProjectsWindow;