import {
  edades,
  gradoLesion,
  juntasTribunales,
  lesionesCalificadas,
} from "@/api/data";
import Box from "@mui/material/Box";
import { SelectChangeEvent } from "@mui/material/Select";
import * as React from "react";
import MultipleSelectChip from "../MultipleSelect/MultipleSelect";
import Discleimer from "../Discleimer/Discleimer";
import SelectInput from "../SelectInput/SelectInput";
import "./FormUser.scss";

const FormUser: React.FC = () => {
  const [age, setAge] = React.useState("");
  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  const [disease, setDisease] = React.useState("");
  const handleChanged = (event: SelectChangeEvent) => {
    setDisease(event.target.value as string);
  };

  const [gradoL, setGradoL] = React.useState("");
  const handleGradoLesion = (event: SelectChangeEvent) => {
    setGradoL(event.target.value as string);
  };

  const [juntas, setJuntas] = React.useState("");
  const handleJuntas = (event: SelectChangeEvent) => {
    setJuntas(event.target.value as string);
  };

  return (
    <article className="container">
      <h1>Calculadora</h1>
      <Box sx={{ minWidth: 120 }} className={"formuser"}>
        <Discleimer />
        <SelectInput
          arreglo={edades}
          funcionHandle={handleChange}
          label="Edad"
          titulo="Rango de edad*"
          estado={age}
        />
        <SelectInput
          arreglo={lesionesCalificadas}
          funcionHandle={handleChanged}
          label="lesion"
          titulo="¿Cuantas lesiones van a ser calificadas?*"
          estado={disease}
        />
        <SelectInput
          arreglo={gradoLesion}
          funcionHandle={handleGradoLesion}
          estado={gradoL}
          label="grado"
          titulo="Grado de la lesión o enfermedad*"
        />
        <SelectInput
          arreglo={juntasTribunales}
          funcionHandle={handleJuntas}
          label="juntas"
          estado={juntas}
          titulo="Cuántas juntas o tribunales médicos le han practicado anteriormente*"
        />
        <MultipleSelectChip />
      </Box>
    </article>
  );
};
export default FormUser;
