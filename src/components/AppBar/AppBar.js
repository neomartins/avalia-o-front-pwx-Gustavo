import React, { PropTypes } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Header from './Header';
import Person from '../person/Person';
import ThemeDefault from '../../theme-default';
import BaseComponent from '../BaseComponent';

class AppBar extends BaseComponent {

  constructor(props) {
    super(props);
  }


  render() {
    const styles = {
      header: {
        paddingLeft: 0
      },
      container: {
        margin: '80px 20px 20px 15px',
        paddingLeft:  0
      }
    };



    return (
      <MuiThemeProvider muiTheme={ThemeDefault}>
        <div>
          <Header/>

            <div style={styles.container}>
              <Person/>
            </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

AppBar.propTypes = {
  children: PropTypes.element,
  width: PropTypes.number
};

export default (AppBar);