import React from 'react';

// Interface simplificada para a prop 'reviews' neste componente.
// Ajuste conforme a estrutura real do seu DTO/tipo de Review,
// garantindo que haja uma propriedade para a avaliação em estrelas.
interface Review {
  stars: number; // Assumindo que o DTO de review tem um campo 'stars' ou similar
  // Outros campos do review podem existir, mas não são usados aqui.
}

interface RatingBarsProps {
  reviews: Review[];
}

const RatingBars: React.FC<RatingBarsProps> = ({ reviews }) => {
  const getRatingDistribution = () => {
    const distribution = [0, 0, 0, 0, 0]; // 1 estrela a 5 estrelas
    if (reviews && reviews.length > 0) {
      reviews.forEach(review => {
        const ratingValue = Math.round(review.stars); // Usar review.stars
        if (ratingValue >= 1 && ratingValue <= 5) {
          distribution[ratingValue - 1]++;
        }
      });
    }
    return distribution.reverse(); // 5 estrelas para 1 estrela
  };

  const ratingDistribution = getRatingDistribution();
  // Garante que maxCount seja no mínimo 0, mesmo se ratingDistribution estiver vazio.
  const maxCount = ratingDistribution.length > 0 ? Math.max(0, ...ratingDistribution) : 0;

  return (
    <div className="flex-1">
      {[5, 4, 3, 2, 1].map((star, index) => {
        const countForStar = ratingDistribution[index] || 0;
        return (
          <div key={star} className="flex items-center gap-2 mb-1">
            <span className="text-sm text-gray-600 w-2">{star}</span>
            <div className="flex-1 bg-gray-200 rounded-full h-2">
              <div
                className="bg-orange-400 h-2 rounded-full"
                style={{
                  width: `${maxCount > 0 && countForStar > 0 ? (countForStar / maxCount) * 100 : 0}%`
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default RatingBars;