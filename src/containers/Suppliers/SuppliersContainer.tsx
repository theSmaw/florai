import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectSuppliersList } from '../../stores/suppliers/selectors/selectSuppliersList';
import { selectLoadSuppliersStatus } from '../../stores/suppliers/selectors/selectLoadSuppliersStatus';
import { selectSaveSupplierStatus } from '../../stores/suppliers/selectors/selectSaveSupplierStatus';
import { selectSaveSupplierError } from '../../stores/suppliers/selectors/selectSaveSupplierError';
import { loadSuppliers } from '../../stores/suppliers/asyncActions/loadSuppliers';
import { saveSupplier } from '../../stores/suppliers/asyncActions/saveSupplier';
import { deleteSupplier } from '../../stores/suppliers/asyncActions/deleteSupplier';
import type { AppDispatch } from '../../stores/store';
import type { Supplier, NewSupplier } from '../../domain/Supplier';
import { Suppliers } from '../../components/Suppliers/Suppliers';

export function SuppliersContainer() {
  const dispatch = useDispatch<AppDispatch>();

  const suppliers = useSelector(selectSuppliersList);
  const loadStatus = useSelector(selectLoadSuppliersStatus);
  const saveStatus = useSelector(selectSaveSupplierStatus);

  const isLoading = loadStatus.status === 'pending';
  const isSaving = saveStatus.status === 'pending';
  const saveError = useSelector(selectSaveSupplierError);

  const [modalSupplier, setModalSupplier] = useState<Supplier | 'new' | null>(null);
  const saveInitiated = useRef(false);

  useEffect(() => {
    if (loadStatus.status === 'idle') {
      void dispatch(loadSuppliers());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {
    if (!saveInitiated.current) return;
    if (saveStatus.status === 'fulfilled') {
      saveInitiated.current = false;
      setModalSupplier(null);
    } else if (saveStatus.status === 'rejected') {
      saveInitiated.current = false;
    }
  }, [saveStatus]);

  function handleAddClick() {
    setModalSupplier('new');
  }

  function handleEditClick(supplier: Supplier) {
    setModalSupplier(supplier);
  }

  function handleSave(data: NewSupplier, id?: string) {
    saveInitiated.current = true;
    void dispatch(id !== undefined ? saveSupplier({ supplier: data, id }) : saveSupplier({ supplier: data }));
  }

  function handleDelete(id: string) {
    void dispatch(deleteSupplier(id));
  }

  function handleModalClose() {
    setModalSupplier(null);
  }

  return (
    <Suppliers
      suppliers={suppliers}
      isLoading={isLoading}
      isSaving={isSaving}
      saveError={saveError}
      modalSupplier={modalSupplier}
      onAddClick={handleAddClick}
      onEditClick={handleEditClick}
      onSave={handleSave}
      onDelete={handleDelete}
      onModalClose={handleModalClose}
    />
  );
}
