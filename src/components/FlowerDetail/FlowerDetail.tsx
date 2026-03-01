// FlowerDetail — pure presentational component
// Receives all data via props from FlowerDetailContainer.
import { ChevronLeftIcon } from '@radix-ui/react-icons';
import type { Availability, Flower, Toxicity } from '../../domain/Flower';
import {
  AVAILABILITY_LABEL,
  CLIMATE_LABEL,
  COLOR_HEX,
  FRAGRANCE_LABEL,
  FRAGRANCE_PIPS,
  TOXICITY_LABEL,
} from '../../domain/flowerDisplayMeta';
import { SectionHeader } from '../SectionHeader/SectionHeader';
import styles from './FlowerDetail.module.css';

// ─── Helpers ──────────────────────────────────────────────────────────────────

const tag = styles.tag ?? '';
const tagBrand = styles.tagBrand ?? '';
const tagWarning = styles.tagWarning ?? '';
const tagDanger = styles.tagDanger ?? '';

function availabilityTagClass(availability: Availability): string {
  if (availability === 'always') return `${tag} ${tagBrand}`;
  if (availability === 'limited') return `${tag} ${tagWarning}`;
  return tag;
}

function toxicityTagClass(toxicity: Toxicity): string {
  if (toxicity === 'safe') return `${tag} ${tagBrand}`;
  if (toxicity === 'toxic') return `${tag} ${tagDanger}`;
  return `${tag} ${tagWarning}`;
}

// ─── Component ────────────────────────────────────────────────────────────────

export interface FlowerDetailProps {
  flower: Flower;
  complementaryFlowers: Flower[];
  onBack: () => void;
}

export function FlowerDetail({ flower, complementaryFlowers, onBack }: FlowerDetailProps) {
  const fragrancePips = flower.fragranceLevel ? FRAGRANCE_PIPS[flower.fragranceLevel] : 0;

  function handleImgError(e: React.SyntheticEvent<HTMLImageElement>) {
    const img = e.currentTarget;
    const fallback = '/images/placeholder.svg';
    if (!img.src.endsWith(fallback)) img.src = fallback;
  }

  return (
    <div className={styles.root}>
      {/* ── Header ── */}
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <button
            data-cy="back-button"
            className={styles.backButton}
            onClick={onBack}
            aria-label="Back to catalogue"
          >
            <ChevronLeftIcon width={14} height={14} aria-hidden="true" />
            Catalogue
          </button>
          <div className={styles.headerDivider} />
          <span className={styles.headerContext}>Flower Details</span>
        </div>
      </header>

      {/* ── Body ── */}
      <div className={styles.body}>

        {/* ── Left: image ── */}
        <section className={styles.imagePanel} aria-label="Flower image">
          <div className={styles.imageWrapper}>
            <img
              src={flower.imageUrl ?? '/images/placeholder.svg'}
              alt={flower.name}
              className={styles.image}
              onError={handleImgError}
            />
          </div>
        </section>

        {/* ── Right: details ── */}
        <section
          className={styles.detailsPanel}
          aria-label="Flower details"
        >
          {/* Identity */}
          <div className={styles.identity}>
            <h1 data-cy="flower-name" className={styles.nameDisplay}>{flower.name}</h1>
            <div className={styles.identityMeta}>
              <span className={styles.typeLabel}>{flower.type}</span>
            </div>
          </div>

          {/* General */}
          <div className={styles.section}>
            <SectionHeader label="General" />
            <div className={styles.fieldGridSingle}>

              {/* Colors */}
              <div className={styles.field}>
                <span className={styles.fieldLabel}>Colors</span>
                <div className={styles.colorList}>
                  {flower.colors.map((color) => (
                    <div key={color} className={styles.colorChip}>
                      <div
                        className={styles.colorDot}
                        style={{ backgroundColor: COLOR_HEX[color] ?? '#e2e8f0' }}
                      />
                      {color}
                    </div>
                  ))}
                </div>
              </div>

              {/* Availability + Seasons */}
              <div className={styles.fieldGrid}>
                <div className={styles.field}>
                  <span className={styles.fieldLabel}>Availability</span>
                  <div className={styles.tagList}>
                    <span className={availabilityTagClass(flower.availability)}>
                      {AVAILABILITY_LABEL[flower.availability]}
                    </span>
                  </div>
                </div>

                <div className={styles.field}>
                  <span className={styles.fieldLabel}>Season</span>
                  <div className={styles.tagList}>
                    {flower.season.map((s) => (
                      <span key={s} className={styles.tag}>{s}</span>
                    ))}
                  </div>
                </div>

                <div className={styles.field}>
                  <span className={styles.fieldLabel}>Climate</span>
                  <div className={styles.tagList}>
                    <span data-cy="flower-climate" className={styles.tag}>{CLIMATE_LABEL[flower.climate]}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className={styles.section}>
            <SectionHeader label="Pricing" />
            <div className={styles.priceRow}>
              <div className={styles.priceCard}>
                <p className={styles.priceCardLabel}>Wholesale</p>
                <p className={styles.priceCardValue}>
                  ${flower.wholesalePrice.toFixed(2)}
                </p>
              </div>
              <div className={styles.priceCard}>
                <p className={styles.priceCardLabel}>Retail</p>
                <p className={`${styles.priceCardValue} ${styles.priceCardValueBrand}`}>
                  ${flower.retailPrice.toFixed(2)}
                </p>
              </div>
            </div>
          </div>

          {/* Sourcing */}
          <div className={styles.section}>
            <SectionHeader label="Sourcing" />
            <div className={styles.statList}>
              <div className={styles.statItem}>
                <span className={styles.statLabel}>Supplier</span>
                <span className={styles.statValue}>{flower.supplier}</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statLabel}>Origin</span>
                <span className={styles.statValue}>{flower.origin}</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statLabel}>Quantity on Hand</span>
                <span className={styles.statValue}>
                  {flower.quantityOnHand}
                  <span className={styles.inventoryUnit}> stems</span>
                </span>
              </div>
            </div>
          </div>

          {/* Physical characteristics */}
          {(flower.stemLengthCm !== undefined ||
            flower.vaseLifeDays !== undefined ||
            flower.fragranceLevel !== undefined ||
            flower.toxicity !== undefined) && (
            <div className={styles.section}>
              <SectionHeader label="Physical" />
              <div className={styles.statList}>
                {flower.stemLengthCm !== undefined && (
                  <div className={styles.statItem}>
                    <span className={styles.statLabel}>Stem Length</span>
                    <span className={styles.statValue}>{flower.stemLengthCm} cm</span>
                  </div>
                )}
                {flower.vaseLifeDays !== undefined && (
                  <div className={styles.statItem}>
                    <span className={styles.statLabel}>Vase Life</span>
                    <span className={styles.statValue}>{flower.vaseLifeDays} days</span>
                  </div>
                )}
                {flower.fragranceLevel !== undefined && (
                  <div className={styles.statItem}>
                    <span className={styles.statLabel}>Fragrance</span>
                    <div className={styles.fragranceIndicator}>
                      <div className={styles.fragrancePips}>
                        {[1, 2, 3].map((level) => (
                          <div
                            key={level}
                            className={
                              level <= fragrancePips
                                ? `${styles.fragrancePip} ${styles.fragrancePipActive}`
                                : styles.fragrancePip
                            }
                          />
                        ))}
                      </div>
                      <span className={styles.fragranceText}>
                        {FRAGRANCE_LABEL[flower.fragranceLevel]}
                      </span>
                    </div>
                  </div>
                )}
                {flower.toxicity !== undefined && (
                  <div className={styles.statItem}>
                    <span className={styles.statLabel}>Toxicity</span>
                    <span className={toxicityTagClass(flower.toxicity)}>
                      {TOXICITY_LABEL[flower.toxicity]}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Care instructions */}
          {flower.careInstructions && (
            <div className={styles.section}>
              <SectionHeader label="Botanical Care" />
              <div className={styles.textBlock}>
                <p className={styles.textBlockContent}>{flower.careInstructions}</p>
              </div>
            </div>
          )}

          {/* Notes */}
          {flower.notes && (
            <div className={styles.section}>
              <SectionHeader label="Sourcing Notes" />
              <div className={styles.textBlock}>
                <p className={styles.textBlockContent}>{flower.notes}</p>
              </div>
            </div>
          )}

          {/* Complementary flowers */}
          {complementaryFlowers.length > 0 && (
            <div className={styles.section}>
              <SectionHeader label="Pairs Well With" />
              <div className={styles.pairings}>
                {complementaryFlowers.map((f) => (
                  <div key={f.id} className={styles.pairingCard}>
                    <img
                      src={f.imageUrl ?? '/images/placeholder.svg'}
                      alt={f.name}
                      className={styles.pairingImage}
                      onError={handleImgError}
                    />
                    <span className={styles.pairingName}>{f.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
