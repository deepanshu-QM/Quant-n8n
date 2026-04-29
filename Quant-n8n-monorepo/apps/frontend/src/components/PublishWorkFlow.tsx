import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // ✦ CHANGED: Link → useNavigate, more flexible
import { apiListWorkflows, type Workflow } from "@/lib/http";
import { Button } from "./ui/button";

export default function PublishWorkFlow() {
  const [workflows, setWorkflows] = useState<Workflow[] | null>(null); // ✦ CHANGED: typo Workflow→workflows, setWorklow→setWorkflows
  const [loading, setLoading] = useState(true);   // ✦ NEW
  const [error, setError] = useState<string | null>(null); // ✦ NEW
  const navigate = useNavigate(); // ✦ NEW

  // ✦ NEW — fetch on mount
  useEffect(() => {
    apiListWorkflows()
      .then(setWorkflows)
      .catch(() => setError("Failed to load workflows"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-8 text-muted-foreground">Loading...</div>;
  if (error)   return <div className="p-8 text-red-500">{error}</div>;

  return (
    <div className="p-8 flex flex-col gap-4">

      {/* ✦ NEW — header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">My Workflows</h1>
        <Button onClick={() => navigate("/create-workflow")}>+ New Workflow</Button>
      </div>

      {/* ✦ NEW — empty state */}
      {workflows?.length === 0 && (
        <p className="text-muted-foreground text-sm">No workflows yet. Create one!</p>
      )}

      {/* ✦ NEW — workflow list */}
      {workflows?.map((wf) => (
        <div key={wf._id} className="border rounded-lg p-4 flex justify-between items-center">
          <span className="text-sm text-muted-foreground font-mono">{wf._id}</span>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => navigate(`/workflow/${wf._id}`)}>
              Edit
            </Button>
            <Button variant="outline" onClick={() => navigate(`/workflow/${wf._id}/executions`)}>
              Executions
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}