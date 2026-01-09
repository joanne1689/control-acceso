import { 
  IonButton, 
  IonContent, 
  IonInput, 
  IonLoading, 
  IonPage, 
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
import Dropdown from '../components/Dropdown';
import DatePicker from '../components/DatePicker';

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
                  <Dropdown
                    placeholder="Rol"
                    options={rolesRegistro || []}
                    register={form.register("rol")}
                    containerClassName="registrar-dropdown"
                    className="registrar-select"
                  />

                  {/* Dropdown - Nro. Unidad */}
                  <Dropdown
                    placeholder="Nro. Unidad"
                    options={unidades || []}
                    register={form.register("sala")}
                    containerClassName="registrar-dropdown"
                    className="registrar-select"
                  />
                </div>

                {/* Frame 399 - Date Pickers Row */}
                <div className="registrar-date-row">
                  {/* DatePicker - Inicio */}
                  <DatePicker
                    label="Inicio"
                    value={fechaInicio}
                    onChange={(e) => setFechaInicio(e.detail.value ? moment(e.detail.value.toString()).format("yyyy-MM-DD") : "")}
                    presentation="date"
                    containerClassName="registrar-dropdown"
                  />

                  {/* DatePicker - Fin */}
                  <DatePicker
                    label="Fin"
                    value={fechaFin}
                    onChange={(e) => setFechaFin(e.detail.value ? moment(e.detail.value.toString()).format("yyyy-MM-DD") : "")}
                    presentation="date"
                    containerClassName="registrar-dropdown"
                  />
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
