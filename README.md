# capacitor-secure-preferences

A capacitor plugin to securely store key/value pairs such as passwords, tokens, and other sensitive information.

## Install

```bash
npm install capacitor-secure-preferences
npx cap sync
```

### Android

#### Backup rules

To prevent the preferences file from being backed up to the cloud, you need to add backup rules to your Android project. You can read more about this in the [Android documentation](https://developer.android.com/identity/data/autobackup#IncludingFiles).

##### Android 11 and lower

Add the `android:fullBackupContent` attribute to the `<application>` tag in your `AndroidManifest.xml` file:

```xml
<application
  android:fullBackupContent="@xml/full_backup_content">
</application>
```

Create a new file `res/xml/full_backup_content.xml` with the following content:

```xml
<?xml version="1.0" encoding="utf-8"?>
<full-backup-content>
  <include domain="sharedpref" path="."/>
  <exclude domain="sharedpref" path="capacitor_secure_prefs.xml"/>
</full-backup-content>
```

##### Android 12 and higher

Add the `android:dataExtractionRules` attribute to the `<application>` tag in your `AndroidManifest.xml` file:

```xml
<application
  android:dataExtractionRules="@xml/data_extraction_rules">
</application>
```

Create a new file `res/xml/data_extraction_rules.xml` with the following content:

```xml
<?xml version="1.0" encoding="utf-8"?>
<data-extraction-rules>
 <cloud-backup disableIfNoEncryptionCapabilities="true">
   <include domain="sharedpref" path="."/>
   <exclude domain="sharedpref" path="capacitor_secure_prefs.xml"/>
 </cloud-backup>
</data-extraction-rules>
```

#### Proguard

If you are using Proguard (code obfuscation), you need to add the following rules to your `proguard-rules.pro` file:

```proguard
-keep class com.carlrosales.capacitor.storage.** { *; }
```

> **Note**: These Proguard rules are only needed if your app has `minifyEnabled true` in your build configuration. If you're not using Proguard, you can safely ignore this step.

## Compatibility

- **iOS**: 15.0+ (uses Keychain with iCloud Keychain sync)
- **Android**: API level 24+ (uses EncryptedSharedPreferences)
- **Web**: Uses localStorage (unencrypted - for development only)

> **⚠️ Web Platform Warning**: On Web, the value is stored unencrypted in localStorage. This is for development purposes only and should not be used in production.

## Usage

```typescript
import { SecurePreferences } from 'capacitor-secure-preferences';

// Set a value
await SecurePreferences.set({ key: 'password', value: 'secret123' });

// Get a value
const { value } = await SecurePreferences.get({ key: 'password' });
console.log(value); // 'secret123'

// Remove a value
await SecurePreferences.remove({ key: 'password' });

// Get all keys
const { keys } = await SecurePreferences.keys();
console.log(keys); // ['password', 'token', ...]

// Clear all values
await SecurePreferences.clear();
```

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
