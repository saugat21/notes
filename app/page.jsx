import Card from "@/components/Card";
import Search from "@/components/Search";


const page = () => {
  return (
    <div className="container">
      <h1 className="text-center fw-bolder fs-1 mt-3">
        Share Knowledge, Shape Futures – Together We Learn Better!
      </h1>
      <Search />
       <h1 className="fw-bolder fs-3 mt-3">All Notes</h1>
       <Card/>
    </div>
  );
};

export default page;
