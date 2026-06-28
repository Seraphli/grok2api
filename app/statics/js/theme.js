(function () {
  var STORAGE_KEY = 'grok2api_theme';

  function getTheme() {
    try {
      return localStorage.getItem(STORAGE_KEY) || 'light';
    } catch (_) {
      return 'light';
    }
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch (_) {}
  }

  function syncIcons(root) {
    var toggles = (root || document).querySelectorAll('#hd-theme-toggle');
    var isDark = getTheme() === 'dark';
    toggles.forEach(function (btn) {
      var moon = btn.querySelector('.theme-icon-moon');
      var sun = btn.querySelector('.theme-icon-sun');
      if (moon) moon.style.display = isDark ? 'none' : '';
      if (sun) sun.style.display = isDark ? '' : 'none';
    });
  }

  function bindToggle(root) {
    var toggles = (root || document).querySelectorAll('#hd-theme-toggle');
    toggles.forEach(function (btn) {
      if (btn._themeBound) return;
      btn._themeBound = true;
      btn.addEventListener('click', function () {
        applyTheme(getTheme() === 'dark' ? 'light' : 'dark');
        syncIcons();
      });
    });
    syncIcons(root);
  }

  applyTheme(getTheme());

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () { bindToggle(); }, { once: true });
  } else {
    bindToggle();
  }

  window.addEventListener('pageshow', function () { bindToggle(); });

  window._grok2apiThemeBindToggle = bindToggle;
})();
