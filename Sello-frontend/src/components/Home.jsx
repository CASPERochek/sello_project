// import { Link } from "react-router-dom"
// import { useAuth } from "../context/AuthContext"
// import MainImage from "../assets/images/main.jpg"
// import Header from "./Header";
// import Sidebar from "./Sidebar";

// const Home = () => {
//   const { isAuthenticated } = useAuth()

//   return (
//     <div className={`home-container ${isAuthenticated ? 'authenticated' : ''}`}>
//       <Header />
      
//       {isAuthenticated && <Sidebar />}
      
//       <div className="main-content">
//         <div className="container">
//           <div className="row justify-content-center">
//             <div className="col-12 text-center" style={{ paddingTop: isAuthenticated ? '40px' : '80px' }}>
              
//               <h1 className="home-title">
//                 СОЗДАЙТЕ СВОЙ ИДЕАЛЬНЫЙ<br />ИНТЕРНЕТ-МАГАЗИН ЛЕГКО И БЫСТРО
//               </h1>

//               <p className="home-subtitle mb-4">
//                 Весь ваш бизнес на одной платформе. Управляйте заказами,<br /> продавайте и доставляйте товары.<br /> Попробуйте прямо сейчас!
//               </p>

//               <div>
//                 {isAuthenticated ? (
//                   <Link
//                     to="/brands"
//                     className="btn btn-success fw-semibold d-inline-flex align-items-center justify-content-center"
//                     style={{ 
//                       width: '250px', 
//                       height: '45px',
//                       fontSize: '18px'
//                     }}
//                   >
//                     ПЕРЕЙТИ В КАБИНЕТ
//                   </Link>
//                 ) : (
//                   <Link
//                     to="/register"
//                     className="btn btn-primary fw-semibold d-inline-flex align-items-center justify-content-center"
//                     style={{ 
//                       width: '250px', 
//                       height: '45px',
//                       fontSize: '18px'
//                     }}
//                   >
//                     НАЧАТЬ
//                   </Link>
//                 )}
//               </div>

//               <div className="mt-5">
//                 <img
//                   src={MainImage}
//                   alt="Интернет-магазин"
//                   className="img-fluid rounded shadow"
//                   style={{ maxWidth: '80%', height: 'auto' }}
//                 />
//               </div>

//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Home


import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import MainImage from "../assets/images/main.jpg"
import Header from "./Header";
import Sidebar from "./Sidebar";

const Home = () => {
  const { isAuthenticated } = useAuth()

  return (
    <div className={`home-container ${isAuthenticated ? 'authenticated' : ''}`}>
      <Header />
      
      {isAuthenticated && <Sidebar />}
      
      <div className="main-content">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 text-center" style={{ paddingTop: isAuthenticated ? '40px' : '80px' }}>
              
              <h1 className="home-title">
                СОЗДАЙТЕ СВОЙ ИДЕАЛЬНЫЙ<br />ИНТЕРНЕТ-МАГАЗИН ЛЕГКО И БЫСТРО
              </h1>

              <p className="home-subtitle mb-4">
                Весь ваш бизнес на одной платформе. Управляйте заказами,<br /> продавайте и доставляйте товары.<br /> Попробуйте прямо сейчас!
              </p>

              <div>
                {isAuthenticated ? (
                  <div className="d-flex justify-content-center" style={{ gap: '100px' }}>
                    <Link
                      to="/creator"
                      className="btn fw-semibold d-inline-flex align-items-center justify-content-center"
                      style={{ 
                        width: '250px', 
                        height: '45px',
                        fontSize: '18px',
                        backgroundColor: '#FFA000',
                        border: 'none',
                        color: 'white'
                      }}
                    >
                      СОЗДАТЕЛЬ
                    </Link>
                    <Link
                      to="/user"
                      className="btn fw-semibold d-inline-flex align-items-center justify-content-center"
                      style={{ 
                        width: '250px', 
                        height: '45px',
                        fontSize: '18px',
                        backgroundColor: '#FFCA28',
                        border: 'none',
                        color: 'white'
                      }}
                    >
                      ПОКУПАТЕЛЬ
                    </Link>
                  </div>
                ) : (
                  <Link
                    to="/register"
                    className="btn btn-primary fw-semibold d-inline-flex align-items-center justify-content-center"
                    style={{ 
                      width: '250px', 
                      height: '45px',
                      fontSize: '18px'
                    }}
                  >
                    НАЧАТЬ
                  </Link>
                )}
              </div>

              <div className="mt-5">
                <img
                  src={MainImage}
                  alt="Интернет-магазин"
                  className="img-fluid rounded shadow"
                  style={{ maxWidth: '80%', height: 'auto' }}
                />
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home;