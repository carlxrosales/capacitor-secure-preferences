import Foundation

@objc public class SecurePreferences: NSObject {
    @objc public func echo(_ value: String) -> String {
        print(value)
        return value
    }
}
