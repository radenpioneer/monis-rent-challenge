import { SiteHeader } from "@/ui/site-header";
import { WorkspaceProvider } from "@/ui/workspace-provider";

/**
 * The Workspace lives here rather than in the root layout, so the root stays
 * fully server-rendered and every route below shares one Workspace.
 */
export default function DesignerLayout({ children }: LayoutProps<"/">) {
  return (
    <WorkspaceProvider>
      <SiteHeader />
      <main className="flex flex-1 flex-col">{children}</main>
    </WorkspaceProvider>
  );
}
