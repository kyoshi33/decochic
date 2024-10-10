import styles from '../styles/Login.module.css';
import Header from '../components/Header';
import { useForm } from 'react-hook-form';
import { validationRules } from '../modules/validationRules';
import { useState } from 'react';
import Link from 'next/link';
import { useDispatch } from "react-redux";
import { login } from "../reducers/user";
import { useRouter } from 'next/router'


function Login() {

  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const router = useRouter()




  const onSubmit = data => {
    console.log(data);
  };





  const ConnexionProfil = async () => {
    const fetchConnexion = await fetch('http://localhost:3000/users/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
    const res = await fetchConnexion.json()
    if (res.result) {
      dispatch(login({ token: res.token, name: res.name, firstName: res.firstName, email: res.email }));
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
          <h2>Connectez-vous à votre compte ConfoChic.</h2>
          <div className={styles.formGroup}>
            <label className={styles.label}>E-mail</label>
            <input className={styles.holder} placeholder='Votre e-mail' {...register("email", validationRules.email)}
              onChange={(e) => setEmail(e.target.value)} value={email} />
            {errors.email && <p className={styles.error}>{errors.email.message}</p>}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Mot de passe</label>
            <input className={styles.holder} placeholder='Mot de passe' type='password' {...register("motDePasse", validationRules.motDePasse)}
              onChange={(e) => setPassword(e.target.value)} value={password} />
            {errors.motDePasse && <p className={styles.error}>{errors.motDePasse.message}</p>}
          </div>
          <div className={styles.btn}>
            <button className={styles.btnValidation} type="submit" onClick={() => ConnexionProfil()}>Connexion</button>
            <Link href='/Accueil'>
              <button className={styles.btnRetour}>Retour</button>
            </Link>
          </div>
        </form>

      </div>
    </>
  )

}

export default Login;