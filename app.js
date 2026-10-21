(function(){
  // ---- pure math (exactly as specified) ----
  function r6(x){ return Math.round(x * 1e6) / 1e6; }
  function calc(members, cities, fee, attachPct){
    var uniques = members * cities;
    var memberships = r6(uniques * (1 + attachPct / 100));
    var revenue = r6(memberships * fee);
    return {
      uniques: uniques, memberships: memberships, revenue: revenue,
      phase1: r6(uniques * fee), phase2: r6(uniques * (attachPct / 100) * fee)
    };
  }
  function exitMath(profit, multiple, target){
    var valuation = r6(profit * multiple);
    return { valuation: valuation, gap: r6(target - valuation) };
  }
  if (typeof module !== 'undefined') module.exports = { calc: calc, exitMath: exitMath };
  if (typeof document === 'undefined') return;

  var D = window.MARDEN_DATA;
  function esc(s){ return String(s).replace(/[&<>"]/g, function(c){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]; }); }
  function $(sel, root){ return (root || document).querySelector(sel); }
  function wrap(id){ return $('#' + id + ' .wrap'); }
  function n0(x){ return Math.round(x).toLocaleString('en-US'); }
  function money(x, cur){ return (cur || '') + '$' + n0(x); }
  function mil(x){ return '$' + (x / 1e6).toFixed(1) + 'M'; }

  $('#site-name').textContent = D.siteName;

  // (Thesis section removed; its text remains in data.js if wanted back.)

  // ---- 2 Direction map ----
  (function(){
    var R = D.roadmap, w = wrap('roadmap'), sel = 0;
    R.stages.forEach(function(s, i){ if (s.current) sel = i; });
    w.innerHTML = '<div class="label">1 · Direction map</div><h2>Direction map</h2><div class="timeline" role="tablist"></div><div class="box" id="stage-detail" aria-live="polite"></div>';
    var tl = $('.timeline', w), det = $('#stage-detail', w);
    function draw(){
      tl.innerHTML = R.stages.map(function(s, i){
        return '<button class="stage' + (i === sel ? ' active' : '') + '" role="tab" data-i="' + i + '"><span class="n">' + (i + 1) + '</span>' +
          esc(s.name) + (s.current ? '<span class="here">You are here</span>' : '') + '</button>';
      }).join('');
      var s = R.stages[sel];
      det.innerHTML = '<h3>' + esc(s.name) + '</h3><p><span class="muted">Done looks like:</span> ' + esc(s.done) + '</p><p><span class="muted">Unblocks:</span> ' + esc(s.unblocks) + '</p>' +
        (s.exit ? '<p><span class="muted">Exit target:</span> <b class="accent">' + esc(R.exitTarget) + '</b></p>' : '');
      tl.querySelectorAll('.stage').forEach(function(b){ b.onclick = function(){ sel = +b.getAttribute('data-i'); draw(); }; });
    }
    draw();
  })();

  // ---- 3 City calculator ----
  var S = { members: D.calculator.defaults.members, cities: D.calculator.defaults.cities,
            fee: D.calculator.defaults.fee, attach: D.calculator.defaults.attach, currency: D.calculator.defaults.currency };
  var chainUpdate = function(){};
  (function(){
    var C = D.calculator, L = C.limits, w = wrap('calculator');
    w.innerHTML =
      '<div class="label">2 · City calculator</div><h2>City calculator</h2><div class="calc"><div>' +
      '<div class="ctl"><div class="row"><label for="c-members">Members per city</label><b id="v-members"></b></div><input type="range" id="c-members" min="0" max="' + L.membersMax + '" step="10"></div>' +
      '<div class="ctl"><div class="row"><label for="c-cities">Number of cities</label><b id="v-cities"></b></div><input type="range" id="c-cities" min="' + L.citiesMin + '" max="' + L.citiesMax + '" step="1"></div>' +
      '<div class="ctl"><div class="row"><label for="c-attach">Second-group attach rate</label><b id="v-attach"></b></div><input type="range" id="c-attach" min="0" max="100" step="1"></div>' +
      '<div class="ctl"><label class="row" for="c-fee">Membership fee</label><input type="number" id="c-fee" min="0" step="1" inputmode="decimal"></div>' +
      '<div class="ctl"><div class="label">Currency</div><div class="btns" id="c-cur"></div><div class="meta">' + esc(C.currencyNote) + '</div></div>' +
      '<div class="label">Presets</div><div class="btns" id="c-presets"></div><p class="meta">' + esc(C.presetNote) + '</p><p class="meta">' + esc(C.matureNote) + '</p>' +
      '</div><div>' +
      '<div class="out" style="margin-top:0">' +
      '<div><div class="label">Total unique members</div><div class="num" id="o-uniques"></div></div>' +
      '<div><div class="label">Total memberships sold</div><div class="num" id="o-mem"></div></div>' +
      '<div><div class="label" id="l-rev">Fee revenue</div><div class="num accent" id="o-rev"></div></div>' +
      '<div><div class="label">Fee revenue per phase</div><div id="o-phase"></div></div></div>' +
      '<div class="label">Fee revenue by number of cities (1 to current)</div><div class="bars" id="bars" role="img" aria-label="Bar chart of fee revenue by number of cities"></div>' +
      '</div></div><ul class="notes">' + C.explainers.map(function(e){ return '<li>' + esc(e) + '</li>'; }).join('') + '</ul>';

    var els = { members: $('#c-members'), cities: $('#c-cities'), attach: $('#c-attach'), fee: $('#c-fee') };
    $('#c-cur', w).innerHTML = C.currencies.map(function(c){ return '<button class="btn" data-c="' + c + '">' + c + '</button>'; }).join('');
    $('#c-presets', w).innerHTML = C.presets.map(function(p, i){ return '<button class="btn" data-p="' + i + '">' + esc(p.name) + '</button>'; }).join('');

    function render(){
      els.members.value = S.members; els.cities.value = S.cities; els.attach.value = S.attach;
      if (document.activeElement !== els.fee) els.fee.value = S.fee;
      $('#v-members').textContent = n0(S.members); $('#v-cities').textContent = S.cities; $('#v-attach').textContent = S.attach + '%';
      var r = calc(S.members, S.cities, S.fee, S.attach), cur = S.currency;
      $('#o-uniques').textContent = n0(r.uniques); $('#o-mem').textContent = n0(r.memberships);
      $('#o-rev').textContent = money(r.revenue); $('#l-rev').textContent = 'Fee revenue (' + cur + ')';
      $('#o-phase').innerHTML = '<div><span class="muted">Phase 1:</span> <b>' + money(r.phase1) + '</b></div><div><span class="muted">Phase 2:</span> <b>' + money(r.phase2) + '</b></div>';
      var vals = [], max = 0, i;
      for (i = 1; i <= S.cities; i++){ var v = calc(S.members, i, S.fee, S.attach).revenue; vals.push(v); if (v > max) max = v; }
      $('#bars').innerHTML = vals.map(function(v, i){
        return '<div class="' + (i === vals.length - 1 ? 'last' : '') + '" style="height:' + (max ? Math.max(v / max * 100, 1) : 1) + '%" title="' + (i + 1) + ' cities: ' + money(v) + '"></div>';
      }).join('');
      w.querySelectorAll('[data-c]').forEach(function(b){ b.classList.toggle('active', b.getAttribute('data-c') === S.currency); });
      w.querySelectorAll('[data-p]').forEach(function(b){
        var p = C.presets[+b.getAttribute('data-p')]; b.classList.toggle('active', p.members === S.members && p.cities === S.cities);
      });
      chainUpdate();
    }
    ['members', 'cities', 'attach'].forEach(function(k){ els[k].oninput = function(){ S[k] = +els[k].value; render(); }; });
    els.fee.oninput = function(){ var v = parseFloat(els.fee.value); S.fee = isNaN(v) ? 0 : Math.max(v, 0); render(); };
    els.fee.onblur = function(){ els.fee.value = S.fee; };
    w.querySelectorAll('[data-c]').forEach(function(b){ b.onclick = function(){ S.currency = b.getAttribute('data-c'); render(); }; });
    w.querySelectorAll('[data-p]').forEach(function(b){ b.onclick = function(){ var p = C.presets[+b.getAttribute('data-p')]; S.members = p.members; S.cities = p.cities; render(); }; });
    render();
  })();

  // ---- 4 Financial model ----
  (function(){
    var F = D.finance, w = wrap('finance');
    var scen = F.scenarioDefault, profits = {}, mult = F.multipleDefault;
    F.scenarios.forEach(function(s){ profits[s.name] = s.profit; });
    w.innerHTML =
      '<div class="label">3 · Financial model and exit math</div><h2>Financial model and exit math</h2>' +
      '<div class="label">Scenario</div><div class="btns" id="f-scen"></div>' +
      '<div class="calc"><div>' +
      '<div class="ctl"><label class="row" for="f-profit">Trailing annual profit (NZ$)</label><input type="number" id="f-profit" min="0" step="10000" inputmode="decimal" placeholder="TBC"></div>' +
      '<div class="ctl"><div class="row"><label for="f-mult">Sale multiple</label><b id="v-mult"></b></div><input type="range" id="f-mult" min="' + F.multipleMin + '" max="' + F.multipleMax + '" step="0.5"></div>' +
      '<p class="meta">' + esc(F.scenarioNote) + '</p></div><div>' +
      '<div class="out" style="margin-top:0">' +
      '<div><div class="label">Implied valuation</div><div class="num" id="f-val"></div></div>' +
      '<div><div class="label">Gap to ' + esc(mil(F.target).replace('$', 'NZ$')) + ' target</div><div class="num accent" id="f-gap"></div></div>' +
      '<div style="grid-column:1/-1"><div class="label">Profit required</div><div id="f-req"></div></div></div></div></div>' +
      '<div class="label">Planning chain (live)</div><div class="chain" id="chain"></div>' +
      '<h3>Open model questions</h3><div id="f-notes"></div>';
    $('#f-notes', w).innerHTML = D.decisions.map(function(d){ return '<div class="drow"><div class="top">' + esc(d.title) + '</div><div class="muted">' + esc(d.detail) + '</div></div>'; }).join('');
    var inP = $('#f-profit'), inM = $('#f-mult');

    function render(){
      var p = profits[scen], hasP = p !== null && p !== undefined && !isNaN(p);
      $('#f-scen', w).innerHTML = F.scenarios.map(function(s){ return '<button class="btn' + (s.name === scen ? ' active' : '') + '" data-s="' + s.name + '">' + s.name + '</button>'; }).join('');
      w.querySelectorAll('[data-s]').forEach(function(b){ b.onclick = function(){ scen = b.getAttribute('data-s'); inP.value = profits[scen] === null ? '' : profits[scen]; render(); }; });
      inM.value = mult; $('#v-mult').textContent = mult + '×';
      var m, val = 'TBC', gap = 'TBC';
      if (hasP){
        m = exitMath(p, mult, F.target); val = 'NZ' + mil(m.valuation);
        gap = (m.gap > 0 ? 'NZ' + mil(m.gap) + ' short' : m.gap < 0 ? 'NZ' + mil(-m.gap) + ' over' : 'On target');
      }
      $('#f-val').textContent = val; $('#f-gap').textContent = gap;
      $('#f-req').innerHTML = '<div><span class="muted">At ' + F.multipleMin + '×:</span> <b>NZ' + mil(F.target / F.multipleMin) + '</b></div>' +
        '<div><span class="muted">At ' + F.multipleMax + '×:</span> <b>NZ' + mil(F.target / F.multipleMax) + '</b></div>' +
        '<div><span class="muted">At ' + mult + '× (selected):</span> <b>NZ' + mil(F.target / mult) + '</b></div>';
      chainUpdate();
    }
    inP.oninput = function(){ var v = parseFloat(inP.value); profits[scen] = isNaN(v) ? null : v; render(); };
    inM.oninput = function(){ mult = +inM.value; render(); };
    inP.value = profits[scen] === null ? '' : profits[scen];
    chainUpdate = function(){
      var r = calc(S.members, S.cities, S.fee, S.attach), p = profits[scen], hasP = p !== null && p !== undefined && !isNaN(p);
      var steps = [
        ['Members per city', n0(S.members)], ['Cities', S.cities], ['Uniques', n0(r.uniques)],
        ['Fee revenue (' + S.currency + ')', money(r.revenue)], ['Profit (NZ$)', hasP ? money(p) : 'TBC'],
        ['Valuation', hasP ? 'NZ' + mil(p * mult) : 'TBC'], ['Sale', 'NZ' + mil(F.target)]
      ];
      $('#chain').innerHTML = steps.map(function(s, i){
        return (i ? '<span class="arr">→</span>' : '') + '<div class="box"><span class="meta">' + esc(s[0]) + '</span><b>' + esc(s[1]) + '</b></div>';
      }).join('');
    };
    render();
  })();

  // ---- 5 Product pipeline and decisions ----
  (function(){
    var h = '<div class="label">4 · Product pipeline and decisions</div><h2>Product pipeline</h2>';
    D.products.forEach(function(g){
      h += '<div class="wave"><h3>' + esc(g.wave) + '</h3><div class="rows"><div class="prow head"><div>Product</div><div>Gate</div><div>Status</div></div>';
      g.items.forEach(function(it){ h += '<div class="prow"><div>' + esc(it.name) + '</div><div class="muted">' + esc(it.gate) + '</div><div>' + esc(it.status) + '</div></div>'; });
      h += '</div></div>';
    });
    h += '<div class="wave"><h2>Decision log</h2>';
    D.decisions.forEach(function(d){
      h += '<div class="drow"><div class="top"><span>' + esc(d.title) + '</span><span class="muted" style="font-weight:400">' + esc(d.status) + '</span></div>' +
        '<div class="muted">' + esc(d.detail) + '</div><div>Current lean: ' + esc(d.lean) + '</div></div>';
    });
    wrap('pipeline').innerHTML = h + '</div>';
  })();

  // ---- Mood board (masonry, filled left to right) ----
  (function(){
    var w = wrap('moodboard'), cols = 0;
    w.innerHTML = '<div class="label">5 · Mood board</div><h2>Mood board</h2><div class="mood" id="mood"></div>';
    function draw(){
      var n = window.innerWidth < 720 ? 2 : 4;
      if (n === cols) return;
      cols = n;
      var c = [], i;
      for (i = 0; i < n; i++) c.push('');
      D.moodboard.forEach(function(m, k){
        c[k % n] += '<figure class="tile"><img src="' + esc(m.image) + '" alt="' + esc(m.caption) + '" loading="lazy"><figcaption>' + esc(m.caption) + '</figcaption></figure>';
      });
      $('#mood').innerHTML = c.map(function(x){ return '<div class="mcol">' + x + '</div>'; }).join('');
    }
    draw();
    window.addEventListener('resize', draw);
  })();
})();
