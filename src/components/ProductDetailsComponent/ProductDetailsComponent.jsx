import { Col, ConfigProvider, Image, InputNumber, Rate, Row } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import imageProduct from '../../assets/images/test.webp';
import imageProductSmall from '../../assets/images/imgsmall.webp';
import {
  WrapperAddressProduct,
  WrapperBtnQualityProduct,
  WrapperInputNumber,
  WrapperPriceProduct,
  WrapperPriceTextProduct,
  WrapperQualityProduct,
  WrapperStyleColImage,
  WrapperStyleImageSmall,
  WrapperStyleNameProduct,
  WrapperStyleTextSell,
} from './style';
import { StarFilled, PlusOutlined, MinusOutlined } from '@ant-design/icons';
import ButtonComponent from '../ButtonComponent/ButtonComponent';
import * as ProductService from '../../services/ProductService';
import { useQuery } from '@tanstack/react-query';
import Loading from '../LoadingComponent/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { addOrderProduct, resetOrder } from '../../redux/slides/orderSlice';
import { convertPrice, initFacebookSDK } from '../../utils';
import * as message from '../../components/Message/Message';
import LikeButtonComponent from '../LikeButtonComponent/LikeButtonComponent';
import CommentComponent from '../CommentComponent/CommentComponent';
const ProductDetailsComponent = ({ idProduct }) => {
  const [numProduct, setNumProduct] = useState(1);
  const user = useSelector((state) => state.user);
  const order = useSelector((state) => state.order);
  const [errorLimitOrder, setErrorLimitOrder] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const onChange = (value) => {
    setNumProduct(Number(value));
  };

  const fetchGetDetailsProduct = async (context) => {
    const id = context?.queryKey && context?.queryKey[1];
    if (id) {
      const res = await ProductService.getDetailsProduct(id);
      return res.data;
    }
  };

  useEffect(() => {
    initFacebookSDK();
  }, []);

  useEffect(() => {
    const orderRedux = order?.orderItems?.find((item) => item.product === productDetails?._id);
    if (orderRedux?.amount + numProduct <= orderRedux?.countInStock || (!orderRedux && productDetails?.countInStock > 0)) {
      setErrorLimitOrder(false);
    } else if (productDetails?.countInStock === 0) {
      setErrorLimitOrder(true);
    }
  }, [numProduct]);

  useEffect(() => {
    if (order?.isSuccessOrder) {
      message.success('Đã thêm vào giỏ hàng');
    }
    return () => {
      dispatch(resetOrder());
    };
  }, [order.isSuccessOrder]);

  const { isLoading, data: productDetails } = useQuery(['product-details', idProduct], fetchGetDetailsProduct, { enabled: !!idProduct });

  const handleChangeCount = (type, limited) => {
    if (type === 'increase') {
      if (!limited) {
        setNumProduct(numProduct + 1);
      }
    } else {
      if (!limited) {
        setNumProduct(numProduct - 1);
      }
    }
  };

  const handleAddOrderProduct = () => {
    if (!user?.id) {
      navigate('/sign-in', { state: location?.pathname });
    } else {
      const orderRedux = order?.orderItems?.find((item) => item.product === productDetails?._id);
      if (orderRedux?.amount + numProduct <= orderRedux?.countInStock || (!orderRedux && productDetails?.countInStock > 0)) {
        dispatch(
          addOrderProduct({
            orderItem: {
              name: productDetails?.name,
              amount: numProduct,
              image: productDetails?.image,
              price: productDetails?.price,
              product: productDetails?._id,
              discount: productDetails?.discount,
              countInStock: productDetails?.countInStock,
            },
          })
        );
      } else {
        setErrorLimitOrder(true);
      }
    }
  };

  return (
    <Loading isLoading={isLoading}>
      <Row style={{ padding: '16px', background: '#fff', borderRadius: '4px' }}>
        <Col span={10} style={{ borderRight: '1px solid #e5e5e5', paddingRight: '8px' }}>
          <Image src={productDetails?.image} alt="image Product" preview={false} />
          <Row style={{ paddingTop: '10px', justifyContent: 'space-between' }}>
            <WrapperStyleColImage span={4}>
              <WrapperStyleImageSmall src={productDetails?.image} alt="img product small" preview={false} />
            </WrapperStyleColImage>

            <WrapperStyleColImage span={4}>
              <WrapperStyleImageSmall src={productDetails?.image} alt="img product small" preview={false} />
            </WrapperStyleColImage>

            <WrapperStyleColImage span={4}>
              <WrapperStyleImageSmall src={productDetails?.image} alt="img product small" preview={false} />
            </WrapperStyleColImage>

            <WrapperStyleColImage span={4}>
              <WrapperStyleImageSmall src={productDetails?.image} alt="img product small" preview={false} />
            </WrapperStyleColImage>

            <WrapperStyleColImage span={4}>
              <WrapperStyleImageSmall src={productDetails?.image} alt="img product small" preview={false} />
            </WrapperStyleColImage>

            <WrapperStyleColImage span={4}>
              <WrapperStyleImageSmall src={productDetails?.image} alt="img product small" preview={false} />
            </WrapperStyleColImage>
          </Row>
        </Col>
        <Col span={14} style={{ paddingLeft: '10px' }}>
          <WrapperStyleNameProduct>{productDetails?.name}</WrapperStyleNameProduct>
          <div>
            <Rate allowHalf defaultValue={productDetails?.rating} value={productDetails?.rating}></Rate>
            <WrapperStyleTextSell> | Đã bán 1000+</WrapperStyleTextSell>
          </div>
          <WrapperPriceProduct>
            <WrapperPriceTextProduct>{convertPrice(productDetails?.price)}</WrapperPriceTextProduct>
          </WrapperPriceProduct>
          <WrapperAddressProduct>
            <span>Giao đến </span>
            <span className="address">{user?.address}</span> - <span className="change-address">Đổi địa chỉ</span>
          </WrapperAddressProduct>
          <LikeButtonComponent dataHref={process.env.REACT_APP_IS_LOCAL ? 'https://developers.facebook.com/docs/plugins/' : window.location.href}></LikeButtonComponent>
          <div style={{ margin: '10px 0 20px', borderTop: '1px solid #e5e5e5', borderBottom: '1px solid #e5e5e5', padding: '10px 0' }}>
            <div style={{ marginBottom: '10px' }}>Số lượng</div>
            <WrapperQualityProduct>
              <button style={{ border: 'none', background: 'transparent', cursor: 'pointer' }} onClick={() => handleChangeCount('decrease', numProduct === 1)}>
                <MinusOutlined style={{ color: '#000', fontSize: '20px' }} />
              </button>

              <ConfigProvider theme={{ hashed: false }}>
                <WrapperInputNumber onChange={onChange} defaultValue={1} value={numProduct} min={1} max={productDetails?.countInStock} size="small" />
              </ConfigProvider>
              <button
                style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}
                onClick={() => handleChangeCount('increase', numProduct === productDetails?.countInStock)}
              >
                <PlusOutlined style={{ color: '#000', fontSize: '20px' }} />
              </button>
            </WrapperQualityProduct>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div>
              <ButtonComponent
                styleButton={{ background: 'rgb(255, 57, 69)', height: '48px', width: '220px', border: 'none', borderRadius: '4px' }}
                size={20}
                onClick={handleAddOrderProduct}
                textbutton={'Chọn mua'}
                styleTextButtton={{ color: '#fff', fontSize: '15px', fontWeight: '700px' }}
              ></ButtonComponent>
              {errorLimitOrder && <div style={{ color: 'red' }}>Sản phẩm đã hết hàng</div>}
            </div>

            <ButtonComponent
              styleButton={{ background: '#fff', height: '48px', width: '220px', border: '1px solid rgb(13,92,182)', borderRadius: '4px' }}
              size={20}
              textbutton={'Mua trả sau'}
              styleTextButtton={{ color: 'rgb(13,92,182)', fontSize: '15px' }}
            ></ButtonComponent>
          </div>
        </Col>
        <CommentComponent
          dataHref={process.env.REACT_APP_IS_LOCAL ? 'https://developers.facebook.com/docs/plugins/comments#configurator' : window.location.href}
          width="1270"
        ></CommentComponent>
      </Row>
    </Loading>
  );
};

export default ProductDetailsComponent;
