import { IonSelect, IonSelectOption } from "@ionic/react";
import { UseFormRegisterReturn } from "react-hook-form";
import './Dropdown.css';

interface DropdownOption {
  value: string | number;
  label: string;
}

interface DropdownProps {
  label?: string;
  placeholder?: string;
  options: DropdownOption[];
  className?: string;
  containerClassName?: string;
  register?: UseFormRegisterReturn;
  disabled?: boolean;
  value?: string | number;
  onChange?: (value: any) => void;
}

const Dropdown: React.FC<DropdownProps> = ({
  label,
  placeholder,
  options,
  className = '',
  containerClassName = '',
  register,
  disabled = false,
  value,
  onChange
}) => {
  return (
    <div className={`dropdown ${containerClassName}`}>
      <div className="dropdown-inner">
        <IonSelect
          className={`dropdown-select ${className}`}
          placeholder={placeholder || "Options"}
          interface="popover"
          disabled={disabled}
          value={value}
          onIonChange={onChange}
          {...register}
        >
          {options.map((option) => (
            <IonSelectOption 
              key={`${option.value}`} 
              value={option.value}
            >
              {option.label}
            </IonSelectOption>
          ))}
        </IonSelect>
        {/* Chevron Icon */}
        <svg 
          className="dropdown-chevron-icon" 
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
  );
};

export default Dropdown;
