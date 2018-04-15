import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {teal300, grey900} from 'material-ui/styles/colors';

const themeDefault = getMuiTheme({
  palette: {
  },
  appBar: {
    height: 57,
    color: teal300
  },
  drawer: {
    width: 230,
    color: grey900
  },
  raisedButton: {
    primaryColor: teal300,
  }
});


export default themeDefault;
