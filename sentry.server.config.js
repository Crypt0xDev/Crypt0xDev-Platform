import * as Sentry from '@sentry/astro';

Sentry.init({
  // Reemplaza con tu DSN de Sentry
  dsn: process.env.PUBLIC_SENTRY_DSN,

  // Configuración del entorno
  environment: process.env.NODE_ENV || 'development',

  // Controla qué porcentaje de errores se envían
  tracesSampleRate: 1.0,

  // Configuración específica del servidor
  beforeSend(event) {
    // No enviar errores en desarrollo
    if (process.env.NODE_ENV === 'development') {
      console.error('Sentry (dev mode):', event);
      return null;
    }

    return event;
  },
});
