import type { NodeKind , NodeMetadata} from "./CreateWorkFlow";
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

import type { PriceTriggerMetadata } from "@/nodes/triggers/PriceTrigger"; 
import type {TimerNodeMetadata} from "@/nodes/triggers/Timer";
import { Input } from "./ui/input";
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

export const SUPPORTED_ASSETS = ["SOL", "BTC", "ETH", "USDT","BNB", "XRP", "USDC", "ADA", "AVAX","TON", "LINK", "DOGE", "DOT", "MATIC", "NEAR","ICP","APT", "IMX","TRX", "SHIB"] as const;

export const TriggerSheet = ({
  onSelect,
}: {
  onSelect: (kind: NodeKind, metadata: NodeMetadata) => void;
}) => {
  const [timerMetadata, setTimerMetadata] = useState<TimerNodeMetadata>({
    time: 3600,
  });
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
          <SheetDescription>
            Select the type of trigger that you need
          <Select value={selectedTrigger} onValueChange={(value) => setSelectedTrigger(value as SupportedTriggerId)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select an trigger" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {SUPPORTED_TRIGGERS.map(({ id, title }) => <>
                  <SelectItem key={id} value={id}>{title}</SelectItem>
                </>)}
              </SelectGroup>
            </SelectContent>
          </Select>
          {selectedTrigger === "timer" && <div>
            <div className="pt-4">
            Number of seconds after which to run the timer
            </div>
            <Input value={timerMetadata.time} onChange={(e) => setTimerMetadata(metadata => ({
              ...metadata,
              time: Number(e.target.value)
            }))}></Input>
            </div>}

            {selectedTrigger == "price-trigger" && <div>
              Price : 
              <Input type="text" onChange={(e) => setPriceMetadata(m => ({
                ...m,
                price:Number(e.target.value)
              }))}></Input>

              <Select value={priceMetadata.asset} onValueChange={(value) => setPriceMetadata(metadata => ({
                ...metadata,
                asset : value
              }))}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select an asset" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {SUPPORTED_ASSETS.map((id) => <>
                  <SelectItem key={id} value={id}>{id}</SelectItem>
                </>)}
              </SelectGroup>
            </SelectContent>
          </Select>
          </div>}
        </SheetDescription>
        </SheetHeader>

        <SheetFooter>
          <Button onClick={() => {
            onSelect(
              selectedTrigger,
              selectedTrigger === "timer" ? timerMetadata : priceMetadata
            )
          }} type="submit">create Trigger</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};