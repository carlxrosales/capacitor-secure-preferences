package com.carlrosales.capacitor.storage;

import com.getcapacitor.Logger;

public class SecurePreferences {

    public String echo(String value) {
        Logger.info("Echo", value);
        return value;
    }
}
