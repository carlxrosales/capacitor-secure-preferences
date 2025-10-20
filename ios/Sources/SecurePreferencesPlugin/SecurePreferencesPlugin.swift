import Foundation
import Capacitor

/**
 * Please read the Capacitor iOS Plugin Development Guide
 * here: https://capacitorjs.com/docs/plugins/ios
 */
@available(iOS 15.0, *)
@objc(SecurePreferencesPlugin)
public class SecurePreferencesPlugin: CAPPlugin, CAPBridgedPlugin {
    public let identifier = "SecurePreferencesPlugin"
    public let jsName = "SecurePreferences"
    public let pluginMethods: [CAPPluginMethod] = [
        CAPPluginMethod(name: "set", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "get", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "remove", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "keys", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "clear", returnType: CAPPluginReturnPromise)
    ]
    private let implementation = SecurePreferences()

    @objc func set(_ call: CAPPluginCall) {
        guard let key = call.getString("key"), let value = call.getString("value") else {
            call.reject("key and value are required")
            return
        }
        do {
            try implementation.set(key: key, value: value)
            call.resolve()
        } catch {
            call.reject("Failed to set value: \(error.localizedDescription)")
        }
    }

    @objc func get(_ call: CAPPluginCall) {
        guard let key = call.getString("key") else {
            call.reject("key is required")
            return
        }
        do {
            let value = try implementation.get(key: key)
            call.resolve(["value": value as Any])
        } catch {
            call.reject("Failed to get value: \(error.localizedDescription)")
        }
    }

    @objc func remove(_ call: CAPPluginCall) {
        guard let key = call.getString("key") else {
            call.reject("key is required")
            return
        }
        do {
            try implementation.remove(key: key)
            call.resolve()
        } catch {
            call.reject("Failed to remove value: \(error.localizedDescription)")
        }
    }

    @objc func keys(_ call: CAPPluginCall) {
        do {
            let k = try implementation.keys()
            call.resolve(["keys": k])
        } catch {
            call.reject("Failed to get keys: \(error.localizedDescription)")
        }
    }

    @objc func clear(_ call: CAPPluginCall) {
        do {
            try implementation.clear()
            call.resolve()
        } catch {
            call.reject("Failed to clear: \(error.localizedDescription)")
        }
    }
}
