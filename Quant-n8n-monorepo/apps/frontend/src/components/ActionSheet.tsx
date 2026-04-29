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
import { Input } from "./ui/input";
import { SUPPORTED_ASSETS } from "common/types";
import type { TradingMetadata } from "common/types";
import { Zap, BarChart2, Coins, KeyRound } from "lucide-react";  /* Added for UI */


const SUPPORTED_ACTIONS = [
  {
    id: "hyperliquid",
    title: "Hyperliquid",
    description: "Place Trade on Hyperliquid",
  },
  {
    id: "lighter",
    title: "Lighter",
    description: "Place Trade on Lighter",
  },
  {
    id: "backpack",
    title: "Backpack",
    description: "Place Trade on Backpack",
  },
] as const;

type SupportedActionId = typeof SUPPORTED_ACTIONS[number]["id"];

export const ActionSheet = ({
  onSelect,
}: {
  onSelect: (kind: NodeKind, metadata: NodeMetadata) => void;
}) => {
  const [metadata, setMetadata] = useState<Partial<TradingMetadata>>({});  //Fixed Bug 
  const [selectedAction, setSelectedAction] = useState<SupportedActionId>(SUPPORTED_ACTIONS[0].id);

  const showTradingFields =
    selectedAction === "hyperliquid" ||
    selectedAction === "lighter" ||
    selectedAction === "backpack";

  return (
    <Sheet open={true}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>SELECT ACTION</SheetTitle>
          <SheetDescription>
            Select the type of action that you need
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-col gap-4 py-4">
          <Select
            value={selectedAction}
            onValueChange={(value) => setSelectedAction(value as SupportedActionId)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select an action" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {SUPPORTED_ACTIONS.map(({ id, title }) => (
                  <SelectItem key={id} value={id}>
                    {title}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          {showTradingFields && (
            <div className="flex flex-col gap-4">
              {/* Type */}
              <div>
                <div className="pb-1 flex items-center gap-1 text-sm font-medium"> {/* UI added later */}
                <BarChart2 size={13} className="text-muted-foreground" />Type</div>
                <Select
                  value={metadata.type}
                  onValueChange={(value) =>
                    setMetadata((m) => ({ ...m, type: value as TradingMetadata["type"] }))
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a type long or short" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="long">LONG</SelectItem>
                      <SelectItem value="short">SHORT</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              {/* Symbol */}
              <div>
                <div className="pb-1 flex items-center gap-1 text-sm font-medium">  {/* UI added */}
                <Coins size={13} className="text-muted-foreground" />Asset</div>
                <Select
                  value={metadata.symbol}
                  onValueChange={(value) =>
                    setMetadata((m) => ({ ...m, symbol: value as TradingMetadata["symbol"]}))
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Which asset to long and short" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {SUPPORTED_ASSETS.map((asset) => (
                        <SelectItem key={asset} value={asset}>
                          {asset}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              {/* Quantity */}
              <div>
                <div className="pb-1 flex items-center gap-1 text-sm font-medium">  {/* UI added */}
                <KeyRound size={13} className="text-muted-foreground" />Quantity</div>
                <Input
                  type="number"
                  placeholder="How much long and short"
                  value={metadata.qty ?? ""}
                  onChange={(e) =>
                    setMetadata((m) => ({ ...m, qty: Number(e.target.value) }))
                  }
                />
              </div>
               {/* ✦ NEW — API Key */}
               <div>
                <div className="pb-1 flex items-center gap-1 text-sm font-medium">  {/* UI added */}
                <KeyRound size={13} className="text-muted-foreground" />API Key</div>
                <Input
                  type="password"
                  placeholder="Enter API Key"
                  value={metadata.apiKey ?? ""}
                  onChange={(e) =>
                    setMetadata((m) => ({ ...m, apiKey: e.target.value }))
                  }
                />
              </div>
            </div>
          )}
        </div>

        <SheetFooter> 
          <Button
    // DISABLE if essential fields are missing
            disabled={!metadata.symbol || !metadata.qty || metadata.qty <= 0 || isNaN(metadata.qty) || !metadata.apiKey} //FIX: Guard against NaN from non-numeric input
              onClick={() => {
      // Final safety check before calling the prop function
              if (metadata.type && metadata.symbol && metadata.qty && !isNaN(metadata.qty) && metadata.apiKey) {
                 onSelect(
          selectedAction, 
          metadata as TradingMetadata // Now safe to cast because of validation
        );
      }
    }}
    type="submit"
    className="w-full"
  >
    Create Action
  </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

/* Older Version : 
<Button
            onClick={() => {
              onSelect(
                selectedAction, 
                metadata as TradingMetadata
              );
            }}
            type="submit"
          >
            Create Action
          </Button>    */
