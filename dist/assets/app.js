/* Calcoly shared runtime — vanilla, no dependencies */
(function () {
  'use strict';

  /* ---- number formatting: tabular-friendly, maximum fraction digits ---- */
  function fmt(n, maxDec) {
    if (!isFinite(n)) return '—';
    if (maxDec == null) maxDec = 6;
    var abs = Math.abs(n);
    var dec = abs >= 1000 ? Math.min(maxDec, 2) : abs >= 1 ? Math.min(maxDec, 4) : maxDec;
    var s = Number(n.toFixed(dec)).toLocaleString('en-US', { maximumFractionDigits: dec });
    return s;
  }

  /* ---- copy buttons: flips to teal "Copied ✓" for 1.5s ---- */
  function bindCopy(btn, getText) {
    if (!btn) return;
    btn.addEventListener('click', function () {
      var t = typeof getText === 'function' ? getText() : getText;
      var done = function () {
        btn.classList.add('copied');
        var origText = btn.textContent;
        btn.textContent = 'Copied ✓';
        setTimeout(function () { btn.classList.remove('copied'); btn.textContent = origText; }, 1500);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(t).then(done, done);
      } else {
        var ta = document.createElement('textarea');
        ta.value = t; document.body.appendChild(ta); ta.select();
        try { document.execCommand('copy'); } catch (e) {}
        document.body.removeChild(ta); done();
      }
    });
  }

  /* ---- "No Results" Intelligence Logging System ---- */
  function logNoResult(query) {
    if (!query || query.length < 2) return;
    try {
      var key = 'calcoly_no_results_log';
      var raw = localStorage.getItem(key);
      var log = raw ? JSON.parse(raw) : [];
      var q = query.trim().toLowerCase();
      var existing = log.find(function(item){ return item.q === q; });
      if (existing) {
        existing.count = (existing.count || 1) + 1;
        existing.lastSeen = new Date().toISOString();
      } else {
        log.push({ q: q, count: 1, firstSeen: new Date().toISOString() });
      }
      localStorage.setItem(key, JSON.stringify(log.slice(-100)));
    } catch(e) {}
  }

  /* ---- sticky nav hairline ---- */
  var nav = document.querySelector('.top-nav');
  if (nav) {
    var onScroll = function () {
      nav.classList.toggle('is-scrolled', window.scrollY > 4);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---- PWA Service Worker Registration ---- */
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      navigator.serviceWorker.register('/sw.js').catch(function(){});
    });
  }

  /* ---- Weighted Search Engine Runtime ---- */
  function escH(s) {
    return String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function scoreTool(x, v) {
    if (!v) return 0;
    v = String(v).trim().toLowerCase();
    if (!v) return 0;

    var n = (x.n || '').toLowerCase();
    var h = (x.h || '').toLowerCase();
    var k = (x.k || '').toLowerCase();
    var u = (x.u || '').toLowerCase();
    var s = 0;

    // 1. Direct or URL match
    if (n === v || h === v || u === '/' + v + '/' || u.indexOf('/' + v + '/') > -1) s += 2000;

    // 2. Keyword exact token match (e.g. "kg", "lbs", "cm", "g", "tdee", "bmi")
    var kwList = k.split(/\s+/);
    for (var i = 0; i < kwList.length; i++) {
      if (kwList[i] === v) { s += 1000; break; }
    }

    // 3. Substring matches
    if (n.indexOf(v) > -1) s += 600;
    if (h.indexOf(v) > -1) s += 500;
    if (k.indexOf(v) > -1) s += 400;
    if (u.indexOf(v) > -1) s += 300;

    // 4. Tokenized match for multi-word queries
    var tokens = v.split(/\s+/).filter(Boolean);
    if (tokens.length > 1) {
      var hits = 0;
      for (var j = 0; j < tokens.length; j++) {
        var t = tokens[j];
        if (n.indexOf(t) > -1 || h.indexOf(t) > -1 || k.indexOf(t) > -1 || u.indexOf(t) > -1) {
          hits++;
        }
      }
      if (hits === tokens.length) s += 800;
      else if (hits > 0) s += 200 * hits;
    }

    return s;
  }

  function bindSearchInput(inputEl, resultsEl) {
    if (!inputEl || !resultsEl) return;

    function render() {
      var toolsList = window.CALCOLY_TOOLS || [];
      var v = (inputEl.value || '').trim().toLowerCase();
      if (!v) {
        if (inputEl.id === 'sm-input' && toolsList.length > 0) {
          var popTools = toolsList.slice(0, 6);
          resultsEl.innerHTML = '<div style="padding:10px 18px 4px;font-size:12px;font-weight:600;color:var(--muted);text-transform:uppercase;letter-spacing:1px">Popular Utility Tools</div>' +
            popTools.map(function(x){
              return '<a href="' + x.u + '">' + escH(x.h) + ' <span class="cat">&rarr;</span></a>';
            }).join('');
          resultsEl.classList.add('is-open');
        } else {
          resultsEl.innerHTML = '';
          resultsEl.classList.remove('is-open');
        }
        return;
      }

      var matches = toolsList.map(function(x) { return { item: x, sc: scoreTool(x, v) }; })
                             .filter(function(x) { return x.sc > 0; })
                             .sort(function(a, b) { return b.sc - a.sc; })
                             .map(function(x) { return x.item; })
                             .slice(0, 8);

      if (!matches.length) {
        var sug = toolsList[Math.floor(Math.random() * (toolsList.length || 1))];
        var sugHTML = sug ? '<div class="sug">Did you mean <a href="' + sug.u + '">' + escH(sug.h) + '</a>?</div>' : '';
        resultsEl.innerHTML = '<div class="no-res-box"><div>No exact tool found for <strong>"' + escH(v) + '"</strong></div>' + sugHTML + '</div>';
        resultsEl.classList.add('is-open');
        logNoResult(v);
        return;
      }

      resultsEl.innerHTML = matches.map(function(x, i) {
        return '<a href="' + x.u + '"' + (i === 0 ? ' class="is-first"' : '') + '>' + escH(x.h) + ' <span class="cat">&rarr;</span></a>';
      }).join('');
      resultsEl.classList.add('is-open');
    }

    if (inputEl.id === 'sm-input') {
      window.Calcoly_renderModal = render;
    }

    ['input', 'focus', 'keyup', 'change'].forEach(function(evt) {
      inputEl.addEventListener(evt, render);
    });

    inputEl.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') {
        var f = resultsEl.querySelector('a');
        if (f) location = f.href;
      }
    });
  }

  /* ---- Global Search Modal (Ctrl+K / ⌘K) ---- */
  function openSearchModal(e) {
    if (e) e.preventDefault();
    var modal = document.getElementById('search-modal');
    var input = document.getElementById('sm-input');
    if (!modal || !input) return;
    modal.classList.add('is-active');
    document.body.style.overflow = 'hidden';
    setTimeout(function() {
      input.focus();
      input.select();
      if (typeof window.Calcoly_renderModal === 'function') {
        window.Calcoly_renderModal();
      }
    }, 50);
  }

  function closeSearchModal() {
    var modal = document.getElementById('search-modal');
    if (!modal) return;
    modal.classList.remove('is-active');
    document.body.style.overflow = '';
  }

  function initSearchEngine() {
    var navTrigger = document.getElementById('nav-search-trigger');
    var smClose = document.getElementById('sm-close');
    var smBackdrop = document.getElementById('search-modal');

    if (navTrigger) navTrigger.addEventListener('click', openSearchModal);
    if (smClose) smClose.addEventListener('click', closeSearchModal);
    if (smBackdrop) {
      smBackdrop.addEventListener('click', function(e) {
        if (e.target === smBackdrop) closeSearchModal();
      });
    }

    bindSearchInput(document.getElementById('q'), document.getElementById('results'));
    bindSearchInput(document.getElementById('sm-input'), document.getElementById('sm-results'));

    document.addEventListener('click', function(e) {
      var s = document.getElementById('search');
      if (s && !s.contains(e.target)) {
        var r = document.getElementById('results');
        if (r) r.classList.remove('is-open');
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSearchEngine);
  } else {
    initSearchEngine();
  }

  document.addEventListener('keydown', function(e) {
    if ((e.ctrlKey || e.metaKey) && (e.key === 'k' || e.key === 'K')) {
      e.preventDefault();
      openSearchModal(e);
    } else if (e.key === 'Escape') {
      closeSearchModal();
    }
  });

  window.Calcoly = { fmt: fmt, bindCopy: bindCopy, logNoResult: logNoResult, openSearchModal: openSearchModal, closeSearchModal: closeSearchModal };
})();
