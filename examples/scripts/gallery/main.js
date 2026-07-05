import { loadManifest, normalizeManifest } from './manifest.js';
import { render, showGalleryState } from './render.js';
import { filterExamples } from './filter.js';
import { openPreview, closePreview, selectInitialExample, getActiveBadge } from './preview.js';

const container = document.getElementById('examples');
const searchInput = document.getElementById('search');
const MANIFEST_URL = container.dataset.manifest;

container.addEventListener('click', (event) => {
	const closeButton = event.target.closest('[data-preview-close]');
	if (closeButton) {
		closePreview(container);
		window.history.replaceState(null, '', window.location.pathname + window.location.search);
		return;
	}

	const badge = event.target.closest('.entry-link');
	if (!badge) {
		return;
	}

	if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) {
		return;
	}

	event.preventDefault();

	if (badge === getActiveBadge()) {
		closePreview(container);
		window.history.replaceState(null, '', window.location.pathname + window.location.search);
		return;
	}

	openPreview(badge, container);
});

searchInput.addEventListener('input', () => {
	const hiddenBadge = filterExamples(container, searchInput);
	if (hiddenBadge) {
		closePreview(container);
	}
});

async function bootstrapGallery() {
	showGalleryState('loading examples...', container);

	try {
		const manifest = await loadManifest(MANIFEST_URL);
		const groups = normalizeManifest(manifest);
		render(groups, container);
		filterExamples(container, searchInput);
		selectInitialExample(container);
	} catch (error) {
		console.error('Unable to load examples manifest.', error);
		showGalleryState('Unable to load examples manifest.', container);
	}
}

bootstrapGallery();
