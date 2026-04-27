import type { NodeKind, NodeMetadata } from "./CreateWorkFlow";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import type { PriceTriggerMetadata, TimerNodeMetadata } from "common/types";
import { Input } from "./ui/input";
import { TrendingUp, Coins, Clock } from "lucide-react"; /* for UI */

const SUPPORTED_TRIGGERS = [
  {
    id: "timer",
    title: "Timer",
    description: "Run this Trigger every x seconds/minutes",
  },
  {
    id: "price-trigger",
    title: "Price-Trigger",
    description: "Run whenever the Price goes above or below a certain number for an asset",
  },
] as const;

type SupportedTriggerId = typeof SUPPORTED_TRIGGERS[number]["id"];

export const SUPPORTED_ASSETS = ["SOL", "BTC", "ETH", "USDT", "BNB", "XRP", "USDC", "ADA", "AVAX", "TON", "LINK", "DOGE", "DOT", "MATIC", "NEAR", "ICP", "APT", "IMX", "TRX", "SHIB"] as const;

export const TriggerSheet = ({
  onSelect,
}: {
  onSelect: (kind: NodeKind, metadata: NodeMetadata) => void;
}) => {
  const [timerMetadata, setTimerMetadata] = useState<TimerNodeMetadata>({ time: 3600 });
  const [priceMetadata, setPriceMetadata] = useState<PriceTriggerMetadata>({
    asset: SUPPORTED_ASSETS[0],
    price: 0,
    decimals: 0,
  });
  const [selectedTrigger, setSelectedTrigger] = useState<SupportedTriggerId>(SUPPORTED_TRIGGERS[0].id);

  return (
    <Sheet open={true}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Select Trigger</SheetTitle>
          {/* ✦ CHANGED: was plain text inside SheetDescription */}
          <SheetDescription>
            Choose what starts your workflow
          </SheetDescription>
        </SheetHeader>

        {/* ✦ CHANGED: all fields moved outside SheetDescription into proper flex container */}
        <div className="flex flex-col gap-4 py-4">

          {/* Trigger type selector */}
          <div>
            {/* ✦ NEW — label with icon */}
            <div className="pb-1 flex items-center gap-1 text-sm font-medium">
              <TrendingUp size={13} className="text-muted-foreground" /> Trigger Type
            </div>
            <Select
              value={selectedTrigger}
              onValueChange={(value) => setSelectedTrigger(value as SupportedTriggerId)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a trigger" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {SUPPORTED_TRIGGERS.map(({ id, title }) => (
                    <SelectItem key={id} value={id}>{title}</SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          {/* Timer fields */}
          {selectedTrigger === "timer" && (
            <div className="flex flex-col gap-2">
              {/* ✦ NEW — label with icon */}
              <div className="flex items-center gap-1 text-sm font-medium">
                <Clock size={13} className="text-muted-foreground" /> Interval (seconds)
              </div>
              <Input
                type="number"
                value={timerMetadata.time}
                onChange={(e) =>
                  setTimerMetadata((m) => ({ ...m, time: Number(e.target.value) }))
                }
              />
              {/* ✦ NEW — helper text */}
              <p className="text-[11px] text-muted-foreground">
                e.g. 3600 = every 1 hour
              </p>
            </div>
          )}

          {/* Price trigger fields */}
          {selectedTrigger === "price-trigger" && (
            <div className="flex flex-col gap-3">
              {/* ✦ NEW — Asset selector with icon label */}
              <div>
                <div className="pb-1 flex items-center gap-1 text-sm font-medium">
                  <Coins size={13} className="text-muted-foreground" /> Asset
                </div>
                <Select
                  value={priceMetadata.asset}
                  onValueChange={(value) =>
                    setPriceMetadata((m) => ({ ...m, asset: value }))
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select an asset" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {SUPPORTED_ASSETS.map((id) => (
                        <SelectItem key={id} value={id}>{id}</SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              {/* ✦ CHANGED: was "Price : " plain text, now proper labeled input */}
              <div>
                <div className="pb-1 flex items-center gap-1 text-sm font-medium">
                  <TrendingUp size={13} className="text-muted-foreground" /> Trigger Price
                </div>
                <Input
                  type="number"
                  placeholder="e.g. 50000"
                  onChange={(e) =>
                    setPriceMetadata((m) => ({ ...m, price: Number(e.target.value) }))
                  }
                />
              </div>
            </div>
          )}
        </div>

        <SheetFooter>
          {/* ✦ CHANGED: "create Trigger" -> "Create Trigger", added w-full */}
          <Button
            onClick={() => {
              onSelect(
                selectedTrigger,
                selectedTrigger === "timer" ? timerMetadata : priceMetadata
              );
            }}
            type="submit"
            className="w-full"
          >
            Create Trigger
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};