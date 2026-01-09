import { 
  IonButton, 
  IonContent, 
  IonInput, 
  IonLoading, 
  IonPage, 
  IonSelect,
  IonSelectOption,
  useIonRouter, 
  useIonToast 
} from '@ionic/react';
import '../../assets/Registrar.css';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useAppSelector } from '../../hooks/loginHooks';
import httpClient from '../../hooks/CapacitorClient';
import { formatearRut, handleRutDown, validarDigV } from '../../utils/RutFormatter';
import moment from 'moment';
import Header from '../components/Header';

interface Campos {
  rut: string;
  name: string;
  email: string;
  telefono: string;
}

const nameIn: Campos = {
  rut: "Rut",
  name: "Nombre",
  email: "Correo Electrónico",
  telefono: "Teléfono"
}

const Registrar: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const form = useForm();
  const [toast] = useIonToast();
  const router = useIonRouter();
  const { rolesRegistro, unidades } = useAppSelector((state) => state.login);
  const [fechaInicio, setFechaInicio] = useState<string>(moment().format("yyyy-MM-DD"));
  const [fechaFin, setFechaFin] = useState<string>(moment().add(6, "M").format("yyyy-MM-DD"));

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

  const handleBack = () => {
    router.push('/home', 'back', 'pop');
  };

  const handleButtonClick = async () => {
    const { rut, telefono, rol, sala } = form.getValues();
    let err = 0;

    Object.keys(nameIn).every((key: string) => {
      if (form.getValues(key) === "" || !form.getValues(key)) {
        const valorCampo: string = nameIn[key as keyof typeof nameIn];
        err++;
        return showToast(`Campo debe estar completo: ${valorCampo}.`, "warning");
      }
      return true;
    });

    if (err !== 0) return false;

    if (!rol || rol === "") return showToast(`Campo debe estar completo: Rol.`, "warning");
    if (!sala || sala === "") return showToast(`Campo debe estar completo: Nro. Unidad.`, "warning");

    // Validate RUT
    if (rut) {
      const tmp = rut.split("-");
      if (tmp.length === 2) {
        tmp[0] = tmp[0].replace(/\./g, '');
        tmp[1] = tmp[1] === 'K' ? 'k' : tmp[1];
        const digitoEsperado = validarDigV(tmp[0]);
        if (String(digitoEsperado) !== tmp[1]) {
          return showToast("Rut inválido.", "warning");
        }
      }
    }

    if (telefono && telefono.length !== 9) {
      return showToast("Número de teléfono inválido.", "warning");
    }

    try {
      setLoading(true);
      const response = await httpClient.post('/mobile/registrar', { 
        ...form.getValues(), 
        fechaInicio: moment(fechaInicio).format("yyyy-MM-DDTHH:mm:ss"), 
        fechaFin: moment(fechaFin).format("yyyy-MM-DDTHH:mm:ss") 
      });
      
      if (response.status === 403) return showToast(response.data.message, "danger");

      showToast("Registro realizado correctamente.", "success");
      form.reset();
      setFechaInicio(moment().format("yyyy-MM-DD"));
      setFechaFin(moment().add(6, "M").format("yyyy-MM-DD"));
    } catch {
      showToast("Ocurrió algún error al realizar el registro.", "danger");
    } finally {
      setLoading(false);
    }
  };

  const keyDown = (e: React.KeyboardEvent<HTMLIonInputElement>) => {
    const allowedControlKeys = [
      'Backspace',
      'Tab',
      'Delete',
      'ArrowLeft',
      'Home',
      'End',
      'ArrowRight'
    ];
    if (!/^[0-9]$/.test(e.key) && !allowedControlKeys.includes(e.key)) {
      e.preventDefault();
    }
  };

  return (
    <IonPage className="registrar-page">
      <IonContent className="registrar-content" fullscreen>
        <IonLoading spinner="circles" isOpen={loading} onDidDismiss={() => setLoading(false)} />
        
        {/* Crear Usuario Container */}
        <div className="registrar-container">
          {/* Frame 381 - Main Section */}
          <div className="registrar-main-section">
            {/* Header */}
            <Header variant="back" onBack={handleBack} />

            {/* Frame 356 - Content Area */}
            <div className="registrar-content-area">
              {/* Frame 373 - Form Container */}
              <div className="registrar-form-container">
                {/* Frame 387 - Title Section */}
                <div className="registrar-title-section">
                  <h2 className="registrar-title">Crear Usuario</h2>
                  <p className="registrar-subtitle">Genera un nuevo usuario con tus mismos permisos.</p>
                </div>

                {/* form - Rut */}
                <div className="registrar-form-row">
                  <div className="registrar-input-frame">
                    <IonInput
                      className="registrar-input"
                      placeholder="Rut"
                      onKeyDown={handleRutDown}
                      {...form.register("rut", { 
                        onChange: (e) => { form.setValue('rut', formatearRut(e.target.value)) } 
                      })}
                      autocomplete="off"
                    />
                  </div>
                </div>

                {/* form - Nombre Completo */}
                <div className="registrar-form-row">
                  <div className="registrar-input-frame">
                    <IonInput
                      className="registrar-input"
                      placeholder="Nombre Completo"
                      {...form.register("name")}
                      autocomplete="off"
                    />
                  </div>
                </div>

                {/* form - Correo Electrónico */}
                <div className="registrar-form-row">
                  <div className="registrar-input-frame">
                    <IonInput
                      className="registrar-input"
                      placeholder="Correo Electrónico"
                      type="email"
                      {...form.register("email")}
                      autocomplete="off"
                    />
                  </div>
                </div>

                {/* form - Teléfono */}
                <div className="registrar-form-row">
                  <div className="registrar-input-frame">
                    <IonInput
                      className="registrar-input"
                      placeholder="Teléfono"
                      maxlength={9}
                      onKeyDown={keyDown}
                      {...form.register("telefono")}
                      autocomplete="off"
                    />
                  </div>
                </div>

                {/* Frame 398 - Dropdowns Row */}
                <div className="registrar-dropdown-row">
                  {/* Dropdown - Rol */}
                  <div className="registrar-dropdown">
                    <div className="registrar-dropdown-inner">
                      <IonSelect
                        className="registrar-select"
                        placeholder="Rol"
                        interface="popover"
                        {...form.register("rol")}
                      >
                        {(rolesRegistro || []).map(({ value, label }) => (
                          <IonSelectOption key={`rol_${value}`} value={value}>
                            {label}
                          </IonSelectOption>
                        ))}
                      </IonSelect>
                      {/* Icon/Solid/cheveron-down */}
                      <svg 
                        className="registrar-chevron-icon" 
                        width="20" 
                        height="20" 
                        viewBox="0 0 20 20" 
                        fill="none" 
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path 
                          fillRule="evenodd" 
                          clipRule="evenodd" 
                          d="M5.29289 7.29289C5.68342 6.90237 6.31658 6.90237 6.70711 7.29289L10 10.5858L13.2929 7.29289C13.6834 6.90237 14.3166 6.90237 14.7071 7.29289C15.0976 7.68342 15.0976 8.31658 14.7071 8.70711L10.7071 12.7071C10.3166 13.0976 9.68342 13.0976 9.29289 12.7071L5.29289 8.70711C4.90237 8.31658 4.90237 7.68342 5.29289 7.29289Z" 
                          fill="#828787"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Dropdown - Nro. Unidad */}
                  <div className="registrar-dropdown">
                    <div className="registrar-dropdown-inner">
                      <IonSelect
                        className="registrar-select"
                        placeholder="Nro. Unidad"
                        interface="popover"
                        {...form.register("sala")}
                      >
                        {(unidades || []).map(({ value, label }) => (
                          <IonSelectOption key={`unidad_${value}`} value={value}>
                            {label}
                          </IonSelectOption>
                        ))}
                      </IonSelect>
                      {/* Icon/Solid/cheveron-down */}
                      <svg 
                        className="registrar-chevron-icon" 
                        width="20" 
                        height="20" 
                        viewBox="0 0 20 20" 
                        fill="none" 
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path 
                          fillRule="evenodd" 
                          clipRule="evenodd" 
                          d="M5.29289 7.29289C5.68342 6.90237 6.31658 6.90237 6.70711 7.29289L10 10.5858L13.2929 7.29289C13.6834 6.90237 14.3166 6.90237 14.7071 7.29289C15.0976 7.68342 15.0976 8.31658 14.7071 8.70711L10.7071 12.7071C10.3166 13.0976 9.68342 13.0976 9.29289 12.7071L5.29289 8.70711C4.90237 8.31658 4.90237 7.68342 5.29289 7.29289Z" 
                          fill="#828787"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Frame 399 - Date Pickers Row */}
                <div className="registrar-date-row">
                  {/* Dropdown - Inicio */}
                  <div className="registrar-dropdown">
                    <div className="registrar-dropdown-inner">
                      <span className="registrar-date-label">Inicio</span>
                      {/* Calendar Icon */}
                      <svg 
                        className="registrar-calendar-icon" 
                        width="14" 
                        height="14" 
                        viewBox="0 0 14 14" 
                        fill="none" 
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path 
                          d="M9.33333 0.166672V2.50001M4.66667 0.166672V2.50001M1.75 4.83334H12.25M2.91667 1.33334H11.0833C11.7277 1.33334 12.25 1.85568 12.25 2.50001V10.6667C12.25 11.311 11.7277 11.8333 11.0833 11.8333H2.91667C2.27233 11.8333 1.75 11.311 1.75 10.6667V2.50001C1.75 1.85568 2.27233 1.33334 2.91667 1.33334Z" 
                          stroke="#828787" 
                          strokeWidth="1.5" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                        />
                      </svg>
                      <input
                        type="date"
                        className="registrar-date-input"
                        value={fechaInicio}
                        onChange={(e) => setFechaInicio(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Dropdown - Fin */}
                  <div className="registrar-dropdown">
                    <div className="registrar-dropdown-inner">
                      <span className="registrar-date-label">Fin</span>
                      {/* Calendar Icon */}
                      <svg 
                        className="registrar-calendar-icon" 
                        width="14" 
                        height="14" 
                        viewBox="0 0 14 14" 
                        fill="none" 
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path 
                          d="M9.33333 0.166672V2.50001M4.66667 0.166672V2.50001M1.75 4.83334H12.25M2.91667 1.33334H11.0833C11.7277 1.33334 12.25 1.85568 12.25 2.50001V10.6667C12.25 11.311 11.7277 11.8333 11.0833 11.8333H2.91667C2.27233 11.8333 1.75 11.311 1.75 10.6667V2.50001C1.75 1.85568 2.27233 1.33334 2.91667 1.33334Z" 
                          stroke="#828787" 
                          strokeWidth="1.5" 
                          strokeLinecap="round" 
                          strokeLinejoin="round"
                        />
                      </svg>
                      <input
                        type="date"
                        className="registrar-date-input"
                        value={fechaFin}
                        onChange={(e) => setFechaFin(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {/* Button - Confirmar */}
                <IonButton 
                  className="registrar-submit-button" 
                  expand="block"
                  onClick={handleButtonClick}
                >
                  <span className="registrar-submit-text">Confirmar</span>
                </IonButton>
              </div>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Registrar;
