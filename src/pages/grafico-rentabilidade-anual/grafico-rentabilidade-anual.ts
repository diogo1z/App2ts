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

    if (this.navParams.data.proposta) {
      console.log("veioooo.");
      this.propostaAtual = this.navParams.data.proposta
    }
    else {
      this.propostaAtual = new PropostaAtual();
      this.propostaAtual.medicamentoProposta = new PropostaMedicamento();
      this.propostaAtual.medicamentoProposta.medicamentosLaboratorios = [];
      this.getProposta();
    }
    console.log("fechou");
  }

  ionViewDidLoad() {
    console.log(this.nomes);
    console.log(this.mensais);


    //var myChart = HighCharts.chart('container', {
    let ops: any = {

      chart: {
        type: 'column'
      },
      title: {
        text: ''
      },
      xAxis: {
        categories: (function () {
          var data = [];
          data.push(this.propostaAtual.medicamentoProposta.nome);
          this.propostaAtual.medicamentoProposta.medicamentosLaboratorios.forEach(x => {
            this.data.push(x.nome);
          });
          return data;
        }()) //['CABAZRED', 'SANOFI-AVENTIS', 'EUROFARMA']
      },
      yAxis: {
        title: {
          text: 'Margem anual'
        }
      },
      series: [{
        name: 'Mês',
        data: (function () {
          var data = [];

          for (let i = 0; i <= 5; i += 1) {
            data.push({
              x: i,
              y: Math.floor(Math.random() * 10) + 0
            });
          }
          return data;
        }()),//[2000, 1500, 1200],
        title: ['s', 'a', 't']
      }, {
        name: 'Ano',
        data: (function () {
          var data = [];

          for (let i = 0; i <= 5; i += 1) {
            data.push({
              x: i,
              y: Math.floor(Math.random() * 10) + 0
            });
          }
          return data;
        }())
      }]
    };
    var myChart = HighCharts.chart('container', ops);
    console.log(myChart);
    //myChart.xAxis.categories[0].push('C');
    //myChart.series[0].data.push(1);
    //myChart.series[1].data.push(2);
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
  carregarNomes() {
    if (this.propostaAtual != null)
      if (this.propostaAtual.medicamentoProposta != null) {
        this.nomes.push(this.propostaAtual.medicamentoProposta.nome);
        if (this.propostaAtual.medicamentoProposta.medicamentosLaboratorios != null)
          this.propostaAtual.medicamentoProposta.medicamentosLaboratorios.forEach(x => {
            this.nomes.push(x.nome);
          });
      }
    return this.nomes;
  }
  carregarAnuais() {
    if (this.propostaAtual != null)
      if (this.propostaAtual.medicamentoProposta != null) {
        this.anuais.push(this.propostaAtual.medicamentoProposta.rentabilidadeAnual);
        if (this.propostaAtual.medicamentoProposta.medicamentosLaboratorios != null)
          this.propostaAtual.medicamentoProposta.medicamentosLaboratorios.forEach(x => {
            this.anuais.push(x.rentabilidadeAnual);
          });
      }
    return this.anuais;
  }
  carregarMensais() {
    if (this.propostaAtual != null)
      if (this.propostaAtual.medicamentoProposta != null) {
        this.mensais.push(this.propostaAtual.medicamentoProposta.rentabilidadeMensal);
        if (this.propostaAtual.medicamentoProposta.medicamentosLaboratorios != null)
          this.propostaAtual.medicamentoProposta.medicamentosLaboratorios.forEach(x => {
            this.mensais.push(x.rentabilidadeMensal);
          });
      }
    return this.mensais;
  }

  carregarDados() {
    if (this.propostaAtual != null)
      if (this.propostaAtual.medicamentoProposta != null) {
        console.log("if");
        this.nomes.push(this.propostaAtual.medicamentoProposta.nome);
        this.anuais.push(this.propostaAtual.medicamentoProposta.rentabilidadeAnual);
        this.mensais.push(this.propostaAtual.medicamentoProposta.rentabilidadeMensal);
        console.log(this.nomes, 'pushou');
        if (this.propostaAtual.medicamentoProposta.medicamentosLaboratorios != null)
          this.propostaAtual.medicamentoProposta.medicamentosLaboratorios.forEach(x => {
            this.nomes.push(x.nome);
            this.anuais.push(x.rentabilidadeAnual);
            this.mensais.push(x.rentabilidadeMensal);
          });
      }
  }

  realizarComparativo() {
    this.navCtrl.setRoot('RealizarComparativoPage', {}, { animate: true, direction: 'forward' });

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
