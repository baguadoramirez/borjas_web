(function () {
  var rootEl = document.documentElement;
  var root = rootEl.getAttribute('data-root') || '';
  var storageKey = 'theme';

  if (root && root[root.length - 1] !== '/') {
    root += '/';
  }

  function getStoredTheme() {
    try {
      return localStorage.getItem(storageKey);
    } catch (error) {
      return null;
    }
  }

  function getPreferredTheme() {
    var stored = getStoredTheme();
    if (stored === 'light' || stored === 'dark') {
      return stored;
    }
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  }

  function updateButtonLabel(theme) {
    var button = document.getElementById('theme-toggle');
    if (!button) {
      return;
    }
    var isDark = theme === 'dark';
    button.textContent = isDark ? 'Light mode' : 'Dark mode';
    button.setAttribute('aria-pressed', isDark ? 'true' : 'false');
  }

  function applyTheme(theme, persist) {
    rootEl.setAttribute('data-theme', theme);
    if (persist) {
      try {
        localStorage.setItem(storageKey, theme);
      } catch (error) {
        // Ignore storage failures for local file access.
      }
    }
    updateButtonLabel(theme);
  }

  function setHtml(targetId, html) {
    var target = document.getElementById(targetId);
    if (!target) {
      return;
    }
    target.innerHTML = html.replace(/{{ROOT}}/g, root);
  }

  var headerHtml =
    '<header class="site-header">' +
    '  <div class="nav-container">' +
    '    <a class="site-title" href="{{ROOT}}index.html">Borja Aguado</a>' +
    '    <nav class="site-nav" aria-label="Primary">' +
    '      <a class="nav-link" href="{{ROOT}}index.html">Home</a>' +
    '      <a class="nav-link" href="{{ROOT}}CV.html">CV</a>' +
    '      <div class="nav-dropdown">' +
    '        <span class="nav-link nav-button" tabindex="0">Experiments</span>' +
    '        <div class="dropdown-menu" aria-label="Experiments">' +
    '          <a href="{{ROOT}}experiments/01_span_visuoespacial_corsi_directo.html">Span visuoespacial (Corsi) - directo</a>' +
    '          <a href="{{ROOT}}experiments/02_span_visuoespacial_corsi_inverso.html">Span visuoespacial (Corsi) - inverso</a>' +
    '          <a href="{{ROOT}}experiments/03_span_fonologico_digitos_directo.html">Span fonologico (digitos) - directo</a>' +
    '          <a href="{{ROOT}}experiments/04_span_fonologico_digitos_inverso.html">Span fonologico (digitos) - inverso</a>' +
    '          <a href="{{ROOT}}experiments/05_posner_atencion_espacial.html">Tarea de Posner - atencion espacial</a>' +
    '          <a href="{{ROOT}}experiments/06_seguimiento_continuo_objetivo.html">Seguimiento continuo de objetivo</a>' +
    '          <a href="{{ROOT}}experiments/07_seguimiento_continuo_delay_visomotor.html">Seguimiento continuo - delay visomotor</a>' +
    '          <a href="{{ROOT}}experiments/08_movimiento_coherente_rdm_umbral_adaptativo.html">Movimiento coherente (RDM) - umbral adaptativo</a>' +
    '          <a href="{{ROOT}}experiments/09_ilusion_ebbinghaus_estimulos_constantes.html">Ilusion de Ebbinghaus - estimulos constantes</a>' +
    '          <a href="{{ROOT}}experiments/10_busqueda_selectiva_paralela_serie.html">Busqueda selectiva - paralela vs serie</a>' +
    '        </div>' +
    '      </div>' +
    '      <button class="theme-toggle" type="button" id="theme-toggle" aria-pressed="false">Dark mode</button>' +
    '    </nav>' +
    '  </div>' +
    '</header>';

  var footerHtml =
    '<footer class="site-footer" role="contentinfo">' +
    '  <div class="container">' +
    '    <small>' +
    '      <span>&copy; 2024 Borja Aguado.</span>' +
    '      <span>Built with HTML, CSS, and JavaScript.</span>' +
    '      <span>Hosted on <a href="http://github.com">GitHub</a>.</span>' +
    '    </small>' +
    '  </div>' +
    '</footer>';

  applyTheme(getPreferredTheme(), false);
  setHtml('site-header', headerHtml);
  setHtml('site-footer', footerHtml);

  var toggleButton = document.getElementById('theme-toggle');
  if (toggleButton) {
    toggleButton.addEventListener('click', function () {
      var current = rootEl.getAttribute('data-theme') || getPreferredTheme();
      var next = current === 'dark' ? 'light' : 'dark';
      applyTheme(next, true);
    });
    updateButtonLabel(rootEl.getAttribute('data-theme'));
  }

  var storedTheme = getStoredTheme();
  if (!storedTheme && window.matchMedia) {
    var media = window.matchMedia('(prefers-color-scheme: dark)');
    if (typeof media.addEventListener === 'function') {
      media.addEventListener('change', function (event) {
        applyTheme(event.matches ? 'dark' : 'light', false);
      });
    }
  }
})();
