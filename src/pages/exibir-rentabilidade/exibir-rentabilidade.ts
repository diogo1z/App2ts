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
  nomeClinica;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private propostaAtualProvider: PropostaAtualProvider) {
    this.propostaAtual = new PropostaAtual();
    this.propostaAtual.itens = [];
  }

  ionViewDidLoad() {
    this.getProposta();
  }
  getProposta() {
    this.propostaAtualProvider.get()
      .then((result) => {
        this.nomeClinica = result.clinica.nome;
        this.propostaAtual = result;
        if (this.propostaAtual == null)
        {
          this.propostaAtual = new PropostaAtual();
          this.propostaAtual.itens = [];
        }
        else 
        {
          if (this.propostaAtual.itens == null)
            this.propostaAtual.itens = [];
        }
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

