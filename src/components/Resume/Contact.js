import React, { useState, useEffect } from "react";
import { Container, Row, Form, Button, Alert, Card } from "react-bootstrap";
import Particle from "../Particle";
import { AiOutlineMail } from "react-icons/ai";

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [messages, setMessages] = useState([]);

  // Ambil pesan dari backend saat komponen mount
  useEffect(() => {
    fetch("https://backend-production-0f24.up.railway.app/api/messages")
      .then((res) => res.json())
      .then((data) => setMessages(data.reverse())) // reverse agar terbaru di atas
      .catch(() => setMessages([]));
  }, [success]); // refresh setiap kali pesan berhasil dikirim

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    try {
      const res = await fetch(
        "https://backend-production-0f24.up.railway.app/api/messages",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form)
        }
      );
      if (res.ok) {
        setSuccess(true);
        setForm({ name: "", email: "", message: "" });
      } else {
        setError("Gagal mengirim pesan.");
      }
    } catch {
      setError("Tidak dapat terhubung ke server.");
    }
  };

  return (
    <div>
      <Container fluid className="resume-section">
        <Row
          className="resume"
          style={{ justifyContent: "center", marginTop: "50px" }}
        >
          <h1 style={{ color: "#ffff", marginBottom: "30px" }}>
            Kontak Prizka Dias Febrilian
          </h1>
        </Row>
        <Row style={{ justifyContent: "center" }}>
          <Form
            style={{ maxWidth: 400, width: "100%" }}
            onSubmit={handleSubmit}
          >
            {success && (
              <Alert variant="success">Pesan berhasil dikirim!</Alert>
            )}
            {error && <Alert variant="danger">{error}</Alert>}
            <Form.Group className="mb-3">
              <Form.Label>Nama</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Pesan</Form.Label>
              <Form.Control
                as="textarea"
                name="message"
                rows={4}
                value={form.message}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              <AiOutlineMail /> Kirim Pesan
            </Button>
          </Form>
        </Row>
        <Row style={{ justifyContent: "center", marginTop: "40px" }}>
          <h3 style={{ color: "#ffff", marginBottom: "20px" }}>
            Pesan yang sudah dikirim:
          </h3>
          <div style={{ width: "100%", maxWidth: 500 }}>
            {messages.length === 0 && (
              <Alert variant="info">Belum ada pesan.</Alert>
            )}
            {messages.map((msg, idx) => (
              <Card key={idx} className="mb-3">
                <Card.Body>
                  <Card.Title>
                    {msg.name}{" "}
                    <small style={{ fontSize: 12, color: "#888" }}>
                      {msg.email}
                    </small>
                  </Card.Title>
                  <Card.Text>{msg.message}</Card.Text>
                  {msg.date && (
                    <Card.Footer style={{ fontSize: 12, color: "#888" }}>
                      {new Date(msg.date).toLocaleString()}
                    </Card.Footer>
                  )}
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={async () => {
                      await fetch(
                        `https://backend-production-0f24.up.railway.app/api/messages/${idx}`,
                        {
                          method: "DELETE"
                        }
                      );
                      setMessages((prev) => prev.filter((_, i) => i !== idx));
                    }}
                    style={{ marginTop: 10 }}
                  >
                    Hapus
                  </Button>
                </Card.Body>
              </Card>
            ))}
          </div>
        </Row>
        <Particle />
      </Container>
    </div>
  );
}

export default Contact;
