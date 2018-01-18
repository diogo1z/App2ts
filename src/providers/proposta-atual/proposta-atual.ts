import { Medicamento } from './../medicamento/medicamento';
import { ClinicaList } from './../clinica/clinica';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import { DatePipe } from '@angular/common';
import { PropostaMedicamentoList, PropostaMedicamento } from '../proposta-medicamento/proposta-medicamento';
import { Usuario } from '../usuario/usuario';

@Injectable()
export class PropostaAtualProvider {

  constructor(private storage: Storage, private datepipe: DatePipe) { }
 
  public update(proposta: PropostaAtual) {
    return this.save('PROPOSTA_ATUAL', proposta);
  }
 
  private save(key: string, proposta: PropostaAtual) {
    return this.storage.set(key, proposta);
  }
 
  public remove() {
    return this.storage.remove('PROPOSTA_ATUAL');
  }
 
  public get() {
    let proposta: PropostaAtual;
    return this.storage.forEach((value: PropostaAtual, key: string, iterationNumber: Number) => {
      if (key == 'PROPOSTA_ATUAL')
        proposta = value;
    })
      .then(() => {
        return Promise.resolve(proposta);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  }
}
 
export class PropostaAtual {
  clinica : ClinicaList;
  usuario : Usuario;
  qtdCiclos : number;
  qtdPacientes : number;
  usoPorPaciente : number;
  medicamento : Medicamento;
  medicamentoProposta : PropostaMedicamento;
}