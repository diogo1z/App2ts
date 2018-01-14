import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExibirPropostaPage } from './exibir-proposta';

@NgModule({
  declarations: [
    ExibirPropostaPage,
  ],
  imports: [
    IonicPageModule.forChild(ExibirPropostaPage),
  ],
})
export class ExibirPropostaPageModule {}
