import { PropostaAtualProvider } from './../../providers/proposta-atual/proposta-atual';
import { PropostaMedicamento } from './../../providers/proposta-medicamento/proposta-medicamento';
import * as HighCharts from 'highcharts';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PropostaAtual } from '../../providers/proposta-atual/proposta-atual';

@IonicPage()
@Component({
  selector: 'page-grafico-rentabilidade-anual',
  templateUrl: 'grafico-rentabilidade-anual.html',
})
export class GraficoRentabilidadeAnualPage {
  propostaAtual: PropostaAtual;
  nomes: any[] = [];
  mensais: number[] = [];
  anuais: number[] = [];
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private propostaAtualProvider: PropostaAtualProvider) {
    this.propostaAtual = new PropostaAtual();
    this.propostaAtual.medicamentoProposta = new PropostaMedicamento();
    this.propostaAtual.medicamentoProposta.medicamentosLaboratorios = [];
    
    console.log("fechou");
  }

  ionViewDidLoad() {
    console.log(this.nomes);
    console.log(this.mensais);
    this.getProposta();
    this.carregarDados();
    var myChart = HighCharts.chart('container', {
      chart: {
        type: 'column'
      },
      title: {
        text: ''
      },
      xAxis: {
        categories: this.nomes //['CABAZRED', 'SANOFI-AVENTIS', 'EUROFARMA']
      },
      yAxis: {
        title: {
          text: 'Margem anual'
        }
      },
      series: [{
        name: 'Mês',
        data: this.mensais,//[2000, 1500, 1200],
        title: ['s', 'a', 't']
      }, {
        name: 'Ano',
        data: this.mensais,//[5000, 7000, 3000]
      }]
    });
  }

  getProposta() {
    this.propostaAtualProvider.get()
      .then((result) => {
        this.propostaAtual = result;
        if (this.propostaAtual == null) {
          this.propostaAtual = new PropostaAtual();
          this.propostaAtual.medicamentoProposta = new PropostaMedicamento();
          this.propostaAtual.medicamentoProposta.medicamentosLaboratorios = [];
        }
        else {
          if (this.propostaAtual.medicamentoProposta == null) {
            this.propostaAtual.medicamentoProposta = new PropostaMedicamento();
            this.propostaAtual.medicamentoProposta.medicamentosLaboratorios = [];
          }
          else {
            if (this.propostaAtual.medicamentoProposta.medicamentosLaboratorios == null) {
              this.propostaAtual.medicamentoProposta.medicamentosLaboratorios = [];
            }
          }
        }

        console.log(this.propostaAtual);
      })
      .catch((e) => console.error(e));
  }

  carregarDados() {
    if (this.propostaAtual != null)
      if (this.propostaAtual.medicamentoProposta != null) {
        console.log("if");
        this.nomes.push(this.propostaAtual.medicamentoProposta.nome);
        this.anuais.push(this.propostaAtual.medicamentoProposta.rentabilidadeAnual);
        this.mensais.push(this.propostaAtual.medicamentoProposta.rentabilidadeMensal);
        console.log(this.nomes,'pushou');
        if (this.propostaAtual.medicamentoProposta.medicamentosLaboratorios != null)
          this.propostaAtual.medicamentoProposta.medicamentosLaboratorios.forEach(x => {
            this.nomes.push(x.nome);
            this.anuais.push(x.rentabilidadeAnual);
            this.mensais.push(x.rentabilidadeMensal);            
          });
      }
  }

  realizarComparativo() {
    this.navCtrl.setRoot('RealizarComparativoPage', {}, {animate: true, direction: 'forward'});
    
  }
  selecionarProduto() {
    this.navCtrl.setRoot('SelecionarProdutoPage', {}, {animate: true, direction: 'forward'});    
  }

  irGraf() {
    this.navCtrl.setRoot('GraficoRentabilidadeAnualPage', {}, {animate: true, direction: 'forward'});    
  }

  selecionarClinica(){
    this.navCtrl.setRoot('SelecionarClinicaPage', {}, {animate: true, direction: 'forward'});    
  }

  irExibirProp(){
    this.navCtrl.setRoot('ExibirPropostaPage', {}, {animate: true, direction: 'forward'});
  }
}
