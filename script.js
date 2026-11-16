/* SatShare Network — landing page interactions */
(function () {
  "use strict";

  /* Lucide icons */
  if (window.lucide) lucide.createIcons();

  /* Footer year */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* Mobile nav toggle */
  var toggle = document.getElementById("navToggle");
  var links = document.getElementById("navLinks");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.innerHTML = open ? '<i data-lucide="x"></i>' : '<i data-lucide="menu"></i>';
      if (window.lucide) lucide.createIcons();
    });
    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        links.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.innerHTML = '<i data-lucide="menu"></i>';
        if (window.lucide) lucide.createIcons();
      });
    });
  }

  /* Reveal on scroll */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("visible"); });
  }

  /* FAQ accordion */
  document.querySelectorAll(".faq-item").forEach(function (item) {
    var btn = item.querySelector(".faq-q");
    var answer = item.querySelector(".faq-a");
    btn.addEventListener("click", function () {
      var isOpen = item.classList.contains("open");
      document.querySelectorAll(".faq-item.open").forEach(function (other) {
        other.classList.remove("open");
        other.querySelector(".faq-a").style.maxHeight = null;
        other.querySelector(".faq-q").setAttribute("aria-expanded", "false");
      });
      if (!isOpen) {
        item.classList.add("open");
        answer.style.maxHeight = answer.scrollHeight + "px";
        btn.setAttribute("aria-expanded", "true");
      }
    });
  });

  /* ---------- Earnings calculator (estimates only) ---------- */
  var bandwidthEl = document.getElementById("calcBandwidth");
  var priceEl = document.getElementById("calcPrice");
  var poolEl = document.getElementById("calcPool");
  var costEl = document.getElementById("calcCost");
  var btcEl = document.getElementById("calcBtc");

  var outGross = document.getElementById("outGross");
  var outPool = document.getElementById("outPool");
  var outReward = document.getElementById("outReward");
  var outSat = document.getElementById("outSat");
  var outCost = document.getElementById("outCost");
  var outProfit = document.getElementById("outProfit");

  function num(el) {
    var v = parseFloat(el.value);
    return isNaN(v) || v < 0 ? 0 : v;
  }
  function usd(v) {
    return "$" + v.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  function recalc() {
    var bandwidth = num(bandwidthEl);
    var price = num(priceEl);
    var poolPct = Math.min(100, num(poolEl));
    var cost = num(costEl);
    var btcPrice = num(btcEl);

    var gross = bandwidth * price;
    var pool = gross * (poolPct / 100);
    var reward = pool; // this user's share of the pool for their own contribution
    var profit = gross - pool - cost;

    outGross.textContent = usd(gross);
    outPool.textContent = usd(pool);
    outReward.textContent = usd(reward);
    outCost.textContent = usd(cost);
    outProfit.textContent = usd(profit);

    if (btcPrice > 0 && reward > 0) {
      var sats = Math.round((reward / btcPrice) * 100000000);
      outSat.textContent = sats.toLocaleString("en-US") + " SAT (est.)";
    } else if (btcPrice > 0) {
      outSat.textContent = "0 SAT (est.)";
    } else {
      outSat.textContent = "— enter BTC price above";
    }
  }

  [bandwidthEl, priceEl, poolEl, costEl, btcEl].forEach(function (el) {
    el.addEventListener("input", recalc);
  });
  recalc();
})();
