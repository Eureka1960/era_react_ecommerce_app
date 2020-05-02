function productDetail(state = null, action) {
    switch (action.type) {
        case 'SET_PRODUCT':
            return action.payload;
        default:
            return state;
    }
}

export default productDetail;