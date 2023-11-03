import { SelectChangeEvent } from "@mui/material";
import { useState } from "react";
import "./App.css";
import { Discleimer } from "@/components/Discleimer";
import { FormUser } from "@/components/FormUser";
import MultipleSelectChip from "@/components/MultipleSelect/MultipleSelect";
import { Error } from "@/models/InfoAlert";
import { entidadFusionada } from "@/api/enfemedades";
import { dataApi } from "@/models/dataApi";

const initialValidations = {
  personName: [""],
};
function App() {
  const [personName, setPersonName] = useState<string[]>([]);

  const [dataEnfermadadApi, setDataEnfermadadApi] = useState<dataApi[]>([]);

  const [validations, setValidations] = useState(initialValidations);

  const [totalDiscapacidad, setTotalDiscapacidad] = useState<number[]>([]);

  const handleTotalDiscapacidad = (valor: number) => {
    setTotalDiscapacidad([...totalDiscapacidad, valor]);
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
      personName.length < 3
    ) {
      setValidations((v) => {
        return { ...v, personName: personName };
      });
    }
  };

  const isValide = personName.length <= 3;

  return (
    <div className="container-grid">
      <Discleimer />
      <MultipleSelectChip
        estado={personName}
        funcHandle={handleChangeMultiple}
        alert={validations.personName}
        blur={handleBlurMultiple}
      />
      {totalDiscapacidad}
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
