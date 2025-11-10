"use client";

import { Skeleton } from "@/components/ui/skeleton";

export function FlowEditSkeleton() {
  return (
    <div className="h-screen w-full flex flex-col bg-background">
      <div className="border-b bg-card px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Skeleton className="h-9 w-9 rounded-md" />
            <Skeleton className="h-6 w-48" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-9 w-24" />
            <Skeleton className="h-9 w-20" />
          </div>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        <div className="w-64 border-r bg-card p-4 space-y-4">
          <Skeleton className="h-10 w-full" />
          <div className="space-y-2">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-16 w-full rounded-lg" />
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1 relative bg-muted/20">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="space-y-4 text-center">
              <div className="flex justify-center">
                <Skeleton className="h-12 w-12 rounded-full" />
              </div>
              <Skeleton className="h-4 w-48 mx-auto" />
              <Skeleton className="h-3 w-64 mx-auto" />
            </div>
          </div>

          <div className="absolute bottom-4 right-4">
            <Skeleton className="h-32 w-48 rounded-lg" />
          </div>

          <div className="absolute bottom-4 left-4 space-y-2">
            <Skeleton className="h-10 w-10 rounded-md" />
            <Skeleton className="h-10 w-10 rounded-md" />
            <Skeleton className="h-10 w-10 rounded-md" />
          </div>
        </div>

        <div className="w-80 border-l bg-card p-4 space-y-4">
          <Skeleton className="h-6 w-32" />
          <div className="space-y-3">
            <div>
              <Skeleton className="h-4 w-20 mb-2" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div>
              <Skeleton className="h-4 w-24 mb-2" />
              <Skeleton className="h-20 w-full" />
            </div>
            <div>
              <Skeleton className="h-4 w-28 mb-2" />
              <Skeleton className="h-10 w-full" />
            </div>
          </div>
        </div>
      </div>

      <div className="sr-only" role="status" aria-live="polite">
        Loading flow editor...
      </div>
    </div>
  );
}
