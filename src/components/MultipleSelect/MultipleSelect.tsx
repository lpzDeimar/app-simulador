import { useEffect, useState } from "react";
import { entidadFusionada } from "@/api/enfemedades";
import "@/components/MultipleSelect/MultipleSelect.scss";
import { Contact } from "@/models/InfoAlert";
import { Alert, Dialog, DialogTitle } from "@mui/material";

import Select from 'react-select'
import makeAnimated from 'react-select/animated';
const animatedComponents = makeAnimated();

const names = Array.from(entidadFusionada);
type MultipleSelectChipProps = {
  estado: string[];
  funcHandle: (values: any) => void;
};

export default function MultipleSelectChip({estado,funcHandle}: MultipleSelectChipProps) {
  const [isOpen, setIsOpen] = useState(true);
  const handleClose = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === undefined) setIsOpen(false);
  };
  const handleOpen = () => {
    setIsOpen(true);
    return true;
  };
  useEffect(() => {
    if (estado.length > 2) {
      handleOpen();
    }
  }, [estado]);

  const onSubmit = (event: any) => {

    let arrayValues: any[] = [];
    event.preventDefault();
    const values = event.target.multiSelect.value;

    if(!(values === '')){
      funcHandle([values]);
    }else{
      const selectedOptions = Array.from(event.target.multiSelect)
  
      if(selectedOptions.length >= 3 ){
        setIsOpen(false);
      }
  
      selectedOptions.forEach((selectChip: any) => {
        arrayValues.push(selectChip.value)
      })
      funcHandle(arrayValues);
      arrayValues = []
    }

  }

  const optionsMultipleSelect = names.map((disability: any) => ({ value: disability[1].indice, label: disability[1].descripcion }))

  return (
    <>
      {estado.length > 2 && (
        <>
          <Dialog open={isOpen} onClose={handleClose}>
            <DialogTitle>advertencia </DialogTitle>
            <Alert severity="warning" className="alerta-container">
              <div className="alerta">
                {Contact.ABOGADO}
                <button>
                  Click aqui para contactar con un abogado de la firma
                </button>
              </div>
            </Alert>
          </Dialog>
        </>
      )}
      <form onSubmit={onSubmit} className="container__multiple__select">
          <Select
            closeMenuOnSelect={false}
            components={animatedComponents}
            isMulti
            className="select-container"
            name="multiSelect"
            options={optionsMultipleSelect}
          />
          <button>ENVIAR</button>
      </form>
    </>
  );
}
