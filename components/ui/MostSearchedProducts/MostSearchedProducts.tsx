

    /**
   * @titleBy alt
   */
interface SearchedProductsProps {
  alt: string;
  link: string;
}

export interface Props {
  titleComponent: string;
    /**
   * @titleBy alt
   */
  searchedProducts?: SearchedProductsProps[];
}

function MostSearchedProducts({
  titleComponent,
  searchedProducts
}: Props) {

  return (
    <section className="flex max-w-[1280px] my-[48px] mx-[auto] max-[768px]:mx-[16px] max-[768px]:my-[24px]">

      <div className="flex gap-x-6 gap-y-4 flex-wrap flex-row">
        <h2 className="text-[1rem] brand-primary-1 body-bold max-[768px]:text-[0.75rem]">
          {titleComponent}
        </h2>
        {searchedProducts?.map((product: { alt: string; link: string }, index:number) => (
          <a className="body-regular text-brand-primary-500 max-[768px]:text-[0.75rem] hidden lg:block" href={product.link} key={product.link+index} title={product.alt}>
            {product.alt}
          </a>
        ))}
        {searchedProducts?.slice(0, 12).map((product: { alt: string; link: string }, index:number) => (
          <a className="body-regular text-brand-primary-500 max-[768px]:text-[0.75rem] lg:hidden" href={product.link} key={product.link+index+"filtered"} title={product.alt}>
            {product.alt}
          </a>
        ))}
      </div>
    </section>
  );
}

export default MostSearchedProducts;
