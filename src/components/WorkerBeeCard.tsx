import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WorkerBee } from "@/types";
import { 
  CircleDot, 
  CheckCircle2, 
  XCircle, 
  Loader2 
} from "lucide-react";

interface WorkerBeeCardProps {
  worker: WorkerBee;
}

const statusIcons = {
  idle: <CircleDot className="h-4 w-4 text-gray-400" />,
  working: <Loader2 className="h-4 w-4 text-blue-500 animate-spin" />,
  completed: <CheckCircle2 className="h-4 w-4 text-green-500" />,
  error: <XCircle className="h-4 w-4 text-red-500" />,
};

const statusColors = {
  idle: "bg-gray-100",
  working: "bg-blue-100",
  completed: "bg-green-100",
  error: "bg-red-100",
};

export function WorkerBeeCard({ worker }: WorkerBeeCardProps) {
  return (
    <Card className={`${statusColors[worker.status]} transition-colors`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          {worker.name}
        </CardTitle>
        {statusIcons[worker.status]}
      </CardHeader>
      <CardContent>
        <div className="text-xs text-gray-500 capitalize">
          Status: {worker.status}
        </div>
      </CardContent>
    </Card>
  );
}