
import styles from "../styles/Histoire.module.css"
import Head from 'next/head';
import Header from "../components/Header";
import Footer from "../components/Footer";
import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { EffectCoverflow, Pagination, Autoplay } from 'swiper/modules';

function Histoire() {



  return (
    <>
      <Head>
        <title>ConfoChic</title>
      </Head>
      <Header></Header>

      <div className={styles.textContainer}>


        <h3 className={styles.titre}> L'Histoire de <strong>ConfoChic</strong> : 60 Ans d'Excellence </h3>


        <p className={styles.texte}>
          Depuis 1964, ConfoChic est synonyme de qualité et de savoir-faire dans l'univers du mobilier. Fondée il y a plus de 60 ans, l'entreprise a vu le jour dans une petite usine, où des meubles étaient fabriqués à la main, pièce par pièce, avec une attention minutieuse aux détails.
          Ce soin du détail et cette quête de perfection sont devenus les valeurs fondamentales qui continuent de guider ConfoChic aujourd'hui.
          Un Savoir-Faire Hérité
        </p>

        <div>
          <Swiper
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={'auto'}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 1000,
              modifier: 1,
              slideShadows: false,
            }}
            pagination={true}
            modules={[EffectCoverflow, Pagination, Autoplay]}
            className={styles.swiper}
          >
            <SwiperSlide className={styles.swiperSlide}>
              <img src="/montageCanape.jpg" alt="Logo du site" className={styles.image} />
            </SwiperSlide>
            <SwiperSlide className={styles.swiperSlide}>
              <img src="/test.jpg" alt="Image du magasin" className={styles.image} />
            </SwiperSlide>
            <SwiperSlide className={styles.swiperSlide}>
              <img src="/fabrication1.jpg" alt="Image du magasin" className={styles.image} />
            </SwiperSlide>
            <SwiperSlide className={styles.swiperSlide}>
              <img src="/culture.jpg" alt="Image du magasin" className={styles.image} />
            </SwiperSlide>
            <SwiperSlide className={styles.swiperSlide}>
              <img src="/magasin.jpg" alt="Image du magasin" className={styles.image} />
            </SwiperSlide>
            <SwiperSlide className={styles.swiperSlide}>
              <img src="/expo.jpg" alt="Logo du site" className={styles.image} />
            </SwiperSlide>
            <SwiperSlide className={styles.swiperSlide}>
              <img src="/showroom.jpg" alt="Logo du site" className={styles.image} />
            </SwiperSlide>

          </Swiper>

        </div>
        <p className={styles.texte}>
          Au fil des décennies, ConfoChic a su combiner les techniques traditionnelles avec l'innovation moderne pour proposer des meubles à la fois élégants, confortables et durables. Nos artisans ont transmis leurs compétences et leur passion pour la fabrication de meubles de génération en génération, ce qui nous permet de produire des pièces qui allient esthétique et robustesse. Chaque meuble est conçu pour résister à l’épreuve du temps et s’intégrer parfaitement dans des intérieurs modernes ou classiques.
          Qualité Inégalée

          Chez ConfoChic, la qualité n’est pas une option, c’est une exigence. Nous sélectionnons soigneusement nos matériaux, qu’il s’agisse de bois nobles, de textiles ou de métaux, afin de garantir que chaque pièce que nous produisons soit à la hauteur des attentes de nos clients. Chaque étape de la production est contrôlée pour offrir des produits irréprochables, alliant confort, fonctionnalité et design.
          L’Usine de Fabrication
        </p>
        <p className={styles.texte}>
          Notre usine, située au cœur de la région, est le poumon de ConfoChic. Elle allie technologie de pointe et travail manuel pour offrir des produits de qualité exceptionnelle. Nos équipes de production, passionnées par leur métier, veillent à ce que chaque meuble soit réalisé avec le plus grand soin. Nous investissons régulièrement dans les dernières innovations pour garantir une production respectueuse de l’environnement tout en répondant aux standards les plus élevés du marché.
          Une Marque Engagée

          Aujourd’hui, ConfoChic s’engage à proposer des meubles écoresponsables. Nous travaillons à réduire notre empreinte écologique à travers l’utilisation de matériaux recyclés et durables, ainsi qu’une production économe en énergie. Nous croyons que l’avenir du mobilier passe par un respect de la planète et de ses ressources, tout en continuant à offrir des produits haut de gamme.

        </p>
      </div >
      < Footer ></Footer >


    </>
  );
}

export default Histoire;

