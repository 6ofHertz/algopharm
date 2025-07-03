export interface SessionData {
  userId: string;
  loginTime: string;
  expiresAt: string;
  deviceInfo?: string;
}

const SESSION_KEY = 'apotheke_session';
const SESSION_TIMEOUT_HOURS = 12; // 12 hours default

// Get device info for session tracking
const getDeviceInfo = (): string => {
  const ua = navigator.userAgent;
  let browser = 'Unknown';
  let os = 'Unknown';

  if (ua.includes('Chrome')) browser = 'Chrome';
  else if (ua.includes('Firefox')) browser = 'Firefox';
  else if (ua.includes('Safari')) browser = 'Safari';
  else if (ua.includes('Edge')) browser = 'Edge';

  if (ua.includes('Windows')) os = 'Windows';
  else if (ua.includes('Mac')) os = 'macOS';
  else if (ua.includes('Linux')) os = 'Linux';
  else if (ua.includes('Android')) os = 'Android';
  else if (ua.includes('iOS')) os = 'iOS';

  return `${browser} - ${os}`;
};

// Create new session
export const createSession = (userId: string, timeoutHours: number = SESSION_TIMEOUT_HOURS): void => {
  try {
    const now = new Date();
    const expiresAt = new Date(now.getTime() + (timeoutHours * 60 * 60 * 1000));
    
    const sessionData: SessionData = {
      userId,
      loginTime: now.toISOString(),
      expiresAt: expiresAt.toISOString(),
      deviceInfo: getDeviceInfo()
    };
    
    localStorage.setItem(SESSION_KEY, JSON.stringify(sessionData));
  } catch (error) {
    console.error('Failed to create session:', error);
  }
};

// Get current session
export const getCurrentSession = (): SessionData | null => {
  try {
    const stored = localStorage.getItem(SESSION_KEY);
    if (!stored) return null;
    
    const session: SessionData = JSON.parse(stored);
    
    // Check if session is expired
    if (new Date() > new Date(session.expiresAt)) {
      clearSession();
      return null;
    }
    
    return session;
  } catch (error) {
    console.error('Failed to get current session:', error);
    return null;
  }
};

// Check if session is valid
export const isSessionValid = (): boolean => {
  const session = getCurrentSession();
  return session !== null;
};

// Get remaining session time in minutes
export const getRemainingTime = (): number => {
  const session = getCurrentSession();
  if (!session) return 0;
  
  const now = new Date();
  const expiresAt = new Date(session.expiresAt);
  const remainingMs = expiresAt.getTime() - now.getTime();
  
  return Math.max(0, Math.floor(remainingMs / (1000 * 60))); // Convert to minutes
};

// Extend session
export const extendSession = (additionalHours: number = SESSION_TIMEOUT_HOURS): void => {
  try {
    const session = getCurrentSession();
    if (!session) return;
    
    const newExpiresAt = new Date(Date.now() + (additionalHours * 60 * 60 * 1000));
    
    const updatedSession: SessionData = {
      ...session,
      expiresAt: newExpiresAt.toISOString()
    };
    
    localStorage.setItem(SESSION_KEY, JSON.stringify(updatedSession));
  } catch (error) {
    console.error('Failed to extend session:', error);
  }
};

// Clear session
export const clearSession = (): void => {
  try {
    localStorage.removeItem(SESSION_KEY);
  } catch (error) {
    console.error('Failed to clear session:', error);
  }
};

// Format remaining time for display
export const formatRemainingTime = (): string => {
  const minutes = getRemainingTime();
  if (minutes === 0) return 'Expired';
  
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  
  if (hours > 0) {
    return `${hours}h ${remainingMinutes}m remaining`;
  } else {
    return `${remainingMinutes}m remaining`;
  }
};

// Session warning (when less than 30 minutes remaining)
export const shouldShowSessionWarning = (): boolean => {
  return getRemainingTime() <= 30 && getRemainingTime() > 0;
};