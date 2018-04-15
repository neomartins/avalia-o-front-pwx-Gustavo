import React from "react";
import TextField from 'material-ui/TextField'; 
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import BaseComponent from '../BaseComponent';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import * as personAction from '../../actions/personActions';
import Snackbar from 'material-ui/Snackbar';

const customContentStyle = {
     width: '50%',
     maxWidth: 'none',
     overflowY: 'auto',
  };

const collum = {
    flex: '1 1 auto',
};

class EditPerson extends BaseComponent {
  constructor(props) {
    super(props)
    this.state = {
      openSnack: false,
      email: '',
      name: '',
      lastName: '',
      cpf: '',
      nameError: '',
      lastNameError: '',
      emailError: '',
      isValid : true,
      person : '',
      title : '',
      personList: '',
    };
    this._bind('save','handleCloseSnack','isEmail',
      'validateToSave');
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.person !== undefined && !nextProps.person.userFail) {
        this.setState({person : nextProps.person, load: false,
        title: `Person: ${nextProps.person.nome}  ${nextProps.person.sobrenome}`,
        personList: nextProps.personList, name : nextProps.person.nome,
        lastName : nextProps.person.sobrenome, cpf : nextProps.person.cpf,
        email : nextProps.person.email });
      }
  }

  save() {
    let self = this;
    
    if(self.validateToSave()){
      const personData = {
          id: self.props.person.id,
          nome: self.state.name,
          sobrenome: self.state.lastName,
          email: self.state.email,
          cpf: self.props.person.cpf,
          DataNascimento : self.props.person.DataNascimento,
          DataCriação : self.props.person.DataCriação
        };
        self.props.actions.updatePerson(personData);
        self.setState({openSnack : true});
    }  
  }

  validateToSave(){
    let self = this;
    let isValid = true;
    if(!self.isEmail(self.state.email)){
      self.setState({emailError: 'Not a valid email!'});
      isValid = false;
    }if (self.state.name === '' || self.state.name.length <= 0){
      self.setState({nameError: 'Name can not be null!'});
      isValid = false;
    }if (self.state.lastName === '' || self.state.lastName.length <= 0){
      self.setState({lastNameError: 'Last name can not be null!', isValid: false});
    }
  return isValid;
  }
  
  handleCloseSnack(){
    let self = this;
    self.setState({openSnack : false});
    this.props.handleCloseDialog();
  }
  onChangePersonName = (e) => {
    let self = this;  
    self.setState({name: e.target.value, nameError : '', isValid : true});
  }

  onChangeLastName = (e) => {
    let self = this;  
    self.setState({lastName: e.target.value, lastNameError: '', isValid : true });
  }
  
  onChangeEmail = (e) => {
    let self = this;  
    self.setState({email: e.target.value, emailError: '', isValid : true });
  }

  isEmail = (email) =>{
    var regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return regex.test(email);
  }
  
  render() {
    const actions = [
          <FlatButton label='Close' primary={false}
            keyboardFocused={false} onTouchTap={this.props.handleCloseDialog} />,
            <FlatButton label='Save' primary={false}
            keyboardFocused={false} onTouchTap={this.save} />
        ];

return(<div>
         <Dialog title={this.state.title} actions={actions} autoScrollBodyContent={true} contentStyle={customContentStyle} open={this.props.open} handleClose={this.props.handleCloseDialog}>
           <div>  
              <div>
                <TextField
                 value={this.state.name}
                 hintText="Name"
                 floatingLabelText="Name"
                 type="text" 
                 maxLength="50"
                 onChange={this.onChangePersonName}
                 errorText={this.state.nameError} />
                 <TextField
                   value={this.state.lastName}
                   hintText="Last name"
                   type="text"
                   floatingLabelText="Las Name"
                   maxLength="100"
                   onChange={this.onChangeLastName}
                   style={{paddingLeft: 25, position: 'absolute' }}
                   errorText={this.state.lastNameError}/>
                 <br />
                 <br />
              </div>
             <div style={collum}>
                <TextField
                 value={this.state.email}
                 hintText="Email"
                 floatingLabelText="Email"
                 type="text" 
                 maxLength="400"
                 onChange={this.onChangeEmail}
                 errorText={this.state.emailError}/>
                 <TextField
                   value={this.props.person.cpf}
                   hintText="CPF"
                   type="text"
                   floatingLabelText="CPF"
                   maxLength="11"
                   disabled={true}
                   style={{paddingLeft: 25, position: 'absolute' }}/><br />
                 <br />
              </div>
              
              <div style={collum}>

              <TextField
                   value={this.props.person.DataNascimento}
                   hintText="Date of birth"
                   type="text"
                   floatingLabelText="Date of birth"
                   disabled={true}/>
              </div>
            </div>
        <Snackbar open={this.state.openSnack} message={'Person successful updated'} autoHideDuration={2000} onRequestClose={this.handleCloseSnack}/>
      </Dialog>
    </div>
    );

  }
}
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(personAction, dispatch),
    };
}

export default connect(null, mapDispatchToProps)(EditPerson)