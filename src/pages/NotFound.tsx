import { Button, Row, Col, Typography } from "antd";
import "./css/NotFound.css";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

export default function NotFound() {
  const navigate = useNavigate();

  const goSelectSeat = () => {
    navigate("/");
  };

  return (
    <div className="not-found-container">
      <Row justify="center" align="middle">
        <Col id="msg-404" style={{ marginRight: 24 }}>
          404
        </Col>
        <Col className="not-found-msg">
          <Title level={2}>Oops, this page isn't available!</Title>
          <Button onClick={goSelectSeat} type="primary">Select Seat</Button>
        </Col>
      </Row>
    </div>
  );
}
