import {Component, OnInit, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RawMaterialService} from '../../services/raw-material.service';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {SupplierService} from '../../services/supplier.service';
import {Supplier} from '../../../../api/supplier.api';
import {RawMaterialResponse, RawMaterialRequest} from '../../../../api/material.api';


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

  selectedMaterial = signal<RawMaterialResponse | null>(null);

  rawMaterials = signal<RawMaterialResponse[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);

  suppliers = signal<Supplier[]>([]);

  materialForm;

  constructor(private rawMaterialService: RawMaterialService,
              private supplierService: SupplierService,
              private fb: FormBuilder) {
    this.materialForm = this.fb.group({
      name: this.fb.nonNullable.control(''),
      unit: this.fb.nonNullable.control(''),
      minStock: this.fb.nonNullable.control(0),
      stock: this.fb.nonNullable.control(0),
      supplierIds: this.fb.nonNullable.control<number[]>([])
    });
  }

  ngOnInit(): void {
    this.loadRawMaterials();
    this.loadSuppliers();
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

  createMaterial() {
    this.isEditMode = false;
    this.selectedMaterial.set(null);
    this.materialForm.reset({
      name: '',
      unit: '',
      minStock: 0,
      stock: 0,
      supplierIds: []
    });
    this.showForm = true;
  }

  editMaterial(material: RawMaterialResponse) {
    this.isEditMode = true;
    this.selectedMaterial.set(material);
    this.showForm = true;

    const supplierIds = material.supplierIds || [];

    this.materialForm.patchValue({
      name: material.name,
      unit: material.unit,
      minStock: material.minStock,
      stock: material.stock,
      supplierIds: supplierIds
    });
  }

  deleteMaterial(materialId: number) {
    const confirmed = confirm('Êtes-vous sûr de vouloir supprimer cette matière ?');

    if (!confirmed) return;

    this.rawMaterialService.deleteRawMaterial(materialId).subscribe({
      next: () => {
        this.rawMaterials.update(materials =>
          materials.filter(m => m.id !== materialId));
      },
      error: () => {
        this.error.set('Impossible de supprimer la matière premiere');
      }
    })
    ;
  }

  closeForm() {
    this.showForm = false;
    this.materialForm.reset({
      name: '',
      unit: '',
      minStock: 0,
      stock: 0,
      supplierIds: []
    });
  }

  submitMaterial() {
    if (this.materialForm.invalid) {
      return;
    }

    const payload: RawMaterialRequest = {
      name: this.materialForm.controls.name.value,
      unit: this.materialForm.controls.unit.value,
      minStock: this.materialForm.controls.minStock.value,
      stock: this.materialForm.controls.stock.value,
      supplierIds: this.materialForm.controls.supplierIds.value
    };

    // UPDATE
    if (this.isEditMode && this.selectedMaterial()) {
      const id = this.selectedMaterial()!.id!;

      this.rawMaterialService.updateRawMaterial(id, payload).subscribe({
        next: () => {
          this.closeForm();
          this.loadRawMaterials(); // refresh list
        },
        error: () => {
          this.error.set('Failed to update material');
        }
      });

      return;
    }

    // CREATE
    this.rawMaterialService.createRawMaterial(payload).subscribe({
      next: () => {
        this.closeForm();
        this.loadRawMaterials(); // refresh list
      },
      error: () => {
        this.error.set('Failed to create material');
      }
    });
  }

  loadSuppliers() {
    this.supplierService.getAllSuppliers().subscribe({
      next: suppliers => this.suppliers.set(suppliers),
      error: () => this.error.set('Failed to load suppliers')
    });
  }
}
