import { ShieldCheck } from "lucide-react"

import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export function CQCard() {
  return (
    <Card className="rounded-md text-xs shadow-sm">
      <CardContent className="flex items-start gap-2.5 p-2.5">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-accent text-accent-foreground">
          <ShieldCheck className="h-5 w-5 text-primary" />
        </div>
        <div className="grid flex-1 gap-1">
          <p className="font-medium">Storage</p>
          <p className="text-muted-foreground">Used - <strong>20/30GB</strong> </p>
          <Progress
            value={66}
            className="mt-1"
            aria-label="66% effettuati"
          />
        </div>
      </CardContent>
    </Card>
  )
}
