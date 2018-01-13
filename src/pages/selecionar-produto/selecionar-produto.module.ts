import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SelecionarProdutoPage } from './selecionar-produto';

@NgModule({
  declarations: [
    SelecionarProdutoPage,
  ],
  imports: [
    IonicPageModule.forChild(SelecionarProdutoPage),
  ],
})
export class SelecionarProdutoPageModule {}
