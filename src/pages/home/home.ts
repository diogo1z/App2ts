import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { ContactProvider, Contact, ContactList } from '../../providers/contact/contact';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { Http, Headers } from '@angular/http';
import { PropostaProvider } from '../../providers/proposta/proposta';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { MedicamentoProvider } from '../../providers/medicamento/medicamento';
import { ClinicaProvider } from '../../providers/clinica/clinica';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  contacts: ContactList[];

  constructor(public navCtrl: NavController, private toast: ToastController, 
    private medicamentoProvider: MedicamentoProvider, private clinicaProvider: ClinicaProvider,
    private usuarioProvider: UsuarioProvider, public propostaProvider: PropostaProvider,
    private loading: LoadingController, public http: Http) { }

  ionViewDidLoad() {
    let loader = this.loading.create({
      content: 'Carregando...',
    });

    loader.present().then(() => {
      this.medicamentoProvider.getAll()
        .then((result: any[]) => {
          if (result == null) {
            this.clinicaProvider.clear();
            this.clinicaProvider.carregarDadosIniciais();
            this.medicamentoProvider.carregarDadosIniciais();
            this.usuarioProvider.carregarDadosIniciais();
          }
          else if (result.length == 0) {
            this.clinicaProvider.clear();
            this.clinicaProvider.carregarDadosIniciais();
            this.medicamentoProvider.carregarDadosIniciais();
            this.usuarioProvider.carregarDadosIniciais();
          }
        })
        .catch((e) => console.error(e));
      this.enviarPropostas();

      loader.dismiss();
    });
  }

  private enviarPropostas() {
    var erros = 0;

    this.propostaProvider.getAllNaoEnviadas()
      .then((result: any[]) => {
        var link = 'http://www.drreddys.com.br/Email/api/Send';
        var header = new Headers();
        header.append('Content-Type', 'application/json;charset=utf-8');

        for (var i = 0, len = result.length; i < len; i++) {
          if (erros === 2)
            break;
          console.log(result);
          console.log(i);
          var proposta = result[i];
          console.log(proposta);

          var myData = JSON.stringify({
            Destinatario: proposta.email,
            CC: proposta.cc,
            Assunto: "Proposta Dr. Reddy’s",
            Corpo: proposta.mensagem,
            Assinatura: ""
          });
          this.http.post(link, myData, { headers: header })
            .subscribe(data => {
              proposta.enviada = true;
              proposta.enviarProposta = false;
              this.propostaProvider.update(proposta);
            }, error => {
              erros++;
              console.log("deu ruim");
              console.log(proposta);
              proposta.enviada = false;
              proposta.enviarProposta = true;
              this.propostaProvider.update(proposta);
            });

        };
      })
      .catch((e) => console.error(e));
  }

  addContact() {
    this.navCtrl.push('EditContactPage');
  }

  irParaLogin() {
    this.navCtrl.push('LoginPage');
  }
}
