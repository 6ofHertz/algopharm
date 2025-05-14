import React, { useState, ReactNode } from 'react';

interface HoverCardProps {
  trigger: ReactNode;
  content: ReactNode;
}

export const HoverCard: React.FC<HoverCardProps> = ({ trigger, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  return (
    <div className="hover-card-container" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {trigger}
      {isOpen && (
        <div className="hover-card-content" style={{ position: 'absolute', zIndex: 10 }}>
          {content}
        </div>
      )}
    </div>
  );
};