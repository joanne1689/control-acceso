import { IonButton } from "@ionic/react";
import arrowLeftIcon from '../../assets/images/arrow-left.svg';
import './Header.css';

interface HeaderProps {
  variant?: 'home' | 'back' | 'none';
  onBack?: () => void;
  backText?: string;
  children?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ 
  variant = 'back', 
  onBack, 
  backText = 'Volver al inicio',
  children 
}) => {
  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      window.history.back();
    }
  };

  // Home header variant (with logo and gradient)
  if (variant === 'home') {
    return (
      <div className="header-section header-home">
        <div className="header-logo-container">
          <svg className="header-logo" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M60 5C60 5 15 18 15 18V65C15 90 35 108 60 118C85 108 105 90 105 65V18L60 5Z" fill="#8B1538"/>
            <path d="M60 10C60 10 20 22 20 22V63C20 85 38 102 60 111C82 102 100 85 100 63V22L60 10Z" fill="#A91D3A"/>
            <g fill="#FFFFFF">
              <path d="M42 32H52V85H42V32Z"/>
              <path d="M42 32H52V42H42V32Z"/>
              <circle cx="60" cy="50" r="8"/>
              <path d="M68 32H78V85H68V32Z"/>
            </g>
          </svg>
        </div>
        <div className="header-greeting-container">
          {children}
        </div>
      </div>
    );
  }

  // No header variant
  if (variant === 'none') {
    return null;
  }

  // Default back button header variant
  return (
    <div className="header-section header-back">
      <div className="header-inner">
        <div className="header-back-container">
          <IonButton
            className="header-back-button"
            fill="clear"
            onClick={handleBack}
          >
            <img
              src={arrowLeftIcon}
              alt="Back"
              className="header-back-icon"
            />
            <span className="header-back-text">{backText}</span>
          </IonButton>
        </div>
      </div>
    </div>
  );
};

export default Header;
