import { Component, OnInit } from '@angular/core';
import { Model } from '../models/model';
import { AbstractRepository } from '../services/abstract-repository';
import { ModelService } from '../services/model.service';
import { OperationUtils } from '../utils/operation-utils';

@Component({
  selector: 'app-table-models',
  templateUrl: './table-models.component.html',
  styleUrls: ['./table-models.component.css'],
})
export class TableModelsComponent implements OnInit {
  private operationUtils: OperationUtils;
  models: Model[];
  

  constructor(private modelService: ModelService) {
    this.modelService.findAll().subscribe((m) => (this.models = m));
    this.operationUtils = new OperationUtils();
  }

  ngOnInit(): void {
    this.modelService.findAll().subscribe((m) => console.log);
  }

  delete(id: number) {
    this.modelService.deleteById(id).subscribe();
    this.models = this.models.filter( m => m.Id != id);
    console.log(this.models);
  }
}
