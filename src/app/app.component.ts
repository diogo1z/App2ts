import { PropostaProvider, Proposta } from './../providers/proposta/proposta';
import { UsuarioProvider } from './../providers/usuario/usuario';
import { MedicamentoProvider, Medicamento } from './../providers/medicamento/medicamento';
import { ClinicaProvider, Clinica } from './../providers/clinica/clinica';
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { Http, Headers } from '@angular/http';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = null;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
    medicamentoProvider: MedicamentoProvider, clinicaProvider: ClinicaProvider,
    usuarioProvider: UsuarioProvider, public propostaProvider: PropostaProvider,
    loading: LoadingController, public http: Http) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();

      splashScreen.hide();
      this.openHomePage(splashScreen);
      let loader = loading.create({
        content: 'Carregando...',
      });
    
      loader.present().then(() => {
        medicamentoProvider.getAll()
        .then((result: any[]) => {
          if (result == null) {
            clinicaProvider.clear();
            clinicaProvider.carregarDadosIniciais();
            medicamentoProvider.carregarDadosIniciais();
            usuarioProvider.carregarDadosIniciais();
          }
          else if (result.length == 0) {
            clinicaProvider.clear();
            clinicaProvider.carregarDadosIniciais();
            medicamentoProvider.carregarDadosIniciais();
            usuarioProvider.carregarDadosIniciais();
          }
        })
        .catch((e) => console.error(e));
        console.log("1");
        this.enviarPropostas();
        console.log("2");
        loader.dismiss();
      });
    });
  }

  private openHomePage(splashScreen: SplashScreen) {
    splashScreen.hide();
    this.rootPage = HomePage;
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
}

