import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  model : Login;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              private toast: ToastController) {
    this.model = new Login();
  }

  ionViewDidLoad() {
  }

  logar(){
    this.efetuarLogin();  
  }

  private efetuarLogin(){
    if ((this.model.email === "teste@teste.com" && this.model.senha === "123")
        || this.model.email === "D"){
      this.toast.create({ message: 'Login realizado com sucesso.', duration: 3000, position: 'botton' }).present();
      this.navCtrl.push('InicioPage');
    } else {
      this.toast.create({ message: 'Login inválido.', duration: 3000, position: 'botton' }).present();
    }
  }
}

export class Login {
  email : string;
  senha : string;
}
