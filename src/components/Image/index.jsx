import { useEffect, useState } from "react";

async function loadImage(name) {
	let imageModule;
	try {
		const path = `../../assets/img/${name}`;
		console.log(`Loading ${path}`);
		imageModule = await import(path).catch(() => import("../../assets/img/sample.jpg"));
	} catch (e) {
		console.log(`Cannot load image ${name}`);
		return;
	}
	return imageModule.default;
}

function Image({ name, alt }) {
	const [src, setSrc] = useState(null);

	useEffect(() => {
		loadImage(name).then(imageSrc => {
			setSrc(imageSrc);
		});
	}, [name]);

	if (!src) return null;

	return <img src={src} alt={alt} />;
}

export default Image;
