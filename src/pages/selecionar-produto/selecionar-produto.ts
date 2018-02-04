import { PropostaAtualProvider, PropostaAtual, ItemProposta } from './../../providers/proposta-atual/proposta-atual';
import { MedicamentoProvider, MedicamentoList } from './../../providers/medicamento/medicamento';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';

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
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private medicamentoProvider: MedicamentoProvider, private propostaAtualProvider: PropostaAtualProvider,
    public loading: LoadingController) {

  }

  ionViewDidLoad() {
    this.getProposta();
    let loader = this.loading.create({
      content: 'Carregando os produtos...',
    });
  
    loader.present().then(() => {
      this.getAllMedicamentos();
      loader.dismiss();
    });
    
    
  }

  getProposta() {
    this.propostaAtualProvider.get()
      .then((result) => {
        this.propostaAtual = result;
        if (result.clinica == null)
          this.nomeClinica = "";
        else 
          this.nomeClinica = result.clinica.nome;

        this.propostaAtual.itens = [];        
      })
      .catch((e) => console.error(e));    
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
    let loader = this.loading.create({
      content: 'Gravando produto...',
    });
  
    loader.present().then(() => {
      if (med.selecionado) {
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
      }
      else {
        for (var i = this.propostaAtual.itens.length - 1; i >= 0; i--) {
          if (this.propostaAtual.itens[i].medicamento.nome == med.nome) {
            this.propostaAtual.itens.splice(i, 1);
            break;
          }
        }
      }
      loader.dismiss();
    });    
    
  }
}
