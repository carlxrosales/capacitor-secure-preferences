import { WebPlugin } from '@capacitor/core';

import type { SecurePreferencesPlugin } from './definitions';

export class SecurePreferencesWeb extends WebPlugin implements SecurePreferencesPlugin {
  private prefix = 'csp:';

  async set(options: { key: string; value: string }): Promise<void> {
    const { key, value } = options;
    if (!key) throw new Error('key is required');
    localStorage.setItem(this.prefix + key, value);
  }

  async get(options: { key: string }): Promise<{ value: string | null }> {
    const { key } = options;
    if (!key) throw new Error('key is required');
    const value = localStorage.getItem(this.prefix + key);
    return { value };
  }

  async remove(options: { key: string }): Promise<void> {
    const { key } = options;
    if (!key) throw new Error('key is required');
    localStorage.removeItem(this.prefix + key);
  }

  async keys(): Promise<{ keys: string[] }> {
    const keys: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.startsWith(this.prefix)) {
        keys.push(k.substring(this.prefix.length));
      }
    }
    return { keys };
  }

  async clear(): Promise<void> {
    const toRemove: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.startsWith(this.prefix)) {
        toRemove.push(k);
      }
    }
    toRemove.forEach((k) => localStorage.removeItem(k));
  }
}
