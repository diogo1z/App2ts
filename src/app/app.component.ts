import { UsuarioProvider } from './../providers/usuario/usuario';
import { MedicamentoProvider, Medicamento } from './../providers/medicamento/medicamento';
import { ClinicaProvider, Clinica } from './../providers/clinica/clinica';
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = null;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
    medicamentoProvider: MedicamentoProvider, clinicaProvider: ClinicaProvider, usuarioProvider: UsuarioProvider) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      

      
      //statusBar.backgroundColorByHexString('#522e91');

      splashScreen.hide();
      this.openHomePage(splashScreen);

      
      clinicaProvider.getAll()
      .then((result: any[]) => {
        console.log('Fez a busca');
        console.log(result.length);
        if (result.length < 100){
          //medicamentoProvider.carregarDadosIniciais();
          clinicaProvider.carregarDadosIniciais();
        }
        medicamentoProvider.carregarDadosIniciais();
        usuarioProvider.carregarDadosIniciais();
        
      })
      .catch((e) => console.error(e));;
    });
  }

  private openHomePage(splashScreen: SplashScreen){
    splashScreen.hide();
    this.rootPage = HomePage;
  }
}

