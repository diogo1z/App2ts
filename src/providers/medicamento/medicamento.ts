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

  public cleanAll(){
    this.storage.forEach((value: Medicamento, key: string, iterationNumber: Number) => {
      if (key.startsWith('M2E3D199')) {
        this.remove(key);
      }
  }).then(() => {
    return Promise.resolve(null);
  })
  .catch((error) => {
    return Promise.reject(error);
  });
}

  public carregarDadosIniciais() {
    //this.cleanAll();

    var medicamento95 = new Medicamento(); medicamento95.nome = "ABIRATERONA"; medicamento95.PF0 = 8479.21; medicamento95.PF12 = 9798.47; medicamento95.PF17 = 10477.99; medicamento95.PF175 = 10551.17; medicamento95.PF18 = 10625.39; medicamento95.PF20 = 10933.02; 
    medicamento95.maxDescontoADM = 0; medicamento95.maxDescontoGER = 0;medicamento95.maxDescontoKAM = 0;
    var medicamento96 = new Medicamento(); medicamento96.nome = "ABIRATERONA - JANSSEN-CILAG FARMACÊUTICA LTDA"; medicamento96.PF0 = 8479.21; medicamento96.PF12 = 9798.47; medicamento96.PF17 = 10477.99; medicamento96.PF175 = 10551.17; medicamento96.PF18 = 10625.39; medicamento96.PF20 = 10933.02; 
    medicamento96.maxDescontoADM = 100; medicamento96.maxDescontoGER = 100;medicamento96.maxDescontoKAM = 100;
    medicamento95.laboratoriosMedicamento = []; 
    medicamento95.laboratoriosMedicamento.push(medicamento96); 
    this.insert(medicamento95);

    var medicamento22 = new Medicamento(); medicamento22.nome = "BOZORED"; medicamento22.PF0 = 2766.23; medicamento22.PF12 = 3143.44; medicamento22.PF17 = 3332.81; medicamento22.PF17ALC = 3332.81; medicamento22.PF175 = 3353.00; medicamento22.PF175ALC = 3353.00; medicamento22.PF18 = 3373.45; medicamento22.PF18ALC = 3373.45; medicamento22.PF20 = 3457.79;
    medicamento22.maxDescontoADM = 45; medicamento22.maxDescontoGER = 45;medicamento22.maxDescontoKAM = 35;
    var medicamento23 = new Medicamento(); medicamento23.nome = "BORTEZOMIBE MARCA - ACCORD FARMACÊUTICA LTDA"; medicamento23.PF0 = 2179.50; medicamento23.PF12 = 2476.71; medicamento23.PF17 = 2625.91; medicamento23.PF17ALC = 2625.91; medicamento23.PF175 = 2641.82; medicamento23.PF175ALC = 2641.82; medicamento23.PF18 = 2657.93; medicamento23.PF18ALC = 2657.93; medicamento23.PF20 = 2724.38;
    medicamento23.maxDescontoADM = 100; medicamento23.maxDescontoGER = 100;medicamento23.maxDescontoKAM = 100;
    var medicamento99 = new Medicamento(); medicamento99.nome = "BORTEZOMIBE MARCA - JANSSEN-CILAG FARMACÊUTICA LTDA"; medicamento99.PF0 = 3353.01; medicamento99.PF12 = 3810.24; medicamento99.PF17 = 4039.78; medicamento99.PF175 = 4064.26; medicamento99.PF18 = 4089.04; medicamento99.PF20 = 4191.27;
    medicamento99.maxDescontoADM = 100; medicamento99.maxDescontoGER = 100;medicamento99.maxDescontoKAM = 100;
    var medicamento331 = new Medicamento(); medicamento331.nome = "BORTEZOMIBE GENÉRICO - ACCORD FARMACÊUTICA LTDA"; medicamento331.PF0 = 2179.50; medicamento331.PF12 = 2476.71; medicamento331.PF17 = 2625.91; medicamento331.PF17ALC = 2625.91; medicamento331.PF175 = 2641.82; medicamento331.PF175ALC = 2641.82; medicamento331.PF18 = 2657.93; medicamento331.PF18ALC = 2657.93; medicamento331.PF20 = 2724.38;
    medicamento331.maxDescontoADM = 100; medicamento331.maxDescontoGER = 100;medicamento331.maxDescontoKAM = 100;
    medicamento22.laboratoriosMedicamento = []; 
    medicamento22.laboratoriosMedicamento.push(medicamento23); 
    medicamento22.laboratoriosMedicamento.push(medicamento99); 
    medicamento22.laboratoriosMedicamento.push(medicamento331); 
    this.insert(medicamento22);

    var medicamento29 = new Medicamento(); medicamento29.nome = "BORTEZOMIBE"; medicamento29.PF0 = 2179.42; medicamento29.PF12 = 2476.61; medicamento29.PF17 = 2625.81; medicamento29.PF17ALC = 2625.81; medicamento29.PF175 = 2641.72; medicamento29.PF175ALC = 2641.72; medicamento29.PF18 = 2657.83; medicamento29.PF18ALC = 2657.83; medicamento29.PF20 = 2724.28;
    medicamento29.maxDescontoADM = 35; medicamento29.maxDescontoGER = 35;medicamento29.maxDescontoKAM = 30;
    var medicamento30 = new Medicamento(); medicamento30.nome = "BORTEZOMIBE MARCA - ACCORD FARMACÊUTICA LTDA"; medicamento30.PF0 = 2179.50; medicamento30.PF12 = 2476.71; medicamento30.PF17 = 2625.91; medicamento30.PF17ALC = 2625.91; medicamento30.PF175 = 2641.82; medicamento30.PF175ALC = 2641.82; medicamento30.PF18 = 2657.93; medicamento30.PF18ALC = 2657.93; medicamento30.PF20 = 2724.38;
    medicamento30.maxDescontoADM = 100; medicamento30.maxDescontoGER = 100;medicamento30.maxDescontoKAM = 100;
    var medicamento31 = new Medicamento(); medicamento31.nome = "BORTEZOMIBE MARCA - JANSSEN-CILAG FARMACÊUTICA LTDA"; medicamento31.PF0 = 3353.01; medicamento31.PF12 = 3810.24; medicamento31.PF17 = 4039.78; medicamento31.PF17ALC = 4039.78; medicamento31.PF175 = 4064.26; medicamento31.PF175ALC = 4064.26; medicamento31.PF18 = 4089.04; medicamento31.PF18ALC = 4089.04; medicamento31.PF20 = 4191.27;
    medicamento31.maxDescontoADM = 100; medicamento31.maxDescontoGER = 100;medicamento31.maxDescontoKAM = 100;
    var medicamento332 = new Medicamento(); medicamento332.nome = "BORTEZOMIBE GENÉRICO - ACCORD FARMACÊUTICA LTDA"; medicamento332.PF0 = 2179.50; medicamento332.PF12 = 2476.71; medicamento332.PF17 = 2625.91; medicamento332.PF17ALC = 2625.91; medicamento332.PF175 = 2641.82; medicamento332.PF175ALC = 2641.82; medicamento332.PF18 = 2657.93; medicamento332.PF18ALC = 2657.93; medicamento332.PF20 = 2724.38;
    medicamento332.maxDescontoADM = 100; medicamento332.maxDescontoGER = 100;medicamento332.maxDescontoKAM = 100;
    medicamento29.laboratoriosMedicamento = []; 
    medicamento29.laboratoriosMedicamento.push(medicamento30); 
    medicamento29.laboratoriosMedicamento.push(medicamento31); 
    medicamento29.laboratoriosMedicamento.push(medicamento332); 
    this.insert(medicamento29);


    var medicamento35 = new Medicamento(); medicamento35.nome = "CABAZRED"; medicamento35.PF0 = 13764.52; medicamento35.PF12 = 15641.50; medicamento35.PF17 = 16583.76; medicamento35.PF17ALC = 16583.76; medicamento35.PF175 = 16684.26; medicamento35.PF175ALC = 16684.26; medicamento35.PF18 = 16786.00; medicamento35.PF18ALC = 16786.00; medicamento35.PF20 = 17205.65;
    medicamento35.maxDescontoADM = 45; medicamento35.maxDescontoGER = 45;medicamento35.maxDescontoKAM = 35;
    var medicamento36 = new Medicamento(); medicamento36.nome = "CABAZITAXEL MARCA - EUROFARMA LABORATÓRIOS S.A."; medicamento36.PF0 = 13764.97; medicamento36.PF12 = 15642.01; medicamento36.PF17 = 16584.31; medicamento36.PF17ALC = 16584.31; medicamento36.PF175 = 16684.81; medicamento36.PF175ALC = 16684.81; medicamento36.PF18 = 16786.55; medicamento36.PF18ALC = 16786.55; medicamento36.PF20 = 17206.21;
    medicamento36.maxDescontoADM = 100; medicamento36.maxDescontoGER = 100;medicamento36.maxDescontoKAM = 100;
    var medicamento37 = new Medicamento(); medicamento37.nome = "CABAZITAXEL MARCA - SANOFI-AVENTIS FARMACÊUTICA LTDA"; medicamento37.PF0 = 13764.97; medicamento37.PF12 = 15642.01; medicamento37.PF17 = 16584.31; medicamento37.PF17ALC = 16584.31; medicamento37.PF175 = 16684.81; medicamento37.PF175ALC = 16684.81; medicamento37.PF18 = 16786.55; medicamento37.PF18ALC = 16786.55; medicamento37.PF20 = 17206.21;
    medicamento37.maxDescontoADM = 100; medicamento37.maxDescontoGER = 100;medicamento37.maxDescontoKAM = 100;
    var medicamento333 = new Medicamento(); medicamento333.nome = "CABAZITAXEL GENÉRICO - EUROFARMA LABORATÓRIOS S.A."; medicamento333.PF0 = 8947.23; medicamento333.PF12 = 10167.3; medicamento333.PF17 = 10779.79; medicamento333.PF175 = 10845.12; medicamento333.PF18 = 10911.25; medicamento333.PF20 = 11184.03;
    medicamento333.maxDescontoADM = 100; medicamento333.maxDescontoGER = 100;medicamento333.maxDescontoKAM = 100;
    medicamento35.laboratoriosMedicamento = []; 
    medicamento35.laboratoriosMedicamento.push(medicamento36); 
    medicamento35.laboratoriosMedicamento.push(medicamento37); 
    medicamento35.laboratoriosMedicamento.push(medicamento333); 
    this.insert(medicamento35);


    var medicamento40 = new Medicamento(); medicamento40.nome = "CABAZITAXEL"; medicamento40.PF0 = 8947.02; medicamento40.PF12 = 10167.07; medicamento40.PF17 = 10779.54; medicamento40.PF17ALC = 10779.54; medicamento40.PF175 = 10844.87; medicamento40.PF175ALC = 10844.87; medicamento40.PF18 = 10911.00; medicamento40.PF18ALC = 10911.00; medicamento40.PF20 = 11183.78;
    medicamento40.maxDescontoADM = 20; medicamento40.maxDescontoGER = 20;medicamento40.maxDescontoKAM = 15;
    var medicamento41 = new Medicamento(); medicamento41.nome = "EUROFARMA LABORATÓRIOS S.A."; medicamento41.PF0 = 8947.23; medicamento41.PF12 = 10167.30; medicamento41.PF17 = 10779.79; medicamento41.PF17ALC = 10779.79; medicamento41.PF175 = 10845.12; medicamento41.PF175ALC = 10845.12; medicamento41.PF18 = 10911.25; medicamento41.PF18ALC = 10911.25; medicamento41.PF20 = 11184.03;
    medicamento41.maxDescontoADM = 100; medicamento41.maxDescontoGER = 100;medicamento41.maxDescontoKAM = 100;
    var medicamento98 = new Medicamento(); medicamento98.nome = "SANOFI-AVENTIS FARMACÊUTICA LTDA"; medicamento98.PF0 = 13764.97; medicamento98.PF12 = 15642.01; medicamento98.PF17 = 16584.31; medicamento98.PF175 = 16684.81; medicamento98.PF18 = 16786.55; medicamento98.PF20 = 17206.21;
    medicamento98.maxDescontoADM = 100; medicamento98.maxDescontoGER = 100;medicamento98.maxDescontoKAM = 100;
    var medicamento334 = new Medicamento(); medicamento334.nome = "CABAZITAXEL GENÉRICO - EUROFARMA LABORATÓRIOS S.A."; medicamento334.PF0 = 8947.23; medicamento334.PF12 = 10167.3; medicamento334.PF17 = 10779.79; medicamento334.PF175 = 10845.12; medicamento334.PF18 = 10911.25; medicamento334.PF20 = 11184.03;
    medicamento334.maxDescontoADM = 100; medicamento334.maxDescontoGER = 100;medicamento334.maxDescontoKAM = 100;
    medicamento40.laboratoriosMedicamento = []; 
    medicamento40.laboratoriosMedicamento.push(medicamento41); 
    medicamento40.laboratoriosMedicamento.push(medicamento99); 
    medicamento40.laboratoriosMedicamento.push(medicamento334); 
    this.insert(medicamento40);

    var medicamento27 = new Medicamento();medicamento27.nome = "REDTIBIN";medicamento27.PF0 = 4234.90;medicamento27.PF12 = 4812.38;medicamento27.PF17 = 5102.29;medicamento27.PF17ALC = 5102.29;medicamento27.PF175  = 5133.21;medicamento27.PF175ALC  = 5133.21;medicamento27.PF18  = 5164.51;medicamento27.PF18ALC  = 5164.51;medicamento27.PF20  = 5293.62;
    medicamento27.maxDescontoADM = 45; medicamento27.maxDescontoGER = 45;medicamento27.maxDescontoKAM = 35;
    var medicamento26 = new Medicamento(); medicamento26.nome = "DECITABINA MARCA - JANSSEN-CILAG FARMACÊUTICA LTDA"; medicamento26.PF0 = 4234.91; medicamento26.PF12 = 4812.39; medicamento26.PF17 = 5102.30; medicamento26.PF17ALC = 5102.30; medicamento26.PF175 = 5133.22; medicamento26.PF175ALC = 5133.22; medicamento26.PF18 = 5164.52; medicamento26.PF18ALC = 5164.52; medicamento26.PF20 = 5293.63;
    medicamento26.maxDescontoADM = 100; medicamento26.maxDescontoGER = 100;medicamento26.maxDescontoKAM = 100;
    medicamento27.laboratoriosMedicamento = []; 
    medicamento27.laboratoriosMedicamento.push(medicamento26); 
    this.insert(medicamento27);

    var medicamento25 = new Medicamento(); medicamento25.nome = "DECITABINA"; medicamento25.PF0 = 2752.66; medicamento25.PF12 = 3128.02; medicamento25.PF17 = 3316.46; medicamento25.PF17ALC = 3316.46; medicamento25.PF175 = 3336.55; medicamento25.PF175ALC = 3336.55; medicamento25.PF18 = 3356.90; medicamento25.PF18ALC = 3356.90; medicamento25.PF20 = 3440.82;
    medicamento25.maxDescontoADM = 20; medicamento25.maxDescontoGER = 20;medicamento25.maxDescontoKAM = 15;
    var medicamento789 = new Medicamento(); medicamento789.nome = "DECITABINA MARCA - JANSSEN-CILAG FARMACÊUTICA LTDA"; medicamento789.PF0 = 4234.91; medicamento789.PF12 = 4812.39; medicamento789.PF17 = 5102.30; medicamento789.PF17ALC = 5102.30; medicamento789.PF175 = 5133.22; medicamento789.PF175ALC = 5133.22; medicamento789.PF18 = 5164.52; medicamento789.PF18ALC = 5164.52; medicamento789.PF20 = 5293.63;
    medicamento789.maxDescontoADM = 100; medicamento789.maxDescontoGER = 100;medicamento789.maxDescontoKAM = 100;
    medicamento25.laboratoriosMedicamento = []; 
    medicamento25.laboratoriosMedicamento.push(medicamento789); 
    this.insert(medicamento25);
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
  maxDescontoKAM : number;
  maxDescontoGER : number;
  maxDescontoADM : number;
}

export class MedicamentoList {
  key: string;
  medicamento: Medicamento;
}
