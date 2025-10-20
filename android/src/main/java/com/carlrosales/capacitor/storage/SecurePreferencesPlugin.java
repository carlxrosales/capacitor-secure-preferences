package com.carlrosales.capacitor.storage;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

@CapacitorPlugin(name = "SecurePreferences")
public class SecurePreferencesPlugin extends Plugin {

    private SecurePreferences implementation;

    @Override
    public void load() {
        implementation = new SecurePreferences(getContext());
    }

    @PluginMethod
    public void set(PluginCall call) {
        String key = call.getString("key");
        String value = call.getString("value");
        if (key == null || value == null) {
            call.reject("key and value are required");
            return;
        }
        implementation.set(key, value);
        call.resolve();
    }

    @PluginMethod
    public void get(PluginCall call) {
        String key = call.getString("key");
        if (key == null) {
            call.reject("key is required");
            return;
        }
        String value = implementation.get(key);
        JSObject ret = new JSObject();
        ret.put("value", value);
        call.resolve(ret);
    }

    @PluginMethod
    public void remove(PluginCall call) {
        String key = call.getString("key");
        if (key == null) {
            call.reject("key is required");
            return;
        }
        implementation.remove(key);
        call.resolve();
    }

    @PluginMethod
    public void keys(PluginCall call) {
        JSObject ret = new JSObject();
        ret.put("keys", implementation.keys());
        call.resolve(ret);
    }

    @PluginMethod
    public void clear(PluginCall call) {
        implementation.clear();
        call.resolve();
    }
}
