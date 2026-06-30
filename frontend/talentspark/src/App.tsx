import Welcome from "./components/welcome";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import CompanyCard from "./components/CompanyCard";
import JobCard from "./components/JobCard";
import { useeffect, useState } from "react";
import { getCompanies } from "./Services/CompanyServices";
import type { Company } from "./types/company";



function App(){
  const [loading, setLoading] = useState(true);
  const [companies, setCompanies] = useState<Company[]>([]);

  async function fetchCompanies() {
    setLoading(true);
    try {
      const companies = await getCompanies();
      setCompanies(companies);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCompanies();
  }, []);  

  if (loading) {
    return <div></div>
  }
  if(error){
    return <div>Error: {error.message}</div>
  }
  return (
    <>
      <NavBar />
      <Welcome />
      <br/>
      <CompanyCard key={company.id} companies={companies} />
      <JobCard />
      <Footer />

    </>
  )
}
export default App