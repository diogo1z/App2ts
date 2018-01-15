import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';
import { DatePipe } from '@angular/common';

@Injectable()
export class MedicamentoProvider {

  constructor(private storage: Storage, private datepipe: DatePipe) { }

  public insert(medicamento: Medicamento) {
    let key = "M2E3D199" + medicamento.nome; // this.datepipe.transform(new Date(), "ddMMyyyyHHmmss");
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
      if (key.startsWith('M2E3D199')) {
        let medicamento = new MedicamentoList();
        medicamento.key = key;
        medicamento.medicamento = value;
        if (medicamento.medicamento.nome.toUpperCase() === nome.toUpperCase())
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
      if (key.startsWith('M2E3D199')) {
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
    var medicamento22 = new Medicamento(); medicamento22.nome = "BOZORED"; medicamento22.principioAtivo = "BOZORED"; medicamento22.PF0 = 2766.23; medicamento22.PF12 = 3143.44; medicamento22.PF17 = 3332.81; medicamento22.PF17ALC = 3332.81; medicamento22.PF175 = 3353.00; medicamento22.PF175ALC = 3353.00; medicamento22.PF18 = 3373.45; medicamento22.PF18ALC = 3373.45; medicamento22.PF20 = 3457.79
    var medicamento23 = new Medicamento(); medicamento23.nome = "ACCORD FARMACÊUTICA LTDA"; medicamento23.principioAtivo = "BORTYZ"; medicamento23.PF0 = 2179.50; medicamento23.PF12 = 2476.71; medicamento23.PF17 = 2625.91; medicamento23.PF17ALC = 2625.91; medicamento23.PF175 = 2641.82; medicamento23.PF175ALC = 2641.82; medicamento23.PF18 = 2657.93; medicamento23.PF18ALC = 2657.93; medicamento23.PF20 = 2724.38
    medicamento22.laboratoriosMedicamento = []; 
    medicamento22.laboratoriosMedicamento.push(medicamento23); 
    this.insert(medicamento22);

    var medicamento25 = new Medicamento(); medicamento25.nome = "DECITABINA"; medicamento25.principioAtivo = "DECITABINA"; medicamento25.PF0 = 2752.66; medicamento25.PF12 = 3128.02; medicamento25.PF17 = 3316.46; medicamento25.PF17ALC = 3316.46; medicamento25.PF175 = 3336.55; medicamento25.PF175ALC = 3336.55; medicamento25.PF18 = 3356.90; medicamento25.PF18ALC = 3356.90; medicamento25.PF20 = 3440.82
    var medicamento26 = new Medicamento(); medicamento26.nome = "JANSSEN-CILAG FARMACÊUTICA LTDA"; medicamento26.principioAtivo = "DACOGEN"; medicamento26.PF0 = 4234.91; medicamento26.PF12 = 4812.39; medicamento26.PF17 = 5102.30; medicamento26.PF17ALC = 5102.30; medicamento26.PF175 = 5133.22; medicamento26.PF175ALC = 5133.22; medicamento26.PF18 = 5164.52; medicamento26.PF18ALC = 5164.52; medicamento26.PF20 = 5293.63
    medicamento25.laboratoriosMedicamento = []; 
    medicamento25.laboratoriosMedicamento.push(medicamento26); 
    this.insert(medicamento25);

    var medicamento29 = new Medicamento(); medicamento29.nome = "BORTEZOMIBE"; medicamento29.principioAtivo = "BORTEZOMIBE"; medicamento29.PF0 = 2179.42; medicamento29.PF12 = 2476.61; medicamento29.PF17 = 2625.81; medicamento29.PF17ALC = 2625.81; medicamento29.PF175 = 2641.72; medicamento29.PF175ALC = 2641.72; medicamento29.PF18 = 2657.83; medicamento29.PF18ALC = 2657.83; medicamento29.PF20 = 2724.28
    var medicamento30 = new Medicamento(); medicamento30.nome = "ACCORD FARMACÊUTICA LTDA"; medicamento30.principioAtivo = "BORTEZOMIBE"; medicamento30.PF0 = 2179.50; medicamento30.PF12 = 2476.71; medicamento30.PF17 = 2625.91; medicamento30.PF17ALC = 2625.91; medicamento30.PF175 = 2641.82; medicamento30.PF175ALC = 2641.82; medicamento30.PF18 = 2657.93; medicamento30.PF18ALC = 2657.93; medicamento30.PF20 = 2724.38
    var medicamento31 = new Medicamento(); medicamento31.nome = "JANSSEN-CILAG FARMACÊUTICA LTDA"; medicamento31.principioAtivo = "VELCADE"; medicamento31.PF0 = 3353.01; medicamento31.PF12 = 3810.24; medicamento31.PF17 = 4039.78; medicamento31.PF17ALC = 4039.78; medicamento31.PF175 = 4064.26; medicamento31.PF175ALC = 4064.26; medicamento31.PF18 = 4089.04; medicamento31.PF18ALC = 4089.04; medicamento31.PF20 = 4191.27
    medicamento29.laboratoriosMedicamento = []; 
    medicamento29.laboratoriosMedicamento.push(medicamento30); 
    medicamento29.laboratoriosMedicamento.push(medicamento31); 
    this.insert(medicamento29);

    var medicamento35 = new Medicamento(); medicamento35.nome = "CABAZRED"; medicamento35.principioAtivo = "CABAZRED"; medicamento35.PF0 = 13764.52; medicamento35.PF12 = 15641.50; medicamento35.PF17 = 16583.76; medicamento35.PF17ALC = 16583.76; medicamento35.PF175 = 16684.26; medicamento35.PF175ALC = 16684.26; medicamento35.PF18 = 16786.00; medicamento35.PF18ALC = 16786.00; medicamento35.PF20 = 17205.65
    var medicamento36 = new Medicamento(); medicamento36.nome = "SANOFI-AVENTIS FARMACÊUTICA LTDA"; medicamento36.principioAtivo = "JEVTANA"; medicamento36.PF0 = 13764.97; medicamento36.PF12 = 15642.01; medicamento36.PF17 = 16584.31; medicamento36.PF17ALC = 16584.31; medicamento36.PF175 = 16684.81; medicamento36.PF175ALC = 16684.81; medicamento36.PF18 = 16786.55; medicamento36.PF18ALC = 16786.55; medicamento36.PF20 = 17206.21
    var medicamento37 = new Medicamento(); medicamento37.nome = "EUROFARMA LABORATÓRIOS S.A."; medicamento37.principioAtivo = "PROAZITAX"; medicamento37.PF0 = 13764.97; medicamento37.PF12 = 15642.01; medicamento37.PF17 = 16584.31; medicamento37.PF17ALC = 16584.31; medicamento37.PF175 = 16684.81; medicamento37.PF175ALC = 16684.81; medicamento37.PF18 = 16786.55; medicamento37.PF18ALC = 16786.55; medicamento37.PF20 = 17206.21
    medicamento35.laboratoriosMedicamento = []; 
    medicamento35.laboratoriosMedicamento.push(medicamento36); 
    medicamento35.laboratoriosMedicamento.push(medicamento37); 
    this.insert(medicamento35);

    var medicamento40 = new Medicamento(); medicamento40.nome = "CABAZITAXEL"; medicamento40.principioAtivo = "CABAZITAXEL"; medicamento40.PF0 = 8947.02; medicamento40.PF12 = 10167.07; medicamento40.PF17 = 10779.54; medicamento40.PF17ALC = 10779.54; medicamento40.PF175 = 10844.87; medicamento40.PF175ALC = 10844.87; medicamento40.PF18 = 10911.00; medicamento40.PF18ALC = 10911.00; medicamento40.PF20 = 11183.78
    var medicamento41 = new Medicamento(); medicamento41.nome = "EUROFARMA LABORATÓRIOS S.A."; medicamento41.principioAtivo = "CABAZITAXEL"; medicamento41.PF0 = 8947.23; medicamento41.PF12 = 10167.30; medicamento41.PF17 = 10779.79; medicamento41.PF17ALC = 10779.79; medicamento41.PF175 = 10845.12; medicamento41.PF175ALC = 10845.12; medicamento41.PF18 = 10911.25; medicamento41.PF18ALC = 10911.25; medicamento41.PF20 = 11184.03
    medicamento40.laboratoriosMedicamento = []; 
    medicamento40.laboratoriosMedicamento.push(medicamento41); 
    this.insert(medicamento40);

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
