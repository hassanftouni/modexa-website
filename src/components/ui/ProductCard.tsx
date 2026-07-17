import Link from "next/link";
import type { Product } from "@/content/types";
import { productStatusLabels } from "@/content/products";
import { Badge } from "./Badge";
import { Icon } from "./icons";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="card-surface group relative flex h-full flex-col gap-4 rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:shadow-[0_20px_50px_-24px_rgba(124,93,247,0.45)]">
      <div className="flex items-start justify-between gap-3">
        <div className="flex size-11 items-center justify-center rounded-xl border border-brand/30 bg-brand/10 text-[#c4a1fa] transition-colors group-hover:text-white">
          <Icon name={product.icon} className="size-5" />
        </div>
        <Badge tone={product.status === "available" ? "brand" : "neutral"}>
          {productStatusLabels[product.status]}
        </Badge>
      </div>
      <h3 className="text-lg font-semibold">{product.name}</h3>
      <p className="text-sm leading-relaxed text-muted">
        {product.shortDescription}
      </p>
      <ul className="mt-auto flex flex-col gap-1.5 text-sm text-muted">
        {product.highlights.map((highlight) => (
          <li key={highlight} className="flex items-start gap-2">
            <Icon name="check" className="mt-0.5 size-4 shrink-0 text-brand-accent" />
            {highlight}
          </li>
        ))}
      </ul>
      {product.href ? (
        <Link
          href={product.href}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-accent transition-colors hover:text-white"
        >
          Explore {product.name}
          <Icon
            name="arrowRight"
            className="size-4 transition-transform duration-300 group-hover:translate-x-1"
          />
        </Link>
      ) : (
        <Link
          href="/contact"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-accent transition-colors hover:text-white"
        >
          Ask about this product
          <Icon
            name="arrowRight"
            className="size-4 transition-transform duration-300 group-hover:translate-x-1"
          />
          <span className="sr-only"> — {product.name}</span>
        </Link>
      )}
    </article>
  );
}
