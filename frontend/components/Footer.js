import styles from '../styles/Footer.module.css';
import { useState } from 'react';

import AvisModal from './AvisModal';





//Composant  présent dans plusieurs des pages du site
function Footer() {

  const [isModalOpen, setIsModalOpen] = useState(false);


  const openProjectModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleContactClick = (e) => {
    e.preventDefault(); // empêche le comportement par défaut si nécessaire
    window.open('mailto:confochic@email.com?subject=Demande de contact&body=Bonjour,', '_self');
  };
  const clickInsta = () => {
    window.open('https://www.instagram.com/julien_mlln', '_blank');
  };
  const clickLinkedIn = () => {
    window.open('http://linkedin.com/in/julien-morillon', '_blank');
  }

  return (

    <footer className={styles.container}>

      <div className={styles.icone}>
        <div className={styles.contact}>
          <button className={styles.btnContact} onClick={handleContactClick}>Contactez-nous</button>
          <button className={styles.btnAvis} onClick={() => openProjectModal()}>Votre avis nous interesse</button>
          <AvisModal isOpen={isModalOpen}
            onRequestClose={closeModal}
          />
        </div>
        <div className={styles.logo}>
          <h3>Nos reseaux</h3>
          <img src="instagram.jpg" alt="logo instagram" className={styles.logoInstagram} onClick={clickInsta} />
          <img src="linkedIn.png" alt="logo lin" className={styles.logoLinkedIn} onClick={clickLinkedIn} />
        </div>

      </div>






    </footer >
  );
}

export default Footer;