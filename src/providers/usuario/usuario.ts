import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import { DatePipe } from '@angular/common';


@Injectable()
export class UsuarioProvider {
  constructor(private storage: Storage, private datepipe: DatePipe) { }

  public insert(usuario: Usuario) {
    let key = "U1SE43R" + usuario.nome; //this.datepipe.transform(new Date(), "ddMMyyyyHHmmss");
    return this.save(key, usuario);
  }

  public update(key: string, usuario: Usuario) {
    return this.save(key, usuario);
  }

  private save(key: string, usuario: Usuario) {
    return this.storage.set(key, usuario).catch((error) => {
      console.log(error);
    });;
  }

  public remove(key: string) {
    return this.storage.remove(key);
  }

  public get(login: string, senha: string) {
    let usuario: Usuario;
    return this.storage.forEach((value: Usuario, key: string, iterationNumber: Number) => {
      if (key.startsWith('U1SE43R'))      
        if (value.email == login
          && value.matricula == senha)
          usuario = value;
    })
      .then(() => {
        return Promise.resolve(usuario);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  }


  public getAll() {

    let usuarios: UsuarioList[] = [];

    return this.storage.forEach((value: UsuarioList, key: string, iterationNumber: Number) => {
      if (key.startsWith('U1SE43R')) {
        let usuario = new UsuarioList();
        usuario.key = key;
        usuario = value;
        usuarios.push(usuario);
      }
    })
      .then(() => {
        return Promise.resolve(usuarios);
      })
      .catch((error) => {
        console.log(error);
        return Promise.reject(error);
      });
  }



  public carregarDadosIniciais() {
    var usu13 = new Usuario(); usu13.nome = 'Adriana Souza'; usu13.email = 'adriana.souza@drreddys.com'; usu13.matricula = '54387'; usu13.perfil = 'KAM';
    this.insert(usu13);
    var usu14 = new Usuario(); usu14.nome = 'Aleksander Furlin'; usu14.email = 'aleksander.furlin@drreddys.com'; usu14.matricula = '54551'; usu14.perfil = 'KAM';
    this.insert(usu14);
    var usu15 = new Usuario(); usu15.nome = 'Alessandra Oliveira'; usu15.email = 'alessandra.oliveira@drreddys.com'; usu15.matricula = '56354'; usu15.perfil = 'KAM';
    this.insert(usu15);
    var usu16 = new Usuario(); usu16.nome = 'Alexandre Silveira'; usu16.email = 'alexandre.silveira@drreedys.com'; usu16.matricula = '56352'; usu16.perfil = 'KAM';
    this.insert(usu16);
    var usu17 = new Usuario(); usu17.nome = 'Bruno Ditura'; usu17.email = 'bruno.ditura@drreddys.com'; usu17.matricula = '29904'; usu17.perfil = 'KAM';
    this.insert(usu17);
    var usu18 = new Usuario(); usu18.nome = 'Camila Ribeiro'; usu18.email = 'camila.ribeiro@drreddys.com'; usu18.matricula = '54959'; usu18.perfil = 'KAM';
    this.insert(usu18);
    var usu19 = new Usuario(); usu19.nome = 'Daniele Luna'; usu19.email = 'daniele.cunha@drreddys.com'; usu19.matricula = '54177'; usu19.perfil = 'GER';
    this.insert(usu19);
    var usu20 = new Usuario(); usu20.nome = 'Elpidio Moreira'; usu20.email = 'elpidio.moreira@drreddys.com'; usu20.matricula = '56711'; usu20.perfil = 'KAM';
    this.insert(usu20);
    var usu21 = new Usuario(); usu21.nome = 'Eduardo Savaris'; usu21.email = 'eduardo.savaris@drreddys.com'; usu21.matricula = '54553'; usu21.perfil = 'KAM';
    this.insert(usu21);
    var usu22 = new Usuario(); usu22.nome = 'Frederico Imbroinise'; usu22.email = 'frederico.imbroinise@drreddys.com'; usu22.matricula = '54554'; usu22.perfil = 'KAM';
    this.insert(usu22);
    var usu23 = new Usuario(); usu23.nome = 'Hugo Cunha'; usu23.email = 'hugo.cunha@drreddys.com'; usu23.matricula = '54389'; usu23.perfil = 'KAM';
    this.insert(usu23);
    var usu24 = new Usuario(); usu24.nome = 'Michelle Yanaba'; usu24.email = 'michelle.yanaba@drreddys.com'; usu24.matricula = '56355'; usu24.perfil = 'KAM';
    this.insert(usu24);
    var usu25 = new Usuario(); usu25.nome = 'Michelle Pinheiro'; usu25.email = 'michelle.pinheiro@drreddys.com'; usu25.matricula = '56417'; usu25.perfil = 'KAM';
    this.insert(usu25);
    var usu26 = new Usuario(); usu26.nome = 'Marcelo Moura'; usu26.email = 'marcelo.moura@drreddys.com'; usu26.matricula = '54178'; usu26.perfil = 'GER';
    this.insert(usu26);
    var usu27 = new Usuario(); usu27.nome = 'Marco Soto'; usu27.email = 'marco.soto@drreddys.com'; usu27.matricula = '54391'; usu27.perfil = 'KAM';
    this.insert(usu27);
    var usu28 = new Usuario(); usu28.nome = 'Michael Pedrosa'; usu28.email = 'michael.pedrosa@drreddys.com'; usu28.matricula = '54392'; usu28.perfil = 'KAM';
    this.insert(usu28);
    var usu29 = new Usuario(); usu29.nome = 'Sergio Bielo'; usu29.email = 'sergio.bielo@drreddys.com'; usu29.matricula = '57454'; usu29.perfil = 'GER';
    this.insert(usu29);
    var usu30 = new Usuario(); usu30.nome = 'Sergio Parmigiani'; usu30.email = 'sergio.parmigiani@drreddys.com'; usu30.matricula = '54395'; usu30.perfil = 'KAM';
    this.insert(usu30);
    var usu31 = new Usuario(); usu31.nome = 'Usuario de Teste D'; usu31.email = 'D'; usu31.matricula = '1'; usu31.perfil = 'KAM';
    this.insert(usu31);
    var usu32 = new Usuario(); usu32.nome = 'Usuario de Teste A'; usu32.email = 'A'; usu32.matricula = '1'; usu32.perfil = 'ADM';
    this.insert(usu32);
    var usu33 = new Usuario(); usu33.nome = 'Usuario de Teste G'; usu33.email = 'G'; usu33.matricula = '1'; usu33.perfil = 'GER';
    this.insert(usu33);
    var usu34 = new Usuario(); usu34.nome = 'Amabile Araújo'; usu34.email = 'amabile.araujo@drreddys.com'; usu34.matricula = '56539'; usu34.perfil = 'ADM';
    this.insert(usu34);
  }
}

export class Usuario {
  nome: string;
  email: string;
  matricula: string;
  perfil: string;
}

export class UsuarioList {
  key: string;
  usuario: Usuario;
}
