import { registerPlugin } from '@capacitor/core';

import type { SecurePreferencesPlugin } from './definitions';

const SecurePreferences = registerPlugin<SecurePreferencesPlugin>('SecurePreferences', {
  web: () => import('./web').then((m) => new m.SecurePreferencesWeb()),
});

export * from './definitions';
export { SecurePreferences };
