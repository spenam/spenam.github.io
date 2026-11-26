(() => {
  "use strict";

  const ROOT = "https://raw.githubusercontent.com/spenam/Tessera/main/tessera";
  const PYODIDE_VERSION = "0.27.7";
  const PYODIDE_CDN = `https://cdn.jsdelivr.net/pyodide/v${PYODIDE_VERSION}/full/`;

  const SOURCES = [
    "__init__.py",
    "render.py",
    "geometry.py",
    "style.py",
    "presets.py",
    "catalogue.py",
    "tilings/__init__.py",
    "tilings/periodic.py",
    "tilings/aperiodic.py",
    "tilings/uniform.py",
  ];

  const $ = (id) => document.getElementById(id);

  const preview = $("tessera-preview");
  const status = $("tessera-status");
  const error = $("tessera-error");

  if (!preview || !status) return;

  let pyodide = null;
  let renderTimer = null;
  let renderVersion = 0;
  let ready = false;

  function setStatus(message) {
    status.textContent = message;
  }

  function showError(message) {
    error.textContent = message;
  }

  function setOutput(id, value) {
    const output = $(`${id}-value`);
    if (output) output.textContent = value;
  }

  function updateControlVisibility() {
    const generator = $("tessera-generator").value;

    $("tessera-polygon-controls").hidden = generator !== "polygon";
    $("tessera-quasi-controls").hidden = generator !== "quasicrystal";
    $("tessera-uniform-controls").hidden = generator !== "uniform";
  }

  function getConfig() {
    const generator = $("tessera-generator").value;

    const layer = {
      type: generator,
      tile_size: Number($("tessera-size").value),
      rotation: Number($("tessera-rotation").value),
      scale: Number($("tessera-scale").value),
      stroke: $("tessera-stroke").value,
      stroke_width: Number($("tessera-stroke-width").value),
      fill: "palette",
      opacity: 1,
    };

    if (generator === "polygon") {
      layer.sides = Number($("tessera-sides").value);
      layer.arrangement = "triangular";
      layer.polygon_rotation = 15;
    }

    if (generator === "quasicrystal") {
      layer.extent = Number($("tessera-extent").value);
      layer.window = 1.35;
      layer.max_points = 350;
    }

    if (generator === "uniform") {
      layer.notation = $("tessera-notation").value.trim();
      layer.max_repeat = Number($("tessera-repeat").value);
    }

    return {
      width: 900,
      height: 700,
      background: $("tessera-background").value,
      palette: $("tessera-palette").value,
      seed: 12,
      layers: [layer],
    };
  }

  function updateLabels() {
    setOutput("tessera-size", $("tessera-size").value);
    setOutput("tessera-rotation", `${$("tessera-rotation").value}°`);
    setOutput("tessera-scale", Number($("tessera-scale").value).toFixed(2));
    setOutput("tessera-stroke-width", Number($("tessera-stroke-width").value).toFixed(1));
    setOutput("tessera-sides", $("tessera-sides").value);
    setOutput("tessera-extent", $("tessera-extent").value);
    setOutput("tessera-repeat", $("tessera-repeat").value);
  }

  async function loadScript(url) {
    if (window.loadPyodide) return;

    await new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = url;
      script.onload = resolve;
      script.onerror = () => reject(new Error("Could not load the Pyodide runtime."));
      document.head.appendChild(script);
    });
  }

  async function loadTesseraSource() {
    const base = "/home/pyodide/tessera";

    pyodide.FS.mkdirTree(`${base}/tilings`);

    for (const path of SOURCES) {
      const response = await fetch(`${ROOT}/${path}`);

      if (!response.ok) {
        throw new Error(`Could not load Tessera source file: ${path} (${response.status})`);
      }

      const source = await response.text();
      const destination = `${base}/${path}`;

      pyodide.FS.writeFile(destination, source);
    }

    await pyodide.runPythonAsync(`
import sys
sys.path.insert(0, "/home/pyodide")
import tessera
`);
  }

  async function renderTiling() {
    if (!ready) return;

    const thisRender = ++renderVersion;
    showError("");
    setStatus("Rendering…");

    try {
      const config = getConfig();

      pyodide.globals.set("tessera_config_json", JSON.stringify(config));

      const svg = await pyodide.runPythonAsync(`
import json
from tessera import render

_config = json.loads(tessera_config_json)
_svg = render(_config)
_svg
`);

      pyodide.globals.delete("tessera_config_json");

      // Ignore an older render if the user has already changed a control.
      if (thisRender !== renderVersion) return;

      preview.innerHTML = svg;
      setStatus("Ready");
    } catch (exception) {
      if (thisRender !== renderVersion) return;

      showError(exception.message || String(exception));
      setStatus("Could not render");
    }
  }

  function scheduleRender() {
    updateLabels();
    updateControlVisibility();

    if (!ready) return;

    clearTimeout(renderTimer);
    renderTimer = setTimeout(renderTiling, 160);
  }

  function bindControls() {
    const ids = [
      "tessera-generator",
      "tessera-size",
      "tessera-rotation",
      "tessera-scale",
      "tessera-palette",
      "tessera-background",
      "tessera-stroke",
      "tessera-stroke-width",
      "tessera-sides",
      "tessera-extent",
      "tessera-notation",
      "tessera-repeat",
    ];

    ids.forEach((id) => {
      const element = $(id);
      if (!element) return;

      element.addEventListener("input", scheduleRender);
      element.addEventListener("change", scheduleRender);
    });

    updateLabels();
    updateControlVisibility();
  }

  async function initialise() {
    bindControls();

    try {
      setStatus("Loading Pyodide…");

      await loadScript(`${PYODIDE_CDN}pyodide.js`);

      pyodide = await window.loadPyodide({
        indexURL: PYODIDE_CDN,
      });

      setStatus("Loading Tessera…");

      await loadTesseraSource();

      ready = true;
      setStatus("Ready");

      await renderTiling();
    } catch (exception) {
      console.error("Tessera initialisation failed:", exception);
      setStatus("Initialisation failed");
      showError(exception.message || "Something went wrong while loading the Tessera engine.");
    }
  }

  initialise();
})();
