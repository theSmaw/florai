# Redux Toolkit Integration

## Overview
The project now uses **Redux Toolkit** for global state management while maintaining the **laminar data flow** architecture.

## What Changed

### Dependencies Added
- `@reduxjs/toolkit@2.11.2` - Redux state management library
- `redux@5.0.1` - Redux core

### File Structure
```
stores/
├── store.ts                 # Redux store configuration (NEW)
├── index.ts                 # Store exports
└── counter/
    ├── types.ts             # State type definitions
    ├── slice.ts             # Redux Toolkit slice (REPLACES reducer + actions)
    ├── selectors.ts         # State selectors
    └── index.ts             # Counter exports
```

### Key Changes

#### 1. **Redux Store Configuration** (`stores/store.ts`)
- Uses `configureStore()` from Redux Toolkit
- Combines counter reducer automatically
- Provides middleware setup (Redux Thunk built-in)
- Exports typed `RootState` and `AppDispatch`

```typescript
export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});
```

#### 2. **Counter Slice** (`stores/counter/slice.ts`)
- Replaces separate `actions.ts` and `reducer.ts` files
- Uses `createSlice()` which generates action creators automatically
- Mutative syntax (Redux Toolkit uses Immer internally)
- Pure reducer logic in one file

```typescript
export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    incrementButtonClicked(state) {
      state.value += 1; // Immer handles immutability
    },
    // ...
  },
});

// Actions generated automatically
export const { incrementButtonClicked, ... } = counterSlice.actions;
export default counterSlice.reducer;
```

#### 3. **Selectors** (`stores/counter/selectors.ts`)
- Now access `RootState` instead of slice state
- Properly typed with Redux Toolkit types
- Same naming convention (`selectXXX`)

```typescript
export const selectCounterValue = (state: RootState): number => 
  state.counter.value;
```

#### 4. **App Bootstrap** (`app.ts`)
- Now uses Redux `store` directly
- Subscribes to store changes
- Redux handles state updates internally

#### 5. **Container** (`containers/CounterContainer.ts`)
- Uses Redux `dispatch` with proper types
- Reads state via selectors
- Dispatches Redux actions

## Benefits of Redux Toolkit

✅ **Reduced boilerplate** - No need to manually write action creators  
✅ **Immer integration** - Write "mutative" code safely  
✅ **Built-in middleware** - Redux Thunk pre-configured for async actions  
✅ **Better DevX** - Redux DevTools integration out of the box  
✅ **TypeScript support** - Excellent type inference  
✅ **Scalable** - Easy to add more slices/domains  

## Adding New Features

When adding new domain (e.g., `todos`):

1. Create `stores/todos/slice.ts`:
```typescript
export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: { /* ... */ },
});
```

2. Add to store in `stores/store.ts`:
```typescript
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    todos: todosReducer, // Add here
  },
});
```

3. Create `stores/todos/selectors.ts`, `index.ts`

4. Use in containers just like counter

## Async Operations (Future)

When adding async thunks:

```typescript
export const fetchTodos = createAsyncThunk(
  'todos/fetchTodos',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.getTodos();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: { /* ... */ },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.items = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      });
  },
});
```

## Laminar Flow with Redux

The data flow remains unidirectional:

```
User Interaction
    ↓
Component (emits event via callback)
    ↓
Container (dispatches Redux action)
    ↓
Reducer (updates store state via slice)
    ↓
Subscribers notified (store.subscribe)
    ↓
Container (reads new state via selector)
    ↓
Component re-rendered with new props
    ↓
UI Updated
```

Redux Toolkit simplifies the reducer layer while maintaining the clean architecture.

