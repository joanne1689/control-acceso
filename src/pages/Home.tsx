import { IonContent, IonPage, useIonRouter } from '@ionic/react';
import '../../assets/Home.css';
import { useAppSelector } from '../../hooks/loginHooks';
import { handleLogout } from '../../reducers/loginThunks';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../reducers/store';
import Header from '../components/Header';

const Home: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useIonRouter();
  const { username, userrol } = useAppSelector((state) => state.login);

  const logout = () => {
    router.push('/login', 'root', 'replace');
    dispatch(handleLogout());
  };

  const navigateTo = (path: string) => {
    router.push(path);
  };

  // Get current date/time for last login display
  const getLastLoginDate = () => {
    const now = new Date();
    const day = now.getDate().toString().padStart(2, '0');
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const year = now.getFullYear();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${day}/${month}/${year}, ${hours}:${minutes} hs.`;
  };

  // QR Icon SVG
  const QRIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6.25 6.25V6.258M6.25 2.75V2.758M9.75 2.75V2.758M9.75 6H8.5V7.25M10 6V6.008M8.5 8.5H9.75M9.75 7.25H10V8.5M4 1.25C4 1.051 4.079 0.86 4.22 0.72C4.36 0.579 4.551 0.5 4.75 0.5H7.75C7.949 0.5 8.14 0.579 8.28 0.72C8.421 0.86 8.5 1.051 8.5 1.25V4.25C8.5 4.449 8.421 4.64 8.28 4.78C8.14 4.921 7.949 5 7.75 5H4.75C4.551 5 4.36 4.921 4.22 4.78C4.079 4.64 4 4.449 4 4.25V1.25Z" stroke="#2A6E90" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M11.5 1.25C11.5 1.051 11.579 0.86 11.72 0.72C11.86 0.579 12.051 0.5 12.25 0.5H15.25C15.449 0.5 15.64 0.579 15.78 0.72C15.921 0.86 16 1.051 16 1.25V4.25C16 4.449 15.921 4.64 15.78 4.78C15.64 4.921 15.449 5 15.25 5H12.25C12.051 5 11.86 4.921 11.72 4.78C11.579 4.64 11.5 4.449 11.5 4.25V1.25Z" stroke="#2A6E90" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M4 8.75C4 8.551 4.079 8.36 4.22 8.22C4.36 8.079 4.551 8 4.75 8H7.75C7.949 8 8.14 8.079 8.28 8.22C8.421 8.36 8.5 8.551 8.5 8.75V11.75C8.5 11.949 8.421 12.14 8.28 12.28C8.14 12.421 7.949 12.5 7.75 12.5H4.75C4.551 12.5 4.36 12.421 4.22 12.28C4.079 12.14 4 11.949 4 11.75V8.75Z" stroke="#2A6E90" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  // User Plus Icon SVG
  const UserPlusIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10.667 14V12.667C10.667 11.959 10.386 11.281 9.886 10.781C9.386 10.281 8.707 10 8 10H3.333C2.626 10 1.948 10.281 1.448 10.781C0.948 11.281 0.667 11.959 0.667 12.667V14M13.333 5.333V9.333M15.333 7.333H11.333M8.333 4.667C8.333 6.139 7.139 7.333 5.667 7.333C4.194 7.333 3 6.139 3 4.667C3 3.194 4.194 2 5.667 2C7.139 2 8.333 3.194 8.333 4.667Z" stroke="#2A6E90" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  // Invite/Mail Icon SVG
  const InviteIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 12.722H1.778C1.306 12.722 0.854 12.535 0.521 12.202C0.187 11.868 0 11.416 0 10.944V2.056M0 2.056C0 1.584 0.187 1.132 0.521 0.799C0.854 0.465 1.306 0.278 1.778 0.278H14.222C14.694 0.278 15.146 0.465 15.479 0.799C15.813 1.132 16 1.584 16 2.056M0 2.056L8 7.389L16 2.056M16 2.056V8.722M10.667 12.722H16M16 12.722L13.333 10.056M16 12.722L13.333 15.389" stroke="#2A6E90" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  // Logout Icon SVG
  const LogoutIcon = () => (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5.5 14H2.833C2.48 14 2.141 13.86 1.891 13.609C1.64 13.359 1.5 13.02 1.5 12.667V3.333C1.5 2.98 1.64 2.641 1.891 2.391C2.141 2.14 2.48 2 2.833 2H5.5M10.167 11.333L13.5 8M13.5 8L10.167 4.667M13.5 8H5.5" stroke="#2A6E90" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );

  return (
    <IonPage className="home-page">
      <IonContent fullscreen className="home-content">
        
        {/* Home Container - 320x568px */}
        <div className="home-container">
          
          {/* Header */}
          <Header variant="home">
            <h1 className="home-greeting">Hola, {username || 'Usuario'}!</h1>
          </Header>

          {/* Frame 378 - Main content 320x264px */}
          <div className="home-main">
            
            {/* Frame 402 - Cards wrapper 288x264px */}
            <div className="home-cards-wrapper">
              
              {/* Frame 374 - Cards container */}
              <div className="home-cards-container">
                
                {/* Frame 405 - Cards list */}
                <div className="home-cards-list">
                  
                  {/* QR Card - 288x80px */}
                  {userrol !== "VIS" && (
                    <div className="home-card-wrapper">
                      <div className="home-card" onClick={() => navigateTo('/qr')}>
                        <div className="home-card-icon">
                          <QRIcon />
                        </div>
                        <p className="home-card-title">QR</p>
                      </div>
                    </div>
                  )}

                  {/* Crear Usuario Card - 288x80px */}
                  {userrol !== "VIS" && userrol !== "OFC" && (
                    <div className="home-card-wrapper">
                      <div className="home-card" onClick={() => navigateTo('/registry')}>
                        <div className="home-card-icon">
                          <UserPlusIcon />
                        </div>
                        <p className="home-card-title">Crear Usuario</p>
                      </div>
                    </div>
                  )}

                  {/* Invitar Card - 288x80px */}
                  {userrol !== "VIS" && userrol !== "OFC" && (
                    <div className="home-card-wrapper">
                      <div className="home-card" onClick={() => navigateTo('/visit')}>
                        <div className="home-card-icon">
                          <InviteIcon />
                        </div>
                        <p className="home-card-title">Invitar</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Frame 380 - Footer section 320x62px */}
          <div className="home-footer">
            
            {/* Logout button */}
            <button className="home-logout-button" onClick={logout}>
              <span className="home-logout-icon">
                <LogoutIcon />
              </span>
              <span className="home-logout-text">Cerrar Sesión</span>
            </button>

            {/* Last login text */}
            <p className="home-last-login">Último ingreso: {getLastLoginDate()}</p>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
