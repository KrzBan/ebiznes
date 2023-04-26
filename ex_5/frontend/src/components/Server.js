

export function SendPaymentInfo(amount){
    console.log(`Sending payment info. Amoung to pay: ${amount}`);
}

export async function FetchProducts() {
    return await fetch(`http://localhost:8080/products`)
        .then(response => response.json());
}


export default {
    SendPaymentInfo,
    FetchProducts
}