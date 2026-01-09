import {Component, OnInit, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RawMaterialService} from '../../services/raw-material.service';
import {RawMaterial} from '../../../../api/material.api';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-materials',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  providers: [RawMaterialService],
  templateUrl: './materials.component.html',
  styleUrl: './materials.component.css'
})
export class MaterialsComponent implements OnInit {

  showForm = false;
  isEditMode = false;

  selectedMaterial = signal<RawMaterial | null>(null);

  rawMaterials = signal<RawMaterial[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);

  materialForm;


  constructor(private rawMaterialService: RawMaterialService,
              private fb: FormBuilder) {
    this.materialForm = this.fb.group({
      name: [''],
      unit: [''],
      minStock: [0],
      stock: [0]
    });
  }


  ngOnInit(): void {
    this.loadRawMaterials();
  }

  loadRawMaterials() {
    this.loading.set(true);
    this.error.set(null);


    this.rawMaterialService.getAllRawMetrials().subscribe({
        next: materials => {
          this.rawMaterials.set(materials);
          // this.totalElements.set(response.totalElements);
          this.loading.set(false);
        },
        error: () => {
          this.error.set('Unable to load raw materials');
          this.loading.set(false);
        }
      }
    )
  }

  editMaterial(material: RawMaterial) {
    this.isEditMode = true;
    this.selectedMaterial.set(material);
    this.showForm = true;

    this.materialForm.patchValue({
      name: material.name,
      unit: material.unit,
      minStock: material.minStock,
      stock: material.stock
    });
  }

  createMaterial() {
    this.isEditMode = false;
    this.selectedMaterial.set(null);
    this.materialForm.reset();
    this.showForm = true;
  }

  closeForm() {
    this.showForm = false;
    this.materialForm.reset();
  }


}
