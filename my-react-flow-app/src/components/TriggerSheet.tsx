import type { NodeKind } from "./CreateWorkFlow";


type NodeMetadata = any;

export const TriggerSheet = ({
    onSelect
} : {
    onSelect: (kind : NodeKind, metadata : NodeMetadata) => void 
}) => {
    return <div>

    </div>
}