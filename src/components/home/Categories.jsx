import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Categories() {
    const categories = [
      {
        id: 1,
        name: 'Ocasiones',
        image: '/ocasiones.jpg',
        link: '/ocasiones'
      },
      {
        id: 2,
        name: 'San Valentín',
        image: '/san-valentin.jpg',
        link: '/san-valentin'
      },
      {
        id: 3,
        name: 'Ramos',
        image: '/ramos.jpg',
        link: '/ramos'
      }
    ];
  
    return (
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-center mb-2">
            Se acerca fechas muy IMPORTANTES
          </h2>
          <p className="text-center text-gray-600 mb-8">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories.map(category => (
              <Link 
                key={category.id}
                to={category.link}
                className="relative overflow-hidden rounded-lg aspect-square"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <h3 className="text-white text-xl font-bold">{category.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    );
  }