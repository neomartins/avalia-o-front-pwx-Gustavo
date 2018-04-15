import React, {PropTypes} from 'react';
import AppBar from 'material-ui/AppBar';
import {blue600} from 'material-ui/styles/colors';
import BaseComponent from '../BaseComponent';

class Header extends BaseComponent {

constructor(props) {
    super(props)
    this.state = {
      open : false,
    };
  }

  render() {
    const {styles} = this.props;

    const style = {
      appBar: {
        position: 'fixed',
        top: 0,
        overflow: 'hidden',
        maxHeight: 57,
      backgroundColor: blue600
      },
      menuButton: {
        marginLeft: 10
      },
      iconsRightContainer: {
        marginLeft: 20
      }
    };

    return (
        <div>
            <AppBar
              style={{...styles, ...style.appBar}} />
          </div>
      );
  }
}

Header.propTypes = {
  styles: PropTypes.object,
};


export default (Header);