import React from 'react';
import { NavLink } from 'react-router-dom';
import { Doughnut } from 'react-chartjs-2';
import axios from 'axios';
import {
  Container,
  Button
} from 'reactstrap';


class PersonGraphs extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      labels: [
        '0-20',
        '21-40',
        '41-60',
        '61-80',
        '> 80'
      ],
      datasets: [{
        data: [0, 0, 0, 0, 0],
        backgroundColor: [
          'Gainsboro',
          'LightGrey',
          'DarkGray',
          'Gray',
          'DimGray'
        ],
        hoverBackgroundColor: [
          'Gainsboro',
          'LightGrey',
          'DarkGray',
          'Gray',
          'DimGray'
        ]
      }]
    };
  }

  componentWillMount() {
    axios.get('http://localhost:4000/people?_sort=name')
      .then(res => {
        function idade(ano_aniversario, mes_aniversario, dia_aniversario) {
          var d = new Date(),
            ano_atual = d.getFullYear(),
            mes_atual = d.getMonth() + 1,
            dia_atual = d.getDate();

          ano_aniversario = +ano_aniversario;
          mes_aniversario = +mes_aniversario;
          dia_aniversario = +dia_aniversario;

          var quantos_anos = ano_atual - ano_aniversario;

          if (mes_atual < mes_aniversario || (mes_atual === mes_aniversario && dia_atual < dia_aniversario)) {
              quantos_anos--;
          }

          return quantos_anos < 0 ? 0 : quantos_anos;
        }

        var data = [0, 0, 0, 0, 0];
        res.data.forEach(personObj => {
          if (personObj.birthday) {
            var birthday = personObj.birthday.split('-');
            var age = idade(
              parseInt(birthday[0], 10),
              parseInt(birthday[1], 10),
              parseInt(birthday[2], 10)
            );

            if (age <= 20) data[0]++;
            if (age > 20 && age <= 40) data[1]++;
            if (age > 40 && age <= 60) data[2]++;
            if (age > 60 && age <= 80) data[3]++;
            if (age > 80) data[4]++;
          }
        });

        this.setState({
          datasets: [{data}]
        });
      })
      .catch(error => console.error(error));
  }

  render() {
    return (
      <div className="pt-2">
        <Container>
          <Doughnut data={this.state}/>
          <NavLink to="/">
            <Button title="Return" color="primary">
              <i className="icon-arrow-back-outline"></i>
            </Button>
          </NavLink>
        </Container>
      </div>
    );
  }
}

export default PersonGraphs;