import { lusitana } from "@/app/ui/fonts"
import { fetchCardData, fetchLatestInvoices } from "@/app/lib/data"
import React, { Suspense } from "react"
import { Card } from "@/app/ui/dashboard/cards"
import RevenueChart from "@/app/ui/dashboard/revenue-chart"
import LatestInvoices from "@/app/ui/dashboard/latest-invoices"
import { LatestInvoicesSkeleton, RevenueChartSkeleton } from "@/app/ui/skeletons"

export default async function Page() {
    const latestInvoices = await fetchLatestInvoices()

    const {
        numberOfCustomers,
        numberOfInvoices,
        totalPaidInvoices,
        totalPendingInvoices
    } = await fetchCardData()

    return (
        <main>
            {/*md:text-2xl 画面が中央サイズ（md）の時にのみ適用される*/}
            <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
                Dashboard
            </h1>
            {/*画面のサイズが小さい（sm）場合には2列、大きい（lg）場合には4列の格子状レイアウトを適用する*/}
            <div className={"grid gap-6 sm:grid-cols-2 lg:grid-cols-4"}>
                <Card title="Collected" value={totalPaidInvoices} type="collected"/>
                <Card title="Pending" value={totalPendingInvoices} type="pending"/>
                <Card title="Total Invoices" value={numberOfInvoices} type="invoices"/>
                <Card
                    title="Total Customers"
                    value={numberOfCustomers}
                    type="customers"
                />
            </div>
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
                <Suspense fallback={<RevenueChartSkeleton/>}>
                    <RevenueChart/>
                </Suspense>
                <Suspense fallback={<LatestInvoicesSkeleton />}>
                    <LatestInvoices/>
                </Suspense>
            </div>
        </main>
    )
}