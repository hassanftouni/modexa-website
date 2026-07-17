import Image from "next/image";
import type { Customer } from "@/content/types";

/*
 * Customer logos come from the CMS-managed collection in content/customers/.
 * The current entries are neutral placeholders — replace them through Pages CMS
 * with real, approved customer logos before launch.
 */
export function LogoCloud({ customers }: { customers: Customer[] }) {
  return (
    <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
      {customers.map((customer) => (
        <li
          key={customer.slug}
          className="card-surface flex items-center justify-center rounded-xl px-6 py-5 opacity-75 transition-opacity hover:opacity-100"
        >
          <Image
            src={customer.logo}
            alt={`${customer.name} logo`}
            width={140}
            height={70}
            className="h-10 w-auto object-contain"
          />
        </li>
      ))}
    </ul>
  );
}
