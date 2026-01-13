export interface SupplyOrder {
  id: number;
  date: string;
  status: string;
  supplier: Supplier;
  rawMaterials: RawMaterialQuantity[];
}

export interface Supplier {
  id: number;
  name: string;
  contact: string;
  rating: number;
  leadTime: number;
}

export interface RawMaterialQuantity {
  id: number;
  name: string;
  quantity: number;
}

export interface SupplyOrderRequest {
  orderDate: string;
  supplierId: number; // not used per item, but backend requires it → we'll take main supplier
  status: string;
  rawMaterials: RawMaterialWithQuantity[];
}

export interface RawMaterialWithQuantity {
  rawMaterialId: number;
  quantity: number;
}
