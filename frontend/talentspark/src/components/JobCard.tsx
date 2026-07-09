import { useState } from "react";
import type { Job } from "../types/job";

type Props = {
    jobs: Job[];
    onedit: (job: Job) => void;
    onedelete: (id: number) => void;
    oneadd: (job: Omit<Job, "id">) => void;
};

const emptyJob: Omit<Job, "id"> = {
    title: "",
    description: "",
    salary: 0,
    company_id: 0,
};

function JobCard({ jobs, onedit, onedelete, oneadd }: Props) {
    const [editingJobId, setEditingJobId] = useState<number | null>(null);
    const [addForm, setAddForm] = useState<Omit<Job, "id">>(emptyJob);
    const [editForm, setEditForm] = useState<Job>({ id: 0, ...emptyJob });

    const handleAdd = () => {
        oneadd(addForm);
        setAddForm(emptyJob);
    };

    const handleStartEdit = (job: Job) => {
        setEditingJobId(job.id);
        setEditForm({ ...job });
    };

    const handleSave = () => {
        onedit(editForm);
        setEditingJobId(null);
    };

    const handleCancel = () => {
        setEditingJobId(null);
    };

    return (
        <div>
            <h2 className="page-title" style={{ fontSize: "1.3rem", marginTop: "1.5rem" }}>
                Open Roles
            </h2>

            {jobs.map((job) => (
                <div key={job.id} className="card accent-coral">
                    {editingJobId === job.id ? (
                        <div className="form-grid">
                            <input
                                className="input"
                                type="text"
                                value={editForm.title}
                                onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                                placeholder="Title"
                            />
                            <input
                                className="input"
                                type="number"
                                value={editForm.salary}
                                onChange={(e) => setEditForm({ ...editForm, salary: Number(e.target.value) })}
                                placeholder="Salary"
                            />
                            <input
                                className="input"
                                type="number"
                                value={editForm.company_id}
                                onChange={(e) => setEditForm({ ...editForm, company_id: Number(e.target.value) })}
                                placeholder="Company ID"
                            />
                            <textarea
                                className="input"
                                value={editForm.description}
                                onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                                placeholder="Description"
                                rows={3}
                                style={{ gridColumn: "1 / -1" }}
                            />
                            <div className="card-actions">
                                <button className="btn btn-primary" onClick={handleSave}>Save</button>
                                <button className="btn btn-ghost" onClick={handleCancel}>Cancel</button>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className="card-title">{job.title}</div>
                            <p className="card-meta">Company ID: {job.company_id}</p>
                            <p className="card-meta">{job.description}</p>
                            <span className="tag">₹{job.salary.toLocaleString()}</span>
                            <div className="card-actions">
                                <button className="btn btn-ghost" onClick={() => handleStartEdit(job)}>Edit</button>
                                <button className="btn btn-danger" onClick={() => onedelete(job.id)}>Delete</button>
                            </div>
                        </>
                    )}
                </div>
            ))}

            <div className="card accent-mint">
                <div className="card-title">Add Job</div>
                <div className="form-grid" style={{ marginTop: "0.75rem" }}>
                    <input
                        className="input"
                        type="text"
                        value={addForm.title}
                        onChange={(e) => setAddForm({ ...addForm, title: e.target.value })}
                        placeholder="Title"
                    />
                    <input
                        className="input"
                        type="number"
                        value={addForm.salary || ""}
                        onChange={(e) => setAddForm({ ...addForm, salary: Number(e.target.value) })}
                        placeholder="Salary"
                    />
                    <input
                        className="input"
                        type="number"
                        value={addForm.company_id || ""}
                        onChange={(e) => setAddForm({ ...addForm, company_id: Number(e.target.value) })}
                        placeholder="Company ID"
                    />
                    <textarea
                        className="input"
                        value={addForm.description}
                        onChange={(e) => setAddForm({ ...addForm, description: e.target.value })}
                        placeholder="Description"
                        rows={2}
                        style={{ gridColumn: "1 / -1" }}
                    />
                </div>
                <button className="btn btn-secondary" onClick={handleAdd}>Add</button>
            </div>
        </div>
    );
}

export default JobCard;