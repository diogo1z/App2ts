import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import { DatePipe } from '@angular/common';

@Injectable()
export class MedicamentoProvider {

  constructor(private storage: Storage, private datepipe: DatePipe) { }

  public insert(medicamento: Medicamento) {
    let key = "MED" + medicamento.nome; // this.datepipe.transform(new Date(), "ddMMyyyyHHmmss");
    return this.save(key, medicamento);
  }

  public update(key: string, medicamento: Medicamento) {
    return this.save(key, medicamento);
  }

  private save(key: string, medicamento: Medicamento) {
    return this.storage.set(key, medicamento);
  }

  public remove(key: string) {
    return this.storage.remove(key);
  }

  public getAllPorNome(nome: string = null) {

    let medicamentos: MedicamentoList[] = [];

    return this.storage.forEach((value: Medicamento, key: string, iterationNumber: Number) => {
      if (key.indexOf('MED') !== -1) {
      let medicamento = new MedicamentoList();
      medicamento.key = key;
      medicamento.medicamento = value;
      if (medicamento.medicamento.nome === nome)
        medicamentos.push(medicamento);
      }
    })
      .then(() => {
        return Promise.resolve(medicamentos);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  }

  public getAll() {

    let medicamentos: MedicamentoList[] = [];

    return this.storage.forEach((value: Medicamento, key: string, iterationNumber: Number) => {
      if (key.indexOf('MED') !== -1) {
        let medicamento = new MedicamentoList();
        medicamento.key = key;
        medicamento.medicamento = value;
        medicamentos.push(medicamento);
      }
    })
      .then(() => {
        return Promise.resolve(medicamentos);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  }

  public carregarDadosIniciais() {    
    var medicamento3 = new Medicamento();
    medicamento3.nome = "BOZORED"; medicamento3.principioAtivo = "PRIN 1";
    medicamento3.PF0 = 2000; medicamento3.PF12 = 2100; medicamento3.PF17 = 2200; medicamento3.PF175 = 2300; medicamento3.PF175ALC = 2400;
    medicamento3.PF18 = 2500; medicamento3.PF18ALC = 2600; medicamento3.PF20 = 2700;

    var medicamento3Lab1 = new Medicamento();
    medicamento3Lab1.nome = "SANOFI"; medicamento3Lab1.principioAtivo = "PRIN 1";
    medicamento3Lab1.PF0 = 2000; medicamento3Lab1.PF12 = 2100; medicamento3Lab1.PF17 = 2200; medicamento3Lab1.PF175 = 2300; medicamento3Lab1.PF175ALC = 2400;
    medicamento3Lab1.PF18 = 2500; medicamento3Lab1.PF18ALC = 2600; medicamento3Lab1.PF20 = 2700;

    var medicamento3Lab2 = new Medicamento();
    medicamento3Lab2.nome = "EUROFARMA"; medicamento3Lab2.principioAtivo = "PRIN 1";
    medicamento3Lab2.PF0 = 2000; medicamento3Lab2.PF12 = 2100; medicamento3Lab2.PF17 = 2200; medicamento3Lab2.PF175 = 2300; medicamento3Lab2.PF175ALC = 2400;
    medicamento3Lab2.PF18 = 2500; medicamento3Lab2.PF18ALC = 2600; medicamento3Lab2.PF20 = 2700;
    
    medicamento3.laboratoriosMedicamento = [];

    medicamento3.laboratoriosMedicamento.push(medicamento3Lab1);
    medicamento3.laboratoriosMedicamento.push(medicamento3Lab2);

    this.insert(medicamento3);


    var medicamento4 = new Medicamento();
    medicamento4.nome = "CABAZRED"; medicamento4.principioAtivo = "PRIN 9";
    medicamento4.PF0 = 2000; medicamento4.PF12 = 2100; medicamento4.PF17 = 2200; medicamento4.PF175 = 2300; medicamento4.PF175ALC = 2400;
    medicamento4.PF18 = 2500; medicamento4.PF18ALC = 2600; medicamento4.PF20 = 2700;
    this.insert(medicamento4);
    
    var medicamento6 = new Medicamento();
    medicamento6.nome = "RETIBIN"; medicamento6.principioAtivo = "PRIN 5";
    medicamento6.PF0 = 2000; medicamento6.PF12 = 2100; medicamento6.PF17 = 2200; medicamento6.PF175 = 2300; medicamento6.PF175ALC = 2400;
    medicamento6.PF18 = 2500; medicamento6.PF18ALC = 2600; medicamento6.PF20 = 2700;

    var medicamento6Lab1 = new Medicamento();
    medicamento6Lab1.nome = "SANOFI"; medicamento6Lab1.principioAtivo = "PRIN 5";
    medicamento6Lab1.PF0 = 2000; medicamento6Lab1.PF12 = 2100; medicamento6Lab1.PF17 = 2200; medicamento6Lab1.PF175 = 2300; medicamento6Lab1.PF175ALC = 2400;
    medicamento6Lab1.PF18 = 2500; medicamento6Lab1.PF18ALC = 2600; medicamento6Lab1.PF20 = 2700;

    var medicamento6Lab2 = new Medicamento();
    medicamento6Lab2.nome = "EUROFARMA"; medicamento6Lab2.principioAtivo = "PRIN 5";
    medicamento6Lab2.PF0 = 2000; medicamento6Lab2.PF12 = 2100; medicamento6Lab2.PF17 = 2200; medicamento6Lab2.PF175 = 2300; medicamento6Lab2.PF175ALC = 2400;
    medicamento6Lab2.PF18 = 2500; medicamento6Lab2.PF18ALC = 2600; medicamento6Lab2.PF20 = 2700;

    medicamento6.laboratoriosMedicamento = [];

    medicamento6.laboratoriosMedicamento.push(medicamento6Lab1);
    medicamento6.laboratoriosMedicamento.push(medicamento6Lab2);


    this.insert(medicamento6);

  }
}

export class Medicamento {
  nome: string;
  principioAtivo: string;
  laboratoriosMedicamento: Medicamento[];
  selecionado: boolean;
  PF0: number;
  PF12: number;
  PF17: number;
  PF17ALC: number;
  PF175: number;
  PF175ALC: number;
  PF18: number;
  PF18ALC: number;
  PF20: number;
}

export class MedicamentoList {
  key: string;
  medicamento: Medicamento;
}
