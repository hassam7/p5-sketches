onmessage = function (event) {
  const array = event.data.array;
  const chunkedArray = chunkArray(array, 4);
  const avg = (r, g, b, a) => r + g + b + a / 4;
  chunkedArray.sort((a, b) => {
    const fRed = a[0];
    const fGreen = a[1];
    const fBlue = a[2];
    const fAlpha = a[3];
    const fBrightness = avg(fRed, fGreen, fBlue, fAlpha);
    const sRed = b[0];
    const sGreen = b[1];
    const sBlue = b[2];
    const sAlpha = b[3];
    const sBrightness = avg(sRed, sGreen, sBlue, sAlpha);
    return fBrightness - sBrightness;
  });
  this.postMessage({ chunkedArray: chunkedArray.flat() });
};

function chunkArray(array, size) {
  let result = [];
  for (value of array) {
    let lastArray = result[result.length - 1];
    if (!lastArray || lastArray.length == size) {
      result.push([value]);
    } else {
      lastArray.push(value);
    }
  }
  return result;
}
