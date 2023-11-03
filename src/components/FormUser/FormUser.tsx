import {
  arregloPorcentaje,
  edades,
  gradoLesion,
  juntasTribunales,
} from "@/api/data";
import { Error } from "@/models/InfoAlert";
import { Button, ButtonGroup } from "@mui/material";
import Box from "@mui/material/Box";
import { SelectChangeEvent } from "@mui/material/Select";
import * as React from "react";
import SelectInput from "../SelectInput/SelectInput";
import "./FormUser.scss";
import { dataApi } from "@/models/dataApi";

type formType = {
  enfermedad: dataApi;
  handleFuncTotal: (valor: number) => void;
};

const FormUser: React.FC<formType> = ({ enfermedad, handleFuncTotal }) => {
  const [age, setAge] = React.useState("");
  const handleAge = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  const [gradoL, setGradoL] = React.useState("");
  const handleGradoLesion = (event: SelectChangeEvent) => {
    setGradoL(event.target.value as string);
  };

  const [juntas, setJuntas] = React.useState("");
  const handleJuntas = (event: SelectChangeEvent) => {
    setJuntas(event.target.value as string);
  };

  const [porcentaje, setPorcentaje] = React.useState("");
  const handlePorcentaje = (event: SelectChangeEvent) => {
    setPorcentaje(event.target.value as string);
  };

  const [disable, setDisable] = React.useState(false);

  const handleActive = () => {
    setDisable(false);
  };

  const initialValidations = {
    ageV: "",
    gradoL: "",
    juntas: "",
    porcentaje: "",
  };

  const [validations, setValidations] = React.useState(initialValidations);

  const validateAge = () => {
    if (age.length < 1) {
      setValidations((v) => {
        return { ...v, ageV: Error.AGE };
      });
    } else {
      setValidations((v) => {
        return { ...v, ageV: age };
      });
    }
  };

  const validateGradoL = () => {
    if (gradoL.length < 1) {
      setValidations((v) => {
        return {
          ...v,
          gradoL: Error.GRADOL,
        };
      });
    } else {
      setValidations((v) => {
        return { ...v, gradoL: gradoL };
      });
    }
  };

  const validateJuntas = () => {
    if (juntas.length < 1) {
      setValidations((v) => {
        return {
          ...v,
          juntas: Error.JUNTAS,
        };
      });
    } else {
      setValidations((v) => {
        return { ...v, juntas: juntas };
      });
    }
  };

  const validatePorcentaje = () => {
    if (porcentaje.length < 1) {
      setValidations((v) => {
        return { ...v, porcentaje: Error.PORCENTAJE };
      });
    } else {
      setValidations((v) => {
        return { ...v, porcentaje: porcentaje };
      });
    }
  };

  const handleDisable = () => {
    if (juntas === juntasTribunales[0] && porcentaje.length > 1) {
      const valorPorcentaje = porcentaje.split("%");
      const valorPorcentajeDiscapacidad = Number.parseInt(valorPorcentaje[0]);
      handleFuncTotal(valorPorcentajeDiscapacidad);
    } else {
      validateJuntas();
      validatePorcentaje();
    }
    if (juntas === juntasTribunales[1] && age.length > 1 && gradoL.length > 1) {
    } else {
      validateJuntas();
      validateAge();
      validateGradoL();
    }
  };
  return (
    <article className="container">
      <h3>
        <span>{enfermedad.indice}</span> -{enfermedad.descripcion}
      </h3>
      <Box sx={{ minWidth: 120 }} className={"formuser"}>
        <div className="div__junta">
          <SelectInput
            disableSend={disable}
            blur={validateJuntas}
            arreglo={juntasTribunales}
            funcionHandle={handleJuntas}
            label="juntas"
            estado={juntas}
            titulo="Cuántas juntas o tribunales médicos le han practicado anteriormente*"
            isTop={false}
            alert={validations.juntas}
          />
          {juntas === juntasTribunales[0] && (
            <SelectInput
              disableSend={disable}
              blur={validatePorcentaje}
              classcss="grid-left"
              arreglo={arregloPorcentaje}
              funcionHandle={handlePorcentaje}
              label="Porcentaje"
              estado={porcentaje}
              titulo="porcentaje de disminución de capacidad laboral que va de 0 a 100%*"
              isTop={false}
              alert={validations.porcentaje}
            />
          )}
        </div>

        {juntas === juntasTribunales[1] && (
          <>
            <SelectInput
              disableSend={disable}
              blur={validateGradoL}
              arreglo={gradoLesion}
              funcionHandle={handleGradoLesion}
              estado={gradoL}
              label="grado"
              titulo="Grado de la lesión o enfermedad*"
              isTop={false}
              alert={validations.gradoL}
            />
            <SelectInput
              disableSend={disable}
              blur={validateAge}
              arreglo={edades}
              funcionHandle={handleAge}
              label="Edad"
              titulo="Rango de edad*"
              estado={age}
              alert={validations.ageV}
            />
          </>
        )}
      </Box>
      <ButtonGroup
        className="buttons"
        variant="text"
        aria-label="text button group"
      >
        <Button onClick={handleActive}>Editar</Button>
        <Button onClick={handleDisable}>Enviar</Button>
      </ButtonGroup>
    </article>
  );
};
export default FormUser;
