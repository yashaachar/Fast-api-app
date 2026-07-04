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
            {companies.map((company) => (
                <div key={company.id}>
                    {editingCompanyId === company.id ? (
                        <div>
                            <input
                                type="text"
                                value={editForm.name}
                                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                            />
                            <input
                                type="text"
                                value={editForm.email}
                                onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                            />
                            <input
                                type="text"
                                value={editForm.phone}
                                onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                            />
                            <input
                                type="text"
                                value={editForm.location}
                                onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                            />
                            <button onClick={handleSave}>Save</button>
                            <button onClick={handleCancel}>Cancel</button>
                        </div>
                    ) : (
                        <>
                            <h1>{company.name}</h1>
                            <p>Email: {company.email}</p>
                            <p>Phone: {company.phone}</p>
                            <p>Location: {company.location}</p>
                            <button onClick={() => handleStartEdit(company)}>Edit</button>
                            <button onClick={() => handleDelete(company.id)}>Delete</button>
                        </>
                    )}
                    <hr />
                </div>
            ))}

            <h2>Add Company</h2>
            <input
                type="text"
                value={addForm.name}
                onChange={(e) => setAddForm({ ...addForm, name: e.target.value })}
            />
            <input
                type="text"
                value={addForm.email}
                onChange={(e) => setAddForm({ ...addForm, email: e.target.value })}
            />
            <input
                type="text"
                value={addForm.phone}
                onChange={(e) => setAddForm({ ...addForm, phone: e.target.value })}
            />
            <input
                type="text"
                value={addForm.location}
                onChange={(e) => setAddForm({ ...addForm, location: e.target.value })}
            />
            <button onClick={handleAdd}>Add</button>
        </div>
    );
}

export default CompanyCard;
