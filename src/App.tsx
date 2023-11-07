import { entidadFusionada } from "@/api/enfemedades";
import { Disclaimer } from "@/components/Disclaimer";
import { FormUser } from "@/components/FormUser";
import MultipleSelectChip from "@/components/MultipleSelect/MultipleSelect";
import { Contact, Error } from "@/models/InfoAlert";
import { dataApi } from "@/models/dataApi";
import { Alert, Box, Button, SelectChangeEvent } from "@mui/material";
import { useEffect, useState } from "react";

import "./App.css";

import "swiper/css";
import "swiper/css/navigation";

const initialValidations = {
  personName: [""],
};
function App() {
  const [personName, setPersonName] = useState<string[]>([]);
  const [dataEnfermadadApi, setDataEnfermadadApi] = useState<dataApi[]>([]);
  const [validations, setValidations] = useState(initialValidations);
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
        total = ((100 - totalDiscapacidad[0]) * totalDiscapacidad[1]) / 100;
      }
      if (totalDiscapacidad.length === 3) {
        const a = totalDiscapacidad[2] / 100;
        const b = 100 - totalDiscapacidad[0] + totalDiscapacidad[1];
        total = b * a;
      }
      console.log(totalDiscapacidad, total);
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

  const handleChangeMultiple = (
    event: SelectChangeEvent<typeof personName>
  ) => {
    const {
      target: { value },
    } = event;
    const valorEnfermedad =
      typeof value === "string" ? value.split(",") : value;

    const entidad = valorEnfermedad.map((a) => entidadFusionada.get(a));
    setDataEnfermadadApi([...entidad]);

    setPersonName(typeof value === "string" ? value.split(",") : value);
  };

  const handleBlurMultiple = () => {
    if (personName.length === 0) {
      setValidations((v) => {
        return { ...v, personName: [Error.PERSONNAMEVACIO] };
      });
    } else if (personName.length > 3) {
      setValidations((v) => {
        return { ...v, personName: [Error.PERSONNAME] };
      });
    } else if (
      validations.personName[0] === Error.PERSONNAME ||
      personName.length <= 3
    ) {
      setValidations((v) => {
        return { ...v, personName: personName };
      });
    }
  };

  const isValide = personName.length <= 3;

  useEffect(() => {
    if (totalDiscapacidad.length > 0) {
      handleFormulaDiscapacidad();
      setIsVisibleResult(false);
    }
  }, [totalDiscapacidad]);

  useEffect(() => {
    console.log(formulaDiscapacidad);
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
        alert={validations.personName}
        blur={handleBlurMultiple}
      />

      {isTwo.length < 2 && formulaDiscapacidad > 0 && personName.length < 4 && (
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

      {isTwo.length >= 2 && (
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
