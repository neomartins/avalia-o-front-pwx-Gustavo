import React from "react";
import TextField from 'material-ui/TextField'; 
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import BaseComponent from '../BaseComponent';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import * as personAction from '../../actions/personActions';
import Snackbar from 'material-ui/Snackbar';
import DatePicker from 'material-ui/DatePicker';
import * as DateUtils from '../../utils/DateUtils';
import { getLastId } from '../../utils/fetchUtils';

const customContentStyle = {
     width: '50%',
     maxWidth: 'none',
     overflowY: 'auto',
  };

const collum = {
    flex: '1 1 auto',
};

class NewPerson extends BaseComponent {
  constructor(props) {
    super(props)
    const maxDate = new Date();

    this.state = {
      openSnack: false,
      email: '',
      name: '',
      lastName: '',
      cpf: '',
      nameError: '',
      lastNameError: '',
      cpfError: '',
      emailError: '',
      datetime : '',
      isValid : true,
      person : '',
      maxDate: maxDate,
    };
    this._bind('save','handleCloseSnack','changeDateTime', 'isEmail',
      'validateToSave');
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.person !== undefined && !nextProps.person.userFail) {
        this.setState({person : nextProps.person.person, load: false});
      }
  }

  save() {
    let self = this;
    
    if(self.validateToSave()){
      const personData = {
          id: (getLastId(self.props.person) + 1 ),
          nome: self.state.name,
          sobrenome: self.state.lastName,
          email: self.state.email,
          cpf: self.state.cpf,
          DataNascimento : self.state.datetime,
          DataCriação : DateUtils.parseDateString(Date.now().valueOf()),
        };
        self.props.actions.savePerson(personData);
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
    }if (self.state.cpf === '' || self.state.cpf.length <= 0){
      self.setState({cpfError: 'CPF can not be null!', isValid: false});
    }
  return isValid;
  }
  changeDateTime = (e, data) => {
    this.setState({datetime : DateUtils.parseDateString(data.valueOf())});
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

  onChangeCpf = (e) => {
    let self = this; 
    var c = e.target.value.substr(e.target.value.length -1);
      if (c >= 0 && c <= '9') {
        self.setState({cpf:  Number(e.target.value), cpfError : '', isValid : true});
    } 
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
         <Dialog title="Person" actions={actions} autoScrollBodyContent={true} contentStyle={customContentStyle} open={this.props.open} handleClose={this.props.handleCloseDialog}>
           <div>  
              <div>
                <TextField
                 value={this.state.name}
                 hintText="Name"
                 floatingLabelText="Last Name"
                 type="text" 
                 maxLength="50"
                 onChange={this.onChangePersonName}
                 errorText={this.state.nameError} />
                 <TextField
                   value={this.state.lastName}
                   hintText="Last name"
                   type="text"
                   floatingLabelText="Last Name"
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
                   value={this.state.cpf}
                   hintText="CPF"
                   type="text"
                   floatingLabelText="CPF"
                   maxLength="11"
                   onChange={this.onChangeCpf}
                   style={{paddingLeft: 25, position: 'absolute' }}
                   errorText={this.state.cpfError}/><br />
                 <br />
              </div>
              
              <div style={collum}>
                  <DatePicker
                    hintText="Date of birth"
                    DateTimeFormat={Intl.DateTimeFormat} 
                    locale='pt-BR'
                    okLabel="OK"
                    cancelLabel="Cancel"
                    maxDate={this.state.maxDate}
                    onChange={this.changeDateTime}/>
              </div>
            </div>
        <Snackbar open={this.state.openSnack} message={'User successful updated'} autoHideDuration={2000} onRequestClose={this.handleCloseSnack}/>
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

export default connect(null, mapDispatchToProps)(NewPerson)