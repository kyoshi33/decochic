import styles from '../styles/Avis.module.css';
import React from "react";
import Modal from 'react-modal';
import { useState } from 'react';



//Composant signalement / enregistrement du texte / informations id
function AvisModal(props) {

  const [modalOpen, setModalOpen] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");


  const onClose = () => {
    props.onRequestClose();
  }
  //Changer la fonction avec le back
  const handleSubmit = async () => {
    // Simulation d'envoi
    const formData = {
      firstName,
      lastName,
      email,
      message,
    };

    try {
      // Ici, on simule l'envoi de l'email
      console.log("Sending form data:", formData);
      // Une fois que l'email est envoyé, fermer la modal
      onClose();
      // Réinitialiser les champs du formulaire après envoi
      setFirstName("");
      setLastName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      console.error("Failed to send email:", error);
    }
  };



  return (

    <Modal
      isOpen={props.isOpen}
      className={styles.modalContainer}
      onRequestClose={props.onRequestClose}
      contentLabel="Example Modal">
      <div className={styles.content}>
        <div className={styles.modalTitleContent}>
          <h1 className={styles.modalTitle}>Contactez Nous</h1>
        </div>
        <div>
          <p className={styles.text}>C'est ensemble que nous allons nous ameliorer, merci d'avance pour votre retour! </p>
        </div>
        <div className={styles.promptContainer} >
          <form className={styles.formContainer}>
            <input
              type="text"
              placeholder="Votre Prénom"
              className={styles.input}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Votre Nom"
              className={styles.input}
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Votre adresse mail"
              className={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <textarea
              placeholder="Laissez-nous votre message ici..."
              className={styles.textArea}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </form>
        </div>

        <div className={styles.modalBtnContainer}>
          <button className={styles.btn} onClick={onClose}>Annuler</button>
          <button className={styles.btn} onClick={handleSubmit}>Envoyez</button>


        </div>
      </div>
    </Modal >


  )
}



export default AvisModal;
