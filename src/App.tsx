import { entidadFusionada } from "@/api/enfemedades";
import { Discleimer } from "@/components/Discleimer";
import { FormUser } from "@/components/FormUser";
import MultipleSelectChip from "@/components/MultipleSelect/MultipleSelect";
import { Error } from "@/models/InfoAlert";
import { dataApi } from "@/models/dataApi";
import { Box, SelectChangeEvent } from "@mui/material";
import { useEffect, useState } from "react";
import "./App.css";

const initialValidations = {
  personName: [""],
};
function App() {
  const [personName, setPersonName] = useState<string[]>([]);

  const [dataEnfermadadApi, setDataEnfermadadApi] = useState<dataApi[]>([]);

  const [validations, setValidations] = useState(initialValidations);

  const [totalDiscapacidad, setTotalDiscapacidad] = useState<number[]>([]);

  const [formulaDiscapacidad, setFormulaDiscapacidad] = useState(0);

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
    handleFormulaDiscapacidad();
  }, [totalDiscapacidad]);

  return (
    <div className="container-grid">
      <Discleimer />
      <MultipleSelectChip
        estado={personName}
        funcHandle={handleChangeMultiple}
        alert={validations.personName}
        blur={handleBlurMultiple}
      />

      {formulaDiscapacidad > 0 && personName.length < 4 && (
        <Box className="result">
          <p className="parrafo__result">{formulaDiscapacidad}%</p>

          <button
            disabled
            className="button__result"
            onClick={handleFormulaDiscapacidad}
          >
            Tu resultado
          </button>
        </Box>
      )}
      <article className="container__forms">
        {isValide &&
          dataEnfermadadApi.map((enfermedad) => (
            <FormUser
              key={enfermedad.indice}
              enfermedad={enfermedad}
              handleFuncTotal={handleTotalDiscapacidad}
            />
          ))}
      </article>
    </div>
  );
}

export default App;
