import { entidadFusionada } from "@/api/enfemedades";
import "@/components/MultipleSelect/MultipleSelect.scss";
import { Contact } from "@/models/InfoAlert";
import { Alert, InputLabel } from "@mui/material";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Theme, useTheme } from "@mui/material/styles";

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
  alert: string[];
  blur: () => void;
};
export default function MultipleSelectChip({
  estado,
  funcHandle,
}: MultipleSelectChipProps) {
  const theme = useTheme();

  return (
    <>
      {estado.length > 3 && (
        <>
          <Alert severity="warning" className="alerta-container">
            <div className="alerta">
              {Contact.ABOGADO}
              <button>
                Click aqui para contactar con un abogado de la firma
              </button>
            </div>
          </Alert>
        </>
      )}
      <article className="container__multiple__select">
        <FormControl className="multiple__select large__select">
          <InputLabel className="index" id="demo-simple">
            Seleccione la lesión o enfermedad (máximo 2)*
          </InputLabel>
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
                id={name[0]}
                value={name[0]}
                disabled={name[1].isDisable}
                style={getStyles(name[1].descripcion, estado, theme)}
              >
                {name[1].descripcion}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </article>
    </>
  );
}
