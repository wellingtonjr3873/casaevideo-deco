import Image from "apps/website/components/Image.tsx";
import { Review } from "deco-sites/casaevideo/types/reviews.ts";
import { handleGetStars } from "deco-sites/casaevideo/components/product/MountedPDP/ProductReviews/index.tsx";
import { useSignal } from "@preact/signals";
import Icon from "deco-sites/casaevideo/components/ui/Icon.tsx";

export interface Props {
  reviews: Review[];
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

function ReviewsList(props: Props) {
  const reviews = props.reviews;
  const showingReviews = useSignal(2);

  return (
    <div 
      class={
        `container gap-2 rounded-lg flex flex-col bg-neutral-50 items-start justify-center w-full md:w-2/3`
      }
    >
      {reviews.slice(0, showingReviews.value).map((review) => (
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

            <div class="flex mt-4">
              {review.CustomerPhotos?.slice(0, 3)?.map((image) => (
                <div class="flex items-center justify-center w-[84px] h-[72px] p-1 rounded border border-brand-secondary-200">
                  <div class="w-[72px] h-[64px] overflow-hidden">
                    <Image
                      src={image.includes('https') ? image : `https:${image}`}
                      width={74}
                      height={64}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}

      <div class="flex w-full items-center justify-center p-2">
        <button 
          class={
            `w-[195px] h-[48px] text-body-regular rounded-md border flex items-center justify-center ${showingReviews.value === reviews.length ? 'hidden' : ''}`
          }
          onClick={() => showingReviews.value = showingReviews.value === reviews.length ? 2 : reviews.length}
        >
          <Icon width={26.7} height={19.7} id="EmptyStar" /> Ver mais avaliações
        </button>
      </div>
    </div>
  );
}

export default ReviewsList;
