import { ProductDetailsPage } from "apps/commerce/types.ts";
import { ProductReviewsLoader } from "deco-sites/casaevideo/loaders/reviews/productReviews.ts";
import Icon from "deco-sites/casaevideo/components/ui/Icon.tsx";
import ReviewsList from "deco-sites/casaevideo/islands/ReviewsList.tsx";

type PageProps = ProductDetailsPage & ProductReviewsLoader;

interface Props {
  page: ProductDetailsPage | null;
}

export function handleGetStars(rating: number) {
  const stars = new Array(5).fill('star');
  const filledStars = Math.round(rating);
  

  return stars.map((_, idx) => {
    return idx < filledStars ? 
      <Icon width={26.7} height={19.7} id="FullStar" key={`star-${idx}`}/> : 
      <Icon width={26.7} height={19.7} id="EmptyStar"  key={`star-${idx}`} />;
  })
}

function ProductReviews(props: Props) {
  const { page } = props;
  const correctPage = page as PageProps;
  console.log("BATATAO")

  if (correctPage === null) {
    throw new Error(`batata: ${props.page?.product?.url}`);
  }

  const {
    reviews
  } = correctPage;

  if (reviews.Element === null) return <></>;

  const ratingStatistics = (
    <div 
      class="container flex flex-col border-0 md:border border-brand-secondary-100 bg-neutral-50 rounded-xl items-center justify-start p-4 gap-1 w-full md:w-1/3 max-h-[300px]"
    >
      <strong class="h2-bold">{reviews.Element.Rating}</strong>

      <div class="flex">
        {handleGetStars(reviews.Element.Rating)}
      </div>

      <span class="x-small-regular text-brand-secondary-600 mt-1">
        {reviews.Element.TotalRatings} avaliações
      </span>

      <div class="flex flex-col w-full max-w-64">
        {reviews.Element.RatingHistogram.RatingList.map((review) => (
          <div class="flex w-full items-center gap-2" key={review.Rate}>
            <span class="body-regular text-neutral-700 min-w-[68px] flex">
              {review.Rate} estrelas
            </span>

            <div class="w-full h-1 flex">
              <div class={`bg-warning h-1`} style={{ width: `${review?.PercentRating?.toFixed(0)}%` }} />
              <div class={`bg-neutral-100 h-1`} style={{ width: `${(100 - review?.PercentRating).toFixed(0)}%`}}/>
            </div>

            <span class="small-regular text-neutral-500 min-w-[42px]">
              {review.PercentRating.toFixed(1)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div class="container flex p-4 md:px-0">
      <div class="collapse collapse-arrow collapse-open flex flex-col border border-brand-secondary-100 bg-neutral-50 rounded-2xl w-full px-2 md:px-6 py-4">
        <strong class="collapse-title text-neutral-900 body-bold md:mb-5 border-b border-brand-secondary-100">
          Avaliações dos clientes
        </strong>

        <div class="collapse-content container flex gap-8 flex-col md:flex-row">
          {ratingStatistics}

          <ReviewsList reviews={reviews.Element.Reviews} />
        </div>
      </div>
    </div>
  );
}

export default ProductReviews;
