import type { store, rootReducer } from './store'

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
