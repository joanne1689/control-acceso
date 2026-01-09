import { IonButton, IonContent, IonPage } from "@ionic/react";
import { useLocation } from "react-router-dom";
import Header from '../components/Header';
import downloadIcon from '../../assets/images/download.svg';
import whatsappIcon from '../../assets/images/whatsapp.svg';
import mailIcon from '../../assets/images/mail.svg';
import '../../assets/VisitaQR.css';

interface LocationState {
  qrCode?: string;
  visitorName?: string;
  validFrom?: string;
  validTo?: string;
}

const VisitaQR: React.FC = () => {
  const location = useLocation<LocationState>();
  const { qrCode, visitorName, validFrom, validTo } = location.state || {};

  const handleDownload = () => {
    // Download QR code logic
    if (qrCode) {
      const link = document.createElement('a');
      link.href = qrCode;
      link.download = `qr-${visitorName || 'invitacion'}.png`;
      link.click();
    }
  };

  const handleWhatsApp = () => {
    // Share via WhatsApp logic
    const message = `Invitación para ${visitorName || 'visita'}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleEmail = () => {
    // Share via Email logic
    const subject = `Invitación para ${visitorName || 'visita'}`;
    const body = `Se ha generado una invitación para ${visitorName || 'visita'}`;
    window.open(`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`, '_blank');
  };

  // Placeholder QR code for demo
  const placeholderQR = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPAAAADwCAYAAAA+VemSAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEwAACxMBAJqcGAAAA7pJREFUeJzt1sEJACAQwLDS/Xc+N+BHEJLZc2YW4KX/OwB4Z2AIGRhCBoaQgSFkYAgZGEIGhpCBIWRgCBkYQgaGkIEhZGAIGRhCBoaQgSFkYAgZGEIGhpCBIWRgCBkYQgaGkIEhZGAIGRhCBoaQgSFkYAgZGEIGhpCBIWRgCBkYQgaGkIEhZGAIGRhCBoaQgSFkYAgZGEIGhpCBIWRgCBkYQgaGkIEhZGAIGRhCBoaQgSFkYAgZGEIGhpCBIWRgCBkYQgaGkIEhZGAIGRhCBoaQgSFkYAgZGEIGhpCBIWRgCBkYQgaGkIEhZGAIGRhCBoaQgSFkYAgZGEIGhpCBIWRgCBkYQgaGkIEhZGAIGRhCBoaQgSFkYAgZGEIGhpCBIWRgCBkYQgaGkIEhZGAIGRhCBoaQgSFkYAgZGEIGhpCBIWRgCBkYQgaGkIEhZGAIGRhCBoaQgSFkYAgZGEIGhpCBIWRgCBkYQgaGkIEhZGAIGRhCBoaQgSFkYAgZGEIGhpCBIWRgCBkYQgaGkIEhZGAIGRhCBoaQgSFkYAgZGEIGhpCBIWRgCBkYQgaGkIEhZGAIGRhCBoaQgSFkYAgZGEIGhpCBIWRgCBkYQgaGkIEhZGAIGRhCBoaQgSFkYAgZGEIGhpCBIWRgCBkYQgaGkIEhZGAIGRhCBoaQgSFkYAgZGEIGhpCBIWRgCBkYQgaGkIEhZGAIGRhCBoaQgSFkYAgZGEIGhpCBIWRgCBkYQgaGkIEhZGAIGRhCBoaQgSFkYAgZGEIGhpCBIWRgCBkYQgaGkIEhZGAIGRhCBoaQgSFkYAgZGEIGhpCBIWRgCBkYQgaGkIEhZGAIGRhCBoaQgSFkYAgZGEIGhpCBIWRgCBkYQgaGkIEhZGAIGRhCBoaQgSFkYAgZGEIGhpCBIWRgCBkYQgaGkIEhZGAIGRhCBoaQgSFkYAgZGEIGhpCBIWRgCBkYQgaGkIEhZGAIGRhCBoaQgSFkYAgZGEIGhpCBIWRgCBkYQgaGkIEhZGAIGRhCBoaQgSFkYAgZGEIGhpCBIWRgCBkYQgaGkIEhZGAIGRhCBoaQgSFkYAgZGEIGhpCBIWRgCBkYQgaGkIEhZGAIGRhCBoaQgSFkYAgZGEIGhpCBIWRgCBkYQgaGkIEhZGAIGRhCBoaQgSFkYAgZGEIGhpCBIWRgCBkYQgaGkIEhZGAIGRhCBoaQgSFkYAgZGEIGhpCBIWRgCBkYQgaGkIEhZGAIGRhCBoaQgSFkYAgZGEIGhtAFAAD//wMAV/cD8AAAAABJRU5ErkJggg==";

  return (
    <IonPage className="visitaqr-page">
      <IonContent className="visitaqr-content" fullscreen>
        {/* Invitación-2 Container */}
        <div className="visitaqr-container">
          {/* Frame 381 - Main Section */}
          <div className="visitaqr-main-section">
            {/* Header */}
            <Header variant="back" />

            {/* Frame 356 - Content Area */}
            <div className="visitaqr-content-area">
              {/* Frame 373 - Content Container */}
              <div className="visitaqr-content-container">
                {/* Frame 387 - Title Section */}
                <div className="visitaqr-title-section">
                  {/* Title */}
                  <h6 className="visitaqr-title">Invitar</h6>
                  
                  {/* Frame 391 - Progress Steps */}
                  <div className="visitaqr-progress-container">
                    {/* Frame 390 - Step 1 */}
                    <div className="visitaqr-step visitaqr-step-1">
                      <p className="visitaqr-step-text">1. Completa con los datos</p>
                      <div className="visitaqr-progress-bar visitaqr-progress-bar-complete"></div>
                    </div>
                    
                    {/* Frame 389 - Step 2 */}
                    <div className="visitaqr-step visitaqr-step-2">
                      <p className="visitaqr-step-text">2. Comparte el QR</p>
                      <div className="visitaqr-progress-bar visitaqr-progress-bar-active"></div>
                    </div>
                  </div>
                </div>

                {/* Frame 407 - QR Section */}
                <div className="visitaqr-qr-section">
                  {/* Frame 391 - QR Container */}
                  <div className="visitaqr-qr-container">
                    {/* Rectangle 107 - QR Image */}
                    <img 
                      src={qrCode || placeholderQR} 
                      alt="QR Code" 
                      className="visitaqr-qr-image"
                    />
                  </div>

                  {/* Frame 406 - Share Buttons Row */}
                  <div className="visitaqr-share-row">
                    {/* Button - WhatsApp */}
                    <IonButton
                      className="visitaqr-share-button"
                      fill="outline"
                      onClick={handleWhatsApp}
                    >
                      <img src={whatsappIcon} alt="WhatsApp" className="visitaqr-share-icon" />
                    </IonButton>

                    {/* Button - Email */}
                    <IonButton
                      className="visitaqr-share-button"
                      fill="outline"
                      onClick={handleEmail}
                    >
                      <img src={mailIcon} alt="Email" className="visitaqr-share-icon" />
                    </IonButton>
                  </div>
                </div>

                {/* Button - Download */}
                <IonButton
                  className="visitaqr-download-button"
                  fill="clear"
                  onClick={handleDownload}
                >
                  <img src={downloadIcon} alt="Download" className="visitaqr-download-icon" />
                  <span className="visitaqr-download-text">Descargar QR</span>
                </IonButton>
              </div>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default VisitaQR;
