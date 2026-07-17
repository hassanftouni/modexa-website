/**
 * CSS-built Modexa POS dashboard mockup, used until real product screenshots
 * are available. Purely decorative — hidden from assistive technology.
 */
const weeklySales = [42, 58, 50, 74, 66, 88, 79];

const orders = [
  { table: "Table 4", items: "3 items", total: "$42.50", status: "Preparing" },
  { table: "Takeaway", items: "2 items", total: "$18.00", status: "Ready" },
  { table: "Table 12", items: "5 items", total: "$67.20", status: "Served" },
];

export function PosMockup({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`card-surface w-full overflow-hidden rounded-2xl text-left shadow-[0_40px_90px_-40px_rgba(0,0,0,0.8)] ${className}`}
    >
      {/* Window chrome */}
      <div className="flex items-center gap-2 border-b border-edge px-4 py-3">
        <span className="size-2.5 rounded-full bg-white/15" />
        <span className="size-2.5 rounded-full bg-white/15" />
        <span className="size-2.5 rounded-full bg-white/15" />
        <span className="ml-3 text-xs text-muted">Modexa POS — Dashboard</span>
        <span className="ml-auto rounded-full border border-brand/40 bg-brand/10 px-2 py-0.5 text-[10px] font-medium text-[#d8b4fe]">
          Offline-ready
        </span>
      </div>

      <div className="grid grid-cols-[auto_1fr] gap-0">
        {/* Sidebar */}
        <div className="hidden flex-col gap-3 border-r border-edge p-4 sm:flex">
          {["Sales", "Orders", "Inventory", "Staff", "Reports"].map(
            (label, index) => (
              <div
                key={label}
                className={`rounded-lg px-3 py-1.5 text-xs ${
                  index === 0
                    ? "bg-[linear-gradient(110deg,rgba(168,85,247,0.25),rgba(63,162,247,0.25))] text-foreground"
                    : "text-muted"
                }`}
              >
                {label}
              </div>
            )
          )}
        </div>

        {/* Main panel */}
        <div className="flex flex-col gap-4 p-4 sm:p-5">
          {/* Stat tiles */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Today's sales", value: "$2,148" },
              { label: "Orders", value: "127" },
              { label: "Avg. ticket", value: "$16.90" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-edge bg-white/[0.03] p-3"
              >
                <p className="text-[10px] text-muted">{stat.label}</p>
                <p className="mt-1 text-sm font-semibold sm:text-base">
                  {stat.value}
                </p>
              </div>
            ))}
          </div>

          {/* Weekly chart */}
          <div className="rounded-xl border border-edge bg-white/[0.03] p-3">
            <p className="text-[10px] text-muted">Weekly revenue</p>
            <div className="mt-2 flex h-16 items-end gap-1.5">
              {weeklySales.map((value, index) => (
                <div
                  key={index}
                  className="flex-1 rounded-t-sm bg-[linear-gradient(180deg,#a855f7,#3fa2f7)] opacity-80"
                  style={{ height: `${value}%` }}
                />
              ))}
            </div>
          </div>

          {/* Live orders */}
          <div className="flex flex-col gap-2">
            {orders.map((order) => (
              <div
                key={order.table}
                className="flex items-center justify-between rounded-lg border border-edge bg-white/[0.02] px-3 py-2 text-xs"
              >
                <span className="font-medium">{order.table}</span>
                <span className="hidden text-muted sm:inline">{order.items}</span>
                <span className="text-muted">{order.total}</span>
                <span className="rounded-full border border-edge px-2 py-0.5 text-[10px] text-brand-accent">
                  {order.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
