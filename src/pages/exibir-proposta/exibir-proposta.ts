import { Clinica, ClinicaList } from './../../providers/clinica/clinica';
import { PropostaMedicamento } from './../../providers/proposta-medicamento/proposta-medicamento';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { PropostaAtualProvider, PropostaAtual } from '../../providers/proposta-atual/proposta-atual';


@IonicPage()
@Component({
  selector: 'page-exibir-proposta',
  templateUrl: 'exibir-proposta.html',
})
export class ExibirPropostaPage {
  propostaAtual: PropostaAtual;
  constructor(public navCtrl: NavController, public navParams: NavParams, private toast: ToastController, private propostaAtualProvider: PropostaAtualProvider) {    
    this.propostaAtual = new PropostaAtual();
    this.propostaAtual.clinica = new ClinicaList();
    this.propostaAtual.clinica.clinica = new Clinica();
    this.propostaAtual.clinica.clinica.nome =  "";
    this.propostaAtual.clinica.clinica.email = "";
    this.propostaAtual.clinica.clinica.endereco = "";
    this.propostaAtual.medicamentoProposta = new PropostaMedicamento();
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
        }
        else 
        {
          if (this.propostaAtual.medicamentoProposta == null)
          {
            this.propostaAtual.medicamentoProposta = new PropostaMedicamento();            
          }
        }
      })
      .catch((e) => console.error(e));    
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
}