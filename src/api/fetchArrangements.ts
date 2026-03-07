import { supabase } from '../lib/supabase';
import type { Arrangement, ArrangementOccasion, ArrangementSize, ArrangementStyle } from '../domain/Arrangement';

interface ArrangementRow {
  id: string;
  user_id: string;
  name: string;
  image_url: string | null;
  description: string | null;
  flower_ids: string[];
  size: string;
  style: string | null;
  occasion: string[] | null;
  stem_count: number | null;
  estimated_weight_grams: number | null;
  time_to_build_minutes: number | null;
  vase_life_days: number | null;
  wholesale_cost: number | null;
  retail_price: number | null;
  notes: string | null;
  created_at: string;
}

function rowToArrangement(row: ArrangementRow): Arrangement {
  const arrangement: Arrangement = {
    id: row.id,
    name: row.name,
    flowerIds: row.flower_ids,
    size: row.size as ArrangementSize,
    createdAt: row.created_at,
  };

  if (row.image_url !== null) arrangement.imageUrl = row.image_url;
  if (row.description !== null) arrangement.description = row.description;
  if (row.style !== null) arrangement.style = row.style as ArrangementStyle;
  if (row.occasion !== null && row.occasion.length > 0)
    arrangement.occasion = row.occasion as ArrangementOccasion[];
  if (row.stem_count !== null) arrangement.stemCount = row.stem_count;
  if (row.estimated_weight_grams !== null) arrangement.estimatedWeightGrams = row.estimated_weight_grams;
  if (row.time_to_build_minutes !== null) arrangement.timeToBuildMinutes = row.time_to_build_minutes;
  if (row.vase_life_days !== null) arrangement.vaseLifeDays = row.vase_life_days;
  if (row.wholesale_cost !== null) arrangement.wholesaleCost = row.wholesale_cost;
  if (row.retail_price !== null) arrangement.retailPrice = row.retail_price;
  if (row.notes !== null) arrangement.notes = row.notes;

  return arrangement;
}

export async function fetchArrangements(): Promise<Arrangement[]> {
  const { data, error } = await supabase
    .from('arrangements')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(`Failed to fetch arrangements: ${error.message}`);
  }

  return (data as ArrangementRow[]).map(rowToArrangement);
}
