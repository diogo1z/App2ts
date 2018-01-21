import { UsuarioProvider } from './../../providers/usuario/usuario';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { PropostaAtual, PropostaAtualProvider } from '../../providers/proposta-atual/proposta-atual';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  model : Login;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              private toast: ToastController, private usuarioProvider:UsuarioProvider, 
              private propostaAtualProvider: PropostaAtualProvider) {
    this.model = new Login();
  }

  ionViewDidLoad() {
  }

  logar(){
    this.efetuarLogin();  
  }

  private efetuarLogin(){
    this.usuarioProvider.get(this.model.email, this.model.senha)
      .then((result) => {
        if (result != null)
        {
          var propostaAtual = new PropostaAtual();
          propostaAtual.usuario = result;
          this.propostaAtualProvider.update(propostaAtual);          
          this.toast.create({ message: 'Acesso realizado com sucesso.', duration: 3000, position: 'botton' }).present();
          this.navCtrl.setRoot('InicioPage', {}, { animate: true, direction: 'forward' });

        }
        else 
        {
          this.toast.create({ message: 'E-mail/Senha inválidos.', duration: 3000, position: 'botton' }).present();
        }
      })
      .catch((e) => console.error(e));   
  }
}

export class Login {
  email : string;
  senha : string;
}
