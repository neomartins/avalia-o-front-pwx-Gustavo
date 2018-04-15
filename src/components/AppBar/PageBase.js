import React, {PropTypes} from 'react';
import Paper from 'material-ui/Paper';

const PageBase = (props) => {

    const {title} = props;

    return (
      <div>

        <Paper >
          <h3 >{title}</h3>
            {props.children}
          <div/>

        </Paper>
      </div>
    );
};

PageBase.propTypes = {
  title: PropTypes.string,
  navigation: PropTypes.string,
  children: PropTypes.element
};

export default PageBase;
