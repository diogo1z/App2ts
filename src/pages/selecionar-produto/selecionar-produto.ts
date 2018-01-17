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
  nomeClinica: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private toast: ToastController,
    private medicamentoProvider: MedicamentoProvider, private propostaAtualProvider: PropostaAtualProvider) 
    { 
      
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

  checkMedicamento(nome, status) {
    console.log(nome, status);
    if (status) {
      this.medicamentosList.forEach(x => {
        if (x.medicamento.nome !== nome) {
          x.medicamento.selecionado = false;
        }
        else {
          console.log("gravando", nome, status, x.medicamento.nome);
          console.log(this.propostaAtual);
          if (this.propostaAtual == null)
            this.propostaAtual = new PropostaAtual();
            
          if (this.propostaAtual.medicamento == null)
            this.propostaAtual.medicamento = new Medicamento();
          this.propostaAtual.medicamento = x.medicamento;
          this.propostaAtual.qtdCiclos = 1;
          this.propostaAtual.qtdPacientes = 1;
          this.propostaAtual.usoPorPaciente = 1;
          this.propostaAtualProvider.update(this.propostaAtual);
          console.log(this.propostaAtual);
        }
      });
    }
  }
}
