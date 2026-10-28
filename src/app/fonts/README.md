The six WOFF2 files are the supplied Latin Space Grotesk and JetBrains Mono
fonts, self-hosted through `next/font/local`. Their original SIL Open Font
Licenses are included alongside them.

The two TTF files are derived from those same WOFF2 assets for `next/og`,
whose Satori renderer does not accept WOFF2. They contain decoded, unhinted
TrueType outlines with flattened composite glyphs, preserving the character
maps and advance widths. Conversion used Fontkit already bundled with Next;
there is no runtime conversion or network font request. The site itself uses
the original WOFF2 files.

`og-name.svg` contains the name's Space Grotesk 700 outlines at 84px with
-2px tracking. This static display line keeps the heading intact in the OG
renderer when combined with smaller text using the same characters. It is
derived from the supplied font, not a separate typeface; regenerate the
outline if the displayed name changes.
