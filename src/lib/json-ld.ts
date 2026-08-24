/**
 * Serialize structured data for an HTML script element.
 *
 * JSON permits a literal "<", but the HTML parser treats a literal </script>
 * inside script text as the end of the element. Escaping every "<" as its JSON
 * Unicode form keeps hostile or accidental markup as data while preserving the
 * value produced by JSON.parse.
 */
export function serializeJsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}
