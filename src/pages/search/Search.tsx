import React from "react";
import { Input } from "antd";
const Search = () => {
  return (
    <>
      <div className="container mx-auto h-[500px]">
        <div className=" py-20px">
          <Input.Search className="mt-[20px]" placeholder="Filled" variant="filled" />
        </div>
      </div>
    </>
  );
};

export default React.memo(Search);
