import styles from '../styles/Login.module.css';
import Header from '../components/header';
import { useForm } from 'react-hook-form';
import { validationRules } from '../modules/validationRules';
import Link from 'next/link';


function Login() {

  const { register, handleSubmit, formState: { errors }, watch } = useForm();

  const onSubmit = data => {
    console.log(data);
  };

  return (
    <>
      <Header></Header>
      <div className={styles.container}>

        <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
          <h2>Connectez-vous à votre compte ConfoChic.</h2>
          <div className={styles.formGroup}>
            <label className={styles.label}>E-mail</label>
            <input className={styles.holder} placeholder='Votre e-mail' {...register("email", validationRules.email)} />
            {errors.email && <p className={styles.error}>{errors.email.message}</p>}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Mot de passe</label>
            <input className={styles.holder} placeholder='Mot de passe' type='password' {...register("motDePasse", validationRules.motDePasse)} />
            {errors.motDePasse && <p className={styles.error}>{errors.motDePasse.message}</p>}
          </div>
          <div className={styles.btn}>
            <button className={styles.btnValidation} type="submit">Valider mon Inscription</button>
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