import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en" className="sr">
      <Head>
        <title>
          Shoperantics | Your One-Stop Destination for Quirky and Trendy
          Shopping Delights
        </title>
        <meta
          name="title"
          content="Shoperantics | Your One-Stop Destination for Quirky and Trendy Shopping Delights"
        />
        <meta
          name="description"
          content="Welcome to Shoperantics, the ultimate haven for all your shopping desires! Discover a world of unique and offbeat treasures that are sure to make a statement. Our carefully curated collection features a wide range of products, from fashion-forward apparel and accessories to whimsical home decor and innovative gadgets. With our finger on the pulse of the latest trends, we strive to bring you the most extraordinary and eye-catching items that will make you stand out from the crowd. Explore Shoperantics today and indulge in a shopping experience like no other. Unleash your inner shopaholic and embrace the fun-filled adventure of retail therapy with us!"
        />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://shopperantics.vercel.app/" />
        <meta
          property="og:title"
          content={
            'Shoperantics | Your One-Stop Destination for Quirky and Trendy Shopping Delights'
          }
        />
        <meta
          property="og:description"
          content={
            'Welcome to Shoperantics, the ultimate haven for all your shopping desires! Discover a world of unique and offbeat treasures that are sure to make a statement. Our carefully curated collection features a wide range of products, from fashion-forward apparel and accessories to whimsical home decor and innovative gadgets. With our finger on the pulse of the latest trends, we strive to bring you the most extraordinary and eye-catching items that will make you stand out from the crowd. Explore Shoperantics today and indulge in a shopping experience like no other. Unleash your inner shopaholic and embrace the fun-filled adventure of retail therapy with us!'
          }
        />
        <meta
          property="og:image"
          content={
            'https://shopperantics.s3.eu-central-1.amazonaws.com/meta_img.jpg'
          }
        />

        <meta property="twitter:card" content="summary_large_image" />
        <meta
          property="twitter:url"
          content="https://shopperantics.vercel.app/"
        />
        <meta property="twitter:title" content={`Shopperantics`} />
        <meta
          property="twitter:description"
          content={
            'Welcome to Shoperantics, the ultimate haven for all your shopping desires!'
          }
        />
        <meta
          property="twitter:image"
          content={
            'https://shopperantics.s3.eu-central-1.amazonaws.com/meta_img.jpg'
          }
        />

        <link rel="icon" href="/favicon.ico" />

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#663399" />
        <meta name="theme-color" content="#ffffff"></meta>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
