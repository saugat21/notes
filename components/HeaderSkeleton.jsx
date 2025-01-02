import React from 'react'

const HeaderSkeleton = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <a className="navbar-brand fw-bold fs-4 text-primary" href="#">
          Notes
        </a>
        <div className="d-flex align-items-center ms-auto">
          <div className="skeleton skeleton-button me-2"></div>
          <div className="skeleton skeleton-button me-2"></div>
          <div className="skeleton skeleton-avatar"></div>
        </div>
      </div>
    </nav>
  );
}

export default HeaderSkeleton