import React from "react";
import "./SelectInput.scss";
import {
  Alert,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { Contact } from "@/models/InfoAlert";

type PropsInput = {
  arreglo: string[];
  titulo: string;
  funcionHandle: (event: SelectChangeEvent) => void;
  label: string;
  estado: string;
  reden?: (value: string) => React.ReactNode | undefined;
  isTop?: boolean;
  alert: string;
  classcss?: string;
  blur: () => void;
  disableSend: boolean;
};

const SelectInput: React.FC<PropsInput> = ({
  arreglo,
  funcionHandle,
  label,
  titulo,
  estado,
  reden,
  isTop = true,
  alert,
  classcss,
  blur,
  disableSend,
}) => {
  const estilos = `${classcss} rangee`;
  return (
    <FormControl className={estilos}>
      <h2 className={isTop ? "top25" : "top35"}>{titulo}</h2>
      <InputLabel id="demo-simple">{label}</InputLabel>
      <Select
        className="indez"
        disabled={disableSend}
        labelId="demo-simple"
        id="demo-simple"
        value={estado}
        label={label}
        renderValue={reden}
        onChange={funcionHandle}
        onFocus={blur}
      >
        {arreglo.map((e) => (
          <MenuItem key={e} value={e}>
            {e}
          </MenuItem>
        ))}
      </Select>
      <Alert
        severity={
          alert === estado
            ? "success"
            : alert === Contact.ABOGADO
            ? "warning"
            : "error"
        }
      >
        {alert}
      </Alert>
    </FormControl>
  );
};

export default SelectInput;
