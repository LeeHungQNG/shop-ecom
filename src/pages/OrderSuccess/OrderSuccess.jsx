import React, { useEffect, useMemo, useState } from 'react';
import {
  CustomCheckbox,
  Lable,
  WrapperCountOrder,
  WrapperInfo,
  WrapperItemOrder,
  WrapperContainer,
  WrapperListOrder,
  WrapperPriceDiscount,
  WrapperRadio,
  WrapperRight,
  WrapperStyleHeader,
  WrapperStyleHeaderDilivery,
  WrapperTotal,
  WrapperValue,
  WrapperItemOrderInfo,
} from './style';

import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import InputComponent from '../../components/InputComponent/InputComponent';
import { Form, Radio } from 'antd';
import Loading from '../../components/LoadingComponent/Loading';
import ModalComponent from '../../components/ModalComponent/ModalComponent';

import { useDispatch, useSelector } from 'react-redux';
import { decreaseAmount, increaseAmount, removeAllOrderProduct, removeOrderProduct, selectedOrder } from '../../redux/slides/orderSlice';
import { convertPrice } from '../../utils';
import { useMutationHooks } from '../../hooks/useMutationHook';
import * as UserService from '../../services/UserService';
import * as OrderService from '../../services/OrderService';
import * as message from '../../components/Message/Message';
import { updateUser } from '../../redux/slides/userSlice';
import { WrapperInputNumber } from '../../components/ProductDetailsComponent/style';
import { useLocation } from 'react-router-dom';
import { orderContant } from '../../contant';

const OrderSuccess = () => {
  const order = useSelector((state) => state.order);
  const location = useLocation();
  const { state } = location;

  return (
    <div style={{ background: '#f5f5fa', with: '100%', height: '100vh' }}>
      <Loading isLoading={false}>
        <div style={{ height: '100%', width: '1270px', margin: '0 auto' }}>
          <h3 style={{ fontWeight: 'bold' }}>Đơn đặt hàng thành công</h3>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <WrapperContainer>
              <WrapperInfo>
                <div>
                  <Lable>Phương thức giao hàng</Lable>
                  <WrapperValue>
                    <span style={{ color: '#ea8500', fontWeight: 'bold' }}>{orderContant.delivery[state?.delivery]}</span> Giao hàng tiết kiệm
                  </WrapperValue>
                </div>
              </WrapperInfo>
              <WrapperInfo>
                <div>
                  <Lable>Chọn phương thức thanh toán</Lable>
                  <WrapperValue>{orderContant.payment[state?.payment]}</WrapperValue>
                </div>
              </WrapperInfo>
              <WrapperItemOrderInfo>
                {state.orders?.map((order) => {
                  return (
                    <WrapperItemOrder key={order?.name}>
                      <div style={{ width: '390px', display: 'flex', alignItems: 'center', gap: 4 }}>
                        <img src={order.image} style={{ width: '77px', height: '79px', objectFit: 'cover' }} />
                        <div
                          style={{
                            width: 260,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {order?.name}
                        </div>
                      </div>
                      <div style={{ width: '500px', flex: 1, display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span>
                          <span style={{ fontSize: '13px', color: '#242424' }}>Giá tiền: {convertPrice(order?.price)}</span>
                        </span>
                        <span>
                          <span style={{ fontSize: '13px', color: '#242424' }}>Số lượng: {order?.amount}</span>
                        </span>
                      </div>
                    </WrapperItemOrder>
                  );
                })}
              </WrapperItemOrderInfo>
              <div>
                <span style={{ fontSize: '16px', color: 'red' }}>Tổng tiền: {convertPrice(state?.totalPriceMemo)}</span>
              </div>
            </WrapperContainer>
          </div>
        </div>
      </Loading>
    </div>
  );
};

export default OrderSuccess;
