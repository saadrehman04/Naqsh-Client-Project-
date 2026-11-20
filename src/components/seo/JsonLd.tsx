/**
 * Structured data for search engines. Renders only an invisible <script type="application/ld+json">;
 * nothing on the page changes. `<` is escaped so content can never close the script tag early.
 */
export function JsonLd({ data }: { data: object | object[] }) {
  const list = Array.isArray(data) ? data : [data];
  return (
    <>
      {list.map((item, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item).replace(/</g, "\\u003c") }}
        />
      ))}
    </>
  );
}
