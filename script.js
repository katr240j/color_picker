"use strict";

window.addEventListener("DOMContentLoaded", () => {
  console.log("DOMContentLoaded");
  document.querySelector("input").addEventListener("input", showColorInfo);
});

function showColorInfo() {
  // Get current hex-code
  let hex = document.querySelector("input").value.toUpperCase();
  let rgb = hexToRgb(hex);
  let hsl = rgbToHsl(rgb);

  // Show block with current color
  showColor(hex);

  // Show color codes
  showHex(hex);
  showRgb(rgb);
  showHsl(hsl);
}

function showColor(hex) {
  document.querySelector("#show-color").style.backgroundColor = hex;
}

function showHex(hex) {
  document.querySelector("#show-hex").textContent = `HEX: ${hex}`;
}

function showRgb(rgb) {
  document.querySelector("#show-rgb").textContent = `RGB: ${rgb.r}, ${rgb.g}, ${rgb.b}`;
}

function showHsl(hsl) {
  document.querySelector("#show-hsl").textContent = `HSL: ${hsl.h}, ${hsl.s}%, ${hsl.l}%`;
}

randomBackground();

function randomBackground() {
  const theColor = randomColor();
  const theString = rgbToCss(theColor);
  document.querySelector(".html-color").style.backgroundColor = theString;
}
function randomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return { r, g, b };
}
function rgbToCss(theColor) {
  const finalString = "rgb(" + theColor.r.toString() + ", " + theColor.g.toString() + ", " + theColor.b.toString() + ")";
  console.log(finalString);
  return finalString;
}


// Convert 6 digit hex-code (#45ff7a) to rgb using parseInt()
function hexToRgb(hex) {
  const r = parseInt(hex.substring(1, 3), 16);
  const g = parseInt(hex.substring(3, 5), 16);
  const b = parseInt(hex.substring(5), 16);
  // Return decimal rgb values as objects
  return {
    r: r,
    g: g,
    b: b,
  };
}

function rgbToHsl(rgb) {
  let r = rgb.r;
  let g = rgb.g;
  let b = rgb.b;

  r /= 255;
  g /= 255;
  b /= 255;

  let h, s, l;

  const min = Math.min(r, g, b);
  const max = Math.max(r, g, b);

  if (max === min) {
    h = 0;
  } else if (max === r) {
    h = 60 * (0 + (g - b) / (max - min));
  } else if (max === g) {
    h = 60 * (2 + (b - r) / (max - min));
  } else if (max === b) {
    h = 60 * (4 + (r - g) / (max - min));
  }

  if (h < 0) {
    h = h + 360;
  }

  l = (min + max) / 2;

  if (max === 0 || min === 1) {
    s = 0;
  } else {
    s = (max - l) / Math.min(l, 1 - l);
  }
  // Multiply s and l by 100 to get the value in percent (rather than [0,1])
  s *= 100;
  l *= 100;

  // Return hsl values as objects
  return {
    h: Math.round(h),
    s: Math.round(s),
    l: Math.round(l),
  };
}
