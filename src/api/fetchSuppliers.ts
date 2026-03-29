import { supabase } from '../lib/supabase';
import type { Supplier } from '../domain/Supplier';
import { rowToSupplier } from './transformers/rowToSupplier';
import type { SupplierRow } from './transformers/rowToSupplier';

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
