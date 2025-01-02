
"use client"
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import NoteModal from "@/components/NoteModal";
import HeaderSkeleton from "./HeaderSkeleton";


const Header = () => {
  const { data: session,status } = useSession();
 const [showModal, setShowModal] = useState(false);

 if (status === "loading") {
   return (
    <HeaderSkeleton/>
   );
 }
  
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <a className="navbar-brand fw-bold fs-4 text-primary" href="#">
            Notes
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

        
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto align-items-center">
              {session ? (
                <>
                  <li className="nav-item me-2 mt-2">
                    <button
                      className="btn btn-primary"
                      onClick={() => setShowModal(true)}
                    >
                      Post Note
                    </button>
                  </li>
                  <li className="nav-item me-2 mt-2">
                    <button
                      className="btn btn-danger"
                      onClick={() => signOut()}
                    >
                      Logout
                    </button>
                  </li>
                  <li className="nav-item d-none d-lg-block mt-2">
                    {/* Hide Image on Small Screens */}
                    <div
                      className="rounded-circle overflow-hidden"
                      style={{ width: "40px", height: "40px" }}
                    >
                      <Image
                        src={session.user.image}
                        alt="User Avatar"
                        width={40}
                        height={40}
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                  </li>
                </>
              ) : (
                <li className="nav-item">
                  <button
                    className="btn btn-success"
                    onClick={() => signIn("google")}
                  >
                    Login
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
        <NoteModal showModal={showModal} setShowModal={setShowModal} />
      </nav>
    </>
  );
}

export default Header