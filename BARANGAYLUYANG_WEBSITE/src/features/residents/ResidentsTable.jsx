// src/features/residents/ResidentsTable.jsx
import { Button } from "../../components/ui/Button";

export default function ResidentsTable({ residents }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
      <table className="w-full text-left">
        <thead className="bg-slate-50 border-b border-slate-200">
          <tr>
            <th className="p-4 font-semibold text-slate-700">Name</th>
            <th className="p-4 font-semibold text-slate-700">Address</th>
            <th className="p-4 font-semibold text-slate-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {residents.map((res) => (
            <tr key={res.id} className="border-b border-slate-100 hover:bg-blue-50/30">
              <td className="p-4">{res.name}</td>
              <td className="p-4">{res.purok}</td>
              <td className="p-4"><Button variant="secondary">View</Button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
