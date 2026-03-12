import { createAsyncThunk } from '@reduxjs/toolkit';
import { createUserFlower as createUserFlowerApi } from '../../../api/createUserFlower';
import type { Flower } from '../../../domain/Flower';
import type { NewFlower } from '../../../domain/Flower';

export const createUserFlower = createAsyncThunk<Flower, NewFlower>(
  'flowers/createUserFlower',
  (data: NewFlower) => createUserFlowerApi(data),
);
