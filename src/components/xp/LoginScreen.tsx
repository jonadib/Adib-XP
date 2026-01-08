import profileImg from '@/assets/profile.png';

interface LoginScreenProps {
  onLogin: () => void;
  userName: string;
  userRole: string;
}

const LoginScreen = ({ onLogin, userName, userRole }: LoginScreenProps) => {
  return (
    <div className="fixed inset-0 xp-login-bg z-[9000] flex flex-col md:flex-row items-center justify-center p-5">
      <div className="text-center md:text-left mb-8 md:mb-0">
        <h1 className="text-3xl md:text-4xl font-bold italic text-white drop-shadow-lg">
          Windows XP
        </h1>
        <p className="text-white mt-2 text-sm">To begin, click your user name</p>
      </div>
      
      <div className="w-full md:w-0.5 h-0.5 md:h-48 bg-gradient-to-r md:bg-gradient-to-b from-transparent via-white to-transparent mx-0 md:mx-10 my-5 md:my-0" />
      
      <div 
        className="flex flex-col md:flex-row items-center gap-4 p-4 rounded-xl cursor-pointer transition-all hover:bg-white/10 hover:border hover:border-white/30"
        onClick={onLogin}
      >
        <div className="w-16 h-16 md:w-14 md:h-14 bg-orange-500 border-2 border-white rounded overflow-hidden">
          <img 
            src={profileImg} 
            alt="User" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="text-center md:text-left">
          <div className="text-white font-bold text-lg md:text-xl drop-shadow-lg">
            {userName}
          </div>
          <div className="text-white/70 text-sm">{userRole}</div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
