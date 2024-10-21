// import styles from '../styles/Profil.module.css';
// import Head from 'next/head';
// import Header from "../components/Header";
// import Product from "../components/Product";
// import Footer from "../components/Footer";
// import { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { logout } from '../reducers/user';
// import { useRouter } from 'next/router';
// import { setLikedList } from '../reducers/user';

// function Profil() {

//   const [selectedTab, setSelectedTab] = useState(1);
//   const [mesLikes, setMesLikes] = useState(true);
//   const [mesAchats, setMesAchats] = useState(false);
//   const [myPrompts, setMyPrompts] = useState([]);
//   const [communityList, setCommunityList] = useState([]);
//   const [reRender, setReRender] = useState(false);

//   const dispatch = useDispatch();
//   const user = useSelector((state) => state.user.value)
//   const router = useRouter()

//   !user.token && router.push({ pathname: '/' });

//   const handleLogout = () => {
//     dispatch(logout());
//     router.push({ pathname: '/' })
//   }
//   // Recuperation et mise a jour des prompts likés
//   const getAllLikedPosts = () => {
//     const { email, token } = user;
//     fetch('http://localhost:3000/users/like', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ email, token })
//     })
//       .then(response => response.json())
//       .then(data => {
//         if (!data) {
//           Error('Erreur lors de la récupération des prompts');
//         } else {
//           dispatch(setLikedList(data.liked))
//         }
//       });
//   }
//   useEffect(() => {
//     getAllLikedPosts();
//   }, [selectedTab, reRender])

//   // Fonction pour afficher ma bibliotheque
//   const clickMesLikes = () => {
//     if (user.token) {
//       fetch('http://localhost:3000/users/projets', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email: user.email, token: user.token })
//       })
//         .then(response => response.json())
//         .then(data => {
//           if (!data) {
//             Error('Erreur lors de la récupération des prompts');
//           } else {
//             setCommunityList(data.liked)
//           }
//         });
//     } else {
//       router.push({ pathname: '/' })
//     }
//   }
//   useEffect(() => {
//     clickMesLikes();
//   }, [])


//   const refresh = () => {
//     setReRender(!reRender);
//   }









//   return (
//     <>
//       <Head>
//         <title>ConfoChic</title>
//       </Head>
//       <Header></Header>
//       <div className={styles.container}>


//         <div className={styles.selectModelContainer}>
//           <div className={styles.tabBar}>
//             <div className={selectedTab === 1 ? styles.selectedTab : styles.tab} onClick={() => { setSelectedTab(1); setMesLikes(true); setMesAchats(false) }}>
//               Produits Favoris
//             </div>
//             <div className={selectedTab === 2 ? styles.selectedTab : styles.tab} onClick={() => { setSelectedTab(2); setMesAchats(true); setMesLikes(false) }} >
//               Mes achats
//             </div>
//           </div>
//           <div className={styles.display}>

//           </div>
//         </div>
//         <div className={styles.footer}>
//           <div className={styles.btn} onClick={() => router.push('/Accueil')}>
//             Retour
//           </div>
//         </div>
//       </div >

//       < Footer ></Footer >
//     </>
//   );
// }

// export default Profil;

