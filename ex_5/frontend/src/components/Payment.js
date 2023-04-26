import Server from "./Server"

export default function Payment({amount}) {

    function handleClick(){
        Server.SendPaymentInfo(amount);
    }

    return (
      <button onClick={handleClick}>Pay {amount} money!</button>
    );
}