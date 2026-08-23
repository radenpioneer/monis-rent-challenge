import { RentalProvider } from "@/ui/rental-provider";
import { SiteHeader } from "@/ui/site-header";

/**
 * The Rental lives here rather than in the root layout, so the root stays fully
 * server-rendered and every route below shares one Rental.
 */
export default function DesignerLayout({ children }: LayoutProps<"/">) {
  return (
    <RentalProvider>
      <SiteHeader />
      <main className="flex flex-1 flex-col">{children}</main>
    </RentalProvider>
  );
}
