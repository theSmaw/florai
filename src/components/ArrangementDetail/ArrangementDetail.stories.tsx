import type { Meta, StoryObj } from '@storybook/react';
import { ArrangementDetail } from './ArrangementDetail';
import type { ArrangementDetailProps } from './ArrangementDetail';
import type { Arrangement } from '../../domain/Arrangement';
import type { Flower } from '../../domain/Flower';

const meta: Meta<typeof ArrangementDetail> = {
  title: 'Components/ArrangementDetail',
  component: ArrangementDetail,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

const MOCK_FLOWERS: Flower[] = [
  {
    id: '1',
    name: 'Peony Sarah Bernhardt',
    colors: ['pink'],
    type: 'Peony',
    wholesalePrice: 4.5,
    supplier: 'Holland Flowers',
    suppliers: [],
    season: ['Spring'],
    availability: 'seasonal',
    climate: 'temperate',
    careInstructions: '',
    notes: '',
    complementaryFlowerIds: [],
  },
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
    careInstructions: '',
    notes: '',
    complementaryFlowerIds: [],
  },
];

const MOCK_ARRANGEMENT: Arrangement = {
  id: 'a1',
  name: 'Spring Romance',
  size: 'medium',
  style: 'romantic',
  occasion: ['wedding'],
  flowerIds: ['1', '2'],
  stemCount: 25,
  estimatedWeightGrams: 450,
  timeToBuildMinutes: 45,
  vaseLifeDays: 7,
  wholesaleCost: 42.5,
  retailPrice: 120,
  notes: 'Great for spring weddings. Blush and cream palette.',
  createdAt: '2026-01-15T10:00:00Z',
};

const NO_OP = () => {};

function defaultProps(overrides?: Partial<ArrangementDetailProps>): ArrangementDetailProps {
  return {
    arrangement: MOCK_ARRANGEMENT,
    flowers: MOCK_FLOWERS,
    backLabel: 'Collection',
    onBack: NO_OP,
    onImageUpload: NO_OP,
    uploadingImage: false,
    uploadError: null,
    onNotesSave: NO_OP,
    savingNotes: false,
    saveNotesError: null,
    onFlowerSelect: NO_OP,
    ...overrides,
  };
}

export const Default: Story = {
  name: 'Default',
  render: () => <ArrangementDetail {...defaultProps()} />,
};

export const WithImage: Story = {
  name: 'With image',
  render: () => (
    <ArrangementDetail
      {...defaultProps({
        arrangement: { ...MOCK_ARRANGEMENT, imageUrl: '/images/placeholder.svg' },
      })}
    />
  ),
};

export const UploadingImage: Story = {
  name: 'Uploading image',
  render: () => <ArrangementDetail {...defaultProps({ uploadingImage: true })} />,
};

export const Minimal: Story = {
  name: 'Minimal arrangement',
  render: () => (
    <ArrangementDetail
      {...defaultProps({
        arrangement: {
          id: 'a2',
          name: 'Simple Posy',
          size: 'small',
          flowerIds: [],
          createdAt: '2026-01-10T10:00:00Z',
        },
        flowers: [],
      })}
    />
  ),
};
