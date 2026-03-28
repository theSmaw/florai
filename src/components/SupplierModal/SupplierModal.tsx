import { useState, useEffect, useId } from 'react';
import type { Supplier, NewSupplier } from '../../domain/Supplier';
import { ModalShell } from '../ModalShell/ModalShell';
import { SectionHeader } from '../SectionHeader/SectionHeader';
import { FormField } from '../FormField/FormField';
import { TextInput } from '../TextInput/TextInput';
import { TextArea } from '../TextArea/TextArea';
import { SaveButton } from '../SaveButton/SaveButton';
import { CancelButton } from '../CancelButton/CancelButton';
import styles from './SupplierModal.module.css';

export interface SupplierModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  supplier?: Supplier;
  saving: boolean;
  error: string | null;
  onSave: (data: NewSupplier, id?: string) => void;
}

export function SupplierModal({
  open,
  onOpenChange,
  supplier,
  saving,
  error,
  onSave,
}: SupplierModalProps) {
  const nameId = useId();
  const contactPersonId = useId();
  const websiteId = useId();
  const addressId = useId();
  const paymentTermsId = useId();
  const notesId = useId();

  const [name, setName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [emails, setEmails] = useState<string[]>(['']);
  const [phones, setPhones] = useState<string[]>(['']);
  const [website, setWebsite] = useState('');
  const [address, setAddress] = useState('');
  const [paymentTerms, setPaymentTerms] = useState('');
  const [notes, setNotes] = useState('');

  function resetForm() {
    if (supplier) {
      setName(supplier.name);
      setContactPerson(supplier.contactPerson ?? '');
      setEmails(supplier.emails.length > 0 ? supplier.emails : ['']);
      setPhones(supplier.phones.length > 0 ? supplier.phones : ['']);
      setWebsite(supplier.website ?? '');
      setAddress(supplier.address ?? '');
      setPaymentTerms(supplier.paymentTerms ?? '');
      setNotes(supplier.notes ?? '');
    } else {
      setName('');
      setContactPerson('');
      setEmails(['']);
      setPhones(['']);
      setWebsite('');
      setAddress('');
      setPaymentTerms('');
      setNotes('');
    }
  }

  useEffect(() => {
    if (open) {
      resetForm();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, supplier?.id]);

  function handleSave() {
    const data: NewSupplier = {
      name: name.trim(),
      emails: emails.filter((e) => e.trim().length > 0),
      phones: phones.filter((p) => p.trim().length > 0),
    };
    if (contactPerson.trim()) data.contactPerson = contactPerson.trim();
    if (website.trim()) data.website = website.trim();
    if (address.trim()) data.address = address.trim();
    if (paymentTerms.trim()) data.paymentTerms = paymentTerms.trim();
    if (notes.trim()) data.notes = notes.trim();
    onSave(data, supplier?.id);
  }

  const isValid = name.trim().length > 0;

  return (
    <ModalShell
      open={open}
      onOpenChange={onOpenChange}
      title={supplier ? 'Edit Supplier' : 'New Supplier'}
      closingDisabled={saving}
      footer={
        <>
          <CancelButton onClick={() => onOpenChange(false)} disabled={saving} />
          <SaveButton
            saving={saving}
            disabled={!isValid || saving}
            onClick={handleSave}
            data-cy="supplier-modal-save"
          />
        </>
      }
    >
      <div className={styles.section}>
        <SectionHeader label="Basic Info" as="h3" />
        <div className={styles.fieldGrid}>
          <FormField label="Name" htmlFor={nameId} required>
            <TextInput
              id={nameId}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Holland Flowers"
              data-cy="supplier-name-input"
            />
          </FormField>
          <FormField label="Contact person" htmlFor={contactPersonId}>
            <TextInput
              id={contactPersonId}
              value={contactPerson}
              onChange={(e) => setContactPerson(e.target.value)}
              placeholder="e.g. Jan de Vries"
            />
          </FormField>
        </div>
      </div>

      <div className={styles.section}>
        <SectionHeader label="Contact" as="h3" />
        <div className={styles.fieldGrid}>
          <FormField label="Email(s)">
            <div className={styles.dynamicList} data-cy="emails-list">
              {emails.map((email, i) => (
                <div key={i} className={styles.dynamicRow}>
                  <TextInput
                    className={styles.dynamicInput}
                    type="email"
                    value={email}
                    onChange={(e) => {
                      const next = [...emails];
                      next[i] = e.target.value;
                      setEmails(next);
                    }}
                    placeholder="email@example.com"
                    data-cy="supplier-email-input"
                  />
                  {emails.length > 1 && (
                    <button
                      type="button"
                      className={styles.removeButton}
                      aria-label="Remove email"
                      onClick={() => setEmails(emails.filter((_, j) => j !== i))}
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                className={styles.addLink}
                data-cy="add-email-button"
                onClick={() => setEmails([...emails, ''])}
              >
                + Add email
              </button>
            </div>
          </FormField>

          <FormField label="Phone(s)">
            <div className={styles.dynamicList} data-cy="phones-list">
              {phones.map((phone, i) => (
                <div key={i} className={styles.dynamicRow}>
                  <TextInput
                    className={styles.dynamicInput}
                    type="tel"
                    value={phone}
                    onChange={(e) => {
                      const next = [...phones];
                      next[i] = e.target.value;
                      setPhones(next);
                    }}
                    placeholder="+1 555 000 0000"
                    data-cy="supplier-phone-input"
                  />
                  {phones.length > 1 && (
                    <button
                      type="button"
                      className={styles.removeButton}
                      aria-label="Remove phone"
                      onClick={() => setPhones(phones.filter((_, j) => j !== i))}
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                className={styles.addLink}
                data-cy="add-phone-button"
                onClick={() => setPhones([...phones, ''])}
              >
                + Add phone
              </button>
            </div>
          </FormField>

          <FormField label="Website" htmlFor={websiteId}>
            <TextInput
              id={websiteId}
              type="url"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              placeholder="https://example.com"
            />
          </FormField>
        </div>
      </div>

      <div className={styles.section}>
        <SectionHeader label="Location" as="h3" />
        <div className={styles.fieldGrid}>
          <FormField label="Address" htmlFor={addressId}>
            <TextArea
              id={addressId}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              rows={2}
              placeholder="Street, City, Country"
            />
          </FormField>
        </div>
      </div>

      <div className={styles.section}>
        <SectionHeader label="Details" as="h3" />
        <div className={styles.fieldGrid}>
          <FormField label="Payment terms" htmlFor={paymentTermsId}>
            <TextInput
              id={paymentTermsId}
              value={paymentTerms}
              onChange={(e) => setPaymentTerms(e.target.value)}
              placeholder="e.g. Net 30"
            />
          </FormField>
          <FormField label="Notes" htmlFor={notesId}>
            <TextArea
              id={notesId}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              placeholder="Any additional notes…"
            />
          </FormField>
        </div>
      </div>

      {error && <p className={styles.error} data-cy="supplier-modal-error">{error}</p>}
    </ModalShell>
  );
}
