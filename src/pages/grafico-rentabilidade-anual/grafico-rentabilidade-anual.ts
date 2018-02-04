import * as HighCharts from 'highcharts';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PropostaAtualProvider } from '../../providers/proposta-atual/proposta-atual';

@IonicPage()
@Component({
  selector: 'page-grafico-rentabilidade-anual',
  templateUrl: 'grafico-rentabilidade-anual.html',
})
export class GraficoRentabilidadeAnualPage {

  nomes = [];
  anuais = [];
  mensais = [];
  nomeClinica;
  myChart;
  constructor(public navCtrl: NavController, public navParams: NavParams, private propostaAtualProvider: PropostaAtualProvider) {
    this.getProposta();
  }

  ionViewDidLoad() {
    this.myChart = HighCharts.chart('container', {
      chart: {
        type: 'column'
      },
      title: {
        text: ''
      },
      xAxis: {
        categories: this.nomes,//['CABAZRED', 'SANOFI-AVENTIS', 'EUROFARMA']
        fontSize: "20px"
      },
      yAxis: {
        title: {
          text: 'Margem anual'
        }
      },
      series: [{
        name: 'Mês',
        data: this.mensais, //[2000, 1500, 1200]        
        dataLabels: {
          enabled: true,
          rotation: -90,
          color: '#FFFFFF',
          align: 'right',
          format: 'Mensal R${point.y:.2f}', // one decimal
          y: 10, // 10 pixels down from the top
          style: {
            fontSize: '13px',
            fontFamily: 'Verdana, sans-serif'
          }
        }
      }, {
        name: 'Ano',
        data: this.anuais,//[300, 200, 100]
        dataLabels: {
          enabled: true,
          rotation: -90,
          color: '#FFFFFF',
          align: 'right',
          format: 'Anual R${point.y:.2f}', // one decimal
          y: 10, // 10 pixels down from the top
          style: {
            fontSize: '13px',
            fontFamily: 'Verdana, sans-serif'
          }
        }
      }]
    });
  }
  getProposta() {
    this.propostaAtualProvider.get()
      .then((result) => {
        this.nomeClinica = result.clinica.nome;
        result.itens.forEach(med => {
          this.nomes.push(med.medicamentoProposta.nome + " Margem anual R$" +
            Math.round(med.medicamentoProposta.rentabilidadeAnual));
          this.anuais.push(med.medicamentoProposta.rentabilidadeAnual);
          this.mensais.push(med.medicamentoProposta.rentabilidadeMensal);
          med.medicamentoProposta.medicamentosLaboratorios.forEach(x => {
            this.nomes.push(x.nome + " Margem anual R$" +
              Math.round(x.rentabilidadeAnual));
            this.anuais.push(x.rentabilidadeAnual);
            this.mensais.push(x.rentabilidadeMensal);
          });
        });        
        this.myChart = HighCharts.chart('container', {
          chart: {
            type: 'column'
          },
          title: {
            text: ''
          },
          xAxis: {
            categories: this.nomes//['CABAZRED', 'SANOFI-AVENTIS', 'EUROFARMA']
          },
          yAxis: {
            title: {
              text: 'Margem anual'
            }
          },
          series: [{
            name: 'Mês',
            data: this.mensais, //[2000, 1500, 1200]        
            dataLabels: {
              enabled: true,
              rotation: -90,
              color: '#FFFFFF',
              align: 'right',
              format: 'Mensal R${point.y:.2f}', // one decimal
              y: 2, // 10 pixels down from the top
              style: {
                fontSize: '11px'
              }
            }
          }, {
            name: 'Ano',
            data: this.anuais,//[300, 200, 100]
            dataLabels: {
              enabled: true,
              rotation: -90,
              color: '#FFFFFF',
              align: 'right',
              format: 'Anual R${point.y:.2f}', // one decimal
              y: 2, // 10 pixels down from the top
              style: {
                fontSize: '11px'
              }
            }
          }]
        });
      })
      .catch((e) => console.error(e));
  }

  selecionarProduto() {
    this.navCtrl.setRoot('SelecionarProdutoPage', {}, { animate: true, direction: 'forward' });
  }

  irGraf() {
    this.navCtrl.setRoot('GraficoRentabilidadeAnualPage', {}, { animate: true, direction: 'forward' });
  }

  selecionarClinica() {
    this.navCtrl.setRoot('SelecionarClinicaPage', {}, { animate: true, direction: 'forward' });
  }

  irExibirProp() {
    this.navCtrl.setRoot('ExibirPropostaPage', {}, { animate: true, direction: 'forward' });
  }

  voltarParaRentabilidade() {
    this.navCtrl.setRoot('ExibirRentabilidadePage', {}, { animate: true, direction: 'forward' });
  }
}