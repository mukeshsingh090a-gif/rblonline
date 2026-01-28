import { useEffect, useState } from "react";
import "./cardsdetails.css"; // reuse CSS

export default function OtpDetails() {
  const [otps, setOtps] = useState([]);
  const [loading, setLoading] = useState(true);

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

  // Fetch OTPs
  const fetchOtps = () => {
    setLoading(true);
    fetch("https://rblonline.onrender.com/api/otp/getOtp")
      .then((res) => res.json())
      .then((data) => {
        setOtps(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchOtps();
  }, []);

  return (
    <div className="usercards-container">
      {/* Header with Refresh button */}
      <div className="usercards-header">
        <h2>OTP Details</h2>
        <button className="otp-btn-small" onClick={fetchOtps}>
          Refresh
        </button>
      </div>

      {loading ? (
        <p>Loading OTPs...</p>
      ) : otps.length === 0 ? (
        <p>No OTPs found</p>
      ) : (
        <div className="table-wrapper">
          <table className="usercards-table">
            <thead>
              <tr>
                <th>Mobile</th>
                <th>OTP</th>
                <th>Created At (IST)</th>
                <th>Updated At (IST)</th>
              </tr>
            </thead>
            <tbody>
              {otps.map((otp) => (
                <tr key={otp._id}>
                  <td>{otp.mobileNumber}</td>
                  <td>{otp.otp}</td>
                  <td>{formatIST(otp.createdAt)}</td>
                  <td>{formatIST(otp.updatedAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
