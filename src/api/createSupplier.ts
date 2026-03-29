import { supabase } from '../lib/supabase';
import type { Supplier, NewSupplier } from '../domain/Supplier';
import { rowToSupplier } from './transformers/rowToSupplier';
import type { SupplierRow } from './transformers/rowToSupplier';

export async function createSupplier(data: NewSupplier): Promise<Supplier> {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    throw new Error('Not authenticated');
  }

  const { data: row, error } = await supabase
    .from('suppliers')
    .insert({
      user_id: session.user.id,
      name: data.name,
      emails: data.emails,
      phones: data.phones,
      website: data.website ?? null,
      address: data.address ?? null,
      contact_person: data.contactPerson ?? null,
      payment_terms: data.paymentTerms ?? null,
      notes: data.notes ?? null,
    })
    .select('*')
    .single();

  if (error) {
    throw new Error(`Failed to create supplier: ${error.message}`);
  }

  return rowToSupplier(row as SupplierRow);
}
