import { useState, useRef, useEffect, ReactNode, cloneElement, isValidElement } from 'react';

interface WindowProps {
  id: string;
  title: string;
  children: ReactNode;
  isOpen: boolean;
  isActive: boolean;
  initialPosition?: { x: number; y: number };
  initialSize?: { width: number; height: number };
  onClose: () => void;
  onMinimize: () => void;
  onFocus: () => void;
  zIndex: number;
  allowMaximize?: boolean;
}

const Window = ({
  id,
  title,
  children,
  isOpen,
  isActive,
  initialPosition = { x: 100, y: 50 },
  initialSize = { width: window.innerWidth * 0.55, height: window.innerHeight * 0.55 }, // Approx 30% area (0.55 * 0.55 ≈ 0.3)
  onClose,
  onMinimize,
  onFocus,
  zIndex,
  allowMaximize = true,
}: WindowProps) => {
  const [position, setPosition] = useState(initialPosition);
  const [size, setSize] = useState(initialSize);
  const [isMaximized, setIsMaximized] = useState(false);
  const [prevState, setPrevState] = useState({ position: initialPosition, size: initialSize });
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState<string | null>(null);
  const dragOffset = useRef({ x: 0, y: 0 });
  const resizeStart = useRef({ x: 0, y: 0, width: 0, height: 0, posX: 0, posY: 0 });
  const windowRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (isMaximized) return;
    onFocus();
    setIsDragging(true);
    dragOffset.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
  };

  const handleResizeMouseDown = (e: React.MouseEvent, direction: string) => {
    if (isMaximized) return;
    e.stopPropagation();
    onFocus();
    setIsResizing(direction);
    resizeStart.current = {
      x: e.clientX,
      y: e.clientY,
      width: size.width,
      height: size.height,
      posX: position.x,
      posY: position.y,
    };
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        setPosition({
          x: e.clientX - dragOffset.current.x,
          y: e.clientY - dragOffset.current.y,
        });
      } else if (isResizing) {
        const deltaX = e.clientX - resizeStart.current.x;
        const deltaY = e.clientY - resizeStart.current.y;

        let newWidth = resizeStart.current.width;
        let newHeight = resizeStart.current.height;
        let newX = resizeStart.current.posX;
        let newY = resizeStart.current.posY;

        if (isResizing.includes('e')) {
          newWidth = Math.max(300, resizeStart.current.width + deltaX);
        }
        if (isResizing.includes('w')) {
          const widthChange = Math.min(deltaX, resizeStart.current.width - 300);
          newWidth = resizeStart.current.width - widthChange;
          newX = resizeStart.current.posX + widthChange;
        }
        if (isResizing.includes('s')) {
          newHeight = Math.max(200, resizeStart.current.height + deltaY);
        }
        if (isResizing.includes('n')) {
          const heightChange = Math.min(deltaY, resizeStart.current.height - 200);
          newHeight = resizeStart.current.height - heightChange;
          newY = resizeStart.current.posY + heightChange;
        }

        setSize({ width: newWidth, height: newHeight });
        setPosition({ x: newX, y: newY });
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(null);
    };

    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, isResizing]);

  const handleMaximize = () => {
    if (isMaximized) {
      // Return to "Minimize" state (30% view)
      setPosition(prevState.position);
      setSize(prevState.size);
    } else {
      // Go to "Maximize" state (Full Screen)
      setPrevState({ position, size });
      setPosition({ x: 0, y: 0 });
      setSize({ width: window.innerWidth, height: window.innerHeight - 30 });
    }
    setIsMaximized(!isMaximized);
  };

  if (!isOpen) return null;

  // Mobile: always fullscreen
  const isMobile = window.innerWidth < 768;

  const resizeHandles = [
    { direction: 'n', className: 'absolute top-0 left-2 right-2 h-1 cursor-n-resize' },
    { direction: 's', className: 'absolute bottom-0 left-2 right-2 h-1 cursor-s-resize' },
    { direction: 'e', className: 'absolute right-0 top-2 bottom-2 w-1 cursor-e-resize' },
    { direction: 'w', className: 'absolute left-0 top-2 bottom-2 w-1 cursor-w-resize' },
    { direction: 'ne', className: 'absolute top-0 right-0 w-3 h-3 cursor-ne-resize' },
    { direction: 'nw', className: 'absolute top-0 left-0 w-3 h-3 cursor-nw-resize' },
    { direction: 'se', className: 'absolute bottom-0 right-0 w-3 h-3 cursor-se-resize' },
    { direction: 'sw', className: 'absolute bottom-0 left-0 w-3 h-3 cursor-sw-resize' },
  ];

  return (
    <div
      ref={windowRef}
      className={`absolute bg-card border border-primary rounded-t-lg shadow-xl flex flex-col overflow-hidden ${isMobile ? 'inset-0 !rounded-none' : ''
        }`}
      style={
        isMobile
          ? {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 30,
            zIndex
          }
          : {
            left: position.x,
            top: position.y,
            width: size.width,
            height: size.height,
            zIndex,
          }
      }
      onClick={onFocus}
    >
      {/* Resize Handles */}
      {!isMobile && !isMaximized && resizeHandles.map((handle) => (
        <div
          key={handle.direction}
          className={handle.className}
          onMouseDown={(e) => handleResizeMouseDown(e, handle.direction)}
        />
      ))}

      {/* Title Bar */}
      <div
        className={`h-7 px-2 flex justify-between items-center cursor-default select-none ${isActive ? 'xp-title-bar' : 'xp-title-bar-inactive'
          } ${isMobile ? 'rounded-none' : 'rounded-t-lg'}`}
        onMouseDown={handleMouseDown}
      >
        <span className="text-white font-bold text-sm drop-shadow">{title}</span>
        <div className="flex gap-0.5">
          <button
            className="xp-window-btn xp-window-btn-blue text-white"
            onClick={(e) => {
              e.stopPropagation();
              onMinimize();
            }}
          >
            _
          </button>
          <button
            className={`xp-window-btn xp-window-btn-blue text-white ${!allowMaximize ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              if (allowMaximize) handleMaximize();
            }}
          >
            □
          </button>
          <button
            className="xp-window-btn xp-window-btn-red text-white"
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
          >
            ✕
          </button>
        </div>
      </div>

      {/* Window Content */}
      <div className="flex-1 overflow-auto bg-card">
        {isValidElement(children)
          ? cloneElement(children as React.ReactElement<any>, {
            windowControls: id === 'resume'
              ? {
                onExit: onClose,
                onMinimize: onMinimize,
                onMaximize: () => {
                  if (!isMaximized) handleMaximize();
                },
                onRestore: () => {
                  if (isMaximized) handleMaximize();
                },
                isMaximized,
                title,
              }
              : {
                onExit: onClose,
                onMinimize: () => {
                  // User wants "Minimize" to be the 30% view (Toggle Maximize off)
                  if (isMaximized) handleMaximize();
                },
                onMaximize: () => {
                  // User wants "Maximize" to be full screen
                  if (!isMaximized) handleMaximize();
                },
                onRestore: onMinimize, // User wants "Restore" to be the taskbar hide
                isMaximized,
                title,
              }
          })
          : children
        }
      </div>
    </div>
  );
};

export default Window;
