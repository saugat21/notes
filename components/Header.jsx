
"use client"
import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import NoteModal from "@/components/NoteModal";
import HeaderSkeleton from "./HeaderSkeleton";
import Logo from "@/public/ll.png"
import { FaMoon, FaSun } from "react-icons/fa";


const Header = () => {
  const { data: session, status } = useSession();
  const [showModal, setShowModal] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      setDarkMode(true);
      document.body.classList.add("dark-mode");
    }
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
    if (!darkMode) {
      document.body.classList.add("dark-mode");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark-mode");
      localStorage.setItem("theme", "light");
    }
  };

  if (status === "loading") {
    return <HeaderSkeleton />;
  }

  return (
    <>
      <nav
        className={`navbar navbar-expand-lg ${
          darkMode ? "custom-dark-bg" : "navbar-light bg-light"
        }`}
      >
        <div className="container">
          <Image
            src={Logo}
            height={80}
            width={0}
            alt="this is an logo"
            priority
          />
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span
              className={`navbar-toggler-icon ${
                darkMode ? "border-white" : ""
              } `}
            ></span>
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
                  <li className="nav-item me-2 mt-2">
                    {/* Toggle Dark Mode */}
                    <button
                      className="btn btn-secondary"
                      onClick={toggleDarkMode}
                      aria-label="Toggle dark mode"
                    >
                      {darkMode ? <FaSun /> : <FaMoon />}
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