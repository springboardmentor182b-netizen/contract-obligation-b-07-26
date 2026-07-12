import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";


export default function Breadcrumb({ items = [] }) {
  return (
    <nav className="flex items-center gap-1.5 text-sm">
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        return (
          <span key={item.label} className="flex items-center gap-1.5">
            {i > 0 && <ChevronRight size={14} className="text-slate-400" />}
            {isLast || !item.to ? (
              <span
                className={isLast ? "font-semibold text-slate-900" : "text-slate-500"}
              >
                {item.label}
              </span>
            ) : (
              <Link to={item.to} className="text-slate-500 hover:text-slate-700">
                {item.label}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}