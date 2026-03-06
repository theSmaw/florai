import type { Meta, StoryObj } from '@storybook/react';
import type { Flower } from '../../domain/Flower';
import { FlowerDetail } from './FlowerDetail';

const meta: Meta<typeof FlowerDetail> = {
  title: 'Components/FlowerDetail',
  component: FlowerDetail,
  tags: ['autodocs'],
  args: {
    uploadingImage: false,
    uploadError: null,
    savingSupplier: false,
    supplierError: null,
    savingCare: false,
    saveCareError: null,
    onBack: () => undefined,
    onImageUpload: () => undefined,
    onAddSupplier: () => undefined,
    onUpdateSupplier: () => undefined,
    onRemoveSupplier: () => undefined,
    onCareSave: () => undefined,
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

// ---------------------------------------------------------------------------
// Mock data
// ---------------------------------------------------------------------------

const MOCK_FLOWER: Flower = {
  id: '1',
  name: 'Peony Sarah Bernhardt',
  colors: ['pink', 'white'],
  type: 'Peony',
  wholesalePrice: 4.5,
  supplier: 'Holland Flowers',
  suppliers: [],
  season: ['Spring'],
  availability: 'seasonal',
  climate: 'temperate',
  stemLengthCm: 50,
  fragranceLevel: 'strong',
  toxicity: 'safe',
  vaseLifeDays: 7,
  careInstructions: 'Keep in cool water, change daily. Remove lower leaves that would sit below the waterline.',
  notes: 'Beautiful full bloom. Order 2 weeks in advance for spring weddings.',
  complementaryFlowerIds: ['2', '3'],
};

const MOCK_FLOWER_WITH_SUPPLIERS: Flower = {
  ...MOCK_FLOWER,
  suppliers: [
    { id: 's1', name: 'Holland Flowers', wholesalePrice: 4.5 },
    { id: 's2', name: 'Kenya Blooms', wholesalePrice: 3.75 },
  ],
};

const MOCK_COMPLEMENTARY: Flower[] = [
  {
    id: '2',
    name: 'Explorer Red Rose',
    colors: ['red'],
    type: 'Rose',
    wholesalePrice: 2.25,
    supplier: 'Kenya Blooms',
    suppliers: [],
    season: ['Year-round'],
    availability: 'always',
    climate: 'subtropical',
    complementaryFlowerIds: [],
    careInstructions: '',
    notes: '',
  },
  {
    id: '3',
    name: 'Annabelle Hydrangea',
    colors: ['white'],
    type: 'Hydrangea',
    wholesalePrice: 3.75,
    supplier: 'Dutch Garden',
    suppliers: [],
    season: ['Summer'],
    availability: 'seasonal',
    climate: 'temperate',
    complementaryFlowerIds: [],
    careInstructions: '',
    notes: '',
  },
];

// ---------------------------------------------------------------------------
// Stories
// ---------------------------------------------------------------------------

export const Default: Story = {
  name: 'Full details (no suppliers yet)',
  args: {
    flower: MOCK_FLOWER,
    complementaryFlowers: MOCK_COMPLEMENTARY,
  },
};

export const WithSuppliers: Story = {
  name: 'With suppliers',
  args: {
    flower: MOCK_FLOWER_WITH_SUPPLIERS,
    complementaryFlowers: MOCK_COMPLEMENTARY,
  },
};

export const UploadingImage: Story = {
  name: 'Image uploading in progress',
  args: {
    flower: MOCK_FLOWER,
    complementaryFlowers: [],
    uploadingImage: true,
  },
};

export const UploadError: Story = {
  name: 'Upload failed',
  args: {
    flower: MOCK_FLOWER,
    complementaryFlowers: [],
    uploadError: 'Image upload failed: Storage quota exceeded',
  },
};

export const NoOptionalFields: Story = {
  name: 'Minimal (no optional fields)',
  args: {
    flower: {
      id: '4',
      name: 'Simple Tulip',
      colors: ['yellow'],
      type: 'Tulip',
      wholesalePrice: 1.5,
      supplier: 'Spring Co.',
      suppliers: [],
      season: ['Spring'],
      availability: 'limited',
      climate: 'mediterranean',
      complementaryFlowerIds: [],
      careInstructions: '',
      notes: '',
    },
    complementaryFlowers: [],
  },
};

export const NoPairings: Story = {
  name: 'No complementary flowers',
  args: {
    flower: MOCK_FLOWER,
    complementaryFlowers: [],
  },
};

export const ToxicFlower: Story = {
  name: 'Toxic flower',
  args: {
    flower: {
      ...MOCK_FLOWER,
      name: 'Lily of the Valley',
      toxicity: 'toxic',
      availability: 'always',
      climate: 'temperate',
      fragranceLevel: 'moderate',
    },
    complementaryFlowers: [],
  },
};

export const SavingSupplier: Story = {
  name: 'Saving supplier in progress',
  args: {
    flower: MOCK_FLOWER_WITH_SUPPLIERS,
    complementaryFlowers: [],
    savingSupplier: true,
  },
};

export const SupplierError: Story = {
  name: 'Supplier operation failed',
  args: {
    flower: MOCK_FLOWER_WITH_SUPPLIERS,
    complementaryFlowers: [],
    supplierError: 'Failed to save supplier: network error',
  },
};

export const SavingCare: Story = {
  name: 'Care instructions saving in progress',
  args: {
    flower: MOCK_FLOWER,
    complementaryFlowers: [],
    savingCare: true,
  },
};

export const SaveCareError: Story = {
  name: 'Care instructions save failed',
  args: {
    flower: MOCK_FLOWER,
    complementaryFlowers: [],
    saveCareError: 'Failed to save care instructions: network error',
  },
};
