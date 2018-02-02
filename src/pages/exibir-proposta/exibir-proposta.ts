import { DatePipe } from '@angular/common';
import { Clinica, ClinicaList } from './../../providers/clinica/clinica';
import { PropostaMedicamento } from './../../providers/proposta-medicamento/proposta-medicamento';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { PropostaAtualProvider, PropostaAtual } from '../../providers/proposta-atual/proposta-atual';
import { Http, Headers } from '@angular/http';
import { LoadingController } from 'ionic-angular';
import { PropostaProvider, Proposta } from '../../providers/proposta/proposta';

@IonicPage()
@Component({
  selector: 'page-exibir-proposta',
  templateUrl: 'exibir-proposta.html',
})
export class ExibirPropostaPage {
  propostaAtual: PropostaAtual;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private propostaAtualProvider: PropostaAtualProvider, public http: Http,
    public loading: LoadingController,
    private propostaProvider: PropostaProvider) {
    this.propostaAtual = new PropostaAtual();
    this.propostaAtual.clinica = new Clinica();
    this.propostaAtual.clinica.nome = "";
    this.propostaAtual.clinica.email = "";
    this.propostaAtual.clinica.endereco = "";
    this.propostaAtual.itens = [];
  }

  ionViewDidLoad() {
    this.getProposta();
  }
  getProposta() {
    this.propostaAtualProvider.get()
      .then((result) => {
        this.propostaAtual = result;
        if (this.propostaAtual == null) {
          this.propostaAtual = new PropostaAtual();
          this.propostaAtual.itens = [];
        }
        else {
          if (this.propostaAtual.itens == null) {
            this.propostaAtual.itens = [];
          }
        }
      })
      .catch((e) => console.error(e));
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

  sendEmail() {
    let loader = this.loading.create({
      content: 'Enviando proposta...',
    });
  
    loader.present().then(() => {
      this.enviarEmailEGravarProposta();
      loader.dismiss();
    });
    
    this.navCtrl.setRoot('PropostaEnviadaPage', {}, { animate: true, direction: 'forward' });
  }

  private enviarEmailEGravarProposta(){
    var conteudo = 
    '<p>Esta é uma mensagem automática, por favor não responder</p>' +
    '<p></p>' +
    '<p>Proposta enviada por: ' + this.propostaAtual.usuario.nome + '</p>' +
    '<p></p>' +
    '<p>Dr. Reddy&rsquo;s Farmac&ecirc;utica do Brasil Ltda. Rua George Ohm, 206 - Conj. 103 e 104, Torre A, Edif&iacute;cio LWM, Brooklin Novo, CEP: 04576-020 - S&atilde;o Paulo/SP - Brasil</p>' +
      '<p>T: +55 11 5894 2343</p>' +
      '<p>F: +55 11 5891 7759</p>' +
      '<p><strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </strong></p>' +
      '<p><strong>&nbsp;</strong></p>' +
      '<p><strong>Prezados Senhores,</strong></p>' +
      '<p><strong>&nbsp;</strong></p>' +
      '<p>Com o objetivo de estabelecer uma parceria s&oacute;lida com o ' +
      '<strong>' + this.propostaAtual.clinica.nome + ',</strong> refor&ccedil;amos a nossa garantia de supply sem nenhuma ruptura, o nosso interesse em apoi&aacute;-los em projetos de educa&ccedil;&atilde;o m&eacute;dica continuada, assim como oferecer acesso a medicamentos oncol&oacute;gicos a nossos pacientes. Desta forma segue proposta comercial.</p>' +
      '<p>&nbsp;</p>' +
      '<table width="600">' +
      '<tbody>' +
      '<tr>' +
      '<td width="85">' +
      '<p><strong>Produto Similar</strong></p>' +
      '</td>' +
      '<td width="85">' +
      '<p><strong>PF (R$)</strong></p>' +
      '</td>' +
      '<td width="85">' +
      '<p><strong>Desconto </strong></p>' +
      '</td>' +
      '<td width="85">' +
      '<p><strong>Pre&ccedil;o com Desconto (R$)</strong></p>' +
      '</td>' +
      '<td width="87">' +
      '<p><strong>Rentabilidade Unit&aacute;ria (R$)</strong></p>' +
      '</td>' +
      '<td width="85">' +
      '<p><strong>Consumo Mensal</strong></p>' +
      '</td>' +
      '<td width="87">' +
      '<p><strong>Rentabilidade Mensal (R$)</strong></p>' +
      '</td>' +
      '</tr>';

    this.propostaAtual.itens.forEach(x => {
      conteudo += '<tr>' +
        '<td width="85">' +
        '<p><strong>' + x.medicamentoProposta.nome + '</strong></p>' +
        '</td>' +
        '<td width="85">' +
        '<p><strong>R$ ' + x.medicamentoProposta.preco + '</strong></p>' +
        '</td>' +
        '<td width="85">' +
        '<p><strong>' + x.medicamentoProposta.desconto + '%</strong></p>' +
        '</td>' +
        '<td width="85">' +
        '<p><strong>R$ ' + x.medicamentoProposta.precoDesconto + '</strong></p>' +
        '</td>' +
        '<td width="87">' +
        '<p><strong>R$ ' + x.medicamentoProposta.rentabilidadeUnitaria + '</strong></p>' +
        '</td>' +
        '<td width="85">' +
        '<p><strong>' + x.qtdCiclos + '</strong></p>' +
        '</td>' +
        '<td width="87">' +
        '<p><strong>R$ ' + x.medicamentoProposta.rentabilidadeMensal + '</strong></p>' +
        '</td>'
      '</tr>';
    });
    conteudo += '</tbody>' +
      '</table>' +
      '<p><em>Obs.: </em></p>' +
      '<p><em>1) O desconto total da proposta considera o grupo de produtos e volume mencionado acima;</em></p>' +
      '<p><em>2) PF do apresenta&ccedil;ao similar, conforme tributa&ccedil;&atilde;o atual e faturamento Bras&iacute;lia;</em></p>' +
      '<p><em>3) Bortezomibe, Cabazitaxel e Decitabina apresentacao similar e entrega imediata;</em></p>' +
      '<p><em>4) Proposta v&aacute;lida at&eacute; 15/01.</em></p>' +
      '<p>&nbsp;</p>' +
      '<p>Atenciosamente,</p>' +
      '<p>&nbsp;</p>';

    var link = 'http://www.drreddys.com.br/Email/api/Send';
    var myData = JSON.stringify({
      Destinatario: "diogo1z@hotmail.com",
      CC: "daniele.cunha@drreddys.com",
      Assunto: "Proposta Dr. Reddy’s",
      Corpo: conteudo,
      Assinatura: ""
    });

    var proposta = new Proposta();
    proposta.cc ="daniele.cunha@drreddys.com";
    proposta.data = new Date();
    proposta.email = "clinica@clinica.com.br";
    proposta.nomeFuncionario = this.propostaAtual.usuario.nome;
    proposta.mensagem = conteudo;
    proposta.id = 22;//(new Date(), "ddMMyyyyHHmmss")

    var header = new Headers();
    header.append('Content-Type', 'application/json;charset=utf-8');

    console.log(myData);
    this.http.post(link, myData, { headers: header })
      .subscribe(data => {
        proposta.enviada = true;
        proposta.enviarProposta = false;
        this.propostaProvider.insert(proposta);
        console.log(proposta);
      }, error => {
        proposta.enviada = false;
        proposta.enviarProposta = true;
        this.propostaProvider.insert(proposta);
        console.log(proposta);
      });
  }
}