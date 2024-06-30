import { useEffect, useState } from "react";

import { getPorudzbine } from "../../../services/porudzbina";
import LoadingComponent from "../../../components/loading";
import PaginationComponent from "../../../components/pagination";

const PorudzbinePage = () => {
  const [pagination, setPagination] = useState({
    perPage: 10,
    page: 1,
  });
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    getPorudzbine(pagination).then((r) => {
      setLoading(false);
      setData(r);
    });
  }, [pagination]);

  const handlePaginate = (page) => {
    setPagination({
      ...pagination,
      page,
    });
  };

  return loading ? (
    <LoadingComponent />
  ) : (
    <>
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Korisnik ID</th>
              <th>Datum i vreme</th>
            </tr>
          </thead>
          <tbody>
            {data?.data?.map((d, idx) => (
              <tr key={`sastojak-proizvoda__${idx + 1}`}>
                <th>{d?.id}</th>
                <td>{d?.kid}</td>
                <td>{d?.datumVremePorudzbine}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <PaginationComponent
        totalPages={data?.metada?.totalPages}
        pagination={pagination}
        handlePaginate={handlePaginate}
      />
    </>
  );
};

export default PorudzbinePage;
