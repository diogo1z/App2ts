import { PropostaAtualProvider, PropostaAtual } from './../../providers/proposta-atual/proposta-atual';
import { MedicamentoProvider, Medicamento, MedicamentoList } from './../../providers/medicamento/medicamento';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-selecionar-produto',
  templateUrl: 'selecionar-produto.html',
})
export class SelecionarProdutoPage {
  medicamentosList: MedicamentoList[];
  textoBuscaMedicamento: string = null;
  propostaAtual: PropostaAtual;
  constructor(public navCtrl: NavController, public navParams: NavParams, private toast: ToastController,
    private medicamentoProvider: MedicamentoProvider, private propostaAtualProvider: PropostaAtualProvider) { }

  ionViewDidLoad() {
    this.getAllMedicamentos();
    this.getProposta();
  }

  getProposta() {
    this.propostaAtualProvider.get()
      .then((result) => {
        this.propostaAtual = result;
        console.log(this.propostaAtual);
      })
      .catch((e) => console.error(e));
    ;
  }

  getAllMedicamentos() {
    this.medicamentoProvider.getAll()
      .then((result: any[]) => {
        this.medicamentosList = result;
      });
  }

  getAllMedicamentosPorNome() {
    this.medicamentoProvider.getAllPorNome(this.textoBuscaMedicamento)
      .then((result: any[]) => {
        this.medicamentosList = result;
      });
  }

  filterMedicamentos(ev: any) {
    if (this.textoBuscaMedicamento.length > 0)
      this.getAllMedicamentosPorNome();
    else
      this.getAllMedicamentos();
  }

  realizarComparativo() {
    this.navCtrl.push('RealizarComparativoPage');
  }
  selecionarProduto() {
    this.navCtrl.push('SelecionarProdutoPage');
  }

  selecionarClinica(){
    this.navCtrl.push('SelecionarClinicaPage');
  }

  checkMedicamento(nome, status) {
    if (status) {
      this.medicamentosList.forEach(x => {
        if (x.medicamento.nome !== nome && x.medicamento.selecionado) {
          x.medicamento.selecionado = false;
        }
        else {
          console.log("gravando");
          console.log(this.propostaAtual);
          this.propostaAtual.medicamento = x.medicamento;
          this.propostaAtualProvider.update(this.propostaAtual);
          console.log(this.propostaAtual);
        }
      });
    }    
  }


}