import { PropostaAtual, PropostaAtualProvider } from './../../providers/proposta-atual/proposta-atual';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { ClinicaProvider, ClinicaList, Clinica } from '../../providers/clinica/clinica';

@IonicPage()
@Component({
  selector: 'page-selecionar-clinica',
  templateUrl: 'selecionar-clinica.html',
})
export class SelecionarClinicaPage {
  clinicas: ClinicaList[];
  textoBuscaClinica: string = null;
  propostaAtual: PropostaAtual;
  nomeClinica;
  constructor(public navCtrl: NavController, private toast: ToastController, private clinicasProvider: ClinicaProvider, private propostaAtualProvider: PropostaAtualProvider) { }

  ionViewDidLoad() {
    this.getAllClinicas();
    this.getProposta();
  }

  getAllClinicas() {
    this.clinicasProvider.getAll()
      .then((result) => {
        this.clinicas = result;
        console.log(this.clinicas);
      })
      .catch((e) => console.error(e));
    ;
  }

  getProposta() {
    this.propostaAtualProvider.get()
      .then((result) => {
        this.propostaAtual = result;
        if (result == null){
          this.propostaAtual = new PropostaAtual();
        }
        console.log(this.propostaAtual);
      })
      .catch((e) => console.error(e));
    ;
  }

  getAllClinicasPorNome() {
    this.clinicasProvider.getAllPorNome(this.textoBuscaClinica)
      .then((result) => {
        this.clinicas = result;
      })
      .catch((e) => console.error(e));;
  }

  filterClinicas(ev: any) {
    if (this.textoBuscaClinica.length > 0)
      this.getAllClinicasPorNome();
    else
      this.getAllClinicas();
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

  checkClinica(nome, status) {
    if (status) {
      this.clinicas.forEach(x => {
        if (x.clinica.nome !== nome) {
          x.clinica.selecionado = false;
        }
        else {
          this.propostaAtual.clinica = x;
          this.nomeClinica = x.clinica.nome;
          this.propostaAtualProvider.update(this.propostaAtual);
        }
      });
    }
  }
}
