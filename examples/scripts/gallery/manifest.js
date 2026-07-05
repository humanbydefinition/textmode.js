export function getExamplePath(sourceFile) {
	if (!sourceFile.startsWith('examples/') || !sourceFile.endsWith('/sketch.js')) {
		throw new Error(`Invalid example source file: ${sourceFile}`);
	}

	return sourceFile.slice('examples/'.length, -'/sketch.js'.length);
}

export function getExampleName(examplePath) {
	const segments = examplePath.split('/');
	return segments[segments.length - 1];
}

export function getExampleHref(examplePath) {
	return `./sketch.html?path=${encodeURIComponent(examplePath)}`;
}

export function getExampleSourceHref(examplePath) {
	return `./${examplePath}/sketch.js`;
}

export function normalizeExample(example, subgroupName) {
	const path = getExamplePath(example.sourceFile);

	return {
		name: getExampleName(path),
		path,
		title: example.title,
		subgroup: subgroupName,
	};
}

export function normalizeManifest(manifest) {
	if (!Array.isArray(manifest.groups)) {
		throw new Error('Examples manifest is missing a groups array.');
	}

	return manifest.groups.map((group) => {
		const subgroups = [];

		if (Array.isArray(group.subgroups)) {
			for (const subgroup of group.subgroups) {
				const entries = Array.isArray(subgroup.examples)
					? subgroup.examples.map((example) => normalizeExample(example, subgroup.name))
					: [];

				subgroups.push({ name: subgroup.name, entries });
			}
		} else if (Array.isArray(group.examples)) {
			subgroups.push({
				name: null,
				entries: group.examples.map((example) => normalizeExample(example, null)),
			});
		}

		const entries = subgroups.flatMap((subgroup) => subgroup.entries);
		return { name: group.name, description: group.description, entries, subgroups };
	});
}

export async function loadManifest(url) {
	const response = await fetch(url);

	if (!response.ok) {
		throw new Error(`Unable to load ${url}: ${response.status} ${response.statusText}`);
	}

	return response.json();
}
