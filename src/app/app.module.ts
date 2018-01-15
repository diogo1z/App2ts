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

import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

registerLocaleData(localePt, 'pt-BR');

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
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
    ContactProvider,
    MedicamentoProvider,
    ClinicaProvider,
    PropostaProvider,
    PropostaMedicamentoProvider,
    PropostaAtualProvider
  ]
})
export class AppModule {}
