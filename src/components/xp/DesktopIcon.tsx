interface DesktopIconProps {
  icon: string;
  label: string;
  isSelected: boolean;
  onClick: () => void;
  onDoubleClick: () => void;
}

const DesktopIcon = ({ icon, label, isSelected, onClick, onDoubleClick }: DesktopIconProps) => {
  return (
    <div
      className={`desktop-icon ${isSelected ? 'selected' : ''}`}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      onDoubleClick={(e) => {
        e.stopPropagation();
        onDoubleClick();
      }}
    >
      <img src={icon} alt={label} className="w-12 h-12 mb-1 object-contain" />
      <span className="text-xs">{label}</span>
    </div>
  );
};

export default DesktopIcon;
