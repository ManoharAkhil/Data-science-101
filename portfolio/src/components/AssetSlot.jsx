import { ImageSquare } from '@phosphor-icons/react'

// Shows the original artwork when `src` is set; otherwise a labelled slot
// naming exactly which asset belongs here. No stock imagery stands in for
// real work.
export default function AssetSlot({ asset, className = '', ratio = '4 / 3' }) {
  if (asset?.src) {
    return (
      <img
        src={asset.src}
        alt={asset.label}
        loading="lazy"
        className={`h-full w-full rounded-[inherit] object-cover ${className}`}
        style={{ aspectRatio: ratio }}
      />
    )
  }
  return (
    <div
      className={`slot flex flex-col items-center justify-center gap-3 rounded-[inherit] p-6 text-center ${className}`}
      style={{ aspectRatio: ratio }}
      role="img"
      aria-label={`Placeholder for ${asset?.label}`}
    >
      <ImageSquare size={28} weight="light" className="text-dim" />
      <span className="max-w-[24ch] text-sm text-dim">{asset?.label}</span>
    </div>
  )
}
