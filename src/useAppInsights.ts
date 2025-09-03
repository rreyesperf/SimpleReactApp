import { useEffect } from 'react';
import { ApplicationInsights } from '@microsoft/applicationinsights-web';

export function useAppInsights() {
  useEffect(() => {
    const instrumentationKey = import.meta.env.VITE_APPINSIGHTS_CONNECTION_STRING;
    if (instrumentationKey) {
      const appInsights = new ApplicationInsights({
        config: {
          instrumentationKey,
          enableAutoRouteTracking: true,
        },
      });
      appInsights.loadAppInsights();
      appInsights.trackPageView();
    }
  }, []);
}
