import { ApicultorSIPEC } from '../types/fields';

const APICULTORES_STORAGE_KEY = 'sag_apicultores_custom';

export function saveApicultoresToStorage(apicultores: ApicultorSIPEC[]): void {
  localStorage.setItem(APICULTORES_STORAGE_KEY, JSON.stringify(apicultores));
}

export function getApicultoresFromStorage(): ApicultorSIPEC[] {
  const stored = localStorage.getItem(APICULTORES_STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function addApicultoresToStorage(apicultores: ApicultorSIPEC[]): void {
  const existing = getApicultoresFromStorage();
  const merged = [...existing, ...apicultores];
  saveApicultoresToStorage(merged);
}

export function clearApicultoresFromStorage(): void {
  localStorage.removeItem(APICULTORES_STORAGE_KEY);
}
