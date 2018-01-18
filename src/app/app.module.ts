import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, LOCALE_ID } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { IonicStorageModule } from '@ionic/storage';
import { DatePipe } from '@angular/common';
import { ContactProvider } from '../providers/contact/contact';
import { MedicamentoProvider } from '../providers/medicamento/medicamento';
import { ClinicaProvider } from '../providers/clinica/clinica';
import { PropostaProvider } from '../providers/proposta/proposta';
import { PropostaMedicamentoProvider } from '../providers/proposta-medicamento/proposta-medicamento';
import { PropostaAtualProvider } from '../providers/proposta-atual/proposta-atual';

import { EmailComposer } from '@ionic-native/email-composer';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { UsuarioProvider } from '../providers/usuario/usuario';

registerLocaleData(localePt, 'pt-BR');

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      platforms : {
        ios : {
          // These options are available in ionic-angular@2.0.0-beta.2 and up.
          scrollAssist: false,    // Valid options appear to be [true, false]
          autoFocusAssist: false  // Valid options appear to be ['instant', 'delay', false]
        }
        // http://ionicframework.com/docs/v2/api/config/Config/)
      }
    }),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: LOCALE_ID, useValue: 'pt-BR ' },
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DatePipe,
    EmailComposer,
    ContactProvider,
    MedicamentoProvider,
    ClinicaProvider,
    PropostaProvider,
    PropostaMedicamentoProvider,
    PropostaAtualProvider,
    UsuarioProvider
  ]
})
export class AppModule {}
