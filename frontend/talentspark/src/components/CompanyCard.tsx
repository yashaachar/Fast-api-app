import type { Company } from "../types/company";
import { useState } from "react";

type Props = {
    companies: Company[];
    onedit: (company: Company) => void;
    onedelete: (id: number) => void;
    oneadd: (company: Company) => void;
};

function CompanyCard({ companies, onedit, onedelete, oneadd }: Props) {
    const [editingCompanyId, setEditingCompanyId] = useState<number | null>(null);
    const [editingCompany, setEditingCompany] = useState<Company | null>(null);
    const [showAddForm, setShowAddForm] = useState<Company>({
        id: 0,
        name: "",
        email: "",
        phone: "",
        location: "",
        jobs: [],

    })
    const [EditForm, setEditForm] = useState<Company >({
        id: 0,
        name: "",
        email: "",
        phone: "",
        location: "",
        jobs: [],
    });
    const handleAdd = () => {
        oneadd(showAddForm);
        setShowAddForm({
            id: 0,
            name: "",
            email: "",
            phone: "",
            location: "",
            jobs: [],
        });
    };
    const handleEdit = (company: Company) => {
        onedit(company);
        setEditForm({
            id: company.id,
            name: company.name,
            email: company.email,
            phone: company.phone,
            location: company.location,
            jobs: [],
        });
     
    };
    const handleDelete = (id: number) => {
        onedelete(id);
    };
    return (
        <div>
            {companies.map((company) => (
                <div key={company.id}>
                    {editingCompanyId === company.id ? (
                        <div>
                            <input type="text" value={EditForm.name} onChange={(e) => setEditForm({ ...EditForm, name: e.target.value })} />
                            <input type="text" value={EditForm.email} onChange={(e) => setEditForm({ ...EditForm, email: e.target.value })} />
                            <input type="text" value={EditForm.phone} onChange={(e) => setEditForm({ ...EditForm, phone: e.target.value })} />
                            <input type="text" value={EditForm.location} onChange={(e) => setEditForm({ ...EditForm, location: e.target.value })} />
                            <button onClick={() =>  setEditingCompanyId(null)}>Cancel</button>
                        </div>
                    ) : (
                        <>
                            <h1>{company.name}</h1>
                            <p>Email: {company.email}</p>
                            <p>Phone: {company.phone}</p>
                            <p>Location: {company.location}</p>
                        </>
                    )}
                    
                    <button onClick={() => setEditingCompanyId(company.id)}>Edit</button>
                    <button onClick={() => onedelete(company.id)}>Delete</button>
                    <hr />
                </div>
            ))}
        </div>
    );
}

export default CompanyCard;