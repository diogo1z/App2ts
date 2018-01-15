import { DatePipe } from '@angular/common';
import { PropostaMedicamento } from './../../providers/proposta-medicamento/proposta-medicamento';
import { PropostaAtualProvider } from './../../providers/proposta-atual/proposta-atual';
import { Proposta } from './../../providers/proposta/proposta';
import { Component, LOCALE_ID } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PropostaAtual } from '../../providers/proposta-atual/proposta-atual';

@IonicPage()
@Component({
  selector: 'page-realizar-comparativo',
  templateUrl: 'realizar-comparativo.html',
})
export class RealizarComparativoPage {
  proposta: PropostaAtual;
  propostaMedicamento: PropostaMedicamento;
  nomeClinica;
  constructor(public navCtrl: NavController, public navParams: NavParams, private datePipe: DatePipe, private propostaAtualProvider: PropostaAtualProvider) {
    this.propostaMedicamento = new PropostaMedicamento();
    this.proposta = new PropostaAtual();
    this.propostaMedicamento.medicamentosLaboratorios = [];
  }

  ionViewDidLoad() {
    this.getProposta();
  }

  getProposta() {
    console.log("oi");
    this.propostaAtualProvider.get()
      .then((result) => {
        this.nomeClinica = result.clinica.clinica.nome;
        this.proposta = result;
        this.proposta.qtdCiclos = 1;
        this.proposta.qtdPacientes = 1;
        this.proposta.usoPorPaciente = 1;
        console.log(this.proposta);
        this.deParaMedicamentosEMedicamentosProposta();
        console.log("xau");
      })
      .catch((e) => console.error(e));
    ;
  }

  deParaMedicamentosEMedicamentosProposta() {
    if (this.proposta != null)
      if (this.proposta.medicamento != null) {
        console.log("if");
        console.log(this.proposta.medicamento);

        this.propostaMedicamento = new PropostaMedicamento();
        console.log(this.propostaMedicamento.nome);
        this.propostaMedicamento.nome = this.proposta.medicamento.nome;
        this.propostaMedicamento.preco = parseFloat(this.proposta.medicamento.PF0.toFixed(2));
        this.propostaMedicamento.precoDesconto =parseFloat( this.proposta.medicamento.PF0.toFixed(2));
        this.propostaMedicamento.repasse =parseFloat( this.proposta.medicamento.PF0.toFixed(2));
        //this.propostaMedicamento.PF0 = this.proposta.medicamento.PF0.toFixed(2);
        //this.propostaMedicamento.PF12 = this.proposta.medicamento.PF12.toFixed(2);
        //this.propostaMedicamento.PF17 = this.proposta.medicamento.PF17.toFixed(2);
        //this.propostaMedicamento.PF17ALC = this.proposta.medicamento.PF17ALC.toFixed(2);
        //this.propostaMedicamento.PF175 = this.proposta.medicamento.PF175.toFixed(2);
        //this.propostaMedicamento.PF175ALC = this.proposta.medicamento.PF175ALC.toFixed(2);
        //this.propostaMedicamento.PF18 = this.proposta.medicamento.PF18.toFixed(2);
        //this.propostaMedicamento.PF18ALC = this.proposta.medicamento.PF18ALC.toFixed(2);
        //this.propostaMedicamento.PF20 = this.proposta.medicamento.PF20.toFixed(2);
        this.propostaMedicamento.porcentagemRepasse = 0;
        this.propostaMedicamento.desconto = 0;
        this.propostaMedicamento.medicamentosLaboratorios = [];
        if (this.proposta.medicamento.laboratoriosMedicamento != null)
          this.proposta.medicamento.laboratoriosMedicamento.forEach(x => {
            var novaPropMed = new PropostaMedicamento();
            novaPropMed.nome = x.nome;
            novaPropMed.preco = parseFloat(x.PF0.toFixed(2));
            novaPropMed.precoDesconto = parseFloat(x.PF0.toFixed(2));
            novaPropMed.repasse = parseFloat((x.PF0.toFixed(2)));
            //novaPropMed.PF0 = x.PF0.toFixed(2);
            //novaPropMed.PF12 = x.PF12.toFixed(2);
            //novaPropMed.PF17 = x.PF17.toFixed(2);
            //novaPropMed.PF17ALC = x.PF17ALC.toFixed(2);
            //novaPropMed.PF175 = x.PF175.toFixed(2);
            //novaPropMed.PF175ALC = x.PF175ALC.toFixed(2);
            //novaPropMed.PF18 = x.PF18.toFixed(2);
            //novaPropMed.PF18ALC = x.PF18ALC.toFixed(2);
            //novaPropMed.PF20 = x.PF20.toFixed(2);
            novaPropMed.porcentagemRepasse = 0;
            novaPropMed.desconto = 0;
            this.propostaMedicamento.medicamentosLaboratorios.push(novaPropMed);
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

  calcularValor() {
    if (this.propostaMedicamento.desconto > 100) {
      this.propostaMedicamento.desconto = 100;
    }
    if (this.propostaMedicamento.desconto < 0) {
      this.propostaMedicamento.desconto = 0;
    }
    this.propostaMedicamento.precoDesconto =parseFloat(
      (this.propostaMedicamento.preco -
      (this.propostaMedicamento.preco * (0.01 * this.propostaMedicamento.desconto))).toFixed(2));
  }

  calcularRepasse() {
    if (this.propostaMedicamento.porcentagemRepasse > 100) {
      this.propostaMedicamento.porcentagemRepasse = 100;
    }
    if (this.propostaMedicamento.porcentagemRepasse < 0) {
      this.propostaMedicamento.porcentagemRepasse = 0;
    }

    this.propostaMedicamento.repasse =parseFloat(
      (this.propostaMedicamento.preco + 
        (this.propostaMedicamento.preco * (0.01 * this.propostaMedicamento.porcentagemRepasse))).toFixed(2));
  }


  calcularRepasseMedicamento(obj) {
    if (obj.porcentagemRepasse > 100)
      obj.porcentagemRepasse = 100;

    if (obj.porcentagemRepasse < 0)
      obj.porcentagemRepasse = 0;



    obj.repasse = (obj.preco +
      (obj.preco * (0.01 * obj.porcentagemRepasse))).toFixed(2);
  }

  calcularValorMedicamento(obj) {
    if (obj.desconto > 100)
      obj.desconto = 100;

    if (obj.desconto < 0)
      obj.desconto = 0;

    obj.precoDesconto =
      (obj.preco -
      (obj.preco * (0.01 * obj.desconto))).toFixed(2);
  }

  irParaRentabilidade() {

    this.propostaMedicamento.rentabilidadeUnitaria = parseFloat((this.propostaMedicamento.repasse - this.propostaMedicamento.precoDesconto).toFixed(2));

    this.propostaMedicamento.rentabilidadePorPaciente =parseFloat(
      (this.proposta.usoPorPaciente * this.propostaMedicamento.rentabilidadeUnitaria).toFixed(2));

    this.propostaMedicamento.rentabilidadeMensal =parseFloat(
      (this.propostaMedicamento.rentabilidadePorPaciente * this.proposta.qtdPacientes).toFixed(2));

    this.propostaMedicamento.rentabilidadeAnual =parseFloat(
      (this.propostaMedicamento.rentabilidadeMensal * this.proposta.qtdCiclos).toFixed(2));

    this.propostaMedicamento.medicamentosLaboratorios.forEach(x => {
      x.rentabilidadeUnitaria =parseFloat( (x.repasse - x.precoDesconto).toFixed(2));

      x.rentabilidadePorPaciente =parseFloat(
        (this.proposta.usoPorPaciente * x.rentabilidadeUnitaria).toFixed(2));

      x.rentabilidadeMensal =parseFloat( (x.rentabilidadePorPaciente * this.proposta.qtdPacientes).toFixed(2));

      x.rentabilidadeAnual =parseFloat(
        (x.rentabilidadeMensal * this.proposta.qtdCiclos).toFixed(2));
    });

    this.proposta.medicamentoProposta = this.propostaMedicamento;

    this.propostaAtualProvider.update(this.proposta);
    
    this.navCtrl.setRoot('ExibirRentabilidadePage', {}, {animate: true, direction: 'forward'});    
  }

  
}
