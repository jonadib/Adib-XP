import profileImg from '@/assets/profile.png';

interface LoginScreenProps {
  onLogin: () => void;
  userName: string;
  userRole: string;
}

const LoginScreen = ({ onLogin, userName, userRole }: LoginScreenProps) => {
  return (
    <div className="fixed inset-0 z-[9000] flex flex-col font-tahoma select-none">
      {/* Top Band */}
      <div className="h-[10%] md:h-[15%] w-full bg-[#003399] border-b border-white/10" />

      {/* Main Section */}
      <div className="flex-1 xp-login-bg flex flex-col items-center justify-center relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-5xl px-4">
          {/* Logo/Branding */}
          <div className="flex flex-col items-center md:items-end md:pr-12 mb-20 md:mb-0">
            <img
              src="https://wallpapers.com/images/hd/classic-windows-logo-72bka335lvt8v1fb.jpg"
              alt="XP"
              className="w-24 h-24 md:w-28 md:h-28 object-contain drop-shadow-xl mb-2 animate-fade-in"
            />
            <div className="flex flex-col items-center md:items-end">
              <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg tracking-tight flex items-start gap-1">
                ADIB <span className="text-[#ff6600] italic font-black text-2xl md:text-4xl translate-y-[-2px]">xp</span>
              </h1>
              <span className="text-white text-base md:text-lg font-normal italic drop-shadow-md mt-[-4px]">Visual Designer</span>

              <div className="hidden md:block mt-6">
                <p className="text-white text-sm font-medium drop-shadow-lg animate-slide-up opacity-80">
                  To begin, click on your user icon to log in
                </p>
              </div>
            </div>
          </div>

          {/* Divider (Desktop Only) */}
          <div className="hidden md:block w-[1px] h-64 bg-gradient-to-b from-transparent via-white/40 to-transparent" />

          {/* Right Side: User Card */}
          <div className="flex flex-col md:pl-12 animate-fade-in w-full md:w-auto mt-10 md:mt-0">
            <div className="flex flex-col md:flex-row items-center gap-4 p-4 md:p-2 rounded-lg transition-all hover:bg-gradient-to-r hover:from-[#0033bb] hover:to-transparent group min-w-[340px]">
              <div
                className="w-28 h-28 md:w-20 md:h-20 bg-transparent p-[1.5px] rounded border-2 border-white shadow-xl overflow-hidden group-hover:border-[#ffcc00] transition-colors cursor-pointer active:scale-95"
                onClick={onLogin}
              >
                <img
                  src="/Black Red Grunge Moon Light Music Album Cover.jpg"
                  alt="User"
                  className="w-full h-full object-cover rounded-[1px]"
                />
              </div>
              <div className="flex flex-col items-center md:items-start text-center md:text-left select-none">
                <div className="text-white font-normal text-2xl md:text-xl drop-shadow-md tracking-tight font-sans">
                  {userName}
                </div>
                <div className="text-[#00135b] text-base md:text-xs font-bold group-hover:text-[#ffcc00] transition-colors mt-0.5 md:mt-0 tracking-wide">{userRole}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Separator */}
      <div className="xp-login-divider" />

      {/* Bottom Band */}
      <div className="h-[12%] md:h-[15%] w-full bg-[#003399] flex flex-col md:flex-row items-center justify-center md:justify-between px-6 md:px-12 text-white relative">
        {/* Mobile Instruction */}
        <div className="md:hidden mb-4">
          <p className="text-white text-sm font-medium drop-shadow-lg animate-slide-up opacity-90">
            Tap on the user icon to begin
          </p>
        </div>

        <div className="hidden md:flex items-center gap-3 cursor-pointer group hover:opacity-80 transition-opacity">
          <div className="bg-[#4caf50] w-6 h-6 rounded flex items-center justify-center border border-white/20 shadow-sm">
            <div className="w-3 h-3 border-2 border-white rounded-full border-t-transparent animate-spin opacity-0 group-hover:opacity-100 transition-opacity" />
            <img src="https://cdn-icons-png.freepik.com/256/6811/6811974.png?semt=ais_white_label" className="w-4 h-4 absolute group-hover:opacity-0" alt="" />
          </div>
          <span className="text-xs font-bold drop-shadow-sm">Restart ADIB XP</span>
        </div>

        <div className="hidden md:flex flex-col items-end opacity-90">
          <p className="text-[11px] font-medium leading-tight">After you log on, the system's yours to explore.</p>
          <p className="text-[11px] font-medium leading-tight">Every detail has been designed with a purpose.</p>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
