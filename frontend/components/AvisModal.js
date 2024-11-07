import styles from '../styles/Avis.module.css';
import React from "react";
import Modal from 'react-modal';
import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


//Composant signalement / enregistrement du texte / informations id
function AvisModal(props) {


  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");


  const onClose = () => {
    props.onRequestClose();
  }
  //Envoi info pour l'envoi du mail par le back
  const handleSubmit = async () => {
    // Simulation d'envoi
    const formData = {
      firstName,
      lastName,
      email,
      message,
    };

    try {
      const response = await fetch('https://decochicbackend.vercel.app/contact/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Email envoyé avec succès");
        toast.info("Message envoyé.", {
          position: "top-center",
          autoClose: 2000,
        })
        onClose();
        setFirstName("");
        setLastName("");
        setEmail("");
        setMessage("");
      } else {
        console.error("Échec de l'envoi de l'email");
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi de l'email:", error);
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
