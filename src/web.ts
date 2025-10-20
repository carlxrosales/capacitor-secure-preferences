import { WebPlugin } from '@capacitor/core';

import type { SecurePreferencesPlugin } from './definitions';

export class SecurePreferencesWeb extends WebPlugin implements SecurePreferencesPlugin {
  async echo(options: { value: string }): Promise<{ value: string }> {
    console.log('ECHO', options);
    return options;
  }
}
