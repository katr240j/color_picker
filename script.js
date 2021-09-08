"use strict";

//https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/color
document.querySelector(".colorPicker").addEventListener("change", newColor);
document.querySelector(".colorPicker").addEventListener("input", newColor);

function newColor() {
  const hexValue = document.querySelector(".colorPicker").value;
  const rbgValue = HEXtoRBG(hexValue);
  const HSLvalue = RBGtoHSL(rbgValue);

  // console.log(`The chosen  color is: ${hexValue}`);
  // console.log(`The chosen RBG color is:`);
  // console.log(rbgValue);
  // console.log(`The chosen HSL color is:`);
  // console.log(HSLvalue);

  displayColor(hexValue);
  displayColorValues(hexValue, rbgValue, HSLvalue);
}

function HEXtoRBG(hex) {
  //we recieve the value of HEX through the parameter

  //we want to translate it into an object like this one
  //I split the HEX-color into three components, and convert those hexadecimal values to actual numbers

  let rValue = hex.substring(1, 3);
  let bValue = hex.substring(3, 5);
  let gValue = hex.substring(5, 7);

  rValue = parseInt(rValue, 16);
  bValue = parseInt(bValue, 16);
  gValue = parseInt(gValue, 16);

  const RBGvalue = {
    r: rValue,
    b: bValue,
    g: gValue,
  };

  // console.log(RBGvalue);
  return RBGvalue;
}

function RBGtoHEX(rbgvalue) {
  let rValue = rbgvalue.r;
  let bValue = rbgvalue.b;
  let gValue = rbgvalue.g;

  rValue = rValue.toString(16);
  bValue = bValue.toString(16);
  gValue = gValue.toString(16);

  const HEXvalue = "#" + rValue + bValue + gValue;
  console.log(HEXvalue);

  return HEXvalue;
}

function RBGtoHSL(rbgvalue) {
  // console.log(rbgvalue);
  let r = rbgvalue.r;
  let b = rbgvalue.b;
  let g = rbgvalue.g;

  r /= 255;
  g /= 255;
  b /= 255;

  // console.log(rbgvalue);

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
  // multiply s and l by 100 to get the value in percent, rather than [0,1]
  s *= 100;
  l *= 100;

  // console.log("hsl(%f,%f%,%f%)", h, s, l); // just for testing
  const HSLvalue = {
    h: Math.round(h),
    s: Math.round(s),
    l: Math.round(l),
  };
  return HSLvalue;
}

function displayColor(color) {
  document.querySelector(".colorDisplayBox").style.backgroundColor = color;
}

function displayColorValues(HEX, RBG, HSL) {
  // console.log(HEX);
  // console.log(RBG);
  // console.log(HSL);
  document.querySelector(".HEX-info span").textContent = HEX;
  document.querySelector(".RBG-info span").textContent = `${RBG.r}, ${RBG.b}, ${RBG.g},`;
  document.querySelector(".HSL-info span").textContent = `${HSL.h}, ${HSL.s}, ${HSL.l},`;
}