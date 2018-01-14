import { PropostaMedicamento } from './../../providers/proposta-medicamento/proposta-medicamento';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { PropostaAtualProvider, PropostaAtual } from '../../providers/proposta-atual/proposta-atual';


@IonicPage()
@Component({
  selector: 'page-exibir-rentabilidade',
  templateUrl: 'exibir-rentabilidade.html',
})
export class ExibirRentabilidadePage {
  propostaAtual: PropostaAtual;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private propostaAtualProvider: PropostaAtualProvider) {
    this.propostaAtual = new PropostaAtual();
    this.propostaAtual.medicamentoProposta = new PropostaMedicamento();
    this.propostaAtual.medicamentoProposta.medicamentosLaboratorios = [];
  }

  ionViewDidLoad() {
    this.getProposta();
  }
  getProposta() {
    this.propostaAtualProvider.get()
      .then((result) => {
        this.propostaAtual = result;
        if (this.propostaAtual == null)
        {
          this.propostaAtual = new PropostaAtual();
          this.propostaAtual.medicamentoProposta = new PropostaMedicamento();
          this.propostaAtual.medicamentoProposta.medicamentosLaboratorios = [];
        }
        else 
        {
          if (this.propostaAtual.medicamentoProposta == null)
          {
            this.propostaAtual.medicamentoProposta = new PropostaMedicamento();
            this.propostaAtual.medicamentoProposta.medicamentosLaboratorios = [];
          }
          else {
            if (this.propostaAtual.medicamentoProposta.medicamentosLaboratorios == null)
            {
              this.propostaAtual.medicamentoProposta.medicamentosLaboratorios = [];
            }
          }
        }
        
        console.log(this.propostaAtual);
      })
      .catch((e) => console.error(e));
    ;
  }

  realizarComparativo() {
    this.navCtrl.setRoot('RealizarComparativoPage', {}, {animate: true, direction: 'forward'});
    
  }
  selecionarProduto() {
    this.navCtrl.setRoot('SelecionarProdutoPage', {}, {animate: true, direction: 'forward'});    
  }

  irGraf() {
    this.navCtrl.setRoot('GraficoRentabilidadeAnualPage', {proposta: this.propostaAtual}, {animate: true, direction: 'forward'});    
  }

  selecionarClinica(){
    this.navCtrl.setRoot('SelecionarClinicaPage', {}, {animate: true, direction: 'forward'});    
  }
}

