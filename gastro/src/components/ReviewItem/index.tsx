import React from 'react';
import StarRating from '../StarRating';
import UserIconPlaceholder from '../UserIconPlaceholder';

interface ReviewItemProps {
  review: {
    user: string;
    rating: number;
    timeAgo: string;
    comment: string;
  };
}

const ReviewItem: React.FC<ReviewItemProps> = ({ review }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      {/* User Info */}
      <div className="flex items-center gap-3 mb-3">
        <UserIconPlaceholder />
        <div className="flex-1">
          <h3 className="font-semibold text-gray-800 text-base">{review.user}</h3>
          <div className="flex items-center gap-2">
            <StarRating rating={review.rating} starSize={14} />
            <span className="text-sm text-gray-500">{review.timeAgo}</span>
          </div>
        </div>
      </div>

      {/* Review Comment */}
      <p className="text-gray-700 text-sm leading-relaxed">{review.comment}</p>
    </div>
  );
};

export default ReviewItem;