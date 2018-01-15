import * as HighCharts from 'highcharts';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { PropostaAtual, PropostaAtualProvider } from '../../providers/proposta-atual/proposta-atual';

@IonicPage()
@Component({
  selector: 'page-grafico-rentabilidade-anual',
  templateUrl: 'grafico-rentabilidade-anual.html',
})
export class GraficoRentabilidadeAnualPage {
  propostaAtual: PropostaAtual;
  nomes = [];
  anuais = [];
  mensais = [];
  nomeClinica;
  myChart;
  constructor(public navCtrl: NavController, public navParams: NavParams, private toast: ToastController, private propostaAtualProvider: PropostaAtualProvider) {    
    this.propostaAtual = new PropostaAtual();
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
        categories: this.nomes//['CABAZRED', 'SANOFI-AVENTIS', 'EUROFARMA']
      },
      yAxis: {
        title: {
          text: 'Margem anual'
        }
      },
      series: [{
        name: 'Mês',
        data: this.mensais //[2000, 1500, 1200]        
      }, {
        name: 'Ano',
        data: this.anuais//[300, 200, 100]
      }]
    });
  }
  getProposta() {
    this.propostaAtualProvider.get()
      .then((result) => {
        console.log(result);
        this.propostaAtual = result;
        this.nomeClinica = result.clinica.clinica.nome;
        this.nomes.push(result.medicamentoProposta.nome + " Margem anual R$" + 
        Math.round(result.medicamentoProposta.rentabilidadeAnual));
        this.anuais.push(result.medicamentoProposta.rentabilidadeAnual);
        this.mensais.push(result.medicamentoProposta.rentabilidadeMensal);
        result.medicamentoProposta.medicamentosLaboratorios.forEach(x => {
          this.nomes.push(x.nome + " Margem anual R$" + 
          Math.round(x.rentabilidadeAnual));
          this.anuais.push(x.rentabilidadeAnual);
          this.mensais.push(x.rentabilidadeMensal);
        });
        console.log(this.nomes);
        console.log(this.myChart);
        
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
            data: this.mensais //[2000, 1500, 1200]        
          }, {
            name: 'Ano',
            data: this.anuais//[300, 200, 100]
          }]
        });
      })
      .catch((e) => console.error(e));    
  }

  carregarDados() {
    if (this.propostaAtual != null)
      if (this.propostaAtual.medicamentoProposta != null) {
        console.log("if",this.propostaAtual.medicamentoProposta.nome);
        this.nomes.push(this.propostaAtual.medicamentoProposta.nome);
        //this.anuais.push(this.propostaAtual.medicamentoProposta.rentabilidadeAnual);
        //this.mensais.push(this.propostaAtual.medicamentoProposta.rentabilidadeMensal);
        console.log(this.nomes, 'pushou');
        if (this.propostaAtual.medicamentoProposta.medicamentosLaboratorios != null)
          this.propostaAtual.medicamentoProposta.medicamentosLaboratorios.forEach(x => {
            this.nomes.push(x.nome);
            //this.anuais.push(x.rentabilidadeAnual);
            //this.mensais.push(x.rentabilidadeMensal);
          });
      }
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
}