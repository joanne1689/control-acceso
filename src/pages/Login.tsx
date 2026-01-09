import { 
  IonButton, 
  IonContent, 
  IonInput, 
  IonLoading, 
  IonPage, 
  useIonRouter, 
  useIonToast 
} from '@ionic/react';
import '../../assets/Login.css';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import httpClient from '../../hooks/CapacitorClient';
import { useAppDispatch } from '../../hooks/loginHooks';
import { handleLoginSuccess } from '../../reducers/loginThunks';
import { formatearRut } from '../../utils/RutFormatter';

const Login: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const loginForm = useForm();
  const [toast] = useIonToast();
  const router = useIonRouter();
  const dispatch = useAppDispatch();

  const showToast = (message: string, color: 'warning' | 'danger' | 'success' = "success") => {
    toast({
      message,
      duration: 1500,
      swipeGesture: "vertical",
      position: "top",
      color,
      buttons: [{ text: "✖", role: "cancel" }]
    });
  };

  const handleButtonClick = async () => {
    try {
      setLoading(true);
      const response = await httpClient.post('/mobile/auth/login', loginForm.getValues());

      if (response.status === 403) return showToast(response.data?.message, "danger");

      const { username, userrol, passTemp, roles, unidades } = response.data;

      if (passTemp === 1) {
        dispatch(handleLoginSuccess(loginForm.getValues("username"), username, userrol, roles, unidades));
        showToast("Inicio Sesión exitoso, debe modificar su contraseña.");
        return router.push('/modpass', 'root', 'replace');
      }

      showToast("Inicio Sesión exitoso");
      dispatch(handleLoginSuccess(loginForm.getValues("username"), username, userrol, roles, unidades));
      setTimeout(() => {
        router.push('/home', 'root', 'replace');
      }, 500);
    } catch {
      showToast("Error al iniciar sesión.", "danger");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    showToast("Función en desarrollo", "warning");
  };

  return (
    <IonPage className="login-page">
      <IonContent fullscreen className="login-content">
        <IonLoading 
          spinner="circles" 
          isOpen={loading} 
          onDidDismiss={() => setLoading(false)} 
          className="login-loading"
        />
        
        {/* Login Container - 320x568px */}
        <div className="login-container">
          
          {/* Rectangle 103 - Header gradient 320x177px */}
          <div className="login-header">
            {/* Logo 120x120px at position (100, 39) */}
            <svg className="login-logo" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M60 5C60 5 15 18 15 18V65C15 90 35 108 60 118C85 108 105 90 105 65V18L60 5Z" fill="#8B1538"/>
              <path d="M60 10C60 10 20 22 20 22V63C20 85 38 102 60 111C82 102 100 85 100 63V22L60 10Z" fill="#A91D3A"/>
              <g fill="#FFFFFF">
                <path d="M42 32H52V85H42V32Z"/>
                <path d="M52 32H72C78 32 83 37 83 43V50C83 56 78 61 72 61H52V51H70C72 51 73 50 73 48V45C73 43 72 42 70 42H52V32Z"/>
                <rect x="52" y="68" width="28" height="4" rx="2" opacity="0.7"/>
                <rect x="52" y="78" width="20" height="4" rx="2" opacity="0.5"/>
              </g>
              <circle cx="60" cy="95" r="5" fill="#3CBBB1"/>
              <path d="M35 25L60 18L85 25" stroke="#3CBBB1" strokeWidth="3" strokeLinecap="round" fill="none"/>
            </svg>
          </div>

          {/* Frame 401 - Main content 288x327px */}
          <div className="login-main">
            
            {/* Frame 409 - Upper content 288x213.83px */}
            <div className="login-upper-content">
              
              {/* Frame 400 - Welcome text 288x59px */}
              <div className="login-welcome">
                <h1 className="login-title">Hola!</h1>
                <p className="login-subtitle">Completa con tus datos para ingresar</p>
              </div>

              {/* Frame 356 - Input section 288x82.83px */}
              <div className="login-input-section">
                
                {/* Form row - Rut input 288x38px */}
                <div className="login-form-row">
                  <IonInput
                    className="login-input"
                    placeholder="Rut"
                    {...loginForm.register("username", { 
                      onChange: (e) => { 
                        loginForm.setValue('username', formatearRut(e.target.value)); 
                      } 
                    })}
                    autocomplete="off"
                  />
                </div>
                
                {/* Form row - Password input 288x38px */}
                <div className="login-form-row">
                  <IonInput
                    className="login-input"
                    placeholder="Nombre Completo"
                    type="password"
                    {...loginForm.register("password")}
                    autocomplete="off"
                  />
                </div>
              </div>

              {/* Frame 408 - Button section 288x40px */}
              <div className="login-button-section">
                <IonButton 
                  expand="block" 
                  className="login-button"
                  onClick={handleButtonClick}
                >
                  Ingresar
                </IonButton>
              </div>
            </div>

            {/* Footer - Forgot password 288x30px */}
            <div className="login-footer">
              <button 
                className="login-forgot-link"
                onClick={handleForgotPassword}
              >
                ¿Olvidaste tu contraseña?
              </button>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;
