
import "@/styles/global.css"
import "bootstrap/dist/css/bootstrap.min.css"; 
import Header from "@/components/Header.jsx"
import Provider from "@/components/Provider";


export const metadata={
    "title":"Note For Students",
    "description":"Notes available for all Student over the Nepal"
}


const layout = ({children}) => {
  return (
    <html lang="en">
      <head>
        
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css"
        />
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"
          defer
        ></script>
      </head>
      <body>
        <Provider>
          <main>
            <Header />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
}

export default layout