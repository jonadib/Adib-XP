import { useState } from 'react';

interface ShutdownDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onShutdown: () => void;
  onRestart: () => void;
}

const ShutdownDialog = ({
  isOpen,
  onClose,
  onShutdown,
  onRestart,
}: ShutdownDialogProps) => {
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const handleShutdownClick = () => {
    if (isProcessing) return;
    setIsProcessing(true);
    onShutdown();
  };

  const handleRestartClick = () => {
    if (isProcessing) return;
    setIsProcessing(true);
    onRestart();
  };

  return (
    <>
      {/* Grayscale overlay - applies to everything behind */}
      <div
        className="fixed inset-0 z-[19999] bg-white/10"
        style={{ backdropFilter: 'grayscale(100%)' }}
        onClick={onClose}
      />
      <div
        className="fixed inset-0 z-[20000] bg-black/40"
        onClick={onClose}
      />

      {/* Dialog */}
      <div className="fixed inset-0 z-[20001] flex items-center justify-center pointer-events-none font-sans select-none">
        <div
          className="w-[380px] rounded-t-lg rounded-b-md shadow-[0_0_20px_rgba(0,0,0,0.5)] overflow-hidden pointer-events-auto animate-in zoom-in-95 duration-200"
          onClick={(e) => e.stopPropagation()}
          style={{ filter: 'none' }}
        >
          {/* Header - Dark Blue */}
          <div className="bg-[#00138c] px-4 py-3 flex items-center justify-between border-b border-white/20 h-14 relative">
            <h2 className="text-white font-medium text-xl drop-shadow-md tracking-wide">
              Turn Off Computer
            </h2>
            {/* Windows Flag Placeholder (using SVG to not add external image) */}
            <div className="opacity-80">
              <div className="grid grid-cols-2 gap-0.5 transform -skew-y-6 rotate-6">
                <div className="w-3 h-3 bg-[#e04f14] rounded-tl-sm shadow-inner"></div>
                <div className="w-3 h-3 bg-[#7eb600] rounded-tr-sm shadow-inner"></div>
                <div className="w-3 h-3 bg-[#245edb] rounded-bl-sm shadow-inner"></div>
                <div className="w-3 h-3 bg-[#fdb900] rounded-br-sm shadow-inner"></div>
              </div>
            </div>
          </div>

          {/* Content - Gradient Body */}
          <div className="px-8 py-10 bg-gradient-to-b from-[#9bbbf7] via-[#7aa8f2] to-[#6c9ae4] border-t border-white/30">
            <div className="flex gap-12 justify-center items-start">

              {/* Restart */}
              <button
                className={`flex flex-col items-center gap-1 group relative outline-none ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={handleRestartClick}
                disabled={isProcessing}
              >
                <div className={`relative z-10 p-1 rounded transition-colors duration-200 ${!isProcessing ? 'hover:bg-white/20' : ''}`}>
                  <img
                    src="https://www.freeiconspng.com/thumbs/restart-icon/restart-icon-31.png"
                    alt="Restart"
                    className="w-10 h-10 drop-shadow-xl"
                  />
                </div>
                <span className={`text-white font-medium text-sm drop-shadow-md mt-1 px-1 rounded ${!isProcessing ? 'group-hover:bg-[#00138c] group-focus:bg-[#00138c]' : ''}`}>
                  Restart
                </span>
              </button>

              {/* Turn Off */}
              <button
                className={`flex flex-col items-center gap-1 group relative outline-none ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={handleShutdownClick}
                disabled={isProcessing}
              >
                <div className={`relative z-10 p-1 rounded transition-colors duration-200 ${!isProcessing ? 'hover:bg-white/20' : ''}`}>
                  {/* NOTE: Using the exact image URL provided, though scaling slightly to fit design */}
                  <img
                    src="https://www.freeiconspng.com/uploads/shutdown-icon-8.png"
                    alt="Turn Off"
                    className="w-10 h-10 drop-shadow-xl rounded-full"
                  />
                </div>
                <span className={`text-white font-medium text-sm drop-shadow-md mt-1 px-1 rounded ${!isProcessing ? 'group-hover:bg-[#00138c] group-focus:bg-[#00138c]' : ''}`}>
                  Turn Off
                </span>
              </button>
            </div>
          </div>

          {/* Footer - Dark Blue */}
          <div className="bg-[#00138c] h-12 flex items-center justify-end px-4 border-t border-[#00138c]">
            <button
              className={`px-5 py-1 bg-white text-black text-xs font-semibold rounded border-2 border-white/50 shadow-md ${isProcessing ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#f0f0f0] active:translate-y-[1px]'}`}
              onClick={onClose}
              disabled={isProcessing}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShutdownDialog;