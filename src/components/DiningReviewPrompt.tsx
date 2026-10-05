import React, { useState } from 'react';
import {
  Star,
  Sparkles,
  Heart,
  ThumbsUp,
  Award,
  CheckCircle2,
  ExternalLink,
  MessageSquare,
  Gift,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { PlacedOrder, OrderReview } from '../types';

interface DiningReviewPromptProps {
  order: PlacedOrder;
  onSaveReview: (review: OrderReview) => void;
}

const REVIEW_TAGS = [
  'Authentic Wok-Hei 🔥',
  'Fresh Colossal Prawns 🦐',
  'Silky Smooth Gravy 🥢',
  'Crispy Har Cheong Gai 🍗',
  'Boiling Claypot Flavor 🍲',
  'Generous Portions 🍚',
  'Prompt & Friendly Staff 👨‍🍳',
  'Piping Hot on Arrival ♨️',
];

const RATING_LABELS: { [key: number]: string } = {
  1: 'Disappointing',
  2: 'Fair',
  3: 'Good Heritage Flavor',
  4: 'Great & Flavorful!',
  5: 'Exceptional! True Bib Gourmand Legend 🏆',
};

export const DiningReviewPrompt: React.FC<DiningReviewPromptProps> = ({
  order,
  onSaveReview,
}) => {
  const [rating, setRating] = useState<number>(order.review?.rating || 5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [selectedTags, setSelectedTags] = useState<string[]>(
    order.review?.tags || ['Authentic Wok-Hei 🔥', 'Fresh Colossal Prawns 🦐']
  );
  const [favoriteDishId, setFavoriteDishId] = useState<number | undefined>(
    order.review?.favoriteDishId || order.items[0]?.dish.id
  );
  const [comment, setComment] = useState<string>(order.review?.comment || '');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(!!order.review);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  const activeRating = hoverRating !== null ? hoverRating : rating;

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newReview: OrderReview = {
      rating,
      favoriteDishId,
      tags: selectedTags,
      comment: comment.trim(),
      submittedAt: new Date(),
    };
    onSaveReview(newReview);
    setIsSubmitted(true);
    setIsEditing(false);
  };

  // If already submitted and not in edit mode, show the celebratory summary card
  if (isSubmitted && !isEditing) {
    const favoriteDish = order.items.find((it) => it.dish.id === favoriteDishId)?.dish;

    return (
      <div className="bg-gradient-to-br from-amber-50/90 via-red-50/50 to-white rounded-2xl p-4 border border-amber-200/80 shadow-xs space-y-3 animate-in fade-in duration-300">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center shadow-xs">
              <Award className="w-4 h-4" />
            </span>
            <div>
              <h3 className="font-epilogue text-[15px] font-bold text-gray-900 leading-tight">
                Thank You for Your Review!
              </h3>
              <span className="text-[11.5px] text-gray-500">
                Table {order.tableNumber} • Feedback recorded for Wok Master
              </span>
            </div>
          </div>
          <button
            onClick={() => setIsEditing(true)}
            className="text-[11.5px] text-[#C61E28] font-bold hover:underline cursor-pointer"
          >
            Edit
          </button>
        </div>

        {/* Star & Tag summary */}
        <div className="bg-white/80 rounded-xl p-3 border border-amber-200/60 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  className={`w-4 h-4 ${
                    s <= rating
                      ? 'text-amber-400 fill-amber-400'
                      : 'text-gray-200'
                  }`}
                />
              ))}
              <span className="text-[12.5px] font-bold text-gray-800 ml-1.5">
                {rating}.0 / 5.0
              </span>
            </div>
            <span className="text-[11px] font-semibold text-amber-800 bg-amber-100/70 px-2 py-0.5 rounded-full">
              {RATING_LABELS[rating]}
            </span>
          </div>

          {favoriteDish && (
            <div className="text-[12px] text-gray-700 flex items-center gap-1.5 pt-1 border-t border-gray-100">
              <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 shrink-0" />
              <span>
                Favorite Dish: <strong>{favoriteDish.name}</strong> ({favoriteDish.chineseName})
              </span>
            </div>
          )}

          {selectedTags.length > 0 && (
            <div className="flex flex-wrap gap-1 pt-1">
              {selectedTags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10.5px] bg-red-50 text-[#C61E28] border border-red-100 px-2 py-0.5 rounded-full font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {comment && (
            <p className="text-[12px] text-gray-600 italic bg-gray-50 p-2 rounded-lg border border-gray-100">
              "{comment}"
            </p>
          )}
        </div>

        {/* Singapore Heritage Dining Voucher Gift */}
        <div className="bg-gradient-to-r from-red-600 to-[#C61E28] rounded-xl p-3 text-white flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
              <Gift className="w-4 h-4 text-white" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-red-200 block">
                Heritage Diner Appreciation
              </span>
              <span className="text-[13px] font-bold font-epilogue">
                S$5 Off Next Visit: <span className="font-mono text-amber-300">KOKSEN5</span>
              </span>
            </div>
          </div>
          <span className="text-[10px] bg-white/25 px-2 py-1 rounded font-bold uppercase tracking-wider">
            Saved
          </span>
        </div>
      </div>
    );
  }

  // Active Review Prompt Form
  return (
    <div className="bg-white rounded-2xl p-4 border-2 border-red-200 shadow-md space-y-4 animate-in slide-in-from-top-2 duration-300">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-[#C61E28] text-white flex items-center justify-center shrink-0 shadow-xs">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="font-epilogue text-[16px] font-extrabold text-gray-900 leading-tight">
                Rate Your Dining Experience
              </h3>
              <span className="text-[11px] font-bold text-[#C61E28] bg-red-50 px-1.5 py-0.2 rounded border border-red-100">
                Table {order.tableNumber}
              </span>
            </div>
            <span className="text-[12px] text-gray-500 block mt-0.5">
              Dishes served piping hot! How was the wok-hei and taste?
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-gray-400 hover:text-gray-600 p-1 cursor-pointer"
          aria-label={isCollapsed ? 'Expand review form' : 'Collapse review form'}
        >
          {isCollapsed ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
        </button>
      </div>

      {!isCollapsed && (
        <form onSubmit={handleSubmit} className="space-y-4 pt-1">
          {/* 5-Star Rating Selector */}
          <div className="bg-stone-50 rounded-xl p-3 text-center border border-stone-200/80 space-y-1.5">
            <div className="flex justify-center items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => {
                const isFilled = star <= activeRating;
                return (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(null)}
                    aria-label={`Rate ${star} star`}
                    className="p-1 transition-transform active:scale-90 hover:scale-110 cursor-pointer"
                  >
                    <Star
                      className={`w-7 h-7 transition-colors ${
                        isFilled
                          ? 'text-amber-400 fill-amber-400 drop-shadow-xs'
                          : 'text-gray-300'
                      }`}
                    />
                  </button>
                );
              })}
            </div>
            <span className="text-[12.5px] font-bold text-[#C61E28] block">
              {RATING_LABELS[activeRating]}
            </span>
          </div>

          {/* Favorite Dish Selection (From Order Items) */}
          {order.items.length > 0 && (
            <div>
              <label className="text-[11px] font-bold text-gray-600 uppercase tracking-wider block mb-2 flex items-center gap-1">
                <Heart className="w-3.5 h-3.5 text-red-500" />
                Pick Your Favorite Dish Today
              </label>
              <div className="grid grid-cols-2 gap-2">
                {order.items.map(({ dish }) => {
                  const isSelected = favoriteDishId === dish.id;
                  return (
                    <button
                      key={dish.id}
                      type="button"
                      onClick={() => setFavoriteDishId(dish.id)}
                      className={`p-2 rounded-xl border text-left flex items-center gap-2 transition-all cursor-pointer ${
                        isSelected
                          ? 'border-[#C61E28] bg-red-50/80 text-[#C61E28] shadow-xs'
                          : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <img
                        src={dish.image}
                        alt={dish.name}
                        className="w-8 h-8 rounded object-cover shrink-0 border border-gray-200"
                        referrerPolicy="no-referrer"
                      />
                      <div className="overflow-hidden">
                        <span className="text-[12px] font-bold block truncate">
                          {dish.name}
                        </span>
                        <span className="text-[10px] text-gray-500 block truncate">
                          {dish.chineseName}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Quick Praise / Compliment Tags */}
          <div>
            <label className="text-[11px] font-bold text-gray-600 uppercase tracking-wider block mb-2 flex items-center gap-1">
              <ThumbsUp className="w-3.5 h-3.5 text-amber-600" />
              What Stood Out?
            </label>
            <div className="flex flex-wrap gap-1.5">
              {REVIEW_TAGS.map((tag) => {
                const isSelected = selectedTags.includes(tag);
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleTag(tag)}
                    className={`px-2.5 py-1.2 rounded-lg text-[11px] font-semibold border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#C61E28] text-white border-[#C61E28] shadow-xs'
                        : 'bg-stone-50 hover:bg-stone-100 text-gray-700 border-stone-200'
                    }`}
                  >
                    {tag}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Review Text Input */}
          <div>
            <label className="text-[11px] font-bold text-gray-600 uppercase tracking-wider block mb-1.5 flex items-center gap-1">
              <MessageSquare className="w-3.5 h-3.5 text-gray-500" />
              Quick Note for Wok Masters & Cashier
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="e.g. Big Prawn Hor Fun had exceptional charred wok-hei! Will definitely return with family..."
              rows={2}
              className="w-full bg-white border border-gray-200 rounded-xl p-2.5 text-[12.5px] text-gray-900 placeholder:text-gray-400 focus:outline-none focus:border-[#C61E28] focus:ring-1 focus:ring-[#C61E28] transition-all resize-none"
            />
          </div>

          {/* Submit CTA & Google Review Option */}
          <div className="space-y-2 pt-1">
            <button
              type="submit"
              className="w-full py-2.5 px-4 bg-[#C61E28] hover:bg-red-800 text-white rounded-xl font-bold text-[13.5px] flex items-center justify-center gap-2 shadow-md active:scale-98 transition-all cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              Submit Dining Review & Claim S$5 Voucher
            </button>

            <a
              href="https://share.google/vPnZggbiOsjT21hKp"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2 px-3 bg-white border border-gray-200 hover:border-gray-300 text-gray-700 rounded-xl text-[12px] font-semibold flex items-center justify-center gap-1.5 transition-all"
            >
              <ExternalLink className="w-3.5 h-3.5 text-blue-600" />
              Share on Google Reviews (Michelin Bib Gourmand)
            </a>
          </div>
        </form>
      )}
    </div>
  );
};
