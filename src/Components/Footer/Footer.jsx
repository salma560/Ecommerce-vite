import React from "react";
import mastercard from "../../assets/imgs/mastercard.webp";
import amazonPay from "../../assets/imgs/amazon-pay.png";
import AmericanExpressColor from "../../assets/imgs/American-Express-Color.png";
import paypal from "../../assets/imgs/paypal.png";
import appleStore from "../../assets/imgs/get-apple-store.png";
import googlePlay from "../../assets/imgs/get-google-play.png";
export default function Footer() {
  return (
    <>
      <footer className="container-fluid bg-slate-200 space-y-5 py-10 ">
        <div className="allFooterContent container">
          <header>
            <h2 className="text-xl font-bold text-slate-500">
              Get The FreshCart App
            </h2>
            <p className="text-slate-400 text-lg">
              we will send you a link,open it in your phone to download the app
            </p>
          </header>
          <div className="form input flex-center gap-x-2">
            <input
              type="email"
              placeholder="Email Address..."
              className="grow  form-control"
            />
            <button className="btn bg-myColor-700 hover:bg-myColor-500">
              Share App Link
            </button>
          </div>
          <div className="footer flex justify-between items-center border-b-2 border-slate-300 border-t-2 py-5  gap-x-4 mt-5">
            <div className="grid lg:grid-cols-2 gap-x-5  w-full ">
              <div className="payments flex-center gap-x-4">
                <img src={mastercard} alt="masterCard Icon" className="w-20" />
                <img src={amazonPay} alt="masterCard Icon" className="w-24" />
                <img
                  src={AmericanExpressColor}
                  alt="masterCard Icon"
                  className="w-24"
                />
                <img src={paypal} alt="masterCard Icon" className="w-24" />
              </div>
              <div className="appStore flex-center gap-x-4">
                <h4 className="text-slate-500 font-semibold text-lg">
                  get Deliveries with FreshCart
                </h4>
                <img src={appleStore} alt="appleStore Icon" className="w-32" />
                <img src={googlePlay} alt="googplePlay Icon" className="w-32" />
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
