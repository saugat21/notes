import React from 'react'
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const CardSkeleton = () => {
  return (
    <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
      <div className="card">
        <Skeleton height={200} width="100%" />
        <div className="card-body">
          <Skeleton height={60} width="80%" />
          <Skeleton height={60} width="100%" />
          <div className="d-flex justify-content-between align-items-center">
            <Skeleton height={30} width={100} />
            <Skeleton circle height={30} width={30} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CardSkeleton