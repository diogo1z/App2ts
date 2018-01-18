import { Medicamento } from './../medicamento/medicamento';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import { DatePipe } from '@angular/common';

@Injectable()
export class PropostaMedicamentoProvider {
  constructor(private storage: Storage, private datepipe: DatePipe) { }
 
  public insert(propostaMedicamento: PropostaMedicamento) {
    let key = this.datepipe.transform(new Date(), "ddMMyyyyHHmmss");
    return this.save(key, propostaMedicamento);
  }
 
  public update(key: string, propostaMedicamento: PropostaMedicamento) {
    return this.save(key, propostaMedicamento);
  }
 
  private save(key: string, propostaMedicamento: PropostaMedicamento) {
    return this.storage.set(key, propostaMedicamento);
  }
 
  public remove(key: string) {
    return this.storage.remove(key);
  }
 
  public getAll() {
 
    let propostaMedicamentos: PropostaMedicamentoList[] = [];
 
    return this.storage.forEach((value: PropostaMedicamento, key: string, iterationNumber: Number) => {
      let propostaMedicamento = new PropostaMedicamentoList();
      propostaMedicamento.key = key;
      propostaMedicamento.propostaMedicamento = value;
      propostaMedicamentos.push(propostaMedicamento);
    })
      .then(() => {
        return Promise.resolve(propostaMedicamentos);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  }
}
 
export class PropostaMedicamento {
  desconto : number;
  precoDesconto : number;
  porcentagemRepasse : number;
  repasse : number;
  nome : string;
  preco : number;
  rentabilidadeUnitaria : number;
  rentabilidadePorPaciente : number;
  rentabilidadeMensal : number;
  rentabilidadeAnual : number;
  medicamentosLaboratorios : PropostaMedicamento[];
  PF0: number;
  PF12: number;
  PF17: number;
  PF17ALC: number;
  PF175: number;
  PF175ALC: number;
  PF18: number;
  PF18ALC: number;
  PF20: number;
  maxDescontoKAM : number;
  maxDescontoGER : number;
  maxDescontoADM : number;
}

export class PropostaMedicamentoList {
  key: string;
  propostaMedicamento: PropostaMedicamento;
}
