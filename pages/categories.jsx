import Center from '@/components/Center';
import Header from '@/components/Header';
import ProductBox from '@/components/ProductBox';
import { Grid } from '@/components/styles/Category/Grid.styled';
import { mongooseConnect } from '@/lib/mongoose';
import { Category } from '@/models/Category';
import { Product } from '@/models/Product';
import { WishedProduct } from '@/models/WishedProduct';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { getServerSession } from 'next-auth';
import { RevealWrapper } from 'next-reveal';
import Link from 'next/link';
import styled from 'styled-components';

const CategoryTitle = styled.div`
  display: flex;
  margin-top: 10px;
  margin-bottom: 0;
  align-items: center;
  gap: 10px;

  h2 {
    margin-bottom: 10px;
    margin-top: 10px;
  }

  a {
    color: #555;
    display: inline-block;
  }
`;
const CategoryWrapper = styled.div`
  margin-bottom: 40px;
`;

const ShowAllSquare = styled(Link)`
  background-color: #ddd;
  height: 300px;
  width: 300px;
  border-radius: 10px;
  align-items: center;
  display: flex;
  justify-content: center;
  color: #555;
  text-decoration: none;
`;

export default function CategoriesPage({
  mainCategories,
  categoriesProducts,
  wishedProducts = []
}) {
  return (
    <>
      <Header />
      <Center>
        {mainCategories.map((cat, index) => (
          <CategoryWrapper key={cat._id + index}>
            <CategoryTitle>
              <h2>{cat.name}</h2>
              <div>
                <Link href={'/category/' + cat._id}>Show all</Link>
              </div>
            </CategoryTitle>
            <Grid>
              {categoriesProducts[cat._id].map((p, index) => (
                <RevealWrapper
                  key={p._id + index}
                  className="load-hidden"
                  origin="top"
                  delay={200}
                  duration={1000}
                >
                  <ProductBox {...p} wished={wishedProducts.includes(p._id)} />
                </RevealWrapper>
              ))}
              <RevealWrapper
                className="load-hidden"
                origin="left"
                delay={200}
                duration={1000}
              >
                <ShowAllSquare href={'/category/' + cat._id}>
                  Show all &rarr;
                </ShowAllSquare>
              </RevealWrapper>
            </Grid>
          </CategoryWrapper>
        ))}
      </Center>
    </>
  );
}

export async function getServerSideProps(ctx) {
  await mongooseConnect();
  const categories = await Category.find();
  const mainCategories = categories.filter((c) => !c.parent);
  const categoriesProducts = {}; // catId => [products]
  const allFetchedProductsId = [];
  for (const mainCat of mainCategories) {
    const mainCatId = mainCat._id.toString();
    const childCatIds = categories
      .filter((c) => c?.parent?.toString() === mainCatId)
      .map((c) => c._id.toString());
    const categoriesIds = [mainCatId, ...childCatIds];
    const products = await Product.find({ category: categoriesIds }, null, {
      limit: 3,
      sort: { _id: -1 }
    });
    allFetchedProductsId.push(...products.map((p) => p._id.toString()));
    categoriesProducts[mainCat._id] = products;
  }

  const session = await getServerSession(ctx.req, ctx.res, authOptions);
  const wishedProducts = session?.user
    ? await WishedProduct.find({
        userEmail: session?.user.email,
        product: allFetchedProductsId
      })
    : [];

  return {
    props: {
      mainCategories: JSON.parse(JSON.stringify(mainCategories)),
      categoriesProducts: JSON.parse(JSON.stringify(categoriesProducts)),
      wishedProducts: wishedProducts.map((i) => i.product.toString())
    }
  };
}
