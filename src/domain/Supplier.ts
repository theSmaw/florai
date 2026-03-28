export interface Supplier {
  id: string;
  name: string;
  emails: string[];
  phones: string[];
  website?: string;
  address?: string;
  contactPerson?: string;
  paymentTerms?: string;
  notes?: string;
  createdAt: string;
}

export type NewSupplier = Omit<Supplier, 'id' | 'createdAt'>;
