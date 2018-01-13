import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import { DatePipe } from '@angular/common';

@Injectable()
export class ClinicaProvider {
  constructor(private storage: Storage, private datepipe: DatePipe) { }

  public insert(clinica: Clinica) {
    let key = "CLI" + clinica.nome; //this.datepipe.transform(new Date(), "ddMMyyyyHHmmss");
    return this.save(key, clinica);
  }

  public update(key: string, clinica: Clinica) {
    return this.save(key, clinica);
  }

  private save(key: string, clinica: Clinica) {
    return this.storage.set(key, clinica).catch((error) => {
      console.log(error);
    });;
  }

  public remove(key: string) {
    return this.storage.remove(key);
  }

  public getAllPorNome(nome: string = null) {

    let clinicas: ClinicaList[] = [];

    return this.storage.forEach((value: Clinica, key: string, iterationNumber: Number) => {
      if (key.indexOf('CLI') !== -1) {
        let clinica = new ClinicaList();
        clinica.key = key;
        clinica.clinica = value;
        if (clinica.clinica.nome === nome)
          clinicas.push(clinica);
      }
    })
      .then(() => {
        return Promise.resolve(clinicas);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  }

  public getAll() {

    let clinicas: ClinicaList[] = [];

    return this.storage.forEach((value: Clinica, key: string, iterationNumber: Number) => {
      if (key.indexOf('CLI') !== -1) {
        let clinica = new ClinicaList();
        clinica.key = key;
        clinica.clinica = value;
        clinicas.push(clinica);
      }
    })
      .then(() => {
        return Promise.resolve(clinicas);
      })
      .catch((error) => {
        console.log(error);
        return Promise.reject(error);
      });
  }



  public carregarDadosIniciais() {
    var clinica = new Clinica();
    clinica.nome = "CLINCIA 8080"; clinica.endereco = "Endereco 123"; clinica.email = "8080@email.com";
    this.insert(clinica);

    var clinica2 = new Clinica();
    clinica2.nome = "CLINCIA 99"; clinica2.endereco = "Endereco 99"; clinica2.email = "99@email.com";
    this.insert(clinica2);
    
    var clinica3 = new Clinica();
    clinica3.nome = "CLINCIA 444"; clinica3.endereco = "Endereco 444"; clinica3.email = "444@email.com";
    this.insert(clinica3);
    
    var clinica4 = new Clinica();
    clinica4.nome = "CLINCIA 0000"; clinica4.endereco = "Endereco 123"; clinica4.email = "0000@email.com";
    this.insert(clinica4);
  }

}

export class Clinica {
  nome: string;
  cnpj: string;
  endereco: string;
  email: string;
  laboratorio: string;
  brickCod: number;
  chanDes: string;
  canalGrupo: string;
  cidade: string;
  uf: string;
  selecionado: boolean;
}

export class ClinicaList {
  key: string;
  clinica: Clinica;
}
