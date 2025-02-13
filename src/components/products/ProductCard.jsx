
const shop = "/assets/shop-items/shops-1.png"; // Sin import


export default function ProductCard({ product }) {
    return (
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="relative pb-[100%]">
          <img
            src={shop}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover"
          />
          {product.discount && (
            <span className="absolute top-2 right-2 bg-teal-400 text-white px-2 py-1 rounded text-sm">
              -{product.discount}%
            </span>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-bold">{product.name}</h3>
          <p className="text-sm text-gray-600">{product.description}</p>
          <div className="mt-2 flex items-center justify-between">
            <div>
              <span className="font-bold">S/ {product.price.toFixed(3)}</span>
              {product.oldPrice && (
                <span className="ml-2 text-sm text-gray-400 line-through">
                  S/ {product.oldPrice.toFixed(3)}
                </span>
              )}
            </div>
            <div className="flex space-x-2">
              <button className="p-2 text-gray-600 hover:text-gray-900">🛒</button>
              <button className="p-2 text-gray-600 hover:text-gray-900">❤️</button>
            </div>
          </div>
        </div>
      </div>
    );
  }