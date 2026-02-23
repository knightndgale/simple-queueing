import { StateCreator } from "zustand";
import { PersistOptions, devtools, persist } from "zustand/middleware";

const PersistorGate = <T extends Record<string, any>>(
  f: StateCreator<T>,
  persistOptions: PersistOptions<T, T>
) => devtools(persist(f, persistOptions));

export default PersistorGate;
