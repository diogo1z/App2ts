import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import { DatePipe } from '@angular/common';

@Injectable()
export class PropostaProvider {
 
  constructor(private storage: Storage, private datepipe: DatePipe) { }
 
  public insert(proposta: Proposta) {
    let key = this.datepipe.transform(new Date(), "ddMMyyyyHHmmss");
    return this.save(key, proposta);
  }
 
  public update(key: string, proposta: Proposta) {
    return this.save(key, proposta);
  }
 
  private save(key: string, proposta: Proposta) {
    return this.storage.set(key, proposta);
  }
 
  public remove(key: string) {
    return this.storage.remove(key);
  }
 
  public getAll() {
 
    let propostas: PropostaList[] = [];
 
    return this.storage.forEach((value: Proposta, key: string, iterationNumber: Number) => {
      let proposta = new PropostaList();
      proposta.key = key;
      proposta.proposta = value;
      propostas.push(proposta);
    })
      .then(() => {
        return Promise.resolve(propostas);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  }
}
 
export class Proposta {
  id : number;
  data : Date;
  enviarProposta : boolean;
  propostaEnviada : boolean;
  qtdCiclos : number;
  qtdPacientes : number;
  usoPorPaciente : number;
}
 
export class PropostaList {
  key: string;
  proposta: Proposta;
}
