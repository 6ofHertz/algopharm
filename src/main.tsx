import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// ✅ Keep only the global ErrorBoundary import
import ErrorBoundary from '@/features/components/ErrorBoundary.tsx'

createRoot(document.getElementById("root")!).render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);