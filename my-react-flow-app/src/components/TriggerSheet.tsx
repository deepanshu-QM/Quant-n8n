import type { NodeKind } from "./CreateWorkFlow";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Sheet, SheetClose, SheetContent, SheetDescription,
  SheetFooter, SheetHeader, SheetTitle,
} from "@/components/ui/sheet";
import {
  Select, SelectContent, SelectGroup,
  SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

type NodeMetadata = any;
type TimerNodeMetadata = { time: number };
type PriceTriggerMetadata = { price: number; asset: string };

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
];

export const TriggerSheet = ({
  onSelect,
}: {
  onSelect: (kind: NodeKind, metadata: NodeMetadata) => void;
}) => {
  const [metadata, setMetadata] = useState<PriceTriggerMetadata | TimerNodeMetadata>({
    time: 3600,
  });
  const [selectedTrigger, setSelectedTrigger] = useState<string>("timer");

  return (
    <Sheet open={true}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Select Trigger</SheetTitle>
          <SheetDescription>
            Select the type of trigger that you need
          </SheetDescription>
          <Select onValueChange={(val) => setSelectedTrigger(val)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select trigger" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {SUPPORTED_TRIGGERS.map(({ id, title }) => (
                  <SelectItem key={id} value={id}>{title}</SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          {selectedTrigger === "timer" && (
            <div>{/* Timer config fields */}</div>
          )}

          {selectedTrigger === "price-trigger" && (
            <div>{/* Price trigger config fields */}</div>
          )}
        </SheetHeader>

        <SheetFooter>
          <button
            type="submit"
            onClick={() => {
              onSelect(selectedTrigger as NodeKind, metadata);
            }}
          >
            Create Trigger
          </button>
          <SheetClose asChild>
            <Button variant="outline">Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};