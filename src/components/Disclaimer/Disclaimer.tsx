import { Alert } from "@mui/material";
import React from "react";

const Disclaimer: React.FC = () => (
  <div className="discleimer">
    <h3>Simulador Disminución de la capacidad laboral</h3>
    <Alert variant="outlined" severity="info">
      Este simulador es un software que tiene la capacidad de calcular cuanta
      pérdida de capacidad laboral genera una o varias patologías o lesiones, es
      meramente indicativo y en ningún momento reemplaza el conocimiento,
      criterio y experiencia de un médico especializado en medicina laboral.
    </Alert>
  </div>
);

export default Disclaimer;
