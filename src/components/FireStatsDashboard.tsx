import { motion } from "motion/react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import { Flame, AlertTriangle, Users, DollarSign } from "lucide-react";

const incidentData = [
  { name: "2024", incidents: 19062 },
  { name: "2025", incidents: 16693 },
];

const causeData = [
  { name: "Electrical", value: 7175 },
  { name: "Open Flame", value: 4698 },
  { name: "Ember/Sparks", value: 2245 },
  { name: "Natural", value: 1184 },
  { name: "Vehicular", value: 976 },
];

const COLORS = ["#FF6D00", "#D32F2F", "#FBC02D", "#388E3C", "#1976D2"];

export function FireStatsDashboard() {
  return (
    <div className="w-full mb-12 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Stat Cards */}
        <div className="grid grid-cols-2 gap-4">
          <StatCard title="Total Incidents (2025)" value="16,693" icon={Flame} color="text-orange-500" />
          <StatCard title="Total Damages (2025)" value="P18.08B" icon={DollarSign} color="text-red-500" />
          <StatCard title="Injured Civilians" value="1,369" icon={Users} color="text-yellow-500" />
          <StatCard title="Top Cause" value="Electrical" icon={AlertTriangle} color="text-red-600" />
        </div>

        {/* Bar Chart */}
        <div className="bg-[#1C1C1C]/80 backdrop-blur-md border border-white/10 rounded-3xl p-6 shadow-xl">
          <h3 className="text-xl font-bold text-white mb-4">Incidents: 2024 vs 2025</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={incidentData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="name" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip contentStyle={{ backgroundColor: "#2A2A2A", border: "none" }} />
              <Bar dataKey="incidents" fill="#FF6D00" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Pie Chart */}
      <div className="bg-[#1C1C1C]/80 backdrop-blur-md border border-white/10 rounded-3xl p-6 shadow-xl">
        <h3 className="text-xl font-bold text-white mb-4">Common Causes of Fire</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={causeData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
              {causeData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip contentStyle={{ backgroundColor: "#2A2A2A", border: "none" }} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon: Icon, color }: { title: string; value: string; icon: any; color: string }) {
  return (
    <div className="bg-[#1C1C1C]/80 backdrop-blur-md border border-white/10 rounded-3xl p-6 shadow-xl flex flex-col items-center text-center gap-2">
      <Icon className={`w-8 h-8 ${color}`} />
      <h4 className="text-gray-400 text-xs uppercase tracking-wider">{title}</h4>
      <p className="text-2xl font-black text-white">{value}</p>
    </div>
  );
}
