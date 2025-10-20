import { SecurePreferences } from 'capacitor-secure-preferences';

window.testSet = async () => {
  const key = document.getElementById('keyInput').value;
  const value = document.getElementById('valueInput').value;

  if (!key || !value) {
    alert('Please enter both key and value');
    return;
  }

  try {
    await SecurePreferences.set({ key, value });
    document.getElementById('result').innerHTML = `✅ Set "${key}" = "${value}"`;
  } catch (error) {
    document.getElementById('result').innerHTML = `❌ Error setting: ${error.message}`;
  }
};

window.testGet = async () => {
  const key = document.getElementById('keyInput').value;

  if (!key) {
    alert('Please enter a key');
    return;
  }

  try {
    const result = await SecurePreferences.get({ key });
    document.getElementById('result').innerHTML = `📖 Get "${key}" = "${result.value || 'null'}"`;
  } catch (error) {
    document.getElementById('result').innerHTML = `❌ Error getting: ${error.message}`;
  }
};

window.testRemove = async () => {
  const key = document.getElementById('keyInput').value;

  if (!key) {
    alert('Please enter a key');
    return;
  }

  try {
    await SecurePreferences.remove({ key });
    document.getElementById('result').innerHTML = `🗑️ Removed "${key}"`;
  } catch (error) {
    document.getElementById('result').innerHTML = `❌ Error removing: ${error.message}`;
  }
};

window.testKeys = async () => {
  try {
    const result = await SecurePreferences.keys();
    document.getElementById('result').innerHTML = `🔑 Keys: [${result.keys.join(', ')}]`;
  } catch (error) {
    document.getElementById('result').innerHTML = `❌ Error getting keys: ${error.message}`;
  }
};

window.testClear = async () => {
  try {
    await SecurePreferences.clear();
    document.getElementById('result').innerHTML = `🧹 Cleared all preferences`;
  } catch (error) {
    document.getElementById('result').innerHTML = `❌ Error clearing: ${error.message}`;
  }
};
