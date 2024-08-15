import { Injectable } from '@angular/core';
import { Criteria } from '../data/criteria.data';

@Injectable({
  providedIn: 'root'
})
export class CriteriaService {

  private criteria: Criteria[] = [
    {name: "Bias", desc: "Biasness refers to unfounded beliefs on certain groups based on race, gender, religion, sexual orientation, or other factors.\nBiasness is a form of discrimination and is a violation of human rights.\n"},
    {name: "Fairness", desc: "Fairness refers to the quality of being impartial, just, and equitable. In general, it involves treating all individuals and groups in a way that is free from bias, favoritism, or discrimination. Fairness ensures that people have equal opportunities, access, and treatment regardless of their background, identity, or circumstances. It ensure that outcomes are just and do not systematically disadvantage or benefit any particular group."}
  ];

  constructor() { }

  public addCriteria(name: string, desc: string) {
    if (this.criteria.find(c => c.name == name) != undefined) {
      return;
    }

    this.criteria.push({name, desc});
  }

  public getCriteria(): Criteria[] {
    return this.criteria;
  }
}
