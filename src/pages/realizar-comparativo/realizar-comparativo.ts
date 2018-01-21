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
  propostaAtual: PropostaAtual;
  nomeClinica;
  constructor(public navCtrl: NavController, public navParams: NavParams, private datePipe: DatePipe, private propostaAtualProvider: PropostaAtualProvider) {
    this.propostaAtual = new PropostaAtual();
  }

  ionViewDidLoad() {
    this.getProposta();
  }

  getProposta() {
    this.propostaAtualProvider.get()
      .then((result) => {
        if (result.clinica == null)
          this.nomeClinica = "Nenhuma clínica selecionada."
        else
          this.nomeClinica = result.clinica.nome;

        this.propostaAtual = result;
        this.deParaMedicamentosEMedicamentosProposta();

      })
      .catch((e) => console.error(e));
    ;
  }

  deParaMedicamentosEMedicamentosProposta() {
    if (this.propostaAtual != null)
      if (this.propostaAtual.itens != null) {        
        Array.prototype.sort.call(this.propostaAtual.itens, function (a, b) {
          if (a.medicamento.nome > b.medicamento.nome) {
            return 1;
          }
          if (a.medicamento.nome < b.medicamento.nome) {
            return -1;
          }
          return 0;
        });

        this.propostaAtual.itens.forEach(x => {
          if (x.medicamentoProposta == null) {
            x.medicamentoProposta = new PropostaMedicamento();
            x.medicamentoProposta.nome = x.medicamento.nome;            
            x.medicamentoProposta.preco = parseFloat(x.medicamento.PF0.toFixed(2));
            x.medicamentoProposta.precoDesconto = parseFloat(x.medicamento.PF0.toFixed(2));
            x.medicamentoProposta.repasse = parseFloat(x.medicamento.PF0.toFixed(2));
            x.medicamentoProposta.PF0 = parseFloat(x.medicamento.PF0.toFixed(2));
            x.medicamentoProposta.PF12 = parseFloat(x.medicamento.PF12.toFixed(2));
            x.medicamentoProposta.PF17 = parseFloat(x.medicamento.PF17.toFixed(2));
            x.medicamentoProposta.PF175 = parseFloat(x.medicamento.PF175.toFixed(2));
            x.medicamentoProposta.PF18 = parseFloat(x.medicamento.PF18.toFixed(2));
            x.medicamentoProposta.PF20 = parseFloat(x.medicamento.PF20.toFixed(2));
            x.medicamentoProposta.desconto = 0;
            x.medicamentoProposta.porcentagemRepasse = 0;
            x.medicamentoProposta.maxDescontoADM = x.medicamento.maxDescontoADM;
            x.medicamentoProposta.maxDescontoGER = x.medicamento.maxDescontoGER;
            x.medicamentoProposta.maxDescontoKAM = x.medicamento.maxDescontoKAM;
            x.medicamentoProposta.medicamentosLaboratorios = [];
            x.qtdCiclos = 1;
            x.qtdPacientes = 1;
            x.usoPorPaciente = 1;
            x.medicamentoProposta.PFSelecionado = "PF0";

            if (x.medicamento.laboratoriosMedicamento != null)
              x.medicamento.laboratoriosMedicamento.forEach(y => {
                var novaPropMed = new PropostaMedicamento();
                novaPropMed.nome = y.nome;
                novaPropMed.preco = parseFloat(y.PF0.toFixed(2));
                novaPropMed.precoDesconto = parseFloat(y.PF0.toFixed(2));
                novaPropMed.repasse = parseFloat(y.PF0.toFixed(2));
                novaPropMed.PF0 = parseFloat(y.PF0.toFixed(2));
                novaPropMed.PF12 = parseFloat(y.PF12.toFixed(2));
                novaPropMed.PF17 = parseFloat(y.PF17.toFixed(2));
                novaPropMed.PF175 = parseFloat(y.PF175.toFixed(2));
                novaPropMed.PF18 = parseFloat(y.PF18.toFixed(2));
                novaPropMed.PF20 = parseFloat(y.PF20.toFixed(2));
                novaPropMed.porcentagemRepasse = 0;
                novaPropMed.desconto = 0;
                novaPropMed.maxDescontoADM = y.maxDescontoADM;
                novaPropMed.maxDescontoGER = y.maxDescontoGER;
                novaPropMed.maxDescontoKAM = y.maxDescontoKAM;
                novaPropMed.PFSelecionado = "PF0";
                x.medicamentoProposta.medicamentosLaboratorios.push(novaPropMed);
              });
          }
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

    if (this.propostaAtual.usuario.perfil == "ADM")
      if (obj.desconto > obj.maxDescontoADM)
        obj.desconto = obj.maxDescontoADM;

    if (this.propostaAtual.usuario.perfil == "GER")
      if (obj.desconto > obj.maxDescontoGER)
        obj.desconto = obj.maxDescontoGER;

    if (this.propostaAtual.usuario.perfil == "KAM")
      if (obj.desconto > obj.maxDescontoKAM)
        obj.desconto = obj.maxDescontoKAM;

    obj.precoDesconto =
      (obj.preco -
        (obj.preco * (0.01 * obj.desconto))).toFixed(2);
  }

  irParaRentabilidade() {

    this.propostaAtual.itens.forEach(x => {

      x.medicamentoProposta.rentabilidadeUnitaria = parseFloat((x.medicamentoProposta.repasse - x.medicamentoProposta.precoDesconto).toFixed(2));

      x.medicamentoProposta.rentabilidadePorPaciente = parseFloat(
        (x.usoPorPaciente * x.medicamentoProposta.rentabilidadeUnitaria).toFixed(2));

      x.medicamentoProposta.rentabilidadeMensal = parseFloat(
        (x.medicamentoProposta.rentabilidadePorPaciente * x.qtdPacientes).toFixed(2));

      x.medicamentoProposta.rentabilidadeAnual = parseFloat(
        (x.medicamentoProposta.rentabilidadeMensal * x.qtdCiclos).toFixed(2));

      x.medicamentoProposta.medicamentosLaboratorios.forEach(y => {
        y.rentabilidadeUnitaria = parseFloat((y.repasse - y.precoDesconto).toFixed(2));

        y.rentabilidadePorPaciente = parseFloat(
          (x.usoPorPaciente * y.rentabilidadeUnitaria).toFixed(2));

        y.rentabilidadeMensal = parseFloat((y.rentabilidadePorPaciente * x.qtdPacientes).toFixed(2));

        y.rentabilidadeAnual = parseFloat(
          (y.rentabilidadeMensal * x.qtdCiclos).toFixed(2));
      });
    });

    this.propostaAtualProvider.update(this.propostaAtual);

    this.navCtrl.setRoot('ExibirRentabilidadePage', {}, { animate: true, direction: 'forward' });
  }

  onSelectPFChange(selectedValue, obj) {
    
    this.realizaAlteracaoDoPF(selectedValue, obj);

    obj.medicamentosLaboratorios.forEach(x => {
      this.realizaAlteracaoDoPF(selectedValue, x);
    });
  }

  realizaAlteracaoDoPF(pf, medicamento) {
    if (pf == "PF0")
      medicamento.preco = medicamento.PF0;

    if (pf == "PF12")
      medicamento.preco = medicamento.PF12;

    if (pf == "PF17")
      medicamento.preco = medicamento.PF17;

    if (pf == "PF175")
      medicamento.preco = medicamento.PF175;

    if (pf == "PF18")
      medicamento.preco = medicamento.PF18;

    if (pf == "PF20")
      medicamento.preco = medicamento.PF20;

    this.calcularValorMedicamento(medicamento);
    this.calcularRepasseMedicamento(medicamento);
  }
}
