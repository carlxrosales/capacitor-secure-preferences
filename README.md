# capacitor-secure-preferences

A capacitor plugin to securely store key/value pairs such as passwords, tokens, and other sensitive information.

## Install

```bash
npm install capacitor-secure-preferences
npx cap sync
```

## Compatibility

- **iOS**: 15.0+ (uses Keychain with iCloud Keychain sync)
- **Android**: API level 24+ (uses EncryptedSharedPreferences)
- **Web**: Uses localStorage (unencrypted - for development only)

> **⚠️ Web Platform Warning**: On Web, the value is stored unencrypted in localStorage. This is for development purposes only and should not be used in production.

## API

<docgen-index>

* [`set(...)`](#set)
* [`get(...)`](#get)
* [`remove(...)`](#remove)
* [`keys()`](#keys)
* [`clear()`](#clear)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### set(...)

```typescript
set(options: { key: string; value: string; }) => Promise<void>
```

Persist a string value for the given key.

| Param         | Type                                         |
| ------------- | -------------------------------------------- |
| **`options`** | <code>{ key: string; value: string; }</code> |

--------------------


### get(...)

```typescript
get(options: { key: string; }) => Promise<{ value: string | null; }>
```

Retrieve the string value for the given key.
Returns null if the key is not set.

| Param         | Type                          |
| ------------- | ----------------------------- |
| **`options`** | <code>{ key: string; }</code> |

**Returns:** <code>Promise&lt;{ value: string | null; }&gt;</code>

--------------------


### remove(...)

```typescript
remove(options: { key: string; }) => Promise<void>
```

Remove the value for the given key if it exists.

| Param         | Type                          |
| ------------- | ----------------------------- |
| **`options`** | <code>{ key: string; }</code> |

--------------------


### keys()

```typescript
keys() => Promise<{ keys: string[]; }>
```

Get all stored keys.

**Returns:** <code>Promise&lt;{ keys: string[]; }&gt;</code>

--------------------


### clear()

```typescript
clear() => Promise<void>
```

Remove all stored entries for this plugin.

--------------------

</docgen-api>
