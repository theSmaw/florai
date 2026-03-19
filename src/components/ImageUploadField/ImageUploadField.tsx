import { useEffect, useRef, useState } from 'react';
import { UploadIcon, Cross2Icon } from '@radix-ui/react-icons';
import styles from './ImageUploadField.module.css';

export interface ImageUploadFieldProps {
  file: File | null;
  onChange: (file: File | null) => void;
  disabled?: boolean;
}

export function ImageUploadField({ file, onChange, disabled = false }: ImageUploadFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!file) {
      setPreviewUrl(null);
      return;
    }
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  function handleClick() {
    if (!disabled) inputRef.current?.click();
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (!disabled && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      inputRef.current?.click();
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = e.target.files?.[0] ?? null;
    onChange(selected);
    e.target.value = '';
  }

  function handleRemove(e: React.MouseEvent) {
    e.stopPropagation();
    onChange(null);
  }

  return (
    <div
      data-cy="image-upload-field"
      className={`${styles.field} ${disabled ? styles.disabled : ''} ${previewUrl ? styles.hasImage : ''}`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-label={previewUrl ? 'Replace photo' : 'Add photo'}
    >
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className={styles.hiddenInput}
        onChange={handleChange}
        disabled={disabled}
        tabIndex={-1}
        aria-hidden="true"
      />

      {previewUrl ? (
        <>
          <img src={previewUrl} alt="Preview" className={styles.preview} />
          {!disabled && (
            <button
              type="button"
              data-cy="image-upload-remove"
              className={styles.removeButton}
              onClick={handleRemove}
              aria-label="Remove photo"
            >
              <Cross2Icon />
            </button>
          )}
        </>
      ) : (
        <div className={styles.placeholder}>
          <UploadIcon className={styles.uploadIcon} />
          <span className={styles.label}>Add photo</span>
        </div>
      )}
    </div>
  );
}
