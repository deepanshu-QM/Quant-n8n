
import { ExecutionModel } from "db/";

export type NodeDocument = {
    _id :string,
    title : string,
    description :string,
    type : string,
    metadataSchema?:Array<{kind: "string" | "number" | "boolean" | "select"; title: string; description : string }/>
    credentialsType: Array<{title : string; required : boolean}>;
};

type EdgeDocument = {
    source : string;
    target : string;
}

export async function execute(nodes : NodeDocument[], edges: EdgeDocument[]){

}