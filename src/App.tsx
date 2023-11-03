import { SelectChangeEvent } from "@mui/material";
import { useState } from "react";
import "./App.css";
import { Discleimer } from "./components/Discleimer";
import { FormUser } from "./components/FormUser";
import MultipleSelectChip from "./components/MultipleSelect/MultipleSelect";
import { Error } from "./models/InfoAlert";

function App() {
  const [perdida, setPerdida] = useState<string[]>([]);
  const [personName, setPersonName] = useState<string[]>([]);
  const handlePerdida = (valor: string) => {
    setPerdida([...perdida, valor]);
  };

  const initialValidations = {
    personName: [""],
  };

  const [validations, setValidations] = useState(initialValidations);

  const handleChangeMultiple = (
    event: SelectChangeEvent<typeof personName>
  ) => {
    const {
      target: { value },
    } = event;
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
      <article className="container__forms">
        {isValide &&
          personName.map((enfermedad) => (
            <FormUser
              key={enfermedad}
              handlePerdida={handlePerdida}
              titulo={enfermedad}
            />
          ))}
      </article>
    </div>
  );
}

export default App;
