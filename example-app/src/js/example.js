import { SecurePreferences } from 'capacitor-secure-preferences';

window.testEcho = () => {
    const inputValue = document.getElementById("echoInput").value;
    SecurePreferences.echo({ value: inputValue })
}
