import { createSlice } from '@reduxjs/toolkit'

// Lấy state giỏ hàng từ localStorage nếu có
const getInitialOrder = () => {
    const order = localStorage.getItem("order");
    if (order) {
        try {
            return JSON.parse(order);
        } catch {
            return {
                orderItems: [],
                shippingAddress: {},
                paymentMethod: '',
                itemsPrice: 0,
                shippingPrice: 0,
                taxPrice: 0,
                totalPrice: 0,
                user: '',
                isPaid: false,
                paidAt: '',
                isDelivered: false,
                deliveredAt: '',
            };
        }
    }
    return {
        orderItems: [],
        shippingAddress: {},
        paymentMethod: '',
        itemsPrice: 0,
        shippingPrice: 0,
        taxPrice: 0,
        totalPrice: 0,
        user: '',
        isPaid: false,
        paidAt: '',
        isDelivered: false,
        deliveredAt: '',
    };
};

const initialState = getInitialOrder();

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        addOrderProduct: (state, action) => {
            const orderItem = action.payload;
            const itemOrder = state.orderItems.find(item => item?.product === orderItem.product);
            if (itemOrder) {
                itemOrder.amount += orderItem.amount;
            } else {
                state.orderItems.push(orderItem);
            }
        },
        removeOrderProduct: (state, action) => {
            state.orderItems = state.orderItems.filter(item => item.product !== action.payload.product);
        },
        increaseAmount: (state, action) => {
            const item = state.orderItems.find(item => item.product === action.payload.product);
            if (item) item.amount += 1;
        },
        decreaseAmount: (state, action) => {
            const item = state.orderItems.find(item => item.product === action.payload.product);
            if (item && item.amount > 1) item.amount -= 1;
        },
        clearOrder: (state) => {
            state.orderItems = [];
        }
    },
})

export const { addOrderProduct, removeOrderProduct, increaseAmount, decreaseAmount, clearOrder } = orderSlice.actions
export default orderSlice.reducer