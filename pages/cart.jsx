import Button from '@/components/Button';
import { CartContext } from '@/components/CartContext';
import Center from '@/components/Center';
import Header from '@/components/Header';
import Input from '@/components/Input';
import { Box } from '@/components/styles/Cart/Box.styled';
import { CityHolder } from '@/components/styles/Cart/CityHolder.styled';
import { ColumnsWrapper } from '@/components/styles/Cart/ColumnsWrapper.styled';
import { ProductImageBox } from '@/components/styles/Cart/ProductImageBox.styled';
import { ProductInfoCell } from '@/components/styles/Cart/ProductInfoCell.styled';
import { QuantityLabel } from '@/components/styles/Cart/QuantityLabel.styled';
import Table from '@/components/Table';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { RevealWrapper } from 'next-reveal';
import Image from 'next/image';
import { useContext, useEffect, useState } from 'react';

export default function CartPage() {
  const { cartProducts, addProduct, removeProduct, clearCart } =
    useContext(CartContext);
  const { data: session } = useSession();
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [country, setCountry] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [shippingFee, setShippingFee] = useState(null);

  useEffect(() => {
    if (cartProducts.length > 0) {
      axios.post('/api/cart', { ids: cartProducts }).then((response) => {
        setProducts(response?.data);
      });
    } else {
      setProducts([]);
    }
  }, [cartProducts]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    if (window?.location.href.includes('success')) {
      setIsSuccess(true);
      clearCart();
    }
    axios.get('/api/settings?name=shippingFee').then((res) => {
      setShippingFee(parseInt(res?.data?.value));
    });
  }, []);

  useEffect(() => {
    if (!session) {
      return;
    }
    axios.get('/api/address').then((response) => {
      setName(response?.data?.name);
      setEmail(response?.data?.email);
      setCity(response?.data?.city);
      setPostalCode(response?.data?.postalCode);
      setStreetAddress(response?.data?.streetAddress);
      setCountry(response?.data?.country);
    });
  }, [session]);

  function moreOfThisProduct(id) {
    addProduct(id);
  }

  function lessOfThisProduct(id) {
    removeProduct(id);
  }

  async function goToPayment() {
    if (!name && !email && !city && !postalCode && !streetAddress && !country)
      return;

    const response = await axios.post('/api/checkout', {
      name,
      email,
      city,
      postalCode,
      streetAddress,
      country,
      cartProducts
    });

    if (response.data.url) {
      window.location = response.data.url;
    }
  }

  let productsTotal = 0;
  for (const productId of cartProducts) {
    const price = products.find((p) => p._id === productId)?.price || 0;
    productsTotal += price;
  }

  if (isSuccess) {
    return (
      <>
        <Header />
        <Center>
          <ColumnsWrapper>
            <Box>
              <h1>Thanks for your order!</h1>
              <p>We will email you when your order will be sent.</p>
            </Box>
          </ColumnsWrapper>
        </Center>
      </>
    );
  }

  return (
    <>
      <Header />
      <Center>
        <ColumnsWrapper>
          <RevealWrapper
            className="load-hidden"
            origin="top"
            delay={200}
            duration={1000}
          >
            <Box>
              <h2>Cart</h2>

              {!cartProducts?.length && <div>Your cart is empty</div>}

              {products?.length > 0 && (
                <Table>
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Quantity</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product, index) => (
                      <tr key={product._id + index}>
                        <ProductInfoCell>
                          <ProductImageBox>
                            <Image
                              src={product.images[0]}
                              alt={'product image'}
                              width={100}
                              height={100}
                            />
                          </ProductImageBox>

                          <span>{product.title}</span>
                        </ProductInfoCell>
                        <td>
                          <div>
                            <Button
                              onClick={() => lessOfThisProduct(product._id)}
                            >
                              -
                            </Button>
                            <QuantityLabel>
                              {
                                cartProducts.filter((id) => id === product._id)
                                  .length
                              }
                            </QuantityLabel>
                            <Button
                              onClick={() => moreOfThisProduct(product._id)}
                            >
                              +
                            </Button>
                          </div>
                        </td>
                        <td>
                          <span className="product-price">
                            $
                            {cartProducts.filter((id) => id === product._id)
                              .length * product.price}
                          </span>
                        </td>
                      </tr>
                    ))}
                    <tr className="subtotal">
                      <td colSpan={2}>Products</td>
                      <td>${parseFloat(productsTotal.toFixed(2))}</td>
                    </tr>
                    <tr className="subtotal">
                      <td colSpan={2}>Shipping</td>
                      <td>${shippingFee}</td>
                    </tr>
                    <tr className="subtotal total">
                      <td colSpan={2}>Total</td>
                      <td>
                        ${parseFloat(productsTotal + shippingFee).toFixed(2)}
                      </td>
                    </tr>
                  </tbody>
                </Table>
              )}
            </Box>
          </RevealWrapper>

          {!!cartProducts?.length && (
            <RevealWrapper
              className="load-hidden"
              origin="top"
              delay={200}
              duration={1000}
            >
              <Box>
                <h2>Order information</h2>
                <Input
                  type="text"
                  placeholder="Name"
                  value={name}
                  name="name"
                  onChange={(ev) => setName(ev.target.value)}
                />
                <Input
                  type="text"
                  placeholder="Email"
                  value={email}
                  name="email"
                  onChange={(ev) => setEmail(ev.target.value)}
                />
                <CityHolder>
                  <Input
                    type="text"
                    placeholder="City"
                    value={city}
                    name="city"
                    onChange={(ev) => setCity(ev.target.value)}
                  />
                  <Input
                    type="text"
                    placeholder="Postal Code"
                    value={postalCode}
                    name="postalCode"
                    onChange={(ev) => setPostalCode(ev.target.value)}
                  />
                </CityHolder>
                <Input
                  type="text"
                  placeholder="Street Address"
                  value={streetAddress}
                  name="streetAddress"
                  onChange={(ev) => setStreetAddress(ev.target.value)}
                />
                <Input
                  type="text"
                  placeholder="Country"
                  value={country}
                  name="country"
                  onChange={(ev) => setCountry(ev.target.value)}
                />
                <Button black block onClick={goToPayment}>
                  Continue to payment
                </Button>
              </Box>
            </RevealWrapper>
          )}
        </ColumnsWrapper>
      </Center>
    </>
  );
}
