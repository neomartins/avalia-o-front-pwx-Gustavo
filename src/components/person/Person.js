import React from 'react'
import PersonOverview from './PersonOverview';
import BaseComponent from '../BaseComponent';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Paper from 'material-ui/Paper';
import ContentAddCircleOutline from 'material-ui/svg-icons/content/add-circle-outline';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import * as personAction from '../../actions/personActions';
import NewPerson from './NewPerson';
import PersonGraph from './PersonGraph';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import Clone from 'clone';

class Person extends BaseComponent {
constructor(props) {
    super(props)
    this.state = {
     person : [],
     personList: [],
     openNewPerson: false,
     openPersonGraph: false,
     searchType: 'Name',
     searchText: "Search by name",
    };
    this._bind('handleOpenNewPerson', 'handleCloseNewPerson','onChangeSearch','handleOpenPersonGraph',
      'handleCloseersonGraph','changeSearchType');
  }

  componentWillMount(){
    this.setState({personList : Clone(this.props.actions.getPerson())});
  };

componentWillReceiveProps(nextProps) {
    if(nextProps.person !== undefined && (nextProps.person.deleted ||
      nextProps.person.updated || nextProps.person.inserted)){
       this.setState({personList : Clone(nextProps.person)});
    }
    if (nextProps.person !== undefined) {
        this.setState({person : nextProps.person, load: false});
      }
  }

  changeSearchType = (event, index, value) => {
    this.setState({searchType: value, searchText: `Search by ${value}` });
  }
  onChangeSearch = (e) => {
    let self = this;
    if(this.state.searchType === 'Name'){
      self.props.actions.searchPerson(this.state.personList.person.filter((result) => result!= undefined && result !=undefined &&  result.nome.toString().startsWith(e.target.value)));
    }else if(this.state.searchType === 'CPF'){
      var search = e.target.value.replace(/[^\d]/g,"")
      self.props.actions.searchPerson(this.state.personList.person.filter((result) => result!= undefined && result !=undefined &&  result.cpf.toString().startsWith(search)));
    }else if(this.state.searchType === 'Date of birth'){
self.props.actions.searchPerson(this.state.personList.person.filter((result) => result!= undefined && result !=undefined &&  result.DataNascimento.toString().startsWith(e.target.value)));
    }else if(this.state.searchType === 'E-Mail'){
      self.props.actions.searchPerson(this.state.personList.person.filter((result) => result!= undefined && result !=undefined &&  result.email.toString().startsWith(e.target.value)));
    }
   
  }
  handleOpenNewPerson(){
    this.setState({openNewPerson: true});
  }
  handleCloseNewPerson(){
    this.setState({openNewPerson: false});
  }

  handleOpenPersonGraph(){
    this.setState({openPersonGraph: true});
  }
  handleCloseersonGraph(){
    this.setState({openPersonGraph: false});
  }
  render() {
    return (
        <Paper zDepth={5}>
            <div >
              <strong style={{float:'Left', fontSize:'23px'}}>{"Person List"}</strong>
              <FlatButton style={{float:'right'}} label="NEW PERSON" primary={true} icon={<ContentAddCircleOutline />}
              onClick={this.handleOpenNewPerson}/>
              <NewPerson person = {this.props.person} open={this.state.openNewPerson} handleCloseDialog={this.handleCloseNewPerson} />
              <FlatButton style={{float:'right'}} label="PERSON GRAPH" primary={true} icon={<ContentAddCircleOutline />}
              onClick={this.handleOpenPersonGraph}/>
              <PersonGraph person = {this.props.person} open={this.state.openPersonGraph} handleCloseDialog={this.handleCloseersonGraph} />
            </div>
            <br /><br />
            <div style={{float:'right', marginTop: 0}}>
            {'Search By '}:
               <DropDownMenu  value={this.state.searchType} onChange={this.changeSearchType}>
                <MenuItem value={'Name'} primaryText="Name" />
                <MenuItem value={'CPF'} primaryText="CPF" />
                <MenuItem value={'Date of birth'} primaryText="Date of birth" />
                <MenuItem value={'E-Mail'} primaryText="E-Mail" />
              </DropDownMenu>
              <TextField
                 hintText={this.state.searchText}
                 floatingLabelText={this.state.searchText}
                 onChange={this.onChangeSearch}
                 />
            </div>
            <br /><br /><br /><br />
            <div>
              <PersonOverview person = {this.props.person} />
            </div>
        </Paper>
    )
  }
};

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(personAction, dispatch),
    };
}

function mapStateToProps(state, ownProps) {
    return {
        person: state.person,
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Person);