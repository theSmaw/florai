import { supabase } from '../lib/supabase';
import type { Supplier } from '../domain/Supplier';

interface SupplierRow {
  id: string;
  user_id: string;
  name: string;
  emails: string[];
  phones: string[];
  website: string | null;
  address: string | null;
  contact_person: string | null;
  payment_terms: string | null;
  notes: string | null;
  created_at: string;
}

function rowToSupplier(row: SupplierRow): Supplier {
  const supplier: Supplier = {
    id: row.id,
    name: row.name,
    emails: row.emails,
    phones: row.phones,
    createdAt: row.created_at,
  };

  if (row.website !== null) supplier.website = row.website;
  if (row.address !== null) supplier.address = row.address;
  if (row.contact_person !== null) supplier.contactPerson = row.contact_person;
  if (row.payment_terms !== null) supplier.paymentTerms = row.payment_terms;
  if (row.notes !== null) supplier.notes = row.notes;

  return supplier;
}

export async function fetchSuppliers(): Promise<Supplier[]> {
  const { data, error } = await supabase
    .from('suppliers')
    .select('*')
    .order('name', { ascending: true });

  if (error) {
    throw new Error(`Failed to fetch suppliers: ${error.message}`);
  }

  return (data as SupplierRow[]).map(rowToSupplier);
}
