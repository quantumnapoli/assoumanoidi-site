// @ts-nocheck
/* Copia di humanoideonline.com/volto.js: lo stesso volto sui due siti. */
/* =========================================================================
   Il volto: metà umano, metà umanoide.
   Una nuvola di punti in 3D disegnata su <canvas>. A sinistra la pelle (punti
   chiari, illuminati), a destra l'umanoide (linee d'oro, come un rilievo
   tecnico), al centro la cucitura. I punti si radunano quando il volto entra
   nello schermo; la testa segue il puntatore e ruota con lo scorrimento.
   Motion (motion.dev) muove i valori: molle per lo sguardo, inView per
   avviare e fermare il disegno, animate per l'assemblaggio.

   creaVolto(tela, M, opzioni)  M = il namespace di Motion
   opzioni.posizione(): numero da -1 a 1 (dove sta il volto sullo schermo):
                        la testa ruota di conseguenza
   Restituisce una funzione che ferma tutto.
   ========================================================================= */
function creaVolto(tela, M, opzioni) {
  opzioni = opzioni || {};
  var ctx = tela.getContext('2d');
  if (!ctx) return function () {};
  var fermo = !!opzioni.fermo;
  var oro = [212, 168, 67], pelle = [246, 236, 214];

  /* ---------------------------------------------------------------- geometria */
  function g(x, y, x0, y0, sx, sy, a) {
    var dx = (x - x0) / sx, dy = (y - y0) / sy;
    return a * Math.exp(-(dx * dx + dy * dy) / 2);
  }
  // mezza larghezza del volto a una data altezza (y da -1 mento a 1.05 fronte)
  function largo(y) {
    var a = 0.7;
    if (y > 0.3) a *= Math.sqrt(Math.max(0, 1 - Math.pow((y - 0.3) / 0.78, 2)));
    if (y < -0.1) a *= 1 - 0.55 * Math.pow((-0.1 - y) / 0.92, 1.7);
    return a;
  }
  function naso(x, y) {
    if (y > 0.18 || y < -0.42) return 0;
    var t = (0.18 - y) / 0.52;                // 0 alla radice, 1 alla punta
    var alt = 0.03 + 0.25 * Math.pow(Math.min(t, 1), 1.6);
    if (y < -0.32) alt *= Math.max(0, 1 - (-0.32 - y) / 0.1);
    var sx = 0.04 + 0.055 * t;
    return alt * Math.exp(-(x * x) / (2 * sx * sx));
  }
  function z(x, y) {
    var a = largo(y);
    if (a <= 0) return 0;
    var u = Math.min(1, Math.abs(x) / a);
    var base = 0.72 * Math.pow(1 - u * u, 0.62) * (0.8 + 0.2 * Math.cos(y * 1.3));
    var ax = Math.abs(x);
    return base
      + naso(x, y)
      + g(ax, y, 0.27, 0.1, 0.11, 0.075, -0.17)     // orbite
      + g(ax, y, 0.27, 0.105, 0.05, 0.03, 0.05)     // bulbo
      + g(ax, y, 0.28, 0.25, 0.17, 0.045, 0.06)     // arcate
      + g(x, y, 0, 0.22, 0.06, 0.05, -0.03)         // tra le sopracciglia
      + g(ax, y, 0.075, -0.33, 0.045, 0.035, 0.06)  // ali del naso
      + g(x, y, 0, -0.44, 0.045, 0.04, -0.03)       // solco
      + g(x, y, 0, -0.5, 0.14, 0.028, 0.075)        // labbro sopra
      + g(x, y, 0, -0.6, 0.12, 0.038, 0.085)        // labbro sotto
      + g(x, y, 0, -0.548, 0.17, 0.012, -0.07)      // bocca
      + g(ax, y, 0.17, -0.55, 0.03, 0.03, -0.03)    // angoli della bocca
      + g(x, y, 0, -0.7, 0.1, 0.035, -0.035)        // sotto il labbro
      + g(x, y, 0, -0.84, 0.12, 0.07, 0.07)         // mento
      + g(ax, y, 0.43, -0.05, 0.11, 0.1, 0.06)      // zigomi
      + g(ax, y, 0.36, -0.36, 0.1, 0.12, -0.04)     // guance scavate
      + g(ax, y, 0.6, 0.28, 0.1, 0.15, -0.04);      // tempie
  }

  // punti del volto su una griglia sfalsata, con la normale per la luce
  var P = [], RIGHE = [];
  var passo = opzioni.passo || 0.03, e = 0.004;
  var riga = 0;
  for (var y = 1.04; y > -1.0; y -= passo * 0.87, riga++) {
    var a = largo(y), fila = [];
    for (var x = -0.8 + (riga % 2 ? passo / 2 : 0); x < 0.8; x += passo) {
      if (Math.abs(x) > a) continue;
      var zz = z(x, y);
      var nx = -(z(x + e, y) - z(x - e, y)) / (2 * e), ny = -(z(x, y + e) - z(x, y - e)) / (2 * e), l = Math.hypot(nx, ny, 1);
      // occlusione: dove la superficie è concava (orbite, bocca, narici) la luce arriva meno
      var E = 0.035, curv = (z(x + E, y) + z(x - E, y) + z(x, y + E) + z(x, y - E) - 4 * zz) / (E * E);
      var ao = Math.max(0.12, Math.min(1, 1 - curv * 0.055));
      var p = { x: x, y: y, z: zz, nx: nx / l, ny: ny / l, nz: 1 / l, ao: ao, lato: x < -0.012 ? 0 : x > 0.012 ? 1 : 2 };
      P.push(p); fila.push(p);
    }
    RIGHE.push(fila);
  }
  // la nuca: pochi punti, solo per dare volume quando la testa gira
  var dietro = [];
  for (var i = 0; i < 520; i++) {
    var th = Math.acos(1 - 2 * Math.random()), ph = Math.random() * Math.PI * 2;
    var sx_ = Math.sin(th) * Math.cos(ph), sy_ = Math.cos(th), sz_ = Math.sin(th) * Math.sin(ph);
    if (sz_ > 0.1) continue;
    var yy = sy_ * 1.02 + 0.06;
    dietro.push({ x: sx_ * Math.max(0.1, largo(Math.max(-0.95, Math.min(1, yy))) * 1.02), y: yy, z: sz_ * 0.55 - 0.05, nx: sx_, ny: sy_, nz: sz_, lato: 3 });
  }
  // partenza sparsa: ogni punto arriva da una sfera larga
  P.concat(dietro).forEach(function (p) {
    var t = Math.random() * Math.PI * 2, f = Math.acos(2 * Math.random() - 1), r = 2.4 + Math.random() * 1.2;
    p.sx = r * Math.sin(f) * Math.cos(t); p.sy = r * Math.cos(f); p.sz = r * Math.sin(f) * Math.sin(t);
    p.rit = (1 - (p.y + 1) / 2.1) * 0.35 + Math.random() * 0.15;
  });
  var occhi = [{ x: -0.29, y: 0.115, lato: 0 }, { x: 0.29, y: 0.115, lato: 1 }];
  occhi.forEach(function (o) { o.z = z(o.x, o.y) + 0.035; });

  /* ---------------------------------------------------------------- stato animato (Motion) */
  var mol = { stiffness: 55, damping: 16, mass: 1 };
  var yaw = M.springValue(0, mol), pitch = M.springValue(0, mol);
  var sguardoX = M.springValue(0, { stiffness: 120, damping: 20 }), sguardoY = M.springValue(0, { stiffness: 120, damping: 20 });
  var stato = { forma: fermo ? 1 : 0 };
  var mouse = { x: 0, y: 0, quando: -1e9 };

  /* ---------------------------------------------------------------- disegno */
  var W = 0, H = 0, dpr = 1;
  function misura() {
    var r = tela.getBoundingClientRect();
    dpr = Math.min(2, window.devicePixelRatio || 1);
    W = r.width; H = r.height;
    tela.width = Math.round(W * dpr); tela.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  var luce = (function () { var l = [-0.75, 0.42, 0.55], n = Math.hypot(l[0], l[1], l[2]); return [l[0] / n, l[1] / n, l[2] / n]; })();
  function liscio(t) { return t < 0 ? 0 : t > 1 ? 1 : t * t * (3 - 2 * t); }

  function disegna(t) {
    if (!W) return;
    ctx.clearRect(0, 0, W, H);
    var ry = yaw.get(), rx = pitch.get();
    var cy = Math.cos(ry), sy = Math.sin(ry), cx = Math.cos(rx), sx = Math.sin(rx);
    var R = Math.min(W, H) * (opzioni.scala || 0.36), ox = W / 2, oy = H * (opzioni.centroY || 0.5), F = 3.4;
    var forma = stato.forma;
    var scan = fermo ? -9 : 1.25 - ((t / 1000) % 6.5) / 6.5 * 3.2; // banda che scende

    function proietta(p, out) {
      var k = forma >= 1 ? 1 : liscio((forma - p.rit) / 0.55);
      var X = p.sx + (p.x - p.sx) * k, Y = p.sy + (p.y - p.sy) * k, Z = p.sz + (p.z - p.sz) * k;
      var x1 = X * cy + Z * sy, z1 = -X * sy + Z * cy;
      var y1 = Y * cx - z1 * sx, z2 = Y * sx + z1 * cx;
      var s = F / (F - z2);
      out.x = ox + x1 * s * R; out.y = oy - y1 * s * R; out.z = z2; out.s = s; out.k = k;
      var nx = p.nx * cy + p.nz * sy, nz1 = -p.nx * sy + p.nz * cy;
      var ny = p.ny * cx - nz1 * sx, nz = p.ny * sx + nz1 * cx;
      var chiave = Math.max(0, nx * luce[0] + ny * luce[1] + nz * luce[2]);
      var riemp = Math.max(0, nx * 0.7 + ny * 0.1 + nz * 0.7);
      out.l = Math.min(1, chiave * 0.85 + riemp * 0.38 + Math.pow(1 - Math.abs(nz), 3) * 0.25);
      out.v = nz; // verso chi guarda
      return out;
    }
    var q = {}, q2 = {};

    // nuca
    for (var i = 0; i < dietro.length; i++) {
      var p = proietta(dietro[i], q);
      var al = 0.18 * (0.4 + 0.6 * p.k) * Math.max(0.15, 0.5 - p.z);
      ctx.fillStyle = 'rgba(' + oro + ',' + al.toFixed(3) + ')';
      ctx.fillRect(p.x - 0.7, p.y - 0.7, 1.4, 1.4);
    }

    // lato umanoide: linee d'oro lungo le righe e qualche colonna
    ctx.lineWidth = 1;
    for (var r = 0; r < RIGHE.length; r++) {
      var fila = RIGHE[r];
      for (var j = 1; j < fila.length; j++) {
        var A = fila[j - 1], B = fila[j];
        if (A.lato !== 1 || B.lato !== 1) continue;
        var a = proietta(A, q), b = proietta(B, q2);
        if (a.k < 0.85) continue;
        var vis = Math.max(0, Math.min(1, (a.v + 0.25) * 1.6));
        if (vis <= 0) continue;
        var acc = Math.abs(A.y - scan) < 0.05 ? 1 : 0;
        var al2 = (0.2 + 0.8 * Math.pow(a.l * A.ao, 1.1)) * vis * (r % 2 === 0 ? 1 : 0.45) * ((a.k - 0.85) / 0.15);
        ctx.strokeStyle = acc ? 'rgba(255,241,209,' + Math.min(1, al2 + 0.5).toFixed(3) + ')' : 'rgba(' + oro + ',' + al2.toFixed(3) + ')';
        ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
      }
    }
    // colonne verticali dell'umanoide, una ogni sei
    for (var r2 = 1; r2 < RIGHE.length; r2++) {
      var su = RIGHE[r2 - 1], giu = RIGHE[r2];
      for (var j2 = 0; j2 < giu.length; j2 += 6) {
        var B2 = giu[j2]; if (B2.lato !== 1) continue;
        var A2 = null, best = 1;
        for (var m = 0; m < su.length; m++) { var d = Math.abs(su[m].x - B2.x); if (d < best) { best = d; A2 = su[m]; } }
        if (!A2 || best > 0.02 || A2.lato !== 1) continue;
        var a3 = proietta(A2, q), b3 = proietta(B2, q2);
        if (a3.k < 0.85) continue;
        var vis3 = Math.max(0, Math.min(1, (a3.v + 0.25) * 1.6));
        ctx.strokeStyle = 'rgba(' + oro + ',' + ((0.1 + 0.55 * a3.l) * vis3 * ((a3.k - 0.85) / 0.15)).toFixed(3) + ')';
        ctx.beginPath(); ctx.moveTo(a3.x, a3.y); ctx.lineTo(b3.x, b3.y); ctx.stroke();
      }
    }

    // punti: pelle a sinistra, nodi d'oro a destra, cucitura al centro
    for (var n = 0; n < P.length; n++) {
      var pt = P[n], o = proietta(pt, q);
      var vis4 = Math.max(0, Math.min(1, (o.v + 0.2) * 1.8));
      if (o.k < 1) vis4 = Math.max(vis4, 0.35);
      if (vis4 <= 0.01) continue;
      var acc2 = Math.abs(pt.y - scan) < 0.035;
      var dim, col, al3;
      if (pt.lato === 0) {
        var lu = o.l * pt.ao; dim = (0.5 + 1.0 * lu) * o.s; col = pelle; al3 = (0.04 + 1.0 * Math.pow(lu, 1.8)) * vis4;
      } else if (pt.lato === 1) {
        if ((n % 3) !== 0 && o.k >= 1) continue;
        var lu2 = o.l * pt.ao; dim = (0.7 + 0.9 * lu2) * o.s; col = oro; al3 = (0.3 + 0.7 * lu2) * vis4;
      } else {
        dim = 1.5 * o.s; col = [255, 222, 150]; al3 = 0.9 * vis4;
      }
      if (acc2) { col = [255, 246, 225]; al3 = Math.min(1, al3 + 0.55); dim *= 1.4; }
      ctx.fillStyle = 'rgba(' + col + ',' + al3.toFixed(3) + ')';
      ctx.fillRect(o.x - dim, o.y - dim, dim * 2, dim * 2);
    }

    // occhi: l'iride umana e la lente dell'umanoide seguono lo sguardo
    if (forma > 0.9) {
      var gx = sguardoX.get(), gy = sguardoY.get(), fa = (forma - 0.9) / 0.1;
      occhi.forEach(function (oc) {
        var p0 = { x: oc.x + gx * 0.035, y: oc.y + gy * 0.025, z: oc.z, nx: 0, ny: 0, nz: 1, sx: 0, sy: 0, sz: 0, rit: 0 };
        var o2 = proietta(p0, q);
        if (o2.v < 0.05) return;
        var rr = R * 0.045 * o2.s, vis5 = Math.min(1, o2.v * 2) * fa;
        if (oc.lato === 0) {
          ctx.strokeStyle = 'rgba(246,236,214,' + (0.35 * vis5).toFixed(3) + ')';
          ctx.lineWidth = 1.2;
          ctx.beginPath(); ctx.ellipse(o2.x, o2.y, rr, rr, 0, 0, Math.PI * 2); ctx.stroke();
          ctx.fillStyle = 'rgba(11,29,58,' + (0.9 * vis5).toFixed(3) + ')';
          ctx.beginPath(); ctx.arc(o2.x, o2.y, rr * 0.45, 0, Math.PI * 2); ctx.fill();
          ctx.fillStyle = 'rgba(255,255,255,' + (0.85 * vis5).toFixed(3) + ')';
          ctx.beginPath(); ctx.arc(o2.x - rr * 0.25, o2.y - rr * 0.3, rr * 0.16, 0, Math.PI * 2); ctx.fill();
        } else {
          var pulsa = fermo ? 1 : 0.75 + 0.25 * Math.sin(t / 380);
          var gr = ctx.createRadialGradient(o2.x, o2.y, 0, o2.x, o2.y, rr * 2.6);
          gr.addColorStop(0, 'rgba(255,236,180,' + (0.95 * vis5 * pulsa).toFixed(3) + ')');
          gr.addColorStop(0.35, 'rgba(212,168,67,' + (0.55 * vis5 * pulsa).toFixed(3) + ')');
          gr.addColorStop(1, 'rgba(212,168,67,0)');
          ctx.fillStyle = gr;
          ctx.beginPath(); ctx.arc(o2.x, o2.y, rr * 2.6, 0, Math.PI * 2); ctx.fill();
          ctx.strokeStyle = 'rgba(255,226,160,' + (0.9 * vis5).toFixed(3) + ')';
          ctx.lineWidth = 1.4;
          ctx.beginPath(); ctx.arc(o2.x, o2.y, rr, 0, Math.PI * 2); ctx.stroke();
        }
      });
    }
  }

  /* ---------------------------------------------------------------- vita */
  var vivo = false, idRaf = 0, inizio = performance.now();
  function giro(t) {
    if (!vivo) return;
    var tt = t - inizio, ora = performance.now();
    var pos = opzioni.posizione ? opzioni.posizione() : 0;
    var conMouse = ora - mouse.quando < 2500;
    // la testa: dove sta sullo schermo + il puntatore + un respiro lento
    var respiro = Math.sin(tt / 2600) * 0.38;
    yaw.set(pos * -0.5 + (conMouse ? mouse.x * 0.55 : respiro));
    pitch.set((conMouse ? mouse.y * -0.28 : Math.sin(tt / 3100) * 0.06) + 0.04);
    sguardoX.set(conMouse ? mouse.x : Math.sin(tt / 1700) * 0.6);
    sguardoY.set(conMouse ? mouse.y : 0);
    disegna(tt);
    idRaf = requestAnimationFrame(giro);
  }
  function suPuntatore(e) {
    var r = tela.getBoundingClientRect();
    mouse.x = Math.max(-1, Math.min(1, (e.clientX - (r.left + r.width / 2)) / (r.width * 0.8)));
    mouse.y = Math.max(-1, Math.min(1, (e.clientY - (r.top + r.height / 2)) / (r.height * 0.8)));
    mouse.quando = performance.now();
  }

  misura();
  window.addEventListener('resize', misura);
  if (window.ResizeObserver) new ResizeObserver(misura).observe(tela);
  if (fermo) {
    yaw.jump ? yaw.jump(-0.35) : yaw.set(-0.35);
    requestAnimationFrame(function () { disegna(0); });
    return function () { window.removeEventListener('resize', misura); };
  }
  window.addEventListener('pointermove', suPuntatore, { passive: true });
  var assemblato = false;
  var smetti = M.inView(tela, function () {
    vivo = true; idRaf = requestAnimationFrame(giro);
    if (!assemblato) {
      assemblato = true;
      M.animate(stato, { forma: 1 }, { duration: 2.6, ease: [0.22, 1, 0.36, 1] });
    }
    return function () { vivo = false; cancelAnimationFrame(idRaf); };
  }, { amount: 0.15 });
  return function () {
    vivo = false; cancelAnimationFrame(idRaf);
    smetti && smetti();
    window.removeEventListener('resize', misura);
    window.removeEventListener('pointermove', suPuntatore);
  };
}


export { creaVolto };
