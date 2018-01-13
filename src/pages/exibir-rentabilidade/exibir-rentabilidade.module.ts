import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExibirRentabilidadePage } from './exibir-rentabilidade';

@NgModule({
  declarations: [
    ExibirRentabilidadePage,
  ],
  imports: [
    IonicPageModule.forChild(ExibirRentabilidadePage),
  ],
})
export class ExibirRentabilidadePageModule {}
