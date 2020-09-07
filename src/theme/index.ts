import { Theme, createMuiTheme } from '@material-ui/core/styles';
import { Palette } from '@material-ui/core/styles/createPalette';

import palette from './palette';

interface CustomPalette extends Palette {
  appBarColor: string;
}

export interface CustomTheme extends Theme {
  palette: CustomPalette;
}

export default createMuiTheme({ palette });
