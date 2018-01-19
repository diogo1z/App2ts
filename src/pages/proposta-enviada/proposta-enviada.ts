import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-proposta-enviada',
  templateUrl: 'proposta-enviada.html',
})
export class PropostaEnviadaPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    
  }
  irParaInicio() {
    this.navCtrl.setRoot('InicioPage', {}, {animate: true, direction: 'forward'});    
  }
}
