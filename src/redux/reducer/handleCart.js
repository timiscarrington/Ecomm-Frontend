const cart = [];

const handleCart = (state = cart, action) => {
    const product = action.payload;
    switch (action.type){
        case "ADDITEM":
            //check if Product already exists
            const exist = state.find((x)=>x._id === product._id);
            if(exist){
                //increase the qauntity 
                return state.map((x)=>
                x._id === product._id  ? {...x, qty: x.qty + 1}: x
                );
            }else{
                const product = action.payload;
                return[
                    ...state,
                    {
                        ...product,
                        qty: 1,
                    }
                ]
            }
            break;

            case "DELETEITEM":
                const exist1 = state.find((x)=> x._id === product._id);
                if(exist1.qty === 1){
                    return state.filter((x)=> x._id !== exist1._id);
                }else{
                    return state.map((x)=>
                        x._id === product._id ? {...x, qty: x.qty-1} : x
                    );
                }
                break;
        default:
           return state;
            break;

    }

}

export default handleCart;