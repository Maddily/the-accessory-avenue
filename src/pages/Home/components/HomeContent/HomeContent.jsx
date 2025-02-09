import Hero from '../Hero/Hero';
import FeaturedProducts from '../FeaturedProducts/FeaturedProducts';
import Testimonials from '../Testimonials/Testimonials';
import PromoBanner from '../PromoBanner/PromoBanner';
import useLoading from '../../../../hooks/useLoading';
import Skeletonhome from '../SkeletonHome/SkeletonHome';

/**
 * Renders components associated with home page.
 *
 * @returns {JSX.Element}
 */
export default function HomeContent() {
  const { loading } = useLoading();

  return loading ? (
    <Skeletonhome />
  ) : (
    <>
      <Hero />
      <FeaturedProducts />
      <Testimonials />
      <PromoBanner />
    </>
  );
}
