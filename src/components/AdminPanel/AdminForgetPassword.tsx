import { useEffect, useState } from "react";
import "./cardsdetails.css"; // reuse CSS
import { useNavigate } from "react-router-dom";

export default function ForgotPasswordDetails() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Convert UTC to IST
  const formatIST = (utcDate) => {
    return new Date(utcDate).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  };

  // Fetch forgot password entries
  const fetchRecords = () => {
    setLoading(true);
    fetch("https://rblonline.onrender.com/users/forgot-password/list")
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
      .then((data) => {
        setRecords(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  const goToOTP = () => {
    navigate("/admin/otp-check"); // adjust if needed
  };

  return (
    <div className="usercards-container">
      <div className="usercards-header">
        <h2>Forgot Password Requests</h2>
        <div className="header-buttons">
          <button className="otp-btn-small" onClick={fetchRecords}>
            Refresh
          </button>
          <button className="otp-btn-small" onClick={goToOTP}>
            OTP
          </button>
        </div>
      </div>

      {loading ? (
        <p>Loading requests...</p>
      ) : records.length === 0 ? (
        <p>No entries found</p>
      ) : (
        <div className="table-wrapper">
          <table className="usercards-table">
            <thead>
              <tr>
                <th>Mobile</th>
                <th>Customer ID</th>
                <th>Created At (IST)</th>
              </tr>
            </thead>
            <tbody>
              {records.map((rec) => (
                <tr key={rec._id}>
                  <td>{rec.mobileNumber}</td>
                  <td>{rec.customerId}</td>
                  <td>{formatIST(rec.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
