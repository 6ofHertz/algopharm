import CryptoJS from 'crypto-js';

export interface SavedCredential {
  id: string;              // Unique ID or Firebase UID
  email: string;
  password?: string;       // Only if "Remember Me" is checked (encrypted)
  employeeId: string;
  name: string;
  role?: string;
  avatarUrl?: string;
  lastLogin?: string;
  deviceInfo?: string;     // Optional: e.g., user-agent or device fingerprint
}

const STORAGE_KEY = 'apotheke_saved_credentials';
const ENCRYPTION_KEY = 'apotheke_pos_2024_security_key';

// Get device information
const getDeviceInfo = (): string => {
  const ua = navigator.userAgent;
  let browser = 'Unknown';
  let os = 'Unknown';

  // Detect browser
  if (ua.includes('Chrome')) browser = 'Chrome';
  else if (ua.includes('Firefox')) browser = 'Firefox';
  else if (ua.includes('Safari')) browser = 'Safari';
  else if (ua.includes('Edge')) browser = 'Edge';

  // Detect OS
  if (ua.includes('Windows')) os = 'Windows';
  else if (ua.includes('Mac')) os = 'macOS';
  else if (ua.includes('Linux')) os = 'Linux';
  else if (ua.includes('Android')) os = 'Android';
  else if (ua.includes('iOS')) os = 'iOS';

  return `${browser} - ${os}`;
};

// Encrypt password
const encryptPassword = (password: string): string => {
  return CryptoJS.AES.encrypt(password, ENCRYPTION_KEY).toString();
};

// Decrypt password
const decryptPassword = (encryptedPassword: string): string => {
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedPassword, ENCRYPTION_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    console.error('Failed to decrypt password:', error);
    return '';
  }
};

// Save credential to localStorage
export const saveCredential = (user: SavedCredential, rememberPassword: boolean = false): void => {
  try {
    const savedCredentials = getSavedCredentials();
    
    // Remove existing credential with same ID
    const filteredCredentials = savedCredentials.filter(cred => cred.id !== user.id);
    
    // Prepare new credential
    const newCredential: SavedCredential = {
      ...user,
      lastLogin: new Date().toISOString(),
      deviceInfo: getDeviceInfo(),
      password: rememberPassword && user.password ? encryptPassword(user.password) : undefined
    };
    
    // Add new credential at the beginning (most recent first)
    const updatedCredentials = [newCredential, ...filteredCredentials];
    
    // Keep only last 5 credentials to avoid localStorage bloat
    const limitedCredentials = updatedCredentials.slice(0, 5);
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(limitedCredentials));
  } catch (error) {
    console.error('Failed to save credential:', error);
  }
};

// Get all saved credentials
export const getSavedCredentials = (): SavedCredential[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    
    const credentials: SavedCredential[] = JSON.parse(stored);
    
    // Decrypt passwords for display (but keep them encrypted in storage)
    return credentials.map(cred => ({
      ...cred,
      password: cred.password ? decryptPassword(cred.password) : undefined
    }));
  } catch (error) {
    console.error('Failed to get saved credentials:', error);
    return [];
  }
};

// Remove specific credential
export const removeCredential = (id: string): void => {
  try {
    const savedCredentials = getSavedCredentials();
    const filteredCredentials = savedCredentials.filter(cred => cred.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredCredentials));
  } catch (error) {
    console.error('Failed to remove credential:', error);
  }
};

// Clear all credentials
export const clearAllCredentials = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear credentials:', error);
  }
};

// Get credential by ID (with decrypted password)
export const getCredentialById = (id: string): SavedCredential | null => {
  try {
    const credentials = getSavedCredentials();
    return credentials.find(cred => cred.id === id) || null;
  } catch (error) {
    console.error('Failed to get credential by ID:', error);
    return null;
  }
};

// Update last login for existing credential
export const updateLastLogin = (id: string): void => {
  try {
    const credentials = getSavedCredentials();
    const updatedCredentials = credentials.map(cred => 
      cred.id === id 
        ? { ...cred, lastLogin: new Date().toISOString(), deviceInfo: getDeviceInfo() }
        : cred
    );
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedCredentials));
  } catch (error) {
    console.error('Failed to update last login:', error);
  }
};
