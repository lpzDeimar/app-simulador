import * as React from "react";
import { Theme, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { entidadFusionada } from "@/api/enfemedades";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = Array.from(entidadFusionada);

function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}
type MultipleSelectChipProps = {
  estado: string[];
  funcHandle: (event: SelectChangeEvent<string[]>) => void;
};
export default function MultipleSelectChip({
  estado,
  funcHandle,
}: MultipleSelectChipProps) {
  const theme = useTheme();

  return (
    <FormControl className="disclemer multiple__select">
      <h2>Seleccione la lesión o enfermedad (máximo 3)*</h2>
      <InputLabel id="demo-multiple-chip-label">máximo 3</InputLabel>
      <Select
        labelId="demo-multiple-chip-label"
        id="demo-multiple-chip"
        multiple
        value={estado}
        onChange={funcHandle}
        input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
        renderValue={(selected) => (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {selected.map((value) => (
              <Chip key={value} label={value} />
            ))}
          </Box>
        )}
        MenuProps={MenuProps}
      >
        {names.map((name) => (
          <MenuItem
            key={name[0]}
            value={name[1].descripcion}
            style={getStyles(name[1].descripcion, estado, theme)}
          >
            {name[1].descripcion}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
