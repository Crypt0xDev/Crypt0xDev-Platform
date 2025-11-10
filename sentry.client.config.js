import * as Sentry from '@sentry/astro';

Sentry.init({
  // Reemplaza con tu DSN de Sentry
  // Obtén tu DSN en: https://sentry.io/settings/projects/
  dsn: import.meta.env.PUBLIC_SENTRY_DSN,

  // Configuración del entorno
  environment: import.meta.env.MODE,

  // Controla qué porcentaje de errores se envían (1.0 = 100%)
  tracesSampleRate: 1.0,

  // Configuración de replays (capturas de sesión cuando hay errores)
  replaysSessionSampleRate: 0.1, // 10% de sesiones normales
  replaysOnErrorSampleRate: 1.0, // 100% cuando hay error

  // Filtrar errores conocidos/esperados
  beforeSend(event, hint) {
    // Ignorar errores de extensiones del navegador
    if (event.exception) {
      const frames = event.exception.values?.[0]?.stacktrace?.frames;
      if (frames?.some(frame => 
        frame.filename?.includes('chrome-extension://') ||
        frame.filename?.includes('moz-extension://')
      )) {
        return null;
      }
    }

    // Ignorar errores de Pagefind en desarrollo
    if (import.meta.env.DEV && 
        (event.message?.includes('pagefind') || 
         hint?.originalException?.message?.includes('pagefind'))) {
      return null;
    }

    return event;
  },

  // Integrations
  integrations: [
    Sentry.replayIntegration({
      maskAllText: false,
      blockAllMedia: false,
    }),
    Sentry.browserTracingIntegration(),
  ],
});
