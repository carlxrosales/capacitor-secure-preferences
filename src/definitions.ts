export interface SecurePreferencesPlugin {
  echo(options: { value: string }): Promise<{ value: string }>;
}
