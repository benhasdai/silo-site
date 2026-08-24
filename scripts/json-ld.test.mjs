import assert from 'node:assert/strict';
import { serializeJsonLd } from '../src/lib/json-ld.ts';

const hostile = {
  name: '</script><script>globalThis.compromised = true</script>',
  nested: ['ordinary text', '<!-- markup-like data -->', '</ScRiPt>'],
};

const serialized = serializeJsonLd(hostile);

assert.equal(/<\/script/i.test(serialized), false, 'serialized JSON-LD must not contain a script terminator');
assert.equal(serialized.includes('<'), false, 'serialized JSON-LD must not contain a literal opening angle bracket');
assert.deepEqual(JSON.parse(serialized), hostile, 'safe escaping must preserve JSON semantics');

const ordinary = { name: 'SILO', price: 79, visible: true };
assert.equal(serializeJsonLd(ordinary), JSON.stringify(ordinary), 'ordinary JSON-LD output must remain unchanged');

console.log('JSON-LD serialization verified: hostile script text remains data');
