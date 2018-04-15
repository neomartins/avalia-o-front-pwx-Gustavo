import React from 'react'
import FusionCharts from 'fusioncharts';
import Charts from 'fusioncharts/fusioncharts.charts';
import ReactFC from 'react-fusioncharts';
import BaseComponent from '../BaseComponent';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

Charts(FusionCharts);

const chartConfigs = {
  type: 'column2d',
  width: 600,
  height: 400,
  dataFormat: 'json',
  dataSource: '',
};
const customContentStyle = {
     width: '50%',
     maxWidth: 'none',
     overflowY: 'auto',
  };

class PersonGraph extends BaseComponent {
constructor(props) {
    super(props)
    this._bind('handleCloseSnack');
  }

componentWillReceiveProps(nextProps) {
  let self = this;
    if (nextProps.person !== undefined && !nextProps.person.userFail) {
      var personData = {
          chart: {
            caption: 'Person Graph',
            subCaption: 'distribution chart of persons by age',
                 },
          data: [
           
          ],
        };
        nextProps.person.person.sort((a,b) => new Date(b.DataNascimento) - new Date(a.DataNascimento));
        nextProps.person.person.map( p => {

        var data = {
          label: '',
          value: '',
        };

        var mdate = p.DataNascimento;
        var yearThen = parseInt(mdate.substring(0,4), 10);
        var monthThen = parseInt(mdate.substring(5,7), 10);
        var dayThen = parseInt(mdate.substring(8,10), 10);
        
        var today = new Date();
        var birthday = new Date(yearThen, monthThen-1, dayThen);
        
        var differenceInMilisecond = today.valueOf() - birthday.valueOf();
        
        var year_age = Math.floor(differenceInMilisecond / 31536000000);
       

          data.label =`${p.nome} ${p.sobrenome}`;
          data.value = year_age;
          personData.data.push(data);
        });
        nextProps.person.person.sort((a, b) => a.id - b.id);
        chartConfigs.dataSource = personData;
      }
  }


handleCloseSnack(){
    let self = this;
    self.setState({openSnack : false});
    this.props.handleCloseDialog();
  }
  render() {
   const actions = [
          <FlatButton label='Close' primary={false}
            keyboardFocused={false} onTouchTap={this.props.handleCloseDialog} />,
        ];
      return(<div>
               <Dialog title="Person Graph" actions={actions} autoScrollBodyContent={true} contentStyle={customContentStyle} open={this.props.open} handleClose={this.props.handleCloseDialog}>
                 <div>  
                   <ReactFC {...chartConfigs} /> 
                 </div>
               </Dialog>
            </div>
          );
  }
};


export default (PersonGraph);