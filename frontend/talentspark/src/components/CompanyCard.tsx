import type { Company } from "../types/company";
import { useState } from "react";

type Props = {
  companies: Company[];
  onedit: (company: Company) => void;
  onedelete: (id: number) => void;
  oneadd: (company: Company) => void;
};

const emptyCompany: Company = {
  id: 0,
  name: "",
  email: "",
  phone: "",
  location: "",
  jobs: [],
};

function CompanyCard({ companies, onedit, onedelete, oneadd }: Props) {
  const [editingCompanyId, setEditingCompanyId] = useState<number | null>(null);
  const [addForm, setAddForm] = useState<Company>(emptyCompany);
  const [editForm, setEditForm] = useState<Company>(emptyCompany);

  const handleAdd = () => {
    oneadd(addForm);
    setAddForm(emptyCompany);
  };

  const handleStartEdit = (company: Company) => {
    setEditingCompanyId(company.id);
    setEditForm({ ...company });
  };

  const handleDelete = (id: number) => {
    onedelete(id);
  };

  const handleSave = () => {
    onedit(editForm);
    setEditingCompanyId(null);
    setEditForm(emptyCompany);
  };

  const handleCancel = () => {
    setEditingCompanyId(null);
    setEditForm(emptyCompany);
  };

  return (
    <div>
      <h2 className="page-title" style={{ fontSize: "1.3rem", marginTop: "1.5rem" }}>
        Companies
      </h2>

      {companies.map((company) => (
        <div key={company.id} className="card">
          {editingCompanyId === company.id ? (
            <div className="form-grid">
              <input
                className="input"
                type="text"
                value={editForm.name}
                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                placeholder="Name"
              />
              <input
                className="input"
                type="text"
                value={editForm.email}
                onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                placeholder="Email"
              />
              <input
                className="input"
                type="text"
                value={editForm.phone}
                onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                placeholder="Phone"
              />
              <input
                className="input"
                type="text"
                value={editForm.location}
                onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                placeholder="Location"
              />
              <div className="card-actions">
                <button className="btn btn-primary" onClick={handleSave}>Save</button>
                <button className="btn btn-ghost" onClick={handleCancel}>Cancel</button>
              </div>
            </div>
          ) : (
            <>
              <div className="card-title">{company.name}</div>
              <p className="card-meta">Email: {company.email}</p>
              <p className="card-meta">Phone: {company.phone}</p>
              <p className="card-meta">Location: {company.location || "—"}</p>
              <div className="card-actions">
                <button className="btn btn-ghost" onClick={() => handleStartEdit(company)}>Edit</button>
                <button className="btn btn-danger" onClick={() => handleDelete(company.id)}>Delete</button>
              </div>
            </>
          )}
        </div>
      ))}

      <div className="card accent-mint">
        <div className="card-title">Add Company</div>
        <div className="form-grid" style={{ marginTop: "0.75rem" }}>
          <input
            className="input"
            type="text"
            value={addForm.name}
            onChange={(e) => setAddForm({ ...addForm, name: e.target.value })}
            placeholder="Name"
          />
          <input
            className="input"
            type="text"
            value={addForm.email}
            onChange={(e) => setAddForm({ ...addForm, email: e.target.value })}
            placeholder="Email"
          />
          <input
            className="input"
            type="text"
            value={addForm.phone}
            onChange={(e) => setAddForm({ ...addForm, phone: e.target.value })}
            placeholder="Phone"
          />
          <input
            className="input"
            type="text"
            value={addForm.location}
            onChange={(e) => setAddForm({ ...addForm, location: e.target.value })}
            placeholder="Location"
          />
        </div>
        <button className="btn btn-secondary" onClick={handleAdd}>Add</button>
      </div>
    </div>
  );
}

export default CompanyCard;