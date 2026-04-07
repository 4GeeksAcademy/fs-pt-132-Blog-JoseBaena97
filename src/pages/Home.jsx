import React, { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { Card } from "../components/Card";
import { Section } from "../components/Section";
import { AutoCarousel } from "../components/AutoCarousel";

export const Home = () => {
	const { store, dispatch } = useGlobalReducer();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true);
				const charRes = await fetch("https://thesimpsonsapi.com/api/characters?page=1&limit=20");
				const charData = await charRes.json();
				dispatch({ type: "set_characters", payload: charData.results });

				const locRes = await fetch("https://thesimpsonsapi.com/api/locations?page=1&limit=20");
				const locData = await locRes.json();
				dispatch({ type: "set_locations", payload: locData.results });

				const epiRes = await fetch("https://thesimpsonsapi.com/api/episodes?page=1&limit=20");
				const epiData = await epiRes.json();
				dispatch({ type: "set_episodes", payload: epiData.results });

				setLoading(false);
			} catch (error) {
				console.error("Error fetching data:", error);
				setLoading(false);
			}
		};

		if (store.characters.length === 0) {
			fetchData();
		} else {
			setLoading(false);
		}
	}, []);

	if (loading) {
		return (
			<div className="loading-container">
				<div className="spinner"></div>
			</div>
		);
	}

	return (
		<div className="container">
			<header className="main-header">
				<h1 className="main-title">Los Simpsons</h1>
				<p className="main-subtitle">Explora Springfield y sus personajes</p>
			</header>

			<AutoCarousel title="Lugares icónicos">
				{store.locations.map((loc) => (
					<Card
						key={`loc-${loc.id}`}
						id={loc.id}
						name={loc.name}
						image={loc.image_path}
						type="location"
						subtitle={loc.use}
					/>
				))}
			</AutoCarousel>

			<Section title="Personajes">
				{store.characters.map((char) => (
					<Card
						key={`char-${char.id}`}
						id={char.id}
						name={char.name}
						image={char.portrait_path}
						type="character"
						subtitle={char.occupation}
					/>
				))}
			</Section>

			<Section title="Episodios">
				{store.episodes.map((epi) => (
					<Card
						key={`epi-${epi.id}`}
						id={epi.id}
						name={epi.name}
						image={epi.image_path}
						type="episode"
						subtitle={`Season ${epi.season}, Episode ${epi.episode_number}`}
					/>
				))}
			</Section>
		</div>
	);
};