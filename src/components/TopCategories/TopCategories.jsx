import React from "react";
import TopCategoriesCard from "./TopCategoriesCard";

const TopCategories = () => {
  return (
    <section className="topCat bg-gray-100 py-10">
      <div className="container mx-auto px-4">
        <div className="heading d_flex justify-between items-center">
          <div className="heading flex items-center gap-2">
            <i className="fa fa-border-all"></i>
            <h2 className="text-xl font-bold">Top Categorias</h2>
          </div>
        </div>
        <TopCategoriesCard />
      </div>
      <style jsx>{`
        .container {
          max-width: 1800px;
          width: 100%;
        }
        @media (max-width: 768px) {
          .container {
            padding: 0 16px;
          }
        }
      `}</style>
    </section>
  );
};

export default TopCategories;
