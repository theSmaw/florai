import { supabase } from '../lib/supabase';
import type { Supplier, NewSupplier } from '../domain/Supplier';
import { SUPPLIER_COLUMN_BY_FIELD, fullColumnPayload } from './columnMaps';
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
      ...fullColumnPayload(data, SUPPLIER_COLUMN_BY_FIELD),
    })
    .select('*')
    .single();

  if (error) {
    throw new Error(`Failed to create supplier: ${error.message}`);
  }

  return rowToSupplier(row as SupplierRow);
}
