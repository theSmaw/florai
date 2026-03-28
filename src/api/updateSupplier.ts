import { supabase } from '../lib/supabase';
import type { Supplier, NewSupplier } from '../domain/Supplier';

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

  const r = row as Record<string, unknown>;

  const supplier: Supplier = {
    id: r['id'] as string,
    name: r['name'] as string,
    emails: r['emails'] as string[],
    phones: r['phones'] as string[],
    createdAt: r['created_at'] as string,
  };

  if (r['website'] !== null && r['website'] !== undefined) supplier.website = r['website'] as string;
  if (r['address'] !== null && r['address'] !== undefined) supplier.address = r['address'] as string;
  if (r['contact_person'] !== null && r['contact_person'] !== undefined) supplier.contactPerson = r['contact_person'] as string;
  if (r['payment_terms'] !== null && r['payment_terms'] !== undefined) supplier.paymentTerms = r['payment_terms'] as string;
  if (r['notes'] !== null && r['notes'] !== undefined) supplier.notes = r['notes'] as string;

  return supplier;
}
