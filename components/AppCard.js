export default function AppCard({ name, icon, description }) {
  return (
    <div className="border rounded-lg p-4 shadow-md hover:shadow-lg transition">
      <img src={icon} alt={name} className="w-16 h-16 rounded-lg mb-2" />
      <h3 className="text-xl font-semibold">{name}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
