import React, { useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Spinner,
  Alert,
  Table,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchDashboardData } from "../../features/dashboard/dashboardThunks";
import { useNavigate } from "react-router-dom";
import {
  Book,
  Clock,
  CheckCircle,
  AlertCircle,
  Trophy,
  BarChart2,
} from "lucide-react";
import DashboardNavbar from "../../components/DashboardNavbar"; // ✅ Reusable Navbar component
import "./Dashboard.css";

const CandidateDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { exams, user, loading, error } = useSelector(
    (state) => state.dashboard
  );

  useEffect(() => {
    dispatch(fetchDashboardData());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="dashboard-loader text-center mt-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3 text-muted">Loading your dashboard...</p>
      </div>
    );
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  const activePlan = user?.activeSubscription?.status === "ACTIVE";
  // const recentAttempts = user?.recentAttempts || [];

  return (
    <>
      {/* ✅ Fixed Navbar */}
      <DashboardNavbar />

      {/* ✅ Main Dashboard Section */}
      <Container className="candidate-dashboard mt-navbar mb-5">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2 className="fw-bold text-primary mb-0">
              Welcome, {user?.name} 👋
            </h2>
            <p className="text-muted">
              Ready to test your knowledge? Let’s ace your next exam!
            </p>
          </div>
        </div>

        {/* Summary Cards */}
        <Row className="mb-4 g-3">
          <Col md={4}>
            <Card className="summary-card shadow-sm border-0 p-3">
              <div className="d-flex align-items-center">
                <Trophy size={32} className="text-warning me-3" />
                <div>
                  <h6 className="text-muted mb-0">Active Plan</h6>
                  <h5 className="fw-bold mb-0">
                    {activePlan
                      ? user.activeSubscription.planName
                      : "No Active Plan"}
                  </h5>
                </div>
              </div>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="summary-card shadow-sm border-0 p-3">
              <div className="d-flex align-items-center">
                <Book size={32} className="text-primary me-3" />
                <div>
                  <h6 className="text-muted mb-0">Available Exams</h6>
                  <h5 className="fw-bold mb-0">{exams?.length || 0}</h5>
                </div>
              </div>
            </Card>
          </Col>

          <Col md={4}>
            <Card className="summary-card shadow-sm border-0 p-3">
              <div className="d-flex align-items-center">
                <CheckCircle size={32} className="text-success me-3" />
                <div>
                  <h6 className="text-muted mb-0">Completed Exams</h6>
                  <h5 className="fw-bold mb-0">
                    {user?.completedExams?.length || 0}
                  </h5>
                </div>
              </div>
            </Card>
          </Col>
        </Row>

        {/* Subscription Section */}
        <Card className="subscription-card mb-4 shadow-sm border-0">
          <Card.Body>
            <Card.Title className="fw-semibold">Subscription Status</Card.Title>
            <Card.Text className="mb-2">
              {activePlan ? (
                <>
                  <strong>Plan:</strong> {user.activeSubscription.planName}{" "}
                  <br />
                  <strong>Valid Until:</strong>{" "}
                  {new Date(
                    user.activeSubscription.endDate
                  ).toLocaleDateString()}
                </>
              ) : (
                <span className="text-danger">
                  <AlertCircle size={18} className="me-1" />
                  No active plan. Please subscribe to access paid exams.
                </span>
              )}
            </Card.Text>
            {!activePlan && (
              <Button
                variant="primary"
                size="sm"
                onClick={() => navigate("/dummy-payment")}
              >
                View Plans
              </Button>
            )}
          </Card.Body>
        </Card>

        {/* Exam List */}
        <h4 className="fw-bold mb-3">Available Exams</h4>
        <Row>
          {exams && exams.length > 0 ? (
            exams.map((exam) => (
              <Col md={4} sm={6} key={exam._id} className="mb-4">
                <Card className="exam-card shadow-sm border-0 h-100">
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <h5 className="fw-bold text-dark">{exam.title}</h5>
                      {exam.isFree ? (
                        <span className="badge bg-success">Free</span>
                      ) : (
                        <span className="badge bg-danger">Paid</span>
                      )}
                    </div>
                    <p className="text-muted mb-1">
                      <strong>Subject:</strong> {exam.subject}
                    </p>
                    <p className="text-muted mb-3">
                      <Clock size={14} className="me-1" />
                      {exam.duration} mins | {exam.totalQuestions} Questions
                    </p>
                    <Button
                      variant="outline-primary"
                      size="sm"
                      className="w-100"
                      onClick={() => navigate(`/exam/${exam._id}`)}
                    >
                      Start Exam
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))
          ) : (
            <p className="text-center text-muted mt-4">No exams available.</p>
          )}
        </Row>
      </Container>

      {/* Footer */}
      <footer className="dashboard-footer text-center py-3 mt-4">
        <p className="mb-0 text-muted small">
          © {new Date().getFullYear()} Exam Simulator | Designed for candidates
        </p>
      </footer>
    </>
  );
};

export default CandidateDashboard;
