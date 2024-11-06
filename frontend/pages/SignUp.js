import styles from '../styles/Signup.module.css';
import Header from '../components/Header';
import { useForm } from 'react-hook-form';
import { validationRules } from '../modules/validationRules';
import Link from 'next/link';
import { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useRouter } from 'next/router'
import { useDispatch } from "react-redux";
import { login } from "../reducers/user";


function SignUp() {


  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const motDePasse = watch("motDePasse");
  const [password, setPassword] = useState('');
  const [type, setType] = useState('password');
  const [name, setName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [adresse, setAdresse] = useState('');
  const [codePostal, setCodePostal] = useState('');
  const [ville, setVille] = useState('');
  const [civilite, setCivilite] = useState('');
  const [errorLogin, setErrorLogin] = useState(true);

  const dispatch = useDispatch();
  const router = useRouter()

  const onSubmit = data => {
    console.log(data);
  };


  const handleToggle = () => {
    setType(type === 'password' ? 'text' : 'password');
  };

  const validationInscription = async () => {
    const fetchLogin = await fetch('https://decochicbackend.vercel.app/users/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, firstName, email, password, adresse, codePostal, ville, civilite }),
    })
    const res = await fetchLogin.json()
    if (res.result) {
      dispatch(login({ token: res.token, civilite: res.civilite, name: res.name, firstName: res.firstName, email: res.email }));
      router.push({ pathname: '/Accueil' })
      console.log('validation ok')
    } else {
      setErrorLogin(true)
    }
  };



  return (
    <>
      <Header></Header>
      <div className={styles.container}>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
          <h2>Bienvenue chez ConfoChic.</h2>
          <div className={styles.formGroup}>
            <label className={styles.label}>Civilité</label>
            <select className={styles.select}{...register("civilite", { required: "Civilité requise" })}
              onChange={(e) => setCivilite(e.target.value)} value={civilite}>
              <option value="">Sélectionner</option>
              <option value="Monsieur">Monsieur</option>
              <option value="Madame">Madame</option>
            </select>
            {errors.civilite && <p className={styles.error}>{errors.civilite.message}</p>}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Prenom</label>
            <input className={styles.holder} placeholder='Votre prenom'{...register("firstName", validationRules.firstName)}
              onChange={(e) => setFirstName(e.target.value)} value={firstName} />
            {errors.firstName && <p className={styles.error}>{errors.firstName.message}</p>}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Nom</label>
            <input className={styles.holder} placeholder='Votre nom' {...register("name", validationRules.name)}
              onChange={(e) => setName(e.target.value)} value={name} />
            {errors.lastName && <p className={styles.error}>{errors.lastName.message}</p>}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>E-mail</label>
            <input className={styles.holder} placeholder='Votre e-mail' {...register("email", validationRules.email)}
              autoComplete="votre e-mail"
              onChange={(e) => setEmail(e.target.value)} value={email} />
            {errors.email && <p className={styles.error}>{errors.email.message}</p>}
          </div>

          {/*  Mot de passe */}
          <div className={styles.formGroup}>
            <label className={styles.label}>Mot de passe</label>
            <input
              className={styles.holder} placeholder='Mot de passe'
              type={type} {...register("motDePasse", validationRules.motDePasse)}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="password" />
            {errors.motDePasse && <p className={styles.error}>{errors.motDePasse.message}</p>}
            <span onClick={handleToggle} className={styles.icon}>
              {type === 'password' ? (
                <FaRegEyeSlash size={25} />
              ) : (
                <FaRegEye size={25} />
              )}
            </span>
            <div className={styles.texte}>
              <p> Assure-toi que ton mot de passe contient : </p>
              <ul>
                <li>Minimum de 8 caractères</li>
                <li>Une lettre en <strong>MAJUSCULES</strong></li>
                <li>Une lettre minuscule</li>
                <li>Au moins un chiffre ou un caractère spécial</li>
                <li>Pas plus de deux caractères répétés à la suite</li>
              </ul>
            </div>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Confirmation mot de passe</label>
            <input className={styles.holder} placeholder='Confirmation du mot de passe' type='password' {...register("confirmationMotDePasse", validationRules.confirmationMotDePasse)} />
            {errors.confirmationMotDePasse && <p className={styles.error}>{errors.confirmationMotDePasse.message}</p>}
          </div>


          <div className={styles.formGroup}>
            <label className={styles.label}>Votre adresse</label>
            <input className={styles.holder} placeholder='Votre adresse postal' {...register("adresse", validationRules.adresse)}
              onChange={(e) => setAdresse(e.target.value)} value={adresse} />
            {errors.adresse && <p className={styles.error}>{errors.adresse.message}</p>}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Code postal</label>
            <input className={styles.holder} placeholder='Code postal' {...register("codePostal", validationRules.codePostal)}
              onChange={(e) => setCodePostal(e.target.value)} value={codePostal} />
            {errors.codePostal && <p className={styles.error}>{errors.codePostal.message}</p>}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Ville</label>
            <input className={styles.holder} placeholder='Ville' {...register("ville", validationRules.ville)}
              onChange={(e) => setVille(e.target.value)} value={ville} />
            {errors.ville && <p className="error">{errors.ville.message}</p>}
          </div>
          <div className={styles.btn}>
            <button className={styles.btnValidation} type="submit" onClick={() => validationInscription()}>Valider mon Inscription</button>
            <Link href='/Accueil'>
              <button className={styles.btnRetour}>Retour</button>
            </Link>
          </div>
        </form >

      </div >

    </>

  );

}

export default SignUp;