import Featured from '@/components/Featured';
import Header from '@/components/Header';
import NewProducts from '@/components/NewProducts';

import { mongooseConnect } from '@/lib/mongoose';

import { Product } from '@/models/Product';
import { Setting } from '@/models/Setting';
import { WishedProduct } from '@/models/WishedProduct';

import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';
import Head from 'next/head';

export default function HomePage({
  featuredProduct,
  newProducts,
  wishedNewProducts
}) {
  return (
    <div>
      <Head>
        <title>
          Shoperantics | Your One-Stop Destination for Quirky and Trendy
          Shopping Delights
        </title>
        <meta
          property={'og:description'}
          content={
            'Welcome to Shoperantics, the ultimate haven for all your shopping desires! Discover a world of unique and offbeat treasures that are sure to make a statement. Our carefully curated collection features a wide range of products, from fashion-forward apparel and accessories to whimsical home decor and innovative gadgets. With our finger on the pulse of the latest trends, we strive to bring you the most extraordinary and eye-catching items that will make you stand out from the crowd. Explore Shoperantics today and indulge in a shopping experience like no other. Unleash your inner shopaholic and embrace the fun-filled adventure of retail therapy with us!'
          }
          key={'content'}
        />
        <meta
          property={'og:title'}
          content={
            'Shoperantics | Your One-Stop Destination for Quirky and Trendy Shopping Delights'
          }
          key={'title'}
        />
      </Head>
      <Header />
      <Featured product={featuredProduct} />
      <NewProducts products={newProducts} wishedProducts={wishedNewProducts} />
    </div>
  );
}

export async function getServerSideProps(ctx) {
  await mongooseConnect();
  const featuredProductSetting = await Setting.findOne({
    name: 'featuredProductId'
  });
  const featuredProductId = featuredProductSetting?.value;
  const featuredProduct = await Product.findById(featuredProductId);
  const newProducts = await Product.find({}, null, {
    sort: { _id: -1 },
    limit: 10
  });
  const session = await getServerSession(ctx.req, ctx.res, authOptions);
  const wishedNewProducts = session?.user
    ? await WishedProduct.find({
        userEmail: session.user.email,
        product: newProducts.map((p) => p._id.toString())
      })
    : [];
  return {
    props: {
      featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
      newProducts: JSON.parse(JSON.stringify(newProducts)),
      wishedNewProducts: wishedNewProducts.map((i) => i.product.toString())
    }
  };
}
