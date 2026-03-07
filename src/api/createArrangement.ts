import { supabase } from '../lib/supabase';
import type { Arrangement, ArrangementOccasion, ArrangementStyle, NewArrangement } from '../domain/Arrangement';

export async function createArrangement(data: NewArrangement): Promise<Arrangement> {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    throw new Error('Not authenticated');
  }

  const { data: row, error } = await supabase
    .from('arrangements')
    .insert({
      user_id: session.user.id,
      name: data.name,
      flower_ids: data.flowerIds,
      size: data.size,
      style: data.style ?? null,
      occasion: data.occasion ?? null,
      stem_count: data.stemCount ?? null,
      estimated_weight_grams: data.estimatedWeightGrams ?? null,
      time_to_build_minutes: data.timeToBuildMinutes ?? null,
      vase_life_days: data.vaseLifeDays ?? null,
      wholesale_cost: data.wholesaleCost ?? null,
      retail_price: data.retailPrice ?? null,
      description: data.description ?? null,
      notes: data.notes ?? null,
    })
    .select('*')
    .single();

  if (error) {
    throw new Error(`Failed to create arrangement: ${error.message}`);
  }

  const arrangement: Arrangement = {
    id: (row as { id: string }).id,
    name: (row as { name: string }).name,
    flowerIds: (row as { flower_ids: string[] }).flower_ids,
    size: (row as { size: string }).size as Arrangement['size'],
    createdAt: (row as { created_at: string }).created_at,
  };

  const r = row as Record<string, unknown>;
  if (r['image_url'] !== null && r['image_url'] !== undefined) arrangement.imageUrl = r['image_url'] as string;
  if (r['description'] !== null && r['description'] !== undefined) arrangement.description = r['description'] as string;
  if (r['style'] !== null && r['style'] !== undefined) arrangement.style = r['style'] as ArrangementStyle;
  if (r['occasion'] !== null && r['occasion'] !== undefined && (r['occasion'] as string[]).length > 0)
    arrangement.occasion = r['occasion'] as ArrangementOccasion[];
  if (r['stem_count'] !== null && r['stem_count'] !== undefined) arrangement.stemCount = r['stem_count'] as number;
  if (r['estimated_weight_grams'] !== null && r['estimated_weight_grams'] !== undefined) arrangement.estimatedWeightGrams = r['estimated_weight_grams'] as number;
  if (r['time_to_build_minutes'] !== null && r['time_to_build_minutes'] !== undefined) arrangement.timeToBuildMinutes = r['time_to_build_minutes'] as number;
  if (r['vase_life_days'] !== null && r['vase_life_days'] !== undefined) arrangement.vaseLifeDays = r['vase_life_days'] as number;
  if (r['wholesale_cost'] !== null && r['wholesale_cost'] !== undefined) arrangement.wholesaleCost = r['wholesale_cost'] as number;
  if (r['retail_price'] !== null && r['retail_price'] !== undefined) arrangement.retailPrice = r['retail_price'] as number;
  if (r['notes'] !== null && r['notes'] !== undefined) arrangement.notes = r['notes'] as string;

  return arrangement;
}
