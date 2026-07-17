import { supabase } from '../lib/supabase';
import type { Supplier, NewSupplier } from '../domain/Supplier';
import { SUPPLIER_COLUMN_BY_FIELD, fullColumnPayload } from './columnMaps';
import { rowToSupplier } from './transformers/rowToSupplier';
import type { SupplierRow } from './transformers/rowToSupplier';

export async function updateSupplier(id: string, data: NewSupplier): Promise<Supplier> {
  const { data: row, error } = await supabase
    .from('suppliers')
    .update(fullColumnPayload(data, SUPPLIER_COLUMN_BY_FIELD))
    .eq('id', id)
    .select('*')
    .single();

  if (error) {
    throw new Error(`Failed to update supplier: ${error.message}`);
  }

  return rowToSupplier(row as SupplierRow);
}
