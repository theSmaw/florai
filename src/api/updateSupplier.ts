import { supabase } from '../lib/supabase';
import type { Supplier, NewSupplier } from '../domain/Supplier';
import { rowToSupplier } from './transformers/SupplierRow';
import type { SupplierRow } from './transformers/SupplierRow';

export async function updateSupplier(id: string, data: NewSupplier): Promise<Supplier> {
  const { data: row, error } = await supabase
    .from('suppliers')
    .update({
      name: data.name,
      emails: data.emails,
      phones: data.phones,
      website: data.website ?? null,
      address: data.address ?? null,
      contact_person: data.contactPerson ?? null,
      payment_terms: data.paymentTerms ?? null,
      notes: data.notes ?? null,
    })
    .eq('id', id)
    .select('*')
    .single();

  if (error) {
    throw new Error(`Failed to update supplier: ${error.message}`);
  }

  return rowToSupplier(row as SupplierRow);
}
