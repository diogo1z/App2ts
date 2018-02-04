import { PropostaAtual, PropostaAtualProvider } from './../../providers/proposta-atual/proposta-atual';
import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { ClinicaProvider,  Clinica } from '../../providers/clinica/clinica';
import { LoadingController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-selecionar-clinica',
  templateUrl: 'selecionar-clinica.html',
})
export class SelecionarClinicaPage {
  clinicas: Clinica[];
  textoBuscaClinica: string = null;
  propostaAtual: PropostaAtual;
  nomeClinica;
  constructor(public navCtrl: NavController, 
    private clinicasProvider: ClinicaProvider, private propostaAtualProvider: PropostaAtualProvider,
    public loading: LoadingController) { }

  ionViewDidLoad() {
    this.getProposta();    
    let loader = this.loading.create({
      content: 'Carregando as clínicas...',
    });
  
    loader.present().then(() => {
      this.getAllClinicas();
      loader.dismiss();
    });
  }

  getAllClinicas() {
    this.clinicasProvider.getAll()
      .then((result) => {
        this.clinicas = result;        
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
      })
      .catch((e) => console.error(e));
  }

  getAllClinicasPorNome() {
    this.clinicasProvider.getAllPorNome(this.textoBuscaClinica)
      .then((result) => {
        this.clinicas = result;
      })
      .catch((e) => console.error(e));
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
    let loader = this.loading.create({
      content: 'Gravando a clínica...',
    });
    loader.present().then(() => {
      if (status) {
        this.clinicas.forEach(x => {
          if (x.nome !== nome) {
            x.selecionado = false;
          }
          else {
            this.propostaAtual.clinica = x;
            this.nomeClinica = x.nome;
            this.propostaAtualProvider.update(this.propostaAtual);
          }
        });
      }
      loader.dismiss();
    });

    
  }
}
