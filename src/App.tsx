import { Swiper, SwiperSlide } from "swiper/react";
import { entidadFusionada } from "@/api/enfemedades";
import { Disclaimer } from "@/components/Disclaimer";
import { FormUser } from "@/components/FormUser";
import MultipleSelectChip from "@/components/MultipleSelect/MultipleSelect";
import { Contact, Error } from "@/models/InfoAlert";
import { dataApi } from "@/models/dataApi";
import { Alert, Box, SelectChangeEvent } from "@mui/material";
import { useEffect, useState } from "react";

import "./App.css";

import "swiper/css";
import "swiper/css/navigation";

import { Navigation } from "swiper/modules";

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
    handleFormulaDiscapacidad();
  }, [totalDiscapacidad]);

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
      {isTwo.length >= 2 && <Alert severity="warning">{Contact.ABOGADO}</Alert>}
      <>
        <Swiper
          allowTouchMove={false}
          navigation={true}
          modules={[Navigation]}
          className="mySwiper"
          slidesPerView={1}
          preventClicks={false}
          preventClicksPropagation={false}
        >
          {isValide &&
            dataEnfermadadApi.map((enfermedad) => (
              <SwiperSlide>
                <div className="slider__item">
                  <FormUser
                    handleValidacionDosJuntasAlert={
                      handleValidacionDosJuntasAlert
                    }
                    key={enfermedad.indice}
                    enfermedad={enfermedad}
                    handleFuncTotal={handleTotalDiscapacidad}
                  />
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </>
    </div>
  );
}

export default App;
