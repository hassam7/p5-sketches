const colorMaxes = [255, 255, 255, 255];
onmessage = function (e) {
  const { index, imageHeight, imageWidth, pixelArray } = e.data;
  const image = new ImageData(pixelArray, imageWidth, imageHeight);
  const brightnessValue = computeBrightnessValue(
    imageHeight,
    imageWidth,
    pixelArray
  );
  postMessage({ index, brightness: brightnessValue, image });
};

const computeBrightnessValue = (imageHeight, imageWidth, pixelArray) => {
  let avg = 0;
  const height = Math.floor(imageHeight);
  const width = Math.floor(imageWidth);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const index = (x + y * width) * 4;
      const red = pixelArray[index + 0];
      const green = pixelArray[index + 1];
      const blue = pixelArray[index + 2];
      const alpha = pixelArray[index + 3];
      const normalizedColor = _parseInputs(...[red, green, blue, alpha]);
      const hsba = _rgbaToHSBA(normalizedColor);
      const brightness = hsba[2] * 100;
      avg += brightness;
    }
  }
  avg /= pixelArray.length / 4;
  return Math.floor(avg);
};

function _parseInputs(r, g, b, a) {
  var numArgs = arguments.length;
  var maxes = colorMaxes;
  var results = [];
  var i;

  if (numArgs >= 3) {
    // Argument is a list of component values.

    results[0] = r / maxes[0];
    results[1] = g / maxes[1];
    results[2] = b / maxes[2];

    // Alpha may be undefined, so default it to 100%.
    if (typeof a === "number") {
      results[3] = a / maxes[3];
    } else {
      results[3] = 1;
    }

    // Constrain components to the range [0,1].
    // (loop backwards for performance)
    for (i = results.length - 1; i >= 0; --i) {
      var result = results[i];
      if (result < 0) {
        results[i] = 0;
      } else if (result > 1) {
        results[i] = 1;
      }
    }
  }
  return results;
}
function calculateLevels(array) {
  var levels = new Array(array.length);
  for (var i = array.length - 1; i >= 0; --i) {
    levels[i] = Math.round(array[i] * 255);
  }

  return levels;
}

function _rgbaToHSBA(rgba) {
  var red = rgba[0];
  var green = rgba[1];
  var blue = rgba[2];

  var val = Math.max(red, green, blue);
  var chroma = val - Math.min(red, green, blue);

  var hue, sat;
  if (chroma === 0) {
    // Return early if grayscale.
    hue = 0;
    sat = 0;
  } else {
    sat = chroma / val;
    if (red === val) {
      // Magenta to yellow.
      hue = (green - blue) / chroma;
    } else if (green === val) {
      // Yellow to cyan.
      hue = 2 + (blue - red) / chroma;
    } else if (blue === val) {
      // Cyan to magenta.
      hue = 4 + (red - green) / chroma;
    }
    if (hue < 0) {
      // Confine hue to the interval [0, 1).
      hue += 6;
    } else if (hue >= 6) {
      hue -= 6;
    }
  }

  return [hue / 6, sat, val, rgba[3]];
}
