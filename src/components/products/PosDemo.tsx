"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Icon, type IconName } from "@/components/ui/icons";
import { useI18n } from "@/i18n/client";
import type { Dictionary } from "@/i18n/dictionaries/en";

/*
 * Interactive Modexa POS demonstration — sample data only, never the live
 * product. It mirrors real Modexa POS capabilities (checkout, station
 * printing, sales dashboard with USD/LBP totals, low-stock watchlist,
 * offline local-network operation).
 *
 * Each screen can be replaced by a real screenshot: pass its image path in
 * `screenshots` (managed in Pages CMS → Modexa POS page → Demo screenshots).
 */

export type DemoTab = "order" | "kitchen" | "sales" | "stock";

type Station = "kitchen" | "bar";
type Category = "food" | "drinks" | "desserts";
type ItemKey = keyof Dictionary["posDemo"]["items"];
type StockKey = keyof Dictionary["posDemo"]["stockItems"];

interface MenuItem {
  key: ItemKey;
  category: Category;
  station: Station;
  price: number;
}

const menu: MenuItem[] = [
  { key: "chicken", category: "food", station: "kitchen", price: 12 },
  { key: "burger", category: "food", station: "kitchen", price: 9.5 },
  { key: "fattoush", category: "food", station: "kitchen", price: 6.5 },
  { key: "fries", category: "food", station: "kitchen", price: 3 },
  { key: "lemonade", category: "drinks", station: "bar", price: 3.5 },
  { key: "espresso", category: "drinks", station: "bar", price: 2.5 },
  { key: "water", category: "drinks", station: "bar", price: 1 },
  { key: "cake", category: "desserts", station: "kitchen", price: 5 },
];

const tabs: { key: DemoTab; icon: IconName }[] = [
  { key: "order", icon: "creditCard" },
  { key: "kitchen", icon: "printer" },
  { key: "sales", icon: "chart" },
  { key: "stock", icon: "package" },
];

/** Exchange rate shown on the sales screen, as in the real dashboard. */
const LBP_RATE = 90000;
const BASE_SALES = 4393.43;

interface Invoice {
  no: number;
  total: number;
  fresh?: boolean;
}

const initialInvoices: Invoice[] = [
  { no: 16, total: 108.56 },
  { no: 15, total: 48.07 },
  { no: 14, total: 31.5 },
  { no: 13, total: 200 },
];

const initialStock: { key: StockKey; stock: number; min: number }[] = [
  { key: "onions", stock: 96, min: 243 },
  { key: "carrots", stock: 124, min: 126 },
  { key: "fish", stock: 127, min: 133 },
  { key: "lemons", stock: 58, min: 80 },
];

const usd = (value: number) =>
  `$${value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

interface PosDemoProps {
  screenshots?: Partial<Record<DemoTab, string>>;
}

export function PosDemo({ screenshots = {} }: PosDemoProps) {
  const { dict } = useI18n();
  const d = dict.posDemo;
  const reduceMotion = useReducedMotion();

  const [tab, setTab] = useState<DemoTab>("order");
  const [online, setOnline] = useState(true);
  const [category, setCategory] = useState<Category | "all">("all");
  const [ticket, setTicket] = useState<Partial<Record<ItemKey, number>>>({
    chicken: 1,
    lemonade: 2,
  });
  const [sentOrder, setSentOrder] = useState<{ no: number; lines: [ItemKey, number][] } | null>(
    null
  );
  const [printed, setPrinted] = useState(false);
  const [invoices, setInvoices] = useState<Invoice[]>(initialInvoices);
  const [stock, setStock] = useState(initialStock);

  const lines = useMemo(
    () => menu.filter((item) => ticket[item.key]).map((item) => ({ ...item, qty: ticket[item.key]! })),
    [ticket]
  );
  const ticketTotal = lines.reduce((sum, line) => sum + line.qty * line.price, 0);
  const sentTotal = sentOrder
    ? sentOrder.lines.reduce(
        (sum, [key, qty]) => sum + qty * (menu.find((m) => m.key === key)?.price ?? 0),
        0
      )
    : 0;
  const extraSales = invoices.filter((inv) => inv.fresh).reduce((sum, inv) => sum + inv.total, 0);
  const totalSales = BASE_SALES + extraSales;

  // Simulate the printers finishing shortly after an order is sent.
  useEffect(() => {
    if (!sentOrder || printed) return;
    const timer = window.setTimeout(() => setPrinted(true), reduceMotion ? 0 : 1400);
    return () => window.clearTimeout(timer);
  }, [sentOrder, printed, reduceMotion]);

  function add(key: ItemKey) {
    setTicket((current) => ({ ...current, [key]: (current[key] ?? 0) + 1 }));
  }

  function remove(key: ItemKey) {
    setTicket((current) => {
      const next = { ...current };
      const qty = (next[key] ?? 0) - 1;
      if (qty <= 0) delete next[key];
      else next[key] = qty;
      return next;
    });
  }

  function sendOrder() {
    if (lines.length === 0) return;
    const no = invoices[0].no + 1;
    setSentOrder({ no, lines: lines.map((line) => [line.key, line.qty]) });
    setPrinted(false);
    setTicket({});
    setTab("kitchen");
  }

  function charge() {
    if (!sentOrder) return;
    setInvoices((current) => [
      { no: sentOrder.no, total: sentTotal, fresh: true },
      ...current.map((inv) => ({ ...inv, fresh: inv.fresh ? true : undefined })),
    ]);
    setSentOrder(null);
    setTab("sales");
  }

  const screenshot = screenshots[tab];

  return (
    <div className="overflow-hidden rounded-2xl border border-edge-strong bg-background shadow-card">
      {/* Title bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-edge bg-surface px-4 py-3 sm:px-5">
        <div className="flex items-center gap-3">
          <span className="rounded-md border border-brand/40 bg-brand/10 px-2 py-0.5 text-xs font-medium text-brand-accent">
            {d.label}
          </span>
          <span className="text-sm text-muted">{d.terminal}</span>
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={!online}
          onClick={() => setOnline((value) => !value)}
          className="group flex items-center gap-2.5 text-sm"
        >
          <span className="text-muted">{d.network.label}:</span>
          <span className={online ? "text-foreground" : "text-amber-300"}>
            {online ? d.network.online : d.network.offline}
          </span>
          <span
            className={`relative inline-flex h-5 w-9 items-center rounded-full border transition-colors ${
              online ? "border-edge-strong bg-foreground/10" : "border-amber-300/60 bg-amber-300/20"
            }`}
          >
            <span
              className={`absolute size-3.5 rounded-full transition-[inset-inline-start] duration-200 ${
                online ? "start-0.5 bg-foreground/70" : "start-[1.1rem] bg-amber-300"
              }`}
            />
          </span>
          <span className="sr-only">{d.network.toggle}</span>
        </button>
      </div>

      <AnimatePresence initial={false}>
        {!online ? (
          <motion.p
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="flex items-center gap-2 overflow-hidden border-b border-edge bg-brand/10 px-4 text-sm text-brand-accent sm:px-5"
            role="status"
          >
            <span className="flex items-center gap-2 py-2.5">
              <Icon name="wifiOff" className="size-4 shrink-0" />
              {d.network.localOk}
            </span>
          </motion.p>
        ) : null}
      </AnimatePresence>

      <div className="grid md:grid-cols-[13rem_1fr]">
        {/* Screen navigation */}
        <div
          role="tablist"
          aria-label={d.label}
          className="flex gap-1 overflow-x-auto border-b border-edge p-2 md:flex-col md:border-b-0 md:border-e md:p-3"
        >
          {tabs.map(({ key, icon }) => {
            const selected = key === tab;
            return (
              <button
                key={key}
                type="button"
                role="tab"
                id={`pos-tab-${key}`}
                aria-selected={selected}
                aria-controls="pos-panel"
                onClick={() => setTab(key)}
                className={`flex shrink-0 items-center gap-2.5 rounded-lg px-3 py-2.5 text-start text-sm transition-colors ${
                  selected ? "bg-surface text-foreground" : "text-muted hover:bg-surface/60 hover:text-soft"
                }`}
              >
                <Icon name={icon} className={`size-4 ${selected ? "text-brand-accent" : ""}`} />
                {d.tabs[key]}
              </button>
            );
          })}
        </div>

        <div id="pos-panel" role="tabpanel" aria-labelledby={`pos-tab-${tab}`} className="min-w-0">
          <p className="border-b border-edge px-4 py-3 text-sm text-soft/80 sm:px-6">{d.tabHints[tab]}</p>
          <div className="min-h-[26rem] p-4 sm:p-6">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={tab}
                initial={{ opacity: 0, y: reduceMotion ? 0 : 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.22 }}
              >
                {screenshot ? (
                  <div className="relative aspect-[16/10] overflow-hidden rounded-lg border border-edge">
                    <Image
                      src={screenshot}
                      alt={`Modexa POS — ${d.tabs[tab]}`}
                      fill
                      sizes="(min-width: 1024px) 900px, 100vw"
                      className="object-cover object-top"
                    />
                  </div>
                ) : null}

                {!screenshot && tab === "order" ? (
                  <OrderScreen
                    d={d}
                    category={category}
                    onCategory={setCategory}
                    lines={lines}
                    total={ticketTotal}
                    onAdd={add}
                    onRemove={remove}
                    onClear={() => setTicket({})}
                    onSend={sendOrder}
                  />
                ) : null}

                {!screenshot && tab === "kitchen" ? (
                  <KitchenScreen
                    d={d}
                    order={sentOrder}
                    printed={printed}
                    total={sentTotal}
                    onCharge={charge}
                    onBack={() => setTab("order")}
                  />
                ) : null}

                {!screenshot && tab === "sales" ? (
                  <SalesScreen d={d} totalSales={totalSales} invoices={invoices} />
                ) : null}

                {!screenshot && tab === "stock" ? (
                  <StockScreen
                    d={d}
                    stock={stock}
                    onRestock={(key) =>
                      setStock((current) =>
                        current.map((item) =>
                          item.key === key ? { ...item, stock: item.stock + 20 } : item
                        )
                      )
                    }
                  />
                ) : null}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <p className="border-t border-edge bg-surface px-4 py-3 text-xs text-muted sm:px-5">
        {d.disclaimer}
      </p>
    </div>
  );
}

type D = Dictionary["posDemo"];

function OrderScreen({
  d,
  category,
  onCategory,
  lines,
  total,
  onAdd,
  onRemove,
  onClear,
  onSend,
}: {
  d: D;
  category: Category | "all";
  onCategory: (category: Category | "all") => void;
  lines: (MenuItem & { qty: number })[];
  total: number;
  onAdd: (key: ItemKey) => void;
  onRemove: (key: ItemKey) => void;
  onClear: () => void;
  onSend: () => void;
}) {
  const categories: (Category | "all")[] = ["all", "food", "drinks", "desserts"];
  const visible = menu.filter((item) => category === "all" || item.category === category);

  return (
    <div className="grid gap-5 lg:grid-cols-[1fr_17rem]">
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap gap-2">
          {categories.map((key) => (
            <button
              key={key}
              type="button"
              aria-pressed={category === key}
              onClick={() => onCategory(key)}
              className={`rounded-md border px-3 py-1.5 text-xs font-medium transition-colors ${
                category === key
                  ? "border-foreground bg-foreground text-background"
                  : "border-edge text-muted hover:border-edge-strong hover:text-soft"
              }`}
            >
              {d.categories[key]}
            </button>
          ))}
        </div>
        <ul className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 xl:grid-cols-4">
          {visible.map((item) => (
            <li key={item.key}>
              <button
                type="button"
                onClick={() => onAdd(item.key)}
                className="flex h-24 w-full flex-col justify-between rounded-lg border border-edge bg-surface p-3 text-start transition-[border-color,translate] hover:border-brand/60 active:translate-y-px"
              >
                <span className="text-sm leading-snug">{d.items[item.key]}</span>
                <span className="text-sm font-semibold text-soft tabular-nums" dir="ltr">
                  {usd(item.price)}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col rounded-lg border border-edge bg-surface p-4">
        <div className="flex items-baseline justify-between">
          <p className="text-sm font-semibold">{d.ticket}</p>
          <p className="text-xs text-muted">{d.table}</p>
        </div>
        <ul className="mt-3 flex min-h-32 flex-1 flex-col gap-2" aria-live="polite">
          {lines.length === 0 ? <li className="text-sm text-muted">{d.emptyTicket}</li> : null}
          {lines.map((line) => (
            <li key={line.key} className="flex items-center justify-between gap-2 text-sm">
              <span className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onRemove(line.key)}
                  aria-label={`− ${d.items[line.key]}`}
                  className="flex size-6 items-center justify-center rounded border border-edge text-muted hover:text-foreground"
                >
                  −
                </button>
                <span className="tabular-nums" dir="ltr">
                  {line.qty}×
                </span>
                <span className="text-soft">{d.items[line.key]}</span>
              </span>
              <span className="tabular-nums" dir="ltr">
                {usd(line.qty * line.price)}
              </span>
            </li>
          ))}
        </ul>
        <div className="mt-4 flex items-baseline justify-between border-t border-edge pt-3">
          <span className="text-sm text-muted">{d.total}</span>
          <span className="text-xl font-semibold tabular-nums" dir="ltr">
            {usd(total)}
          </span>
        </div>
        <div className="mt-4 grid grid-cols-[auto_1fr] gap-2">
          <button
            type="button"
            onClick={onClear}
            className="h-10 rounded-lg border border-edge px-3 text-sm text-muted hover:text-foreground"
          >
            {d.clear}
          </button>
          <button
            type="button"
            onClick={onSend}
            disabled={lines.length === 0}
            className="h-10 rounded-lg bg-brand text-sm font-semibold text-on-brand transition-colors hover:bg-brand-hover disabled:opacity-40"
          >
            {d.sendOrder}
          </button>
        </div>
      </div>
    </div>
  );
}

function KitchenScreen({
  d,
  order,
  printed,
  total,
  onCharge,
  onBack,
}: {
  d: D;
  order: { no: number; lines: [ItemKey, number][] } | null;
  printed: boolean;
  total: number;
  onCharge: () => void;
  onBack: () => void;
}) {
  if (!order) {
    return (
      <div className="flex min-h-[22rem] flex-col items-center justify-center gap-4 text-center">
        <Icon name="printer" className="size-8 text-muted" />
        <p className="max-w-xs text-sm text-muted">{d.emptyTicket}</p>
        <button
          type="button"
          onClick={onBack}
          className="h-10 rounded-lg border border-edge-strong px-4 text-sm hover:border-foreground/50"
        >
          {d.tabs.order}
        </button>
      </div>
    );
  }

  const stations: { key: "kitchen" | "bar" | "receipt"; lines: [ItemKey, number][] }[] = [
    {
      key: "kitchen",
      lines: order.lines.filter(([key]) => menu.find((m) => m.key === key)?.station === "kitchen"),
    },
    {
      key: "bar",
      lines: order.lines.filter(([key]) => menu.find((m) => m.key === key)?.station === "bar"),
    },
    { key: "receipt", lines: order.lines },
  ];

  return (
    <div className="flex flex-col gap-5">
      <ul className="grid gap-3 sm:grid-cols-3">
        {stations.map((station) => (
          <li key={station.key} className="flex flex-col rounded-lg border border-edge bg-surface">
            <div className="flex items-center justify-between border-b border-edge px-3 py-2.5">
              <span className="flex items-center gap-2 text-sm font-medium">
                <Icon name={station.key === "receipt" ? "receipt" : "printer"} className="size-4 text-brand-accent" />
                {d.stations[station.key]}
              </span>
              <span className={`text-xs ${printed ? "text-brand-accent" : "text-muted"}`}>
                {station.lines.length === 0 ? "—" : printed ? d.printed : d.printing}
              </span>
            </div>
            {/* Paper ticket */}
            <div className="m-3 flex-1 rounded-sm bg-[#f4f6f8] p-3 font-mono text-[11px] leading-relaxed text-[#0b1220]">
              <p className="font-bold">
                {d.orderNo} #{order.no} · {d.table}
              </p>
              <div className="my-1.5 border-t border-dashed border-[#0b1220]/30" />
              {station.lines.length === 0 ? (
                <p className="text-[#0b1220]/50">{d.noItemsForStation}</p>
              ) : (
                station.lines.map(([key, qty]) => (
                  <p key={key} className="flex justify-between gap-2">
                    <span>
                      <span dir="ltr">{qty}×</span> {d.items[key]}
                    </span>
                    {station.key === "receipt" ? (
                      <span dir="ltr">{usd(qty * (menu.find((m) => m.key === key)?.price ?? 0))}</span>
                    ) : null}
                  </p>
                ))
              )}
              {station.key === "receipt" ? (
                <>
                  <div className="my-1.5 border-t border-dashed border-[#0b1220]/30" />
                  <p className="flex justify-between font-bold">
                    <span>{d.total}</span>
                    <span dir="ltr">{usd(total)}</span>
                  </p>
                </>
              ) : null}
            </div>
          </li>
        ))}
      </ul>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted" aria-live="polite">
          {printed ? d.sent : d.printing}…
        </p>
        <button
          type="button"
          onClick={onCharge}
          disabled={!printed}
          className="h-11 rounded-lg bg-brand px-5 text-sm font-semibold text-on-brand transition-colors hover:bg-brand-hover disabled:opacity-40"
        >
          {d.charge} <span dir="ltr">{usd(total)}</span>
        </button>
      </div>
    </div>
  );
}

function SalesScreen({
  d,
  totalSales,
  invoices,
}: {
  d: D;
  totalSales: number;
  invoices: Invoice[];
}) {
  return (
    <div className="flex flex-col gap-5">
      <div className="rounded-lg border border-edge bg-surface p-5">
        <p className="text-xs font-medium tracking-wider text-muted uppercase">{d.totalSales}</p>
        <p className="mt-2 flex items-baseline gap-2" dir="ltr">
          <span className="text-3xl font-semibold tabular-nums sm:text-4xl">{usd(totalSales)}</span>
          <span className="text-sm text-muted">USD</span>
        </p>
        <p className="mt-1 text-sm text-muted tabular-nums">
          <span dir="ltr">≈ {Math.round(totalSales * LBP_RATE).toLocaleString("en-US")} LBP</span>{" "}
          ({d.rate} <span dir="ltr">{LBP_RATE.toLocaleString("en-US")}</span>)
        </p>
        <div className="mt-4 flex h-2 overflow-hidden rounded-full bg-foreground/10">
          <span className="h-full w-3/4 bg-brand" />
        </div>
        <p className="mt-2 flex justify-between text-xs text-muted">
          <span>
            {d.cashSales} <span dir="ltr">75%</span>
          </span>
          <span>
            {d.ledger} <span dir="ltr">25%</span>
          </span>
        </p>
      </div>

      <div className="overflow-hidden rounded-lg border border-edge">
        <p className="border-b border-edge bg-surface px-4 py-3 text-sm font-semibold">
          {d.recentInvoices}
        </p>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[30rem] text-sm">
            <thead className="text-xs text-muted">
              <tr className="border-b border-edge">
                <th className="px-4 py-2.5 text-start font-medium">{d.invoiceNo}</th>
                <th className="px-4 py-2.5 text-start font-medium">{d.method}</th>
                <th className="px-4 py-2.5 text-start font-medium">{d.amount}</th>
                <th className="px-4 py-2.5 text-start font-medium">{d.status}</th>
              </tr>
            </thead>
            <tbody>
              {invoices.slice(0, 5).map((invoice) => (
                <tr
                  key={invoice.no}
                  className={`border-b border-edge last:border-0 ${invoice.fresh ? "bg-brand/[0.07]" : ""}`}
                >
                  <td className="px-4 py-2.5 font-mono text-xs" dir="ltr">
                    MDX-{String(invoice.no).padStart(4, "0")}
                  </td>
                  <td className="px-4 py-2.5">
                    <span className="rounded border border-edge px-1.5 py-0.5 text-xs text-muted">{d.cash}</span>
                  </td>
                  <td className="px-4 py-2.5 tabular-nums" dir="ltr">
                    {usd(invoice.total)}
                  </td>
                  <td className="px-4 py-2.5">
                    <span className="text-xs text-brand-accent">{d.completed}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StockScreen({
  d,
  stock,
  onRestock,
}: {
  d: D;
  stock: { key: StockKey; stock: number; min: number }[];
  onRestock: (key: StockKey) => void;
}) {
  const lowCount = stock.filter((item) => item.stock < item.min).length;

  return (
    <div className="rounded-lg border border-edge">
      <div className="flex items-center justify-between border-b border-edge bg-surface px-4 py-3">
        <p className="text-sm font-semibold">{d.watchlist}</p>
        <span className="rounded-full bg-amber-300/15 px-2 py-0.5 text-xs font-medium text-amber-300 tabular-nums">
          {lowCount}
        </span>
      </div>
      <ul>
        {stock.map((item) => {
          const low = item.stock < item.min;
          const ratio = Math.min(item.stock / item.min, 1);
          return (
            <li key={item.key} className="flex flex-wrap items-center gap-4 border-b border-edge px-4 py-3.5 last:border-0">
              <div className="min-w-40 flex-1">
                <p className="text-sm font-medium">{d.stockItems[item.key]}</p>
                <p className="mt-0.5 text-xs text-muted">
                  {d.stockLabel}:{" "}
                  <span className={`tabular-nums ${low ? "text-amber-300" : "text-foreground"}`} dir="ltr">
                    {item.stock}
                  </span>{" "}
                  / {d.minLabel} <span dir="ltr">{item.min}</span>
                </p>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-foreground/10">
                  <div
                    className={`h-full transition-[width] duration-500 ${low ? "bg-amber-300" : "bg-brand"}`}
                    style={{ width: `${ratio * 100}%` }}
                  />
                </div>
              </div>
              <span className={`text-xs font-medium ${low ? "text-amber-300" : "text-brand-accent"}`}>
                {low ? d.low : d.ok}
              </span>
              <button
                type="button"
                onClick={() => onRestock(item.key)}
                aria-label={`${d.restockAria} ${d.stockItems[item.key]}`}
                className="h-9 rounded-lg border border-edge-strong px-3 text-xs font-medium hover:border-foreground/50"
              >
                {d.restock}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
