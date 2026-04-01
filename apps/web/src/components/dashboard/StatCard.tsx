export default function StatCard({ title, value }: any) {
  return (
    <div className="bg-white border rounded-xl p-4 hover:shadow-sm transition">
      <p className="text-xs text-gray-400">{title}</p>
      <h2 className="text-xl font-semibold mt-1">{value}</h2>
    </div>
  )
}