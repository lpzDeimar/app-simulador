import {
  edades,
  gradoLesion,
  gradoLesionDosOpciones,
  juntasTribunales,
  tabla,
} from "@/api/data";
import { Error } from "@/models/InfoAlert";
import { dataApi } from "@/models/dataApi";
import { Alert, Button, Slider } from "@mui/material";
import Box from "@mui/material/Box";
import { SelectChangeEvent } from "@mui/material/Select";
import * as React from "react";
import SelectInput from "../SelectInput/SelectInput";
import "./FormUser.scss";

type formType = {
  enfermedad: dataApi;
  handleFuncTotal: (valor: number, initial?: boolean) => void;
};

const initialValidations = {
  ageV: "",
  gradoL: "",
  juntas: "",
  porcentaje: "",
};

const FormUser: React.FC<formType> = ({ enfermedad, handleFuncTotal }) => {
  const [age, setAge] = React.useState("");
  const handleAge = (event: SelectChangeEvent) => {
    validateAge();
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

  const handlePorcentaje = (value: number) => {
    setPorcentaje(`${value}%`);
    return `${value}%`;
  };

  const [disable, setDisable] = React.useState(false);
  const [valorDiscapacidad, setValorDiscapacidad] = React.useState<number>(0);
  const handleValorDicapacidad = (valor: number) => {
    setValorDiscapacidad(valor);
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

  const handleDisable = () => {
    if (juntas === juntasTribunales[0] && porcentaje.length > 1) {
      const valorPorcentaje = porcentaje.split("%");
      const valorPorcentajeDiscapacidad = Number.parseInt(valorPorcentaje[0]);
      handleValorDicapacidad(valorPorcentajeDiscapacidad);
      handleFuncTotal(valorPorcentajeDiscapacidad);
      setDisable(true);
    } else {
      validateJuntas();
    }

    if (juntas === juntasTribunales[1] && age.length > 1 && gradoL.length > 1) {
      let indiceDiscapacidad: number = 0;
      const pocisionTablaEdad = edades.indexOf(age);
      const tablaPocisionIndicada = tabla[pocisionTablaEdad];

      if (enfermedad.indiceLesion.length > 2) {
        if (gradoL === gradoLesion[0]) {
          indiceDiscapacidad = enfermedad.indiceLesion[0] - 1;
        } else if (gradoL === gradoLesion[1]) {
          indiceDiscapacidad = enfermedad.indiceLesion[1] - 1;
        } else {
          indiceDiscapacidad = enfermedad.indiceLesion[2] - 1;
        }
      } else if (enfermedad.indiceLesion.length > 1) {
        if (gradoL === gradoLesion[0]) {
          indiceDiscapacidad = enfermedad.indiceLesion[0] - 1;
        } else if (gradoL === gradoLesion[1]) {
          indiceDiscapacidad = enfermedad.indiceLesion[1] - 1;
        } else {
          indiceDiscapacidad = enfermedad.indiceLesion[1] - 1;
        }
      } else {
        indiceDiscapacidad = enfermedad.indiceLesion[0] - 1;
      }
      setDisable(true);
      handleValorDicapacidad(tablaPocisionIndicada[indiceDiscapacidad]);
      handleFuncTotal(tablaPocisionIndicada[indiceDiscapacidad]);
    } else {
      validateJuntas();
      validateAge();
      validateGradoL();
    }
  };

  const handleActive = () => {
    setDisable(false);
    handleFuncTotal(valorDiscapacidad, true);
    setValorDiscapacidad(0);
  };
  return (
    <article className="form">
      <h4 className="title">{enfermedad.descripcion}</h4>
      {!disable ? (
        <Box sx={{ minWidth: 120 }} className={"content"}>
          <SelectInput
            className="large__input"
            disableSend={disable}
            blur={validateJuntas}
            arreglo={juntasTribunales}
            funcionHandle={handleJuntas}
            label="juntas"
            estado={juntas}
            titulo="a tenido tribunales o un médicos le han practicado anteriormente*"
            alert={validations.juntas}
          />
          {juntas === juntasTribunales[0] && (
            <>
              <label>Porcentaje dado por el tribunal o medico</label>
              <Slider
                aria-label="Temperature"
                defaultValue={30}
                getAriaValueText={handlePorcentaje}
                valueLabelDisplay="auto"
                step={1}
                marks
                min={0}
                max={100}
              />
            </>
          )}

          {juntas === juntasTribunales[1] && (
            <div className="grouped__selects">
              <SelectInput
                className="small__select"
                disableSend={disable}
                blur={validateGradoL}
                arreglo={
                  enfermedad.indiceLesion.length > 2
                    ? gradoLesion
                    : gradoLesionDosOpciones
                }
                funcionHandle={handleGradoLesion}
                estado={gradoL}
                label="grado"
                titulo="Grado de la lesión o enfermedad*"
                alert={validations.gradoL}
              />
              <SelectInput
                className="small__select"
                disableSend={disable}
                blur={validateAge}
                arreglo={edades}
                funcionHandle={handleAge}
                label="Edad"
                titulo="Rango de edad*"
                estado={age}
                alert={validations.ageV}
              />
            </div>
          )}
        </Box>
      ) : (
        <Alert variant="filled" severity="success">
          Enviado correctamente
        </Alert>
      )}

      <div className="groups__buttons">
        <Button variant="text" onClick={handleActive}>
          Editar
        </Button>
        <Button
          variant="contained"
          color="success"
          onClick={handleDisable}
          disabled={disable}
        >
          Enviar
        </Button>
      </div>
    </article>
  );
};
export default FormUser;
