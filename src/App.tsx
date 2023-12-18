import { entidadFusionada } from "@/api/enfemedades";
import { Disclaimer } from "@/components/Disclaimer";
import { FormUser } from "@/components/FormUser";
import MultipleSelectChip from "@/components/MultipleSelect/MultipleSelect";
import { Contact } from "@/models/InfoAlert";
import { dataApi } from "@/models/dataApi";
import { Alert, Box, Button} from "@mui/material";
import { useEffect, useState } from "react";

import "./App.css";

import "swiper/css";
import "swiper/css/navigation";


function App() {
  const [personName, setPersonName] = useState<string[]>([]);
  const [dataEnfermadadApi, setDataEnfermadadApi] = useState<dataApi[]>([]);
  const [totalDiscapacidad, setTotalDiscapacidad] = useState<number[]>([]);
  const [formulaDiscapacidad, setFormulaDiscapacidad] = useState(0);
  const [validacionDosJuntasAlert, setValidacionDosJuntasAlert] = useState<
    boolean[]
  >([]);
  const [isVisibleResult, setIsVisibleResult] = useState<boolean>(false);

  const handleValidacionDosJuntasAlert = (valor: boolean) => {
    setValidacionDosJuntasAlert([...validacionDosJuntasAlert, valor]);
  };
  const isTwo = validacionDosJuntasAlert.filter((b) => b === true);

  const handleFormulaDiscapacidad = () => {
    if (personName.length === 0) {
      setTotalDiscapacidad([]);
    } else if (personName.length === totalDiscapacidad.length) {
      let total = 0;

      if (totalDiscapacidad.length === 1) {
        total = totalDiscapacidad[0];
      }

      if (totalDiscapacidad.length === 2) {
        total = (100 - totalDiscapacidad[0]) * (totalDiscapacidad[1] / 100);
        total += totalDiscapacidad[0];
      }

      if (totalDiscapacidad.length === 3) {
        total =
          100 -
          (totalDiscapacidad[0] + totalDiscapacidad[1]) *
            (totalDiscapacidad[2] / 100);
      }

      setFormulaDiscapacidad(total);
    }
  };

  const handleTotalDiscapacidad = (valor: number, initial?: boolean) => {
    if (initial) {
      const newValue = totalDiscapacidad.filter((f) => f !== valor);
      setTotalDiscapacidad([...newValue]);
    } else {
      setTotalDiscapacidad([...totalDiscapacidad, valor]);
    }
  };

  const handleChangeMultiple = (value: any[]) => {
    const entidad = value.map((a: any) => entidadFusionada.get(a));
    setDataEnfermadadApi([...entidad]);
    setPersonName( value);
  };

  const isValide = personName.length <= 2;

  useEffect(() => {
    if (totalDiscapacidad.length > 0) {
      handleFormulaDiscapacidad();
      setIsVisibleResult(false);
    }
  }, [totalDiscapacidad]);

  useEffect(() => {
    if (formulaDiscapacidad !== 0) {
      setIsVisibleResult(true);
    }
  }, [formulaDiscapacidad]);

  const resetFormulaDiscapacidad = () => {
    setIsVisibleResult(false);
    setFormulaDiscapacidad(0);
    setTotalDiscapacidad([]);
    setPersonName([]);
    setValidacionDosJuntasAlert([]);
    setDataEnfermadadApi([]);
  };

  return (
    <div className="containerApp">
      <Disclaimer />
      <MultipleSelectChip
        estado={personName}
        funcHandle={handleChangeMultiple}
      />

      {isTwo.length <= 2 &&
        formulaDiscapacidad > 0 &&
        personName.length < 3 && (
          <Box className="result">
            <p className="parrafo__result">
              Tu porcentaje de discapacidad es:{" "}
              <span className="porcentaje">
                {formulaDiscapacidad.toFixed(2)}%
              </span>
            </p>
            <Button variant="text" onClick={resetFormulaDiscapacidad}>
              Restablecer
            </Button>
          </Box>
        )}

      {isTwo.length > 2 && (
        <Alert severity="warning" className="alerta-container">
          <div className="alerta">
            {Contact.ABOGADO}
            <button>
              Click aqui para contactar con un abogado de la firma
            </button>
          </div>
        </Alert>
      )}
      {!isVisibleResult && (
        <>
          <article className="forms__simulator">
            {isValide &&
              dataEnfermadadApi.map((enfermedad) => (
                <FormUser
                  handleValidacionDosJuntasAlert={
                    handleValidacionDosJuntasAlert
                  }
                  key={enfermedad.indice}
                  enfermedad={enfermedad}
                  handleFuncTotal={handleTotalDiscapacidad}
                />
              ))}
          </article>
        </>
      )}
    </div>
  );
}

export default App;
