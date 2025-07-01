import React from "react";
import Card from "react-bootstrap/Card";
import { ImPointRight } from "react-icons/im";

function AboutCard() {
  return (
    <Card className="quote-card-view">
      <Card.Body>
        <blockquote className="blockquote mb-0">
          <p style={{ textAlign: "justify" }}>
            Hi Everyone, I am{" "}
            <span className="purple">Prizka Dias Febrilian</span>
            <span> from </span> <span className="purple"> Indonesia.</span>
            <br />
            Saya saat ini adalah mahasiswa STMIK Widya Utama.
            <br />
            <br />
            Selain coding, beberapa aktivitas lain yang saya sukai:
          </p>
          <ul>
            <li className="about-activity">
              <ImPointRight /> Main Games
            </li>
            <li className="about-activity">
              <ImPointRight /> Menulis
            </li>
            <li className="about-activity">
              <ImPointRight /> Travelling
            </li>
          </ul>

          <p style={{ color: "rgb(155 126 172)" }}>
            "Strive to build things that make a difference!"{" "}
          </p>
          <footer className="blockquote-footer">Prizka Dias Febrilian</footer>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default AboutCard;
