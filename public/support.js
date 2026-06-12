(function () {
  'use strict';

  // DCLogic base class — provides lifecycle hooks for DC components
  window.DCLogic = class DCLogic {
    componentDidMount() {}
    componentWillUnmount() {}
    renderVals() { return {}; }
  };

  function processHelmet() {
    document.querySelectorAll('helmet').forEach(function (helmet) {
      Array.from(helmet.childNodes).forEach(function (node) {
        if (node.nodeType === Node.ELEMENT_NODE || node.nodeType === Node.TEXT_NODE) {
          document.head.appendChild(node.cloneNode(true));
        }
      });
    });
  }

  function processDCScripts() {
    document.querySelectorAll('script[type="text/x-dc"][data-dc-script]').forEach(function (script) {
      try {
        var ComponentClass = new Function('DCLogic', script.textContent + '\nreturn Component;')(window.DCLogic);
        var instance = new ComponentClass();
        if (typeof instance.componentDidMount === 'function') {
          instance.componentDidMount();
        }
        window.addEventListener('beforeunload', function () {
          if (typeof instance.componentWillUnmount === 'function') {
            instance.componentWillUnmount();
          }
        });
      } catch (e) {
        console.error('[DC] Component error:', e);
      }
    });
  }

  // Anti-spam email wiring. The address is never present as a literal
  // string in the HTML source — it's base64 in a data-email attribute and
  // only decoded into a mailto: link on first user interaction, which
  // defeats bulk harvesters that scrape static HTML without running JS.
  function wireEmail() {
    document.querySelectorAll('a[data-email]').forEach(function (el) {
      var reveal = function () {
        try { el.setAttribute('href', 'mailto:' + atob(el.getAttribute('data-email'))); }
        catch (e) { /* leave href untouched on decode failure */ }
      };
      // Decode on first hover/focus/touch so a normal click just works.
      ['mouseenter', 'focus', 'touchstart'].forEach(function (ev) {
        el.addEventListener(ev, reveal, { once: true });
      });
      // Fallback: clicked before hover/focus fired — decode, then navigate.
      el.addEventListener('click', function (e) {
        var href = el.getAttribute('href');
        if (!href || href === '#') {
          e.preventDefault();
          reveal();
          href = el.getAttribute('href');
          if (href && href !== '#') window.location.href = href;
        }
      });
    });
  }

  function init() {
    processHelmet();
    processDCScripts();
    wireEmail();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
