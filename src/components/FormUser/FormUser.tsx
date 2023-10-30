import {
  edades,
  gradoLesion,
  juntasTribunales,
  lesionesCalificadas,
} from "@/api/data";
import { Contact, Error } from "@/models/InfoAlert";
import { Button, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { SelectChangeEvent } from "@mui/material/Select";
import * as React from "react";
import Discleimer from "../Discleimer/Discleimer";
import MultipleSelectChip from "../MultipleSelect/MultipleSelect";
import SelectInput from "../SelectInput/SelectInput";
import "./FormUser.scss";

const FormUser: React.FC = () => {
  const [age, setAge] = React.useState("");
  const handleAge = (event: SelectChangeEvent) => {
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

  const [personName, setPersonName] = React.useState<string[]>([]);

  const handleChangeMultiple = (
    event: SelectChangeEvent<typeof personName>
  ) => {
    const {
      target: { value },
    } = event;

    setPersonName(typeof value === "string" ? value.split(",") : value);
  };

  const initialValidations = {
    ageV: "",
    disease: "",
    gradoL: "",
    juntas: "",
    personName: [""],
  };

  const [validations, setValidations] = React.useState(initialValidations);

  React.useEffect(() => {
    if (age.length < 1) {
      setValidations((v) => {
        return { ...v, ageV: Error.AGE };
      });
    } else if (validations.ageV === Error.AGE) {
      setValidations((v) => {
        return { ...v, ageV: age };
      });
    }

    if (disease.length < 1) {
      setValidations((v) => {
        return { ...v, disease: Error.DISEASE };
      });
    } else if (validations.disease === Error.DISEASE) {
      setValidations((v) => {
        return { ...v, disease: disease };
      });
    }

    if (disease === lesionesCalificadas[2]) {
      setValidations((v) => {
        return {
          ...v,
          disease: Contact.ABOGADO,
        };
      });
    } else if (validations.disease === Contact.ABOGADO) {
      setValidations((v) => {
        return { ...v, disease: disease };
      });
    }

    if (gradoL.length < 1) {
      setValidations((v) => {
        return {
          ...v,
          gradoL: Error.GRADOL,
        };
      });
    } else if (validations.gradoL === Error.GRADOL) {
      setValidations((v) => {
        return { ...v, gradoL: gradoL };
      });
    }

    if (juntas.length < 1) {
      setValidations((v) => {
        return {
          ...v,
          juntas: Error.JUNTAS,
        };
      });
    } else if (validations.juntas === Error.JUNTAS) {
      setValidations((v) => {
        return { ...v, juntas: juntas };
      });
    }

    if (juntas === juntasTribunales[2]) {
      setValidations((v) => {
        return {
          ...v,
          juntas: Contact.ABOGADO,
        };
      });
    } else if (validations.juntas === Contact.ABOGADO) {
      setValidations((v) => {
        return { ...v, juntas: juntas };
      });
    }

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
  }, [age, disease, gradoL, juntas, personName]);

  const handleValidations = () => {
    console.log(age, disease, gradoL, juntas, validations);
  };

  return (
    <article className="container">
      <Typography variant="h1" component="h1">
        Calculadora
      </Typography>
      <Box sx={{ minWidth: 120 }} className={"formuser"}>
        <Discleimer />
        <SelectInput
          arreglo={edades}
          funcionHandle={handleAge}
          label="Edad"
          titulo="Rango de edad*"
          estado={age}
          alert={validations.ageV}
        />
        <SelectInput
          arreglo={lesionesCalificadas}
          funcionHandle={handleChanged}
          label="lesion"
          titulo="¿Cuantas lesiones van a ser calificadas?*"
          estado={disease}
          alert={validations.disease}
        />
        <SelectInput
          arreglo={gradoLesion}
          funcionHandle={handleGradoLesion}
          estado={gradoL}
          label="grado"
          titulo="Grado de la lesión o enfermedad*"
          alert={validations.gradoL}
        />
        <SelectInput
          arreglo={juntasTribunales}
          funcionHandle={handleJuntas}
          label="juntas"
          estado={juntas}
          titulo="Cuántas juntas o tribunales médicos le han practicado anteriormente*"
          isTop={false}
          alert={validations.juntas}
        />
        <MultipleSelectChip
          estado={personName}
          funcHandle={handleChangeMultiple}
          alert={validations.personName}
        />
        <Button variant="outlined" onClick={handleValidations}>
          Primary
        </Button>
      </Box>
    </article>
  );
};
export default FormUser;
