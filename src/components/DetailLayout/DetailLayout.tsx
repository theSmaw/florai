// DetailLayout — shared split-panel shell for FlowerDetail and ArrangementDetail.
// Owns the header (back button), the image panel (with upload), and the body split.
// The right-hand details panel is passed as children.
import { useRef } from 'react';
import { ChevronLeftIcon, UploadIcon } from '@radix-ui/react-icons';
import styles from './DetailLayout.module.css';

export interface DetailLayoutProps {
  backLabel: string;
  onBack: () => void;
  contextLabel: string;
  imageUrl?: string;
  imageAlt: string;
  uploadingImage: boolean;
  uploadError: string | null;
  onImageUpload: (file: File) => void;
  imageCy?: string;
  children: React.ReactNode;
}

export function DetailLayout({
  backLabel,
  onBack,
  contextLabel,
  imageUrl,
  imageAlt,
  uploadingImage,
  uploadError,
  onImageUpload,
  imageCy,
  children,
}: DetailLayoutProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleImgError(e: React.SyntheticEvent<HTMLImageElement>) {
    const img = e.currentTarget;
    const fallback = '/images/placeholder.svg';
    if (!img.src.endsWith(fallback)) img.src = fallback;
  }

  function handleUploadClick() {
    fileInputRef.current?.click();
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      onImageUpload(file);
      e.target.value = '';
    }
  }

  return (
    <div className={styles.root}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <button
            data-cy="back-button"
            className={styles.backButton}
            onClick={onBack}
            aria-label={`Back to ${backLabel}`}
          >
            <ChevronLeftIcon width={14} height={14} aria-hidden="true" />
            {backLabel}
          </button>
          <div className={styles.headerDivider} />
          <span className={styles.headerContext}>{contextLabel}</span>
        </div>
      </header>

      {/* Body */}
      <div className={styles.body}>
        {/* Left: image */}
        <section className={styles.imagePanel} aria-label={`${imageAlt} image`}>
          <div className={styles.imageWrapper}>
            <img
              {...(imageCy ? { 'data-cy': imageCy } : {})}
              src={imageUrl ?? '/images/placeholder.svg'}
              alt={imageAlt}
              className={styles.image}
              onError={handleImgError}
            />
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className={styles.hiddenInput}
              onChange={handleFileChange}
              aria-label={`Upload ${imageAlt}`}
            />
            <button
              data-cy="upload-image-button"
              type="button"
              className={styles.uploadButton}
              onClick={handleUploadClick}
              disabled={uploadingImage}
              aria-label={`Upload new ${imageAlt}`}
            >
              <UploadIcon width={14} height={14} aria-hidden="true" />
              {uploadingImage ? 'Uploading…' : 'Replace image'}
            </button>
            {uploadError && (
              <p data-cy="upload-error" className={styles.uploadError}>{uploadError}</p>
            )}
          </div>
        </section>

        {/* Right: details panel (domain-specific content) */}
        <section className={styles.detailsPanel}>
          {children}
        </section>
      </div>
    </div>
  );
}
