"use client";

import { useEffect } from "react";
import { TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DashboardErrorProps {
  error: Error & { digest?: string };
  retry: () => void;
}

export default function DashboardError({ error, retry }: DashboardErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto flex max-w-md flex-col items-center gap-4 rounded-xl border border-dashed border-border p-8 text-center">
      <TriangleAlert className="size-6 text-muted-foreground" />
      <div>
        <h2 className="text-base font-semibold">Couldn&apos;t load your shelf</h2>
        <p className="text-sm text-muted-foreground">
          Something went wrong while loading the dashboard. Please try again.
        </p>
      </div>
      <Button variant="outline" onClick={retry}>
        Try again
      </Button>
    </div>
  );
}
