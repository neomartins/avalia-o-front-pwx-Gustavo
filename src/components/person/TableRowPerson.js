import React from 'react';
import {
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

import BaseComponent from '../BaseComponent';
import FlatButton from 'material-ui/FlatButton';
import ContentCreate from 'material-ui/svg-icons/content/create';
import ActionDeleteForever from 'material-ui/svg-icons/action/delete-forever';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as personAction from '../../actions/personActions';
import EditPerson from './EditPerson';

class TableRowPerson extends BaseComponent {

constructor(props) {
    super(props)
    this.state = {
      open : false,
      openNewPerson: false,
      personList : '',
    };
    this._bind('handleOpenDialog','handleCloseDialog', 'renderViewPerson','deletePerson');
  }

  handleOpenDialog(){
    this.setState({open: true});
  };
  handleCloseDialog(){
    this.setState({open: false});
  };

  deletePerson(){
    let self = this;
    self.props.actions.deletePerson(self.props.person.id);
  }
    

 renderViewPerson() {
      return(<div>
              <FlatButton label="EDIT" primary={true} icon={<ContentCreate />}
                onClick={this.handleOpenDialog}/>
              <FlatButton label="DELETE" primary={true} icon={<ActionDeleteForever />}
                onClick={this.deletePerson}/>
                <EditPerson personList = {this.props.personList} person={this.props.person}  open={this.state.open} handleCloseDialog={this.handleCloseDialog} />
            </div>);   
  }
  
  render() {

        return   <TableRow key={this.props.person.id}>
                    <TableRowColumn style={{width: '10px'}}>{this.props.person.id}</TableRowColumn>
                    <TableRowColumn style={{width: '100px', whiteSpace: 'normal', textOverflow:'clip'}}>{this.props.person.nome}</TableRowColumn>
                    <TableRowColumn style={{whiteSpace: 'normal', textOverflow:'clip'}}>{this.props.person.sobrenome}</TableRowColumn>
                    <TableRowColumn style={{whiteSpace: 'normal', textOverflow:'clip'}}>{this.props.person.email}</TableRowColumn>
                    <TableRowColumn style={{width: '100px'}}>{this.props.person.cpf}</TableRowColumn>
                    <TableRowColumn style={{width: '100px'}}>{this.props.person.DataNascimento}</TableRowColumn>
                    <TableRowColumn>{this.renderViewPerson()}</TableRowColumn>
                  </TableRow>
  }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(personAction, dispatch),
    };
}

export default connect(null, mapDispatchToProps)(TableRowPerson);
