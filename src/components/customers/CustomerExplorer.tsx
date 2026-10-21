"use client";

import Image from "next/image";
import { useState } from "react";
import { Icon } from "@/components/ui/icons";
import { useI18n } from "@/i18n/client";
import type { Customer } from "@/content/schema";
import type { Localized } from "@/lib/content";

/*
 * Published customers from content/customers/ (Pages CMS). The search box
 * only appears once the list is long enough to need it.
 */
export function CustomerExplorer({ customers }: { customers: Localized<Customer>[] }) {
  const { dict } = useI18n();
  const [query, setQuery] = useState("");

  const needle = query.trim().toLowerCase();
  const visible = customers.filter(
    (customer) =>
      !needle ||
      customer.name.toLowerCase().includes(needle) ||
      customer.industry.toLowerCase().includes(needle)
  );

  return (
    <div className="flex flex-col gap-8">
      {customers.length > 8 ? (
        <div className="relative max-w-sm">
          <Icon
            name="search"
            className="pointer-events-none absolute start-4 top-1/2 size-4 -translate-y-1/2 text-muted"
          />
          <label htmlFor="customer-search" className="sr-only">
            {dict.customers.searchLabel}
          </label>
          <input
            id="customer-search"
            type="search"
            placeholder={dict.customers.searchPlaceholder}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="h-11 w-full rounded-lg border border-edge bg-surface ps-11 pe-4 text-sm placeholder:text-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent"
          />
        </div>
      ) : null}

      {visible.length > 0 ? (
        <ul className="grid gap-px overflow-hidden rounded-xl border border-edge bg-edge sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((customer) => (
            <li key={customer.slug} className="flex items-center gap-5 bg-background p-6">
              {customer.logo ? (
                <Image
                  src={customer.logo}
                  alt=""
                  width={56}
                  height={56}
                  className="size-14 shrink-0 rounded-lg border border-edge object-contain"
                />
              ) : null}
              <div className="flex min-w-0 flex-col gap-1">
                <p className="font-semibold">{customer.name}</p>
                <p className="text-sm text-muted">{customer.industry}</p>
                {customer.website ? (
                  <a
                    href={customer.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex w-fit items-center gap-1 text-sm text-brand-accent underline-offset-4 hover:underline"
                  >
                    {dict.common.visitWebsite}
                    <Icon name="arrowUpRight" className="size-3.5" />
                    <span className="sr-only"> — {customer.name}</span>
                  </a>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="py-12 text-center text-muted">{dict.customers.empty}</p>
      )}
    </div>
  );
}
