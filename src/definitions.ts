export interface SecurePreferencesPlugin {
  /**
   * Persist a string value for the given key.
   */
  set(options: { key: string; value: string }): Promise<void>;

  /**
   * Retrieve the string value for the given key.
   * Returns null if the key is not set.
   */
  get(options: { key: string }): Promise<{ value: string | null }>;

  /**
   * Remove the value for the given key if it exists.
   */
  remove(options: { key: string }): Promise<void>;

  /**
   * Get all stored keys.
   */
  keys(): Promise<{ keys: string[] }>;

  /**
   * Remove all stored entries for this plugin.
   */
  clear(): Promise<void>;
}
