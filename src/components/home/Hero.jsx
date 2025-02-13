const floresHero = "./assets/flores-hero.jpg";

export default function Hero() {
  return (
    <div className="relative h-[650px] bg-gray-100">
      {/* Imagen de fondo */}
      <div className="absolute inset-0">
        <img
          src={floresHero}
          alt="Flores frescas"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Contenido alineado a la derecha */}
      <div className="relative max-w-7xl mx-auto h-full px-6 ">
        <div className="h-full flex items-center justify-end"> {/* Alinea el contenido a la derecha */}
          <div className="bg-custom-hero p-12 rounded-lg max-w-lg text-center"> {/* Aumentado el tamaño del contenedor y centrado el texto */}
            <h2 className="text-5xl font-bold mb-4"> {/* Tamaño de fuente aumentado */}
              <span className="block text-lg text-gray-600">Nuevas Tendencias</span>
              Flores Frescas,
              <span className="block">Nueva Temporada</span>
            </h2>
            <p className="mt-6 text-gray-600 text-lg"> {/* Texto más grande */}
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
            <button className="mt-8 px-8 py-3 bg-custom-primary text-white rounded-lg text-lg hover:bg-yellow-700 mx-auto">
              Compra Ahora
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
