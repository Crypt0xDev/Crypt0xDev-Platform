/* ===== THEME DETECTION AND INITIALIZATION ===== */
(function() {
  // Función para obtener el tema preferido
  function getPreferredTheme() {
    // 1. Primero verificar si hay un tema guardado en localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme;
    }
    
    // 2. Si no hay tema guardado, usar el tema del sistema
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  
  // Función para aplicar el tema
  function applyTheme(theme) {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
  
  // Aplicar tema inicial
  const initialTheme = getPreferredTheme();
  applyTheme(initialTheme);
  
  // Escuchar cambios en el tema del sistema (solo si no hay preferencia guardada)
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  mediaQuery.addEventListener('change', (e) => {
    // Solo cambiar automáticamente si el usuario no tiene una preferencia guardada
    if (!localStorage.getItem('theme')) {
      const newTheme = e.matches ? 'dark' : 'light';
      applyTheme(newTheme);
    }
  });
})();

