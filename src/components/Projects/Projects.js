import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Alert,
  Modal
} from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    imgFile: null
  });
  const [success, setSuccess] = useState(false);
  const [showForm, setShowForm] = useState(false);

  // State untuk edit
  const [editIdx, setEditIdx] = useState(null);
  const [editForm, setEditForm] = useState({
    title: "",
    description: "",
    imgFile: null
  });
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/api/projects")
      .then((res) => res.json())
      .then((data) => setProjects(data));
  }, [success]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "imgFile") {
      setForm({ ...form, imgFile: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  // Untuk edit
  const handleEditChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "imgFile") {
      setEditForm({ ...editForm, imgFile: files[0] });
    } else {
      setEditForm({ ...editForm, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("title", form.title);
    data.append("description", form.description);
    if (form.imgFile) data.append("imgFile", form.imgFile);

    const res = await fetch("http://localhost:5000/api/projects", {
      method: "POST",
      body: data
    });
    if (res.ok) {
      setSuccess(true);
      setForm({ title: "", description: "", imgFile: null });
      setTimeout(() => setSuccess(false), 2000);
      setShowForm(false);
    }
  };

  // Hapus project
  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/api/projects/${id}`, {
      method: "DELETE"
    });
    setSuccess((s) => !s); // trigger reload
  };

  // Buka modal edit
  const openEditModal = (project, idx) => {
    setEditIdx(idx);
    setEditForm({
      title: project.title,
      description: project.description,
      imgFile: null
    });
    setShowEditModal(true);
  };

  // Submit edit
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const id = projects[editIdx].id;
    const data = new FormData();
    data.append("title", editForm.title);
    data.append("description", editForm.description);
    if (editForm.imgFile) data.append("imgFile", editForm.imgFile);

    await fetch(`http://localhost:5000/api/projects/${id}`, {
      method: "PUT",
      body: data
    });
    setShowEditModal(false);
    setSuccess((s) => !s); // trigger reload
  };

  return (
    <Container fluid className="project-section">
      <Container>
        <h1 className="project-heading">
          My Recent <strong className="purple">Works </strong>
        </h1>
        <p style={{ color: "white" }}>
          Here are a few projects I've worked on recently.
        </p>
        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          {projects.map((project, idx) => (
            <Col md={4} className="project-card" key={project.id || idx}>
              <ProjectCard
                imgPath={project.imgPath}
                title={project.title}
                description={project.description}
                onEdit={() => openEditModal(project, idx)}
                onDelete={() => handleDelete(project.id)}
              />
            </Col>
          ))}
        </Row>
        <div style={{ textAlign: "center", margin: "30px 0" }}>
          <Button
            variant={showForm ? "secondary" : "primary"}
            onClick={() => setShowForm((prev) => !prev)}
          >
            {showForm ? "Tutup Form" : "Tambah Project"}
          </Button>
        </div>
        {showForm && (
          <Form
            onSubmit={handleSubmit}
            style={{
              marginBottom: 30,
              background: "#222",
              padding: 20,
              borderRadius: 10,
              maxWidth: 500,
              marginLeft: "auto",
              marginRight: "auto"
            }}
            encType="multipart/form-data"
          >
            <h4 style={{ color: "#fff" }}>Tambah Project Baru</h4>
            {success && (
              <Alert variant="success">Project berhasil ditambahkan!</Alert>
            )}
            <Form.Group className="mb-2">
              <Form.Label style={{ color: "#fff" }}>Judul</Form.Label>
              <Form.Control
                placeholder="Judul"
                name="title"
                value={form.title}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label style={{ color: "#fff" }}>Deskripsi</Form.Label>
              <Form.Control
                placeholder="Deskripsi"
                name="description"
                value={form.description}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label style={{ color: "#fff" }}>Upload Gambar</Form.Label>
              <Form.Control
                type="file"
                name="imgFile"
                accept="image/*"
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Button type="submit" variant="primary">
              Simpan Project
            </Button>
          </Form>
        )}

        {/* Modal Edit Project */}
        <Modal
          show={showEditModal}
          onHide={() => setShowEditModal(false)}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Edit Project</Modal.Title>
          </Modal.Header>
          <Form onSubmit={handleEditSubmit} encType="multipart/form-data">
            <Modal.Body>
              <Form.Group className="mb-2">
                <Form.Label>Judul</Form.Label>
                <Form.Control
                  placeholder="Judul"
                  name="title"
                  value={editForm.title}
                  onChange={handleEditChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Deskripsi</Form.Label>
                <Form.Control
                  placeholder="Deskripsi"
                  name="description"
                  value={editForm.description}
                  onChange={handleEditChange}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Upload Gambar (opsional)</Form.Label>
                <Form.Control
                  type="file"
                  name="imgFile"
                  accept="image/*"
                  onChange={handleEditChange}
                />
              </Form.Group>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => setShowEditModal(false)}
              >
                Batal
              </Button>
              <Button type="submit" variant="primary">
                Simpan Perubahan
              </Button>
            </Modal.Footer>
          </Form>
        </Modal>
      </Container>
      <Particle />
    </Container>
  );
}

export default Projects;
