import { PropostaAtualProvider, PropostaAtual, ItemProposta } from './../../providers/proposta-atual/proposta-atual';
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
  nomeClinica: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private toast: ToastController,
    private medicamentoProvider: MedicamentoProvider, private propostaAtualProvider: PropostaAtualProvider) {

  }

  ionViewDidLoad() {
    this.getAllMedicamentos();
    this.getProposta();
  }

  getProposta() {
    this.propostaAtualProvider.get()
      .then((result) => {
        this.propostaAtual = result;
        this.nomeClinica = result.clinica.clinica.nome;
        this.propostaAtual.itens = [];
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

  checkMedicamento(med) {
    console.log( med);
    if (med.selecionado) {
      console.log("gravando", med);
      console.log(this.propostaAtual);

      if (this.propostaAtual == null)
        this.propostaAtual = new PropostaAtual();

      if (this.propostaAtual.itens == null)
        this.propostaAtual.itens = [];

      var item = new ItemProposta();
      item.qtdCiclos = 1;
      item.qtdPacientes = 1;
      item.usoPorPaciente = 1;
      item.medicamento = med;
      item.medicamentoProposta = null;

      this.propostaAtual.itens.push(item);
      this.propostaAtualProvider.update(this.propostaAtual);

      console.log(this.propostaAtual);
    }
    else {
      for (var i = this.propostaAtual.itens.length - 1; i >= 0; i--) {
        if (this.propostaAtual.itens[i].medicamento.nome == med.nome) {
          this.propostaAtual.itens.splice(i, 1);
          break;
        }
      }
    }
  }
}
