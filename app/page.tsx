"use client";

import { useState, useEffect, useCallback } from "react";
import { supabase, Album } from "@/lib/supabase";
import Header from "@/components/Header";
import AlbumCard from "@/components/AlbumCard";
import NewAlbumModal from "@/components/NewAlbumModal";

export default function Home() {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const fetchAlbums = useCallback(async () => {
    const { data, error } = await supabase
      .from("albums")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error && data) setAlbums(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchAlbums();
  }, [fetchAlbums]);

  return (
    <div className="min-h-screen bg-white">
      <Header onNewAlbum={() => setShowModal(true)} />

      <main className="max-w-7xl mx-auto px-6 py-14">
        <h1 className="text-5xl font-bold tracking-tight text-gray-900">
          Ma ville est mon école
        </h1>

        <p className="text-lg font-bold text-gray-600 mt-1 mb-4">
          exposition virtuelle 2025-2026 d'une découverte de l'architecture
        </p>

        <h2 className="text-3xl font-bold tracking-tight text-gray-900 mt-1 mb-4">
          Ouvrir l'école à l'architecture et à la ville
        </h2>
        <p className="text-gray-500 text-lg leading-relaxed  mb-8">
          Depuis sa création, le Forum d'Urbanisme et d'Architecture développe
          des actions de sensibilisation à l'architecture et à la ville dans le
          cadre scolaire ou universitaire. Il accompagne les élèves et étudiants
          d'aujourd'hui (du primaire à l'enseignement supérieur), ainsi que le
          corps enseignant, dans la découverte de leur environnement construit
          ou paysager. En guidant chacun dans la lecture et la compréhension de
          son cadre de vie, le but d'une telle sensibilisation est, de permettre
          à tous, parfois dès le plus jeune âge, de se sentir pleinement citoyen
          et acteur du "vivre ensemble".
        </p>
        <p className="text-gray-500 text-lg leading-relaxed  mb-8">
          Le programme "Ma ville est mon école", destiné aux élèves du primaire,
          est un de ces outils d'action, par lequel des architectes-médiatrices
          accompagnent chaque année plus de vingt classes de Nice, tous
          quartiers confondus, dans la découverte de leur école, de leur
          quartier et de la ville. À la fois spectateurs et acteurs, les jeunes
          élèves s'ouvrent alors à l'architecture par le "faire", alternant les
          exercices pédagogiques avec des visites urbaines et des "ateliers de
          projet". C'est le résultat du travail développé en 2025/2026 que nous
          montrons ici.
        </p>

        <p className="text-gray-500 text-lg leading-relaxed  mb-8">
          Le déroulement de "Ma ville est mon école" est pensé pour répondre aux
          besoins et aux capacités de découverte des enfants. Au long d'un
          trimestre environ, des architectes-médiatrices interviennent selon
          quatre interventions successives d'une demi-journée, qui se déroulent
          alternativement dans la classe ou en immersion dans la ville, en
          étroite association avec les enseignants, qui sont invités à prolonger
          le travail des médiatrices entre chaque séance.
        </p>

        <div className="text-gray-500 text-lg leading-relaxed mb-8">
          <p>
            Ses objectifs, au bénéfice des élèves rendus pleinement acteurs de
            leurs découvertes, sont clairs :
          </p>
          <ul className="list-none  pl-6">
            <li className="flex">
              <span className="mr-3">-</span>
              <span>
                faire de l’architecture et de la ville une culture partagée ;
              </span>
            </li>

            <li className="flex">
              <span className="mr-3">-</span>
              <span>
                se familiariser avec les notions et le vocabulaire spécifiques
                de l’architecture, de la ville et du paysage en vue de mieux
                comprendre notre cadre de vie ;
              </span>
            </li>

            <li className="flex">
              <span className="mr-3">-</span>
              <span>
                sensibiliser à l’espace architectural en général, apprendre à le
                regarder, à le percevoir, à le comprendre et à le qualifier ;
              </span>
            </li>

            <li className="flex">
              <span className="mr-3">-</span>
              <span>
                apprendre à observer son environnement familier en particulier,
                à se repérer dans la ville et dans son quartier.
              </span>
            </li>
          </ul>
        </div>

        <p className="text-gray-500 text-lg leading-relaxed  mb-8">
          L’objectif est de les faire réfléchir à la transformation d’un
          bâtiment existant du quartier, qui répondrait à un besoin actuel, lié
          au vivre ensemble et à la problématique environnementale.
        </p>
        <p className="text-gray-500 text-lg leading-relaxed  mb-8">
          L’exercice proposé consiste à imaginer un nouvel usage pour une
          architecture familière en relation à son environnement, représenté par
          un livre pop-up en plans successifs : les abords directs, la façade du
          bâtiment concerné et l’environnement lointain, un objet à la fois
          ludique et pédagogique.
        </p>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/diagramme.jpg"
          className="w-full rounded-xl mb-8 object-cover"
        />

        <p className="text-gray-500 text-lg leading-relaxed  mb-8">
          Pour arriver aux résultats ici présentés, les classes ont été
          accompagnées par les médiatrices selon une série d’étapes dont les
          élèves ont été les acteurs : découverte de l’architecture dans la
          ville ; visite du quartier et reconnaissance des matériaux ; penser
          leur projet et apprendre à réaliser un pop-up.
        </p>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="h-120 rounded-xl overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/photo-enfants.jpg"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="h-120 rounded-xl overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/photo-travaux.jpg"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-48">
            <div className="w-10 h-10 border-2 border-gray-900 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : albums.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-gray-400 gap-3">
            <svg
              className="w-16 h-16"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3 20.25h18a.75.75 0 00.75-.75V6a.75.75 0 00-.75-.75H3a.75.75 0 00-.75.75v13.5c0 .414.336.75.75.75z"
              />
            </svg>
            <p className="text-base">Aucun album pour l&apos;instant.</p>
            <p className="text-sm">
              Créez votre premier album avec le bouton &ldquo;Nouvel
              Album&rdquo;.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
            {albums.map((album) => (
              <AlbumCard key={album.id} album={album} />
            ))}
          </div>
        )}

        <div className="text-gray-900 text-base leading-relaxed mb-8 mt-12 space-y-4">
          <p className="font-bold">
            CRÉDITS (Forum d&apos;Urbanisme et d&apos;Architecture)
          </p>
          <div>
            <p>architectes-médiatrices</p>
            <p className="font-bold">Sara ALFIERI</p>
            <p className="font-bold">Elisabetta CASTELLANO</p>
            <p className="font-bold">Leslie DROUET</p>
          </div>
          <div>
            <p>coordinatrice du programme &quot;Ma ville est mon école&quot;</p>
            <p className="font-bold">Ximena PESENTI</p>
          </div>
          <div>
            <p>conception de l&apos;exposition virtuelle</p>
            <p className="font-bold">Lucie MONEYRON</p>
            <p className="font-bold">Ximena PESENTI</p>
          </div>
          <div>
            <p>graphisme et mise en page</p>
            <p className="font-bold">Lucie MONEYRON</p>
          </div>
          <div>
            <p>
              © Forum d&apos;Urbanisme et d&apos;Architecture – Ville de Nice,
              2026
            </p>
            <p>droits réservés pour toutes photographies</p>
          </div>
        </div>
      </main>

      {showModal && (
        <NewAlbumModal
          onClose={() => setShowModal(false)}
          onCreated={() => {
            setShowModal(false);
            fetchAlbums();
          }}
        />
      )}
    </div>
  );
}
