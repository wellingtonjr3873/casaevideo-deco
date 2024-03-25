import { useId } from "$store/sdk/useId.ts";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import { ProductDetailsPage } from "apps/commerce/types.ts";
import { useOffer } from "deco-sites/casaevideo/sdk/useOffer.ts";
import { ProductReviewsLoader } from "deco-sites/casaevideo/loaders/reviews/productReviews.ts";
import Icon from "deco-sites/casaevideo/components/ui/Icon.tsx";
import { Review } from "deco-sites/casaevideo/types/reviews.ts";

type PageProps = ProductDetailsPage & ProductReviewsLoader;

interface Props {
  page: ProductDetailsPage | null;
}

function getDateDiff(date1: Date, date2: Date) {
  let months = (date2.getFullYear() - date1.getFullYear()) * 12;
  months += date2.getMonth();
  months -= date1.getMonth();

  const yearsDiff = Math.floor(months / 12);
  const monthsDiff = months % 12;
  const monthMessage = monthsDiff > 1 ? `${monthsDiff} meses atrás` : `${monthsDiff} mês atrás`;

  return yearsDiff > 0 ? 
    `${yearsDiff} ano e ${monthMessage}` :
      monthsDiff > 0 ?
      monthMessage :
      `esse mês`;
    ;
}

function getRecommendationValue(review: Review) {
  const recommendation = review.CustomFields.find((field) => field.Name === "Você recomendaria esse produto a um amigo?");

  return recommendation?.Values?.[0] === "Sim" ? true : false;
}

function ProductReviews(props: Props) {
  const { page } = props;
  const correctPage = page as PageProps;

  if (correctPage === null) {
    throw new Error("Missing Product Details Page Info");
  }

  const {
    reviews
  } = correctPage;

  if (reviews.Element === null) return <></>;

  const handleGetStars = (rating: number) => {
    const stars = new Array(5).fill('star');
    const filledStars = Math.round(rating);

    return stars.map((_, idx) => {
      return idx < filledStars ? 
        <Icon width={26.7} height={19.7} id="FullStar" key={`star-${idx}`}/> : 
        <Icon width={26.7} height={19.7} id="EmptyStar"  key={`star-${idx}`} />;
    })
  }

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

            <span class="small-regular text-neutral-500 min-w-[42px
            ]">
              {review.PercentRating.toFixed(1)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );

  const ratings = (
    <div 
      class="container gap-2 rounded-lg flex flex-col bg-neutral-50 items-start justify-centergap-1 w-full md:w-2/3"
    >
      {reviews.Element.Reviews.map((review) => (
        <div class="flex flex-col w-full border-t-[2px] first:border-0 border-neutral-100 pt-2 first:pt-0">
          <div class="flex flex-col w-full rounded-lg md:border-0 border border-neutral-100 p-4">
            <div class="flex justify-between">
              <strong class="small-bold md:body-bold">{review.User.Name}</strong>

              <span class="x-small-regular text-neutral-500">{getDateDiff(new Date(review.Date), new Date())}</span>
            </div>

            <div class="flex justify-between mt-1">
              <div class="flex ml-[-4px]">
                {handleGetStars(review.Rating)}
              </div>

              {getRecommendationValue(review) ? (
                <span class="x-small-regular md:small-regular text-success text-right">
                  Recomendo esse produto!
                </span>
              ) : (
                <span class="x-small-regular md:small-regular text-brand-primary-1 text-right">
                  Não recomendo esse produto!
                </span>
              )}
            </div>

            <span class="small-regular mt-4">{review.Review}</span>
          </div>
        </div>
      ))}
    </div>
  )

  console.log('reviews',reviews)

  return (
    <div class="container flex p-4 md:px-0">
      <div class="flex flex-col border border-brand-secondary-100 bg-neutral-50 rounded-2xl w-full px-2 md:px-6 py-4">
        <strong class="text-neutral-900 body-bold mb-2 md:mb-5">
          Avaliações dos clientes
        </strong>

        <div class="container flex gap-8 flex-col md:flex-row">
          {ratingStatistics}

          {ratings}
        </div>
      </div>
    </div>
  );
}

export default ProductReviews;
