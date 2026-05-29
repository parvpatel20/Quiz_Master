// Compatibility shim: Node 24+ removed the legacy `SlowBuffer` export from the
// `buffer` module, which some older transitive deps (jsonwebtoken -> jwa ->
// buffer-equal-constant-time) still reference at import time. Restore it before
// the module graph loads. Loaded via `node --import ./src/preload.mjs`.
import buffer from "buffer";

if (!buffer.SlowBuffer) {
  buffer.SlowBuffer = buffer.Buffer;
}
