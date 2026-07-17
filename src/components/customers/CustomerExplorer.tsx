"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { Icon } from "@/components/ui/icons";
import type { Customer } from "@/content/types";

/*
 * Customer records come from content/customers/ (managed via Pages CMS).
 * Current entries are neutral placeholders — replace them with real, approved
 * customers through the CMS before launch.
 */
export function CustomerExplorer({ customers }: { customers: Customer[] }) {
  const [query, setQuery] = useState("");
  const [industry, setIndustry] = useState("all");
  const [projectType, setProjectType] = useState("all");

  const industries = useMemo(
    () => [...new Set(customers.map((customer) => customer.industry))].sort(),
    [customers]
  );
  const projectTypes = useMemo(
    () => [...new Set(customers.map((customer) => customer.projectType))].sort(),
    [customers]
  );

  const visible = customers.filter((customer) => {
    const matchesQuery = customer.name
      .toLowerCase()
      .includes(query.trim().toLowerCase());
    const matchesIndustry =
      industry === "all" || customer.industry === industry;
    const matchesType =
      projectType === "all" || customer.projectType === projectType;
    return matchesQuery && matchesIndustry && matchesType;
  });

  const selectClasses =
    "rounded-full border border-edge bg-surface px-4 py-2 text-sm text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent";

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
        <div className="relative w-full max-w-xs">
          <Icon
            name="search"
            className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted"
          />
          <label htmlFor="customer-search" className="sr-only">
            Search customers
          </label>
          <input
            id="customer-search"
            type="search"
            placeholder="Search customers…"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="w-full rounded-full border border-edge bg-surface py-2 pr-4 pl-10 text-sm placeholder:text-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-accent"
          />
        </div>
        <label htmlFor="industry-filter" className="sr-only">
          Filter by industry
        </label>
        <select
          id="industry-filter"
          value={industry}
          onChange={(event) => setIndustry(event.target.value)}
          className={selectClasses}
        >
          <option value="all">All industries</option>
          {industries.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        <label htmlFor="project-type-filter" className="sr-only">
          Filter by project type
        </label>
        <select
          id="project-type-filter"
          value={projectType}
          onChange={(event) => setProjectType(event.target.value)}
          className={selectClasses}
        >
          <option value="all">All project types</option>
          {projectTypes.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      {visible.length > 0 ? (
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {visible.map((customer) => (
            <li
              key={customer.slug}
              className="card-surface flex flex-col items-center gap-3 rounded-2xl p-6 text-center transition-colors hover:border-white/20"
            >
              <Image
                src={customer.logo}
                alt={`${customer.name} logo`}
                width={140}
                height={70}
                className="h-10 w-auto object-contain opacity-80"
              />
              <div>
                <p className="text-sm font-medium">{customer.name}</p>
                <p className="mt-0.5 text-xs text-muted">
                  {customer.industry} · {customer.projectType}
                </p>
              </div>
              {customer.website ? (
                <a
                  href={customer.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-brand-accent hover:text-white"
                >
                  Visit website
                  <Icon name="arrowUpRight" className="size-3" />
                  <span className="sr-only"> of {customer.name}</span>
                </a>
              ) : null}
            </li>
          ))}
        </ul>
      ) : (
        <p className="py-12 text-center text-muted">
          No customers match your filters yet.
        </p>
      )}
    </div>
  );
}
