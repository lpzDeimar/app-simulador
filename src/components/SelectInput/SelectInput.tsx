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
  alert: string;
  className?: string;
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
  alert,
  className,
  blur,
  disableSend,
}) => {
  return (
    <FormControl className={`${className} rangee`}>
      <InputLabel className="index" id="demo-simple">
        {titulo}
      </InputLabel>
      <Select
        className={
          alert === estado
            ? "success"
            : alert === Contact.ABOGADO
            ? "warning"
            : "error"
        }
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

      {alert !== estado && (
        <Alert severity={alert === Contact.ABOGADO ? "warning" : "error"}>
          {alert}
        </Alert>
      )}
    </FormControl>
  );
};

export default SelectInput;
