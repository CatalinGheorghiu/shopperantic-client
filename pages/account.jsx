import Button from '@/components/Button';
import Center from '@/components/Center';
import Header from '@/components/Header';
import Input from '@/components/Input';
import ProductBox from '@/components/ProductBox';
import SingleOrder from '@/components/SingleOrder';
import Spinner from '@/components/Spinner';
import { CityHolder } from '@/components/styles/Account/CityHolder.styled';
import { ColsWrapper } from '@/components/styles/Account/ColumnsWrapper.styled';
import Tabs from '@/components/Tabs';
import { WhiteBox } from '@/components/WhiteBox';
import axios from 'axios';
import { signIn, signOut, useSession } from 'next-auth/react';
import { RevealWrapper } from 'next-reveal';
import { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AccountPage() {
  const { data: session } = useSession();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [streetAddress, setStreetAddress] = useState('');
  const [country, setCountry] = useState('');
  const [addressLoaded, setAddressLoaded] = useState(true);
  const [wishlistLoaded, setWishlistLoaded] = useState(true);
  const [orderLoaded, setOrderLoaded] = useState(true);
  const [wishedProducts, setWishedProducts] = useState([]);
  const [activeTab, setActiveTab] = useState('Orders');
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(false);
  const notify = (msgType, msg) =>
    toast[msgType](msg, {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light'
    });

  async function logout() {
    await signOut({
      callbackUrl: process.env.NEXT_PUBLIC_URL
    });
  }

  async function login() {
    await signIn('google');
  }

  async function saveAddress() {
    try {
      if (
        name.length === 0 ||
        email.length === 0 ||
        city.length === 0 ||
        postalCode.length === 0 ||
        streetAddress.length === 0 ||
        country.length === 0
      ) {
        setError(true);
        throw new Error('All fields are required');
      }

      const data = { name, email, city, streetAddress, postalCode, country };
      await axios.put('/api/address', data);
      notify('success', 'Address saved successfully');
    } catch (e) {
      notify('error', 'Error saving address');
    }
  }

  useEffect(() => {
    if (!session) {
      return;
    }
    setAddressLoaded(false);
    setWishlistLoaded(false);
    setOrderLoaded(false);

    axios.get('/api/address').then((response) => {
      setName(response?.data?.name);
      setEmail(response?.data?.email);
      setCity(response?.data?.city);
      setPostalCode(response?.data?.postalCode);
      setStreetAddress(response?.data?.streetAddress);
      setCountry(response?.data?.country);
      setAddressLoaded(true);
    });

    axios.get('/api/wishlist').then((response) => {
      setWishedProducts(response?.data.map((wp) => wp?.product));
      setWishlistLoaded(true);
    });

    axios.get('/api/orders').then((response) => {
      setOrders(response?.data);
      setOrderLoaded(true);
    });
  }, [session]);

  function productRemovedFromWishlist(idToRemove) {
    setWishedProducts((products) => {
      return [...products.filter((p) => p?._id.toString() !== idToRemove)];
    });
  }

  return (
    <>
      <Header />
      <Center>
        <ColsWrapper>
          <div className={'col-left'}>
            <RevealWrapper
              className="load-hidden"
              origin="top"
              delay={200}
              duration={1000}
            >
              <WhiteBox>
                <Tabs
                  tabs={['Orders', 'Wishlist']}
                  active={activeTab}
                  onChange={setActiveTab}
                />
                {activeTab === 'Orders' && (
                  <>
                    {!orderLoaded && <Spinner fullWidth={true} />}
                    {orderLoaded && (
                      <div>
                        {wishedProducts.length === 0 && (
                          <>
                            {session && <p>Your order list is empty</p>}
                            {!session && <p>Login to see your orders</p>}
                          </>
                        )}

                        {orders.length > 0 &&
                          orders.map((order) => (
                            <SingleOrder key={order._id} {...order} />
                          ))}
                      </div>
                    )}
                  </>
                )}

                {activeTab === 'Wishlist' && (
                  <>
                    {!wishlistLoaded && <Spinner fullWidth={true} />}
                    {wishlistLoaded && (
                      <>
                        <div>
                          {wishedProducts.length > 0 &&
                            wishedProducts.map((wp) => (
                              <ProductBox
                                key={wp._id}
                                {...wp}
                                wished={true}
                                onRemoveFromWishlist={
                                  productRemovedFromWishlist
                                }
                              />
                            ))}
                        </div>
                        {wishedProducts.length === 0 && (
                          <>
                            {session && <p>Your wishlist is empty</p>}
                            {!session && (
                              <p>Login to add products to your wishlist</p>
                            )}
                          </>
                        )}
                      </>
                    )}
                  </>
                )}
              </WhiteBox>
            </RevealWrapper>
          </div>

          <div className={'col-right'}>
            <RevealWrapper
              className="load-hidden"
              origin="top"
              delay={200}
              duration={1000}
            >
              <WhiteBox>
                <h2>{session ? 'Account details' : 'Login'}</h2>
                {!addressLoaded && <Spinner fullWidth={true} />}
                {addressLoaded && session && (
                  <div className={'address-form'}>
                    <div className={'input-wrapper'}>
                      <Input
                        type="text"
                        placeholder="Name"
                        value={name}
                        name="name"
                        onChange={(ev) => setName(ev.target.value)}
                      />
                      {error && name.length <= 0 && (
                        <small>Name is a required field!</small>
                      )}
                    </div>

                    <div className={'input-wrapper'}>
                      <Input
                        type="text"
                        placeholder="Email"
                        value={email}
                        name="email"
                        onChange={(ev) => setEmail(ev.target.value)}
                      />
                      {error && email.length <= 0 && (
                        <small>Email is a required field!</small>
                      )}
                    </div>

                    <CityHolder>
                      <div className={'input-wrapper'}>
                        <Input
                          type="text"
                          placeholder="City"
                          value={city}
                          name="city"
                          onChange={(ev) => setCity(ev.target.value)}
                        />
                        {error && city.length <= 0 && (
                          <small>City is a required field!</small>
                        )}
                      </div>

                      <div className={'input-wrapper'}>
                        <Input
                          type="text"
                          placeholder="Postal Code"
                          value={postalCode}
                          name="postalCode"
                          onChange={(ev) => setPostalCode(ev.target.value)}
                        />
                        {error && postalCode.length <= 0 && (
                          <small>Postal code is a required field!</small>
                        )}
                      </div>
                    </CityHolder>

                    <div className={'input-wrapper'}>
                      <Input
                        type="text"
                        placeholder="Street Address"
                        value={streetAddress}
                        name="streetAddress"
                        onChange={(ev) => setStreetAddress(ev.target.value)}
                      />
                      {error && streetAddress.length <= 0 && (
                        <small>Street address is a required field!</small>
                      )}
                    </div>

                    <div className={'input-wrapper'}>
                      <Input
                        type="text"
                        placeholder="Country"
                        value={country}
                        name="country"
                        onChange={(ev) => setCountry(ev.target.value)}
                      />
                      {error && country.length <= 0 && (
                        <small>Country is a required field!</small>
                      )}
                    </div>

                    <Button black block onClick={saveAddress}>
                      Save
                    </Button>
                    <hr />
                  </div>
                )}
                {session && (
                  <Button primary onClick={logout}>
                    Logout
                  </Button>
                )}
                {!session && (
                  <Button primary onClick={login}>
                    Login with Google
                  </Button>
                )}
              </WhiteBox>
            </RevealWrapper>
          </div>
        </ColsWrapper>
      </Center>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <ToastContainer />
    </>
  );
}
