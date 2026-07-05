import { getExampleSourceHref } from './manifest.js';

let activeBadge = null;

export function getActiveBadge() {
	return activeBadge;
}

function getPreviewElements(container) {
	return {
		panel: container.querySelector('[data-preview-panel]'),
		kicker: container.querySelector('[data-preview-kicker]'),
		title: container.querySelector('[data-preview-title]'),
		source: container.querySelector('[data-preview-source]'),
		link: container.querySelector('[data-preview-link]'),
		close: container.querySelector('[data-preview-close]'),
		empty: container.querySelector('[data-preview-empty]'),
		frame: container.querySelector('[data-preview-frame]'),
	};
}

export function closePreview(container) {
	const preview = getPreviewElements(container);

	if (activeBadge) {
		activeBadge.classList.remove('is-active');
		activeBadge.setAttribute('aria-current', 'false');
		activeBadge = null;
	}

	preview.panel.dataset.empty = 'true';
	preview.kicker.textContent = 'Preview';
	preview.title.textContent = 'No sketch selected';
	preview.source.hidden = true;
	preview.source.removeAttribute('href');
	preview.link.hidden = true;
	preview.close.hidden = true;
	preview.empty.hidden = false;
	preview.frame.hidden = true;
	preview.frame.removeAttribute('title');
	preview.frame.src = 'about:blank';
}

export function openPreview(badge, container, options = {}) {
	const preview = getPreviewElements(container);
	const section = badge.closest('[data-group]');
	const groupName = section.dataset.groupName;
	const subgroupName = badge.dataset.subgroupName;
	const title = badge.dataset.entryTitle;
	const href = badge.getAttribute('href');

	if (activeBadge && activeBadge !== badge) {
		activeBadge.classList.remove('is-active');
		activeBadge.setAttribute('aria-current', 'false');
	}

	activeBadge = badge;
	activeBadge.classList.add('is-active');
	activeBadge.setAttribute('aria-current', 'true');
	section.open = true;

	preview.panel.dataset.empty = 'false';
	preview.kicker.textContent = subgroupName ? `${groupName} / ${subgroupName}` : groupName;
	preview.title.textContent = title;
	preview.link.href = href;
	preview.link.hidden = false;
	preview.close.hidden = false;

	if (badge.dataset.entryPath) {
		preview.source.href = getExampleSourceHref(badge.dataset.entryPath);
		preview.source.hidden = false;
	}
	preview.empty.hidden = true;
	preview.frame.hidden = false;
	preview.frame.title = `${title} preview`;
	preview.frame.src = href;

	if (options.updateHash !== false) {
		window.history.replaceState(null, '', `#${badge.dataset.entryPath}`);
	}

	if (options.scroll !== false && window.matchMedia('(max-width: 980px)').matches) {
		requestAnimationFrame(() => preview.panel.scrollIntoView({ block: 'start', behavior: 'smooth' }));
	}
}

export function selectInitialExample(container) {
	const hashPath = decodeURIComponent(window.location.hash.slice(1));
	const initialBadge =
		(hashPath && container.querySelector(`.entry-link[data-entry-path="${CSS.escape(hashPath)}"]`)) ||
		container.querySelector('.entry-link:not(.hidden-entry)');

	if (initialBadge) {
		openPreview(initialBadge, container, { scroll: false, updateHash: false });
	}
}
