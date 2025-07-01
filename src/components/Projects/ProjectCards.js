import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

function ProjectCards({ imgPath, title, description, onEdit, onDelete }) {
  return (
    <Card
      className="mb-4 project-card-custom"
      style={{
        borderRadius: "16px",
        overflow: "hidden",
        boxShadow: "0 4px 24px rgba(0,0,0,0.18)",
        background: "#181818",
        color: "#fff",
        border: "none",
        transition: "transform 0.2s, box-shadow 0.2s"
      }}
    >
      <Card.Img
        variant="top"
        src={`http://localhost:5000${imgPath}`}
        alt={title}
        style={{
          height: "200px",
          objectFit: "cover",
          borderTopLeftRadius: "16px",
          borderTopRightRadius: "16px"
        }}
      />
      <Card.Body>
        <Card.Title style={{ fontWeight: "bold", fontSize: "1.2rem" }}>
          {title}
        </Card.Title>
        <Card.Text style={{ color: "#ccc" }}>{description}</Card.Text>
        <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
          <Button size="sm" variant="warning" onClick={onEdit}>
            Edit
          </Button>
          <Button size="sm" variant="danger" onClick={onDelete}>
            Hapus
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default ProjectCards;
