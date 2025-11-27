import React, { useState, useEffect } from "react";
import {
  Container,
  Card,
  Button,
  Spinner,
  Row,
  Col,
  Form,
  Table,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const DummyPaymentPage = () => {
  const navigate = useNavigate();
  const [processing, setProcessing] = useState(false);

  const basePlans = [
    { id: 1, name: "Basic", price: 299, features: { exams: 6, analytics: false, support: false } },
    { id: 2, name: "Standard", price: 499, features: { exams: 12, analytics: true, support: false } },
    { id: 3, name: "Pro", price: 699, features: { exams: 20, analytics: true, support: true } },
  ];

  const [billingCycle, setBillingCycle] = useState("monthly");
  const [plans, setPlans] = useState(basePlans);
  const [selectedPlan, setSelectedPlan] = useState(basePlans[0]);

  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    const hasPremium = localStorage.getItem("hasPremiumAccess");
    if (hasPremium === "true") {
      toast.info("You already have premium access!");
      navigate("/");
    }
  }, [navigate]);

  // Recalculate prices on cycle change
  useEffect(() => {
    let updatedPlans;

    if (billingCycle === "yearly") {
      updatedPlans = basePlans.map((p) => ({
        ...p,
        price: p.price * 10, // 10 months charge for 12 months
      }));
    } else {
      updatedPlans = basePlans;
    }

    setPlans(updatedPlans);

    // Maintain selected by ID
    const newSelected = updatedPlans.find((p) => p.id === selectedPlan.id);
    setSelectedPlan(newSelected);
  }, [billingCycle]);

  // Apply coupon
  const handleApplyCoupon = () => {
    if (coupon.toLowerCase() === "save50") {
      setDiscount(50);
      toast.success("🎉 Coupon applied: ₹50 OFF!");
    } else if (coupon.toLowerCase() === "save100") {
      setDiscount(100);
      toast.success("🎉 Coupon applied: ₹100 OFF!");
    } else {
      setDiscount(0);
      toast.error("❌ Invalid coupon code!");
    }
  };

  const finalPrice = Math.max(selectedPlan.price - discount, 0);

  // Payment Simulation
  const handlePayment = () => {
    setProcessing(true);
    setTimeout(() => {
      localStorage.setItem("hasPremiumAccess", "true");
      toast.success(`🎉 Payment Successful! Unlocked ${selectedPlan.name} Plan`);
      navigate("/");
    }, 2000);
  };

  return (
    <div style={{ background: "#1a1a1a", minHeight: "100vh", padding: "30px" }}>
      <Container>
        <div className="text-center mb-5">
          <h2 className="fw-bold text-warning">Choose Your Subscription</h2>
          <p className="text-white-50">
            Unlock unlimited exams, analytics & performance tracking.
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="d-flex justify-content-center mb-4">
          <Button
            variant={billingCycle === "monthly" ? "warning" : "secondary"}
            className="me-2"
            onClick={() => setBillingCycle("monthly")}
          >
            Monthly
          </Button>
          <Button
            variant={billingCycle === "yearly" ? "warning" : "secondary"}
            onClick={() => setBillingCycle("yearly")}
          >
            Yearly (2 Months Free)
          </Button>
        </div>

        {/* Feature Comparison Table */}
        <Card className="p-3 bg-dark text-white mb-5">
          <h5 className="mb-3 text-warning text-center">Feature Comparison</h5>
          <Table bordered hover variant="dark" className="text-center">
            <thead>
              <tr>
                <th>Feature</th>
                {plans.map((plan) => (
                  <th key={plan.id}>{plan.name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Exams Access</td>
                {plans.map((p) => (
                  <td key={p.id}>{p.features.exams}</td>
                ))}
              </tr>
              <tr>
                <td>Advanced Analytics</td>
                {plans.map((p) => (
                  <td key={p.id}>{p.features.analytics ? "✔️" : "❌"}</td>
                ))}
              </tr>
              <tr>
                <td>24×7 Support</td>
                {plans.map((p) => (
                  <td key={p.id}>{p.features.support ? "✔️" : "❌"}</td>
                ))}
              </tr>
            </tbody>
          </Table>
        </Card>

        {/* Plan Cards */}
        <Row className="justify-content-center">
          {plans.map((plan) => {
            const isSelected = selectedPlan.id === plan.id;
            const isPopular = plan.id === 3;

            return (
              <Col xs={12} sm={6} md={4} lg={3} key={plan.id} className="mb-4">
                <Card
                  className={`p-3 text-center shadow-lg ${
                    isSelected ? "border-warning border-3" : "border-secondary"
                  }`}
                  style={{
                    background: "#262626",
                    color: "white",
                    cursor: "pointer",
                    position: "relative",
                    borderRadius: "16px",
                  }}
                  onClick={() => setSelectedPlan(plan)}
                >
                  {isPopular && (
                    <div className="position-absolute top-0 start-50 translate-middle-x bg-warning text-dark fw-bold px-3 py-1 rounded-bottom">
                      MOST POPULAR
                    </div>
                  )}

                  <h4 className="fw-bold text-warning">{plan.name}</h4>
                  <h2 className="fw-bold">₹{plan.price}</h2>

                  <input
                    type="radio"
                    className="form-check-input"
                    name="plan"
                    checked={isSelected}
                    onChange={() => setSelectedPlan(plan)}
                  />
                </Card>
              </Col>
            );
          })}
        </Row>

        {/* Coupon Section */}
        <Card className="p-3 bg-dark text-white mt-3">
          <h5 className="mb-3 text-warning">Apply Coupon</h5>
          <div className="d-flex">
            <Form.Control
              type="text"
              placeholder="Enter coupon (ex: SAVE50)"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              className="me-2 bg-secondary text-white"
            />
            <Button variant="success" onClick={handleApplyCoupon}>
              Apply
            </Button>
          </div>
        </Card>

        {/* Payment Button */}
        <div className="text-center mt-4">
          <Button
            variant="warning"
            className="px-5 py-2 fw-bold text-dark"
            disabled={processing}
            onClick={handlePayment}
          >
            {processing ? (
              <>
                <Spinner size="sm" animation="border" /> Processing...
              </>
            ) : (
              <>Pay ₹{finalPrice}</>
            )}
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default DummyPaymentPage;
