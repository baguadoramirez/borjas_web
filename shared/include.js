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
    '          <a href="{{ROOT}}experiments/visoespatial_span.html">Corsi Blocks (Full)</a>' +
    '          <a href="{{ROOT}}experiments/fonologic_span.html">Digit Span</a>' +
    '          <a href="{{ROOT}}experiments/posner.html">Posner (Tactile)</a>' +
    '          <a href="{{ROOT}}experiments/coordinacion_visomotora.html">Coordinacion visomotora</a>' +
    '          <a href="{{ROOT}}experiments/random_dot_motion.html">Coherencia de movimiento (RDM)</a>' +
    '          <a href="{{ROOT}}experiments/ebbinghaus_pest.html">Ilusion de Ebbinghaus (PEST)</a>' +
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
