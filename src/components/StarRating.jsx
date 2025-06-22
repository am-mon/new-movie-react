export default function StarRating({ rating, align = "justify-center" }) {
  const percentage = (rating / 10) * 100;

  return (
    <div className={`flex items-center ${align} gap-2`}>
      <div className="relative inline-flex text-yellow-400 text-xl leading-none">
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <span key={i} className="text-gray-300">
              ★
            </span>
          ))}
        </div>
        <div
          className="absolute top-0 left-0 overflow-hidden whitespace-nowrap"
          style={{ width: `${percentage}%` }}
        >
          {[...Array(5)].map((_, i) => (
            <span key={i}>★</span>
          ))}
        </div>
      </div>
      <div className="text-sm md:text-base">({(rating / 2).toFixed(1)})</div>
    </div>
  );
}
