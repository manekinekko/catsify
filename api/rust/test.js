const fs = require('fs');
const path = require('path');
const wasmFile = path.join(__dirname, 'generator_bindgen_bg.wasm');

// #region
let cachedTextDecoder = new TextDecoder('utf-8');
let cachegetInt32Memory = null;
function getInt32Memory(wasm) {
    if (cachegetInt32Memory === null || cachegetInt32Memory.buffer !== wasm.memory.buffer) {
        cachegetInt32Memory = new Int32Array(wasm.memory.buffer);
    }
    return cachegetInt32Memory;
}

let cachegetUint8Memory = null;
function getUint8Memory(wasm) {
    if (cachegetUint8Memory === null || cachegetUint8Memory.buffer !== wasm.memory.buffer) {
        cachegetUint8Memory = new Uint8Array(wasm.memory.buffer);
    }
    return cachegetUint8Memory;
}

function getStringFromWasm(wasm, ptr, len) {
  return cachedTextDecoder.decode(getUint8Memory(wasm).subarray(ptr, ptr + len));
}

const generate_name_str = function(seed, wasm) {
  const retptr = 8;
  const ret = wasm.generate_name_str(retptr, seed);
  const memi32 = getInt32Memory(wasm);
  const v0 = getStringFromWasm(wasm, memi32[retptr / 4 + 0], memi32[retptr / 4 + 1]).slice();
  wasm.__wbindgen_free(memi32[retptr / 4 + 0], memi32[retptr / 4 + 1] * 1);
  return v0;
};
// #endregion

(async () => {
  try {
    const bytes = new Uint8Array(fs.readFileSync(wasmFile));
    const result = await WebAssembly.instantiate(bytes);
    const wasm = await Promise.resolve(result.instance.exports);
    const seed = (Date.now() % 1000) | 0;
    console.log(generate_name_str(seed, wasm));
  } catch (error) {
    console.error('FAIL');
    console.error(error);
  }
})();
