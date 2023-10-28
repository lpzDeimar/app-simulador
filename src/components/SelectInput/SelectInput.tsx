import React from "react";
import "./SelectInput.scss";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

type PropsInput = {
  arreglo: string[];
  titulo: string;
  funcionHandle: (event: SelectChangeEvent) => void;
  label: string;
  estado: string;
  reden?: (value: string) => React.ReactNode | undefined;
};

const SelectInput: React.FC<PropsInput> = ({
  arreglo,
  funcionHandle,
  label,
  titulo,
  estado,
  reden,
}) => {
  return (
    <FormControl className="rangee">
      <h2>{titulo}</h2>
      <InputLabel className="indez" id="demo-simple">
        {label}
      </InputLabel>
      <Select
        labelId="demo-simple"
        id="demo-simple"
        value={estado}
        label={label}
        renderValue={reden}
        onChange={funcionHandle}
      >
        {arreglo.map((e) => {
          return (
            <MenuItem key={e} value={e}>
              {e}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

export default SelectInput;
