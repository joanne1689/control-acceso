import { useRef } from "react";
import { IonModal, IonDatetime } from "@ionic/react";
import './DatePicker.css';

interface DatePickerProps {
  label: string;
  value?: string | string[] | null | undefined;
  onChange?: (value: any) => void;
  min?: string;
  max?: string;
  presentation?: "date" | "date-time" | "time" | "month" | "year" | "month-year";
  className?: string;
  containerClassName?: string;
}

const DatePicker: React.FC<DatePickerProps> = ({
  label,
  value,
  onChange,
  min,
  max,
  presentation = "date",
  className = '',
  containerClassName = ''
}) => {
  const modalRef = useRef<HTMLIonModalElement>(null);

  const handleClick = () => {
    modalRef.current?.present();
  };

  return (
    <>
      <div className={`datepicker ${containerClassName}`} onClick={handleClick}>
        <div className="datepicker-inner">
          <span className="datepicker-label">{label}</span>
          {/* Calendar Icon */}
          <svg 
            className="datepicker-calendar-icon" 
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
        </div>
      </div>

      <IonModal ref={modalRef} keepContentsMounted={true}>
        <IonDatetime
          style={{ margin: "0 auto" }}
          showDefaultButtons={true}
          presentation={presentation}
          value={value}
          onIonChange={onChange}
          min={min}
          max={max}
        />
      </IonModal>
    </>
  );
};

export default DatePicker;
