import React from "react";
import KanbanColumn from "./KanbanColumn";
import { STATUS_CONFIG } from "../constants";

export default function KanbanBoard({ obligations, onMove, onDelete }) {
  return (
    <div className="flex-1 px-6 pb-6 overflow-x-auto">
      <div className="flex gap-4 min-w-max">
        {STATUS_CONFIG.map((config) => (
          <KanbanColumn
            key={config.key}
            config={config}
            items={obligations.filter((o) => o.status === config.key)}
            onMove={onMove}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
}
