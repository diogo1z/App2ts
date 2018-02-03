import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';

@Injectable()
export class PropostaProvider {

  constructor(private storage: Storage) { }


  public insert(proposta: Proposta) {
    let key = "P9R0ST4";
    return this.save(key, proposta);
  }

  public update(proposta: Proposta) {
    let key = "P9R0ST4";
    this.storage.get(key).then((data) => {
      if (data != null) {
        for (var i = data.length - 1; i >= 0; i--) {
          if (data[i].id == proposta.id) {
            data.splice(i, 1);
            data.push(proposta);
            break;
          }
        }
        this.storage.set(key, data);
      }
    });
  }

  private save(key: string, proposta: Proposta) {
    this.storage.get(key).then((data) => {
      if (data != null) {
        data.push(proposta);
        this.storage.set(key, data);
      }
      else {
        let array = [];
        array.push(proposta);
        this.storage.set(key, array);
      }
    });
  }

  public remove(key: string) {
    return this.storage.remove(key);
  }

  public async getAllNaoEnviadas() {

    let propostas: Proposta[] = [];

    return this.storage.get("P9R0ST4")
      .then((value) => {
        if (value != null)
          value.forEach(x => {
            let proposta = new Proposta();
            proposta = x;
            if (!x.enviada && x.enviarProposta)
              propostas.push(proposta);
          });

        return propostas;
      })
      .catch((error) => {
        console.log(error);
        return Promise.reject(error);
      });
  }

  public async getAll() {
    let propostas: Proposta[] = [];
    return await this.storage.get("P9R0ST4")
      .then((value) => {
        propostas = value;
        return propostas;
      })
      .catch((error) => {
        console.log(error);
        return Promise.reject(error);
      });
  }

  public clear() {
    return this.storage.clear();
  }
}

export class Proposta {
  id: string;
  data: Date;
  enviarProposta: boolean;
  enviada: boolean;
  mensagem: string;
  email: string;
  cc: string;
  nomeFuncionario: string;
}

export class PropostaList {
  key: string;
  proposta: Proposta[];
}
