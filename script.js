// A² Studios — small interactions: mobile nav, scroll reveals, footer year.
(function () {
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");

  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    links.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        links.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("visible"); });
  }

  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  /* ---------- base64 media loader ----------
     Audio + images are stored in the repo as base64 text (.b64 files)
     because the uploader only accepts text. Decode to blob URLs. */
  function blobUrlFor(b64Text, mime) {
    var bin = atob(b64Text.trim());
    var bytes = new Uint8Array(bin.length);
    for (var i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    return URL.createObjectURL(new Blob([bytes], { type: mime }));
  }
  function fetchB64(path) {
    return fetch(path).then(function (r) {
      if (!r.ok) throw new Error("media fetch failed: " + r.status);
      return r.text();
    });
  }

  // Lazy-load images marked with data-b64
  document.querySelectorAll("img[data-b64]").forEach(function (img) {
    fetchB64(img.getAttribute("data-b64"))
      .then(function (t) { img.src = blobUrlFor(t, img.getAttribute("data-mime") || "image/jpeg"); })
      .catch(function () { img.style.minHeight = "0"; });
  });

  /* ---------- single-track audio player ---------- */
  var audio = new Audio();
  audio.preload = "none";
  var currentBtn = null;
  var cache = {}; // b64 path -> blob URL

  function setState(btn, mode) {
    btn.classList.remove("playing", "loading");
    var play = btn.querySelector(".t-play");
    var state = btn.querySelector(".t-state");
    if (mode === "playing") {
      btn.classList.add("playing");
      play.innerHTML = "&#10074;&#10074;";
      state.textContent = "Playing";
    } else if (mode === "loading") {
      btn.classList.add("loading");
      play.innerHTML = "&#8230;";
      state.textContent = "Loading";
    } else {
      play.innerHTML = "&#9654;";
      state.textContent = "";
    }
  }

  function stopCurrent() {
    if (currentBtn) setState(currentBtn, "idle");
    audio.pause();
    audio.removeAttribute("src");
    audio.load();
    currentBtn = null;
  }

  audio.addEventListener("ended", stopCurrent);

  document.querySelectorAll("[data-tracklist] .track").forEach(function (btn) {
    btn.addEventListener("click", function () {
      if (currentBtn === btn && !audio.paused) {
        audio.pause();
        setState(btn, "idle");
        currentBtn = null;
        return;
      }
      if (currentBtn === btn && audio.paused && audio.src) {
        audio.play();
        setState(btn, "playing");
        return;
      }
      stopCurrent();
      currentBtn = btn;
      setState(btn, "loading");
      var path = btn.getAttribute("data-b64");
      var mime = btn.getAttribute("data-mime") || "audio/mpeg";
      var ready = cache[path]
        ? Promise.resolve(cache[path])
        : fetchB64(path).then(function (t) {
            var url = blobUrlFor(t, mime);
            cache[path] = url;
            return url;
          });
      ready.then(function (url) {
        if (currentBtn !== btn) return; // user moved on
        audio.src = url;
        audio.play().then(function () { setState(btn, "playing"); })
          .catch(function () { setState(btn, "idle"); currentBtn = null; });
      }).catch(function () {
        setState(btn, "idle");
        currentBtn = null;
      });
    });
  });
})();
