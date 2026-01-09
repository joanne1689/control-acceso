import { 
  IonButton, 
  IonContent, 
  IonImg, 
  IonLoading, 
  IonPage, 
  useIonRouter 
} from '@ionic/react';
import '../../assets/QR.css';
import { useEffect, useRef, useState } from 'react';
import { useAppSelector } from '../../hooks/loginHooks';
import moment from 'moment';
import httpClient from '../../hooks/CapacitorClient';
import Header from '../components/Header';

const QRView: React.FC = () => {
  const effectRan = useRef(false);
  const router = useIonRouter();
  const { user, username } = useAppSelector((state) => state.login);
  const [time, setTime] = useState(moment().format("DD/MM/YYYY, HH:mm"));
  const [timeEnd, setTimeEnd] = useState(moment().add(5, 'minutes').format("DD/MM/YYYY, HH:mm"));
  const [image, setImage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const getQRImage = async () => {
    try {
      setLoading(true);
      const currentTime = moment();
      setTime(currentTime.format("DD/MM/YYYY, HH:mm"));
      const endTime = currentTime.add(5, 'minutes').format("DD/MM/YYYY, HH:mm");
      setTimeEnd(endTime);
      
      const response = await httpClient.post('/mobile/obtainQR', { 
        user, 
        fechaInicio: time, 
        fechaFin: timeEnd 
      });
      if (response.status === 403) return false;

      setImage(response.data.qrCode);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    router.push('/home', 'back', 'pop');
  };

  const handleDownload = () => {
    // Download QR functionality
    if (image) {
      const link = document.createElement('a');
      link.href = image;
      link.download = `QR_${username}_${moment().format('YYYYMMDD_HHmmss')}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  useEffect(() => {
    if (effectRan.current === true || process.env.NODE_ENV !== 'development') {
      getQRImage();
      const intervalId = setInterval(() => {
        getQRImage();
      }, 5 * 60 * 1000);

      return () => clearInterval(intervalId);
    }

    return () => {
      effectRan.current = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setTimeEnd(moment().add(5, 'minutes').format("DD/MM/YYYY, HH:mm"));
  }, [time]);

  return (
    <IonPage className="qr-page">
      <IonContent className="qr-content" fullscreen>
        <IonLoading spinner="circles" isOpen={loading} onDidDismiss={() => setLoading(false)} />
        
        <div className="qr-container">
          {/* Main Section */}
          <div className="qr-main-section">
            {/* Header */}
            <Header variant="back" onBack={handleBack} />

            {/* Content Area */}
            <div className="qr-content-area">
              {/* Title Section */}
              <div className="qr-title-section">
                <div className="qr-title-inner">
                  <h2 className="qr-title">QR</h2>
                  <p className="qr-subtitle">Ingresa con este QR</p>
                </div>
              </div>

              {/* QR Display Section */}
              <div className="qr-display-section">
                <div className="qr-info-container">
                  {/* QR Image */}
                  <div className="qr-image-container">
                    {image ? (
                      <IonImg 
                        src={image} 
                        alt="QR Code" 
                        className="qr-image"
                      />
                    ) : (
                      <div className="qr-loading-placeholder">
                        <span style={{ color: '#828787', fontSize: '14px' }}>Cargando QR...</span>
                      </div>
                    )}
                  </div>

                  {/* Name */}
                  <div className="qr-name-container">
                    <span className="qr-name">{username || 'Usuario'}</span>
                  </div>

                  {/* Time Info */}
                  <div className="qr-time-container">
                    <div className="qr-valid-from">
                      <span className="qr-time-text">Válido desde: {time} hs.</span>
                    </div>
                    <div className="qr-valid-until">
                      <span className="qr-time-text">Hasta: {timeEnd} hs.</span>
                    </div>
                  </div>
                </div>

                {/* Download Button */}
                <IonButton 
                  className="qr-download-button" 
                  fill="clear" 
                  onClick={handleDownload}
                >
                  {/* Download icon */}
                  <svg 
                    className="qr-download-icon" 
                    width="16" 
                    height="16" 
                    viewBox="0 0 16 16" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path 
                      d="M4 8V10.6667C4 11.0203 4.14048 11.3594 4.39052 11.6095C4.64057 11.8595 4.97971 12 5.33333 12H10.6667C11.0203 12 11.3594 11.8595 11.6095 11.6095C11.8595 11.3594 12 11.0203 12 10.6667V8M6.66667 5.33333L8 8M8 8L9.33333 5.33333M8 8V2" 
                      stroke="#2A6E90" 
                      strokeWidth="2" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="qr-download-text">Descargar QR</span>
                </IonButton>
              </div>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default QRView;
