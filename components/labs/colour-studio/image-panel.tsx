"use client";

/**
 * Palette from an image, processed entirely in this browser: the file is
 * decoded with createImageBitmap, drawn small on an off-screen canvas and
 * quantised with median cut (lib/formulas/colour). Nothing is uploaded.
 */
import { useEffect, useId, useState } from "react";
import { fitWithin, medianCut } from "@/lib/formulas/colour";
import { ColourField, CopyButton, Note, useAnnounce } from "./shared";

const MAX_BYTES = 20 * 1024 * 1024;
const SAMPLE = 200; // longest side, in pixels, used for sampling
const TYPES = ["image/png", "image/jpeg", "image/webp", "image/gif", "image/avif", "image/bmp"];

type Extracted = { hex: string; share: number }[];

async function sample(file: File): Promise<Uint8ClampedArray> {
  let bitmap: ImageBitmap;
  try {
    bitmap = await createImageBitmap(file);
  } catch {
    throw new Error("This file could not be read as an image. Try a PNG, JPEG or WebP.");
  }
  const { width, height } = fitWithin(bitmap.width, bitmap.height, SAMPLE);
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) throw new Error("This browser cannot process images here.");
  ctx.drawImage(bitmap, 0, 0, width, height);
  bitmap.close();
  return ctx.getImageData(0, 0, width, height).data;
}

export function ImagePanel({ onUse }: { onUse: (colours: string[]) => void }) {
  const announce = useAnnounce();
  const id = useId();
  const [url, setUrl] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [pixels, setPixels] = useState<Uint8ClampedArray | null>(null);
  const [k, setK] = useState(5);
  const [colours, setColours] = useState<Extracted>([]);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => () => void (url && URL.revokeObjectURL(url)), [url]);

  const extract = (px: Uint8ClampedArray, n: number) => {
    try {
      const out = medianCut(px, n);
      setColours(out);
      setError("");
      announce(`Extracted ${out.length} colours.${out.length < n ? " The image has fewer distinct colours than requested." : ""}`);
    } catch (e) {
      setColours([]);
      setError(e instanceof Error ? e.message : "Could not extract colours.");
    }
  };

  const onFile = async (file: File | undefined) => {
    if (!file) return;
    setError("");
    if (!file.type.startsWith("image/") || (file.type && !TYPES.includes(file.type))) return setError(`“${file.name}” is not a supported image. Use PNG, JPEG, WebP, GIF, AVIF or BMP.`);
    if (file.size > MAX_BYTES) return setError(`“${file.name}” is ${(file.size / 1024 / 1024).toFixed(1)} MB; the limit is 20 MB.`);
    setBusy(true);
    try {
      const px = await sample(file);
      setUrl(URL.createObjectURL(file));
      setName(file.name);
      setPixels(px);
      extract(px, k);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not read the image.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end gap-4">
        <div>
          <p className="field-label">Image</p>
          <p id={`${id}-hint`} className="field-hint">
            PNG, JPEG, WebP, GIF, AVIF or BMP, up to 20 MB. It is processed on this device and never uploaded.
          </p>
          <div className="mt-1 flex flex-wrap items-center gap-3">
            <label className="btn btn-secondary btn-sm cursor-pointer focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-[var(--accent)]">
              {url ? "Choose another image" : "Choose image…"}
              <input
                id={`${id}-file`}
                type="file"
                accept={TYPES.join(",")}
                aria-describedby={`${id}-hint`}
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  e.target.value = "";
                  onFile(f);
                }}
                className="sr-only"
              />
            </label>
            {name && <span className="text-sm text-ink-2">{name}</span>}
          </div>
        </div>
        <div className="w-56">
          <label htmlFor={`${id}-k`} className="field-label">
            Number of colours: {k}
          </label>
          <input
            id={`${id}-k`}
            type="range"
            min={2}
            max={10}
            value={k}
            onChange={(e) => {
              const n = Number(e.target.value);
              setK(n);
              if (pixels) extract(pixels, n);
            }}
            className="mt-2 w-full accent-[var(--accent)]"
          />
        </div>
      </div>
      <p role="status" className="sr-only">
        {busy ? "Reading the image…" : ""}
      </p>
      {error && (
        <p role="alert" className="rounded-md border border-error bg-error-wash p-3 text-sm text-ink">
          <span aria-hidden>⚠ </span>
          {error}
        </p>
      )}

      {!url && !error && <p className="rounded-md border border-dashed border-rule p-6 text-center text-sm text-ink-3">No image yet. Choose a photo, illustration or screenshot to sample its colours.</p>}

      {url && (
        <div className="grid gap-6 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)]">
          {/* eslint-disable-next-line @next/next/no-img-element -- a local object URL, not an optimisable asset */}
          <img src={url} alt={`The image you chose: ${name}`} className="max-h-80 w-full rounded-md border border-rule object-contain" />
          <div className="min-w-0 space-y-3">
            <p className="text-sm text-ink-2">Colours ordered by how much of the image each represents. Edit any value before using them.</p>
            <ul className="grid grid-cols-[repeat(auto-fill,minmax(11rem,1fr))] gap-3">
              {colours.map((c, i) => (
                <li key={i} className="min-w-0 rounded-md border border-rule bg-surface p-3">
                  <div className="mb-2 h-12 rounded-xs border border-rule" style={{ background: c.hex }} aria-hidden />
                  <ColourField label={`Extracted colour ${i + 1}`} value={c.hex} onChange={(hex) => setColours(colours.map((x, j) => (j === i ? { ...x, hex } : x)))} compact />
                  <p className="mt-1 text-xs text-ink-3">{Math.round(c.share * 100)}% of sampled pixels</p>
                </li>
              ))}
            </ul>
            {colours.length > 0 && (
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  onClick={() => {
                    onUse(colours.map((c) => c.hex));
                    announce(`Using ${colours.length} extracted colours as the palette.`);
                  }}
                >
                  Use as palette
                </button>
                <CopyButton text={colours.map((c) => c.hex).join(", ")} what="extracted hex values" label="Copy HEX" />
              </div>
            )}
          </div>
        </div>
      )}

      <Note title="How extraction works">
        <p>
          The image is scaled to at most {SAMPLE} pixels on its longest side, transparent pixels are ignored, and the remaining colours are divided by <strong>median cut</strong>: the group with the widest red, green or blue range is split at its median until there are as many groups as you asked for. Each colour is a group&rsquo;s
          average, so small vivid details can disappear into larger areas. Treat the result as raw material: an image&rsquo;s dominant colours are rarely a usable interface palette without neutrals and contrast checks.
        </p>
      </Note>
    </div>
  );
}
