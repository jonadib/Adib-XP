import { useState } from 'react';
import ModernXPToolbar from './ModernXPToolbar';

interface WindowControls {
  onExit: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onRestore: () => void;
  isMaximized: boolean;
  title: string;
}

interface ContactWindowProps {
  windowControls?: WindowControls;
  favorites: string[];
  onOpenWindow?: (id: string) => void;
}

const ContactWindow = ({ windowControls, favorites, onOpenWindow }: ContactWindowProps) => {
  const [from, setFrom] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const socials = [
    { icon: "https://cdn-icons-png.flaticon.com/512/174/174857.png", label: "LinkedIn", url: "https://linkedin.com" },
    { icon: "https://cdn-icons-png.flaticon.com/512/124/124010.png", label: "Facebook", url: "https://facebook.com" },
    { icon: "https://cdn-icons-png.flaticon.com/512/25/25231.png", label: "GitHub", url: "https://github.com" },
  ];

  return (
    <div className="flex flex-col h-full bg-white">
      <ModernXPToolbar
        windowControls={windowControls}
        address="C:\Documents and Settings\Adib\Contact Me"
        isDarkMode={false}
        setIsDarkMode={() => { }}
        favoritesLabel="My Resume"
        onFavoritesClick={() => onOpenWindow?.('resume')}
      />

      {/* Email Toolbar */}
      <div className="flex items-center gap-1 px-1.5 py-1 bg-card border-b border-border">
        <div className="flex flex-col items-center px-1.5 py-0.5 cursor-default text-[10px]">
          <img
            src="https://cdn-icons-png.flaticon.com/512/2989/2989993.png"
            alt="Send"
            className="w-5 h-5 mb-0.5"
          />
          <span>Send</span>
        </div>
        <div className="flex flex-col items-center px-1.5 py-0.5 cursor-default text-[10px]">
          <img
            src="https://png.pngtree.com/png-clipart/20191120/original/pngtree-email-icon-png-image_5065641.jpg"
            alt="New"
            className="w-5 h-5 mb-0.5"
          />
          <span>New</span>
        </div>

        <div className="w-px h-7 bg-border mx-1" />

        {socials.map((social) => (
          <a
            key={social.label}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center px-1.5 py-0.5 cursor-pointer text-[10px] hover:bg-blue-50 hover:border-primary border border-transparent rounded"
          >
            <img src={social.icon} alt="" className="w-5 h-5 mb-0.5" />
            <span>{social.label}</span>
          </a>
        ))}
      </div>

      {/* Headers */}
      <div className="bg-gray-100 border-b border-border p-2.5">
        <div className="flex items-center mb-1 border-b-2 border-primary pb-0.5">
          <span className="w-14 text-xs font-bold text-gray-600">To:</span>
          <span className="flex-1 text-xs font-bold">mujahidulislamadib@gmail.com</span>
        </div>
        <div className="flex items-center mb-1 border-b border-gray-200 pb-0.5">
          <span className="w-14 text-xs font-bold text-gray-600">From:</span>
          <input
            type="email"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            placeholder="Your email address"
            className="flex-1 text-xs bg-transparent border-none outline-none text-gray-500 placeholder:text-gray-400"
          />
        </div>
        <div className="flex items-center border-b border-gray-200 pb-0.5">
          <span className="w-14 text-xs font-bold text-gray-600">Subject:</span>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Subject of your message"
            className="flex-1 text-xs bg-transparent border-none outline-none text-gray-500 placeholder:text-gray-400"
          />
        </div>
      </div>

      {/* Message Area */}
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Write your message here..."
        className="flex-1 p-4 resize-none outline-none text-sm font-mono leading-relaxed bg-white"
        style={{
          backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 0, 0, 0.03) 1px, transparent 1px)',
          backgroundSize: '15px 15px',
        }}
      />

      {/* Status Bar */}
      <div className="h-5 bg-card border-t border-border flex items-center px-2.5 text-xs text-foreground">
        <span>Compose a message</span>
      </div>

      {/* Footer Status Bar */}
      <div className="h-6 bg-[#ece9d8] border-t border-[#aca899] flex items-center px-2 text-[11px] text-[#444]">
        <span>Current session: ({favorites.length} projects saved)</span>
      </div>
    </div>
  );
};

export default ContactWindow;
