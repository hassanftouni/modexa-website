/**
 * Renders `text`, colouring the first occurrence of `highlight` with the
 * accent. Editors set both in Pages CMS; if the phrase isn't found (e.g. it
 * was edited in one field but not the other) the text renders unstyled.
 */
export function Highlight({ text, highlight }: { text: string; highlight?: string }) {
  const phrase = highlight?.trim();
  const index = phrase ? text.indexOf(phrase) : -1;
  if (!phrase || index === -1) return <>{text}</>;

  return (
    <>
      {text.slice(0, index)}
      <span className="text-emphasis">{phrase}</span>
      {text.slice(index + phrase.length)}
    </>
  );
}
