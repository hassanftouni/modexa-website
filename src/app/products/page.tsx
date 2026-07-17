import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { CtaBanner } from "@/components/shared/CtaBanner";
import { AnimatedContainer } from "@/components/ui/AnimatedContainer";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ProductCard } from "@/components/ui/ProductCard";
import { Icon } from "@/components/ui/icons";
import { PosMockup } from "@/components/products/PosMockup";
import { products } from "@/content/products";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Modexa products: Modexa POS — a complete point-of-sale platform — plus business dashboards, booking systems and custom software available by request.",
  alternates: { canonical: "/products" },
  openGraph: {
    title: "Modexa Products",
    description:
      "Modexa POS and business software products built for modern operations.",
    url: "/products",
  },
};

export default function ProductsPage() {
  const pos = products.find((product) => product.slug === "modexa-pos");
  const otherProducts = products.filter(
    (product) => product.slug !== "modexa-pos"
  );

  return (
    <>
      <PageHeader
        eyebrow="Products"
        title={
          <>
            Software products built for{" "}
            <span className="text-gradient">real operations.</span>
          </>
        }
        description="Modexa POS is our main active product. Additional products are developed by request, shaped around each customer's business."
      />

      {/* Featured: Modexa POS */}
      {pos ? (
        <section className="mx-auto w-full max-w-7xl px-6 pb-20">
          <AnimatedContainer>
            <article className="card-surface grid items-center gap-10 rounded-3xl p-8 sm:p-10 lg:grid-cols-2">
              <div className="flex flex-col items-start gap-5">
                <Badge tone="brand">Main product — Available</Badge>
                <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                  Modexa POS
                </h2>
                <p className="text-lg leading-relaxed text-muted">
                  {pos.shortDescription}
                </p>
                <ul className="flex flex-col gap-2">
                  {pos.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="flex items-center gap-2.5 text-sm text-foreground/90"
                    >
                      <Icon name="check" className="size-4 text-brand-accent" />
                      {highlight}
                    </li>
                  ))}
                </ul>
                <div className="mt-2 flex flex-wrap gap-4">
                  <Button href="/products/modexa-pos" size="lg">
                    Explore Modexa POS
                    <Icon name="arrowRight" className="size-4" />
                  </Button>
                  <Button href="/request-quote" variant="secondary" size="lg">
                    Request a Demo
                  </Button>
                </div>
              </div>
              <PosMockup />
            </article>
          </AnimatedContainer>
        </section>
      ) : null}

      {/* Other products */}
      <section className="mx-auto w-full max-w-7xl px-6 pb-24">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {otherProducts.map((product, index) => (
            <AnimatedContainer
              key={product.slug}
              id={product.slug}
              delay={(index % 3) * 0.07}
              className="h-full scroll-mt-24"
            >
              <ProductCard product={product} />
            </AnimatedContainer>
          ))}
        </div>
      </section>

      <CtaBanner
        title="Need a product that doesn't exist yet?"
        description="Modexa builds custom software products by request — describe what your business needs and we'll design it together."
        primaryLabel="Request a Quote"
        primaryHref="/request-quote"
        secondaryLabel="Contact Modexa"
        secondaryHref="/contact"
      />
    </>
  );
}
