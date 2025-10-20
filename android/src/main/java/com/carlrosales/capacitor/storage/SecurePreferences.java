package com.carlrosales.capacitor.storage;

import android.content.Context;
import android.content.SharedPreferences;
import androidx.security.crypto.EncryptedSharedPreferences;
import androidx.security.crypto.MasterKey;
import com.getcapacitor.Logger;
import java.io.IOException;
import java.security.GeneralSecurityException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class SecurePreferences {

    private static final String PREFS_FILE_NAME = "capacitor_secure_prefs";
    private final Context context;

    public SecurePreferences(Context context) {
        this.context = context.getApplicationContext();
    }

    private SharedPreferences getPrefs() throws GeneralSecurityException, IOException {
        MasterKey masterKey = new MasterKey.Builder(context)
            .setKeyScheme(MasterKey.KeyScheme.AES256_GCM)
            .build();

        return EncryptedSharedPreferences.create(
            context,
            PREFS_FILE_NAME,
            masterKey,
            EncryptedSharedPreferences.PrefKeyEncryptionScheme.AES256_SIV,
            EncryptedSharedPreferences.PrefValueEncryptionScheme.AES256_GCM
        );
    }

    public void set(String key, String value) {
        try {
            SharedPreferences prefs = getPrefs();
            prefs.edit().putString(key, value).apply();
        } catch (Exception e) {
            Logger.error("SecurePreferences", "Failed to set value", e);
            throw new RuntimeException(e);
        }
    }

    public String get(String key) {
        try {
            SharedPreferences prefs = getPrefs();
            return prefs.getString(key, null);
        } catch (Exception e) {
            Logger.error("SecurePreferences", "Failed to get value", e);
            throw new RuntimeException(e);
        }
    }

    public void remove(String key) {
        try {
            SharedPreferences prefs = getPrefs();
            prefs.edit().remove(key).apply();
        } catch (Exception e) {
            Logger.error("SecurePreferences", "Failed to remove value", e);
            throw new RuntimeException(e);
        }
    }

    public List<String> keys() {
        try {
            SharedPreferences prefs = getPrefs();
            Map<String, ?> all = prefs.getAll();
            return new ArrayList<>(all.keySet());
        } catch (Exception e) {
            Logger.error("SecurePreferences", "Failed to list keys", e);
            throw new RuntimeException(e);
        }
    }

    public void clear() {
        try {
            SharedPreferences prefs = getPrefs();
            prefs.edit().clear().apply();
        } catch (Exception e) {
            Logger.error("SecurePreferences", "Failed to clear", e);
            throw new RuntimeException(e);
        }
    }
}
