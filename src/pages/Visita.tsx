import { IonButton, IonContent, IonInput, IonLoading, IonPage, IonTextarea, useIonToast } from "@ionic/react";
import { useState } from "react";
import { formatearRut, handleRutDown, validarDigV } from "../../utils/RutFormatter";
import { useForm } from "react-hook-form";
import moment from "moment";
import { useAppSelector } from "../../hooks/loginHooks";
import httpClient from "../../hooks/CapacitorClient";
import Header from '../components/Header';
import Dropdown from '../components/Dropdown';
import DatePicker from '../components/DatePicker';
import '../../assets/Visita.css';

interface Campos {
  rut: string;
  name: string;
  email: string;
  telefono: string;
}

const nameIn: Campos = {
  rut: "Rut",
  name: "Nombre Completo",
  email: "Correo Electrónico",
  telefono: "Teléfono"
};

const Visita: React.FC = () => {
  const { unidades } = useAppSelector((state) => state.login);
  const [loading, setLoading] = useState<boolean>(false);
  const form = useForm();
  const [toast] = useIonToast();
  const initDate = moment();
  const [fechaInicio, setFechaInicio] = useState<string>(initDate.format("yyyy-MM-DDTHH:mm:ss"));
  const [fechaFin, setFechaFin] = useState<string>(initDate.add(2, "days").format("yyyy-MM-DDTHH:mm:ss"));
  const [fechaMin] = useState(moment().format("yyyy-MM-DDTHH:mm:ss"));
  const [fechaMax] = useState(moment().add(2, 'weeks').format("yyyy-MM-DDTHH:mm:ss"));

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
    const { rut, telefono } = form.getValues();
    const tmp = rut.split("-");
    let err = 0;
    tmp[0] = tmp[0].replace(/\./g, '');
    tmp[1] = tmp[1] === 'K' ? 'k' : tmp[1];
    const digitoEsperado = validarDigV(tmp[0]);

    Object.keys(nameIn).every((key: string) => {
      if (form.getValues(key) === "") {
        const valorCampo: string = nameIn[key as keyof typeof nameIn];
        err++;
        return showToast(`Campo debe estar completo: ${valorCampo}.`, "warning");
      }
    });

    if (err !== 0) return false;

    if (String(digitoEsperado) !== tmp[1]) {
      return showToast("Rut inválido.", "warning");
    }

    if (telefono.length !== 9) {
      return showToast("Número de teléfono inválido.", "warning");
    }

    if (!fechaInicio || fechaInicio === "") {
      return showToast("Fecha de inicio inválida.", "warning");
    }

    if (!fechaFin || fechaFin === "") {
      return showToast("Fecha de término inválida.", "warning");
    }

    try {
      setLoading(true);
      const fi = moment(fechaInicio).format("yyyy-MM-DD HH:mm:ss");
      const ff = moment(fechaFin).format("yyyy-MM-DD HH:mm:ss");
      const response = await httpClient.post('/mobile/visita', { ...form.getValues(), fechaInicio: fi, fechaFin: ff });
      if (response.status === 403) return showToast(response.data.message, "danger");

      showToast("Invitación generada correctamente.", "success");
      form.reset();
      changeTime();
    } catch {
      showToast("Ocurrio algún error al crear la invitación.", "danger");
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

  const changeTime = () => {
    const nowDate = moment();
    setFechaInicio(nowDate.format("yyyy-MM-DDTHH:mm:ss"));
    setFechaFin(nowDate.add(2, "days").format("yyyy-MM-DDTHH:mm:ss"));
  };

  return (
    <IonPage className="visita-page">
      <IonContent className="visita-content" fullscreen>
        <IonLoading spinner={"circles"} isOpen={loading} onDidDismiss={() => setLoading(false)} />

        <div className="visita-container">
          {/* Frame 381 - Main Section */}
          <div className="visita-main-section">
            {/* Header */}
            <Header variant="back" />

            {/* Frame 356 - Content Area */}
            <div className="visita-content-area">
              {/* Frame 373 - Form Container */}
              <div className="visita-form-container">
                {/* Frame 387 - Title Section */}
                <div className="visita-title-section">
                  <h6 className="visita-title">Invitar</h6>
                  
                  {/* Frame 390 - Progress Steps */}
                  <div className="visita-progress-container">
                    {/* Step 1 */}
                    <div className="visita-step visita-step-1">
                      <p className="visita-step-text">1. Completa con los datos</p>
                      <div className="visita-progress-bar visita-progress-bar-active"></div>
                    </div>
                    
                    {/* Step 2 */}
                    <div className="visita-step visita-step-2">
                      <p className="visita-step-text">2. Comparte el QR</p>
                      <div className="visita-progress-bar visita-progress-bar-inactive"></div>
                    </div>
                  </div>
                </div>

                {/* Form Row 1 - Rut */}
                <div className="visita-form-row visita-form-row-1">
                  <IonInput
                    className="visita-input"
                    placeholder="Rut"
                    onKeyDown={handleRutDown}
                    {...form.register("rut", { onChange: (e) => { form.setValue('rut', formatearRut(e.target.value)) } })}
                    autocomplete='off'
                  />
                </div>

                {/* Form Row 2 - Nombre Completo */}
                <div className="visita-form-row visita-form-row-2">
                  <IonInput
                    className="visita-input"
                    placeholder="Nombre Completo"
                    {...form.register("name")}
                    autocomplete='off'
                  />
                </div>

                {/* Form Row 3 - Correo Electrónico */}
                <div className="visita-form-row visita-form-row-3">
                  <IonInput
                    className="visita-input"
                    placeholder="Correo Electrónico"
                    {...form.register("email")}
                    autocomplete='off'
                  />
                </div>

                {/* Form Row 4 - Teléfono */}
                <div className="visita-form-row visita-form-row-4">
                  <IonInput
                    className="visita-input"
                    placeholder="Teléfono"
                    {...form.register("telefono")}
                    autocomplete='off'
                    maxlength={9}
                    onKeyDown={(e) => { keyDown(e) }}
                  />
                </div>

                {/* Frame 398 - Dropdown Row */}
                <div className="visita-dropdown-row">
                  {/* Dropdown 1 - Rol */}
                  <Dropdown
                    placeholder="Rol"
                    options={[{ value: "VIS", label: "Visita" }]}
                    register={form.register("rol")}
                    containerClassName="visita-dropdown"
                    className="visita-select"
                  />

                  {/* Dropdown 2 - Nro. Unidad */}
                  <Dropdown
                    placeholder="Nro. Unidad"
                    options={unidades || []}
                    register={form.register("nroUnidad")}
                    containerClassName="visita-dropdown"
                    className="visita-select"
                  />
                </div>

                {/* Frame 399 - Date Row */}
                <div className="visita-date-row">
                  {/* DatePicker - Inicio */}
                  <DatePicker
                    label="Inicio"
                    value={fechaInicio}
                    onChange={(e) => setFechaInicio(e.detail.value ? moment(e.detail.value.toString()).format("yyyy-MM-DDTHH:mm:ss") : "")}
                    min={fechaMin}
                    max={fechaMax}
                    presentation="date-time"
                    containerClassName="visita-dropdown"
                  />

                  {/* DatePicker - Fin */}
                  <DatePicker
                    label="Fin"
                    value={fechaFin}
                    onChange={(e) => setFechaFin(e.detail.value ? moment(e.detail.value.toString()).format("yyyy-MM-DDTHH:mm:ss") : "")}
                    min={fechaMin}
                    max={fechaMax}
                    presentation="date-time"
                    containerClassName="visita-dropdown"
                  />
                </div>

                {/* form - Textarea/Message (order: 7) */}
                <IonTextarea
                  className="visita-textarea-input"
                  placeholder="Motivo de la jornada"
                  {...form.register("motivo")}
                  rows={3}
                />

                {/* Button - Submit (order: 8) */}
                <IonButton
                  expand='block'
                  className="visita-submit-button"
                  onClick={handleButtonClick}
                >
                  <span className="visita-submit-text">Continuar</span>
                </IonButton>
              </div>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Visita;
