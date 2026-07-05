import { getExampleHref } from './manifest.js';

export function escapeHtml(value) {
	return String(value).replace(/[&<>"']/g, (char) => {
		return {
			'&': '&amp;',
			'<': '&lt;',
			'>': '&gt;',
			'"': '&quot;',
			"'": '&#39;',
		}[char];
	});
}

function renderEntry(entry) {
	const href = escapeHtml(getExampleHref(entry.path));
	const name = escapeHtml(entry.name);
	const title = escapeHtml(entry.title);
	const subgroup = escapeHtml(entry.subgroup ?? '');
	const subgroupSearch = escapeHtml((entry.subgroup ?? '').toLowerCase());

	return `
		<a
			href="${href}"
			class="entry-link"
			data-entry="${escapeHtml(entry.name.toLowerCase())}"
			data-entry-name="${name}"
			data-entry-title="${title}"
			data-entry-title-search="${escapeHtml(entry.title.toLowerCase())}"
			data-entry-path="${escapeHtml(entry.path)}"
			data-subgroup="${subgroupSearch}"
			data-subgroup-name="${subgroup}"
			aria-current="false"
			title="${title}"
		>${name}</a>
	`;
}

function renderSubgroup(subgroup) {
	const label = subgroup.name
		? `
			<div class="subgroup-header">
				<span>${escapeHtml(subgroup.name)}</span>
				<span class="subgroup-count" data-subgroup-count>${subgroup.entries.length}</span>
			</div>
		`
		: '';

	return `
		<div class="subgroup-block" data-subgroup-block>
			${label}
			<div class="entry-list">
				${subgroup.entries.map((entry) => renderEntry(entry)).join('')}
			</div>
		</div>
	`;
}

function renderGroup(group, index) {
	const startsOpen = group.entries.length <= 12 || index < 2;

	return `
		<details class="example-group" data-group data-group-name="${escapeHtml(group.name)}" data-group-search="${escapeHtml(group.name.toLowerCase())}" ${
			startsOpen ? 'open' : ''
		}>
			<summary class="group-summary">
				<span class="group-title">${escapeHtml(group.name)}</span>
				<span class="group-description">${escapeHtml(group.description)}</span>
				<span class="group-count" data-count>${group.entries.length}</span>
			</summary>
			<div class="group-content">
				${group.subgroups.map((subgroup) => renderSubgroup(subgroup)).join('')}
			</div>
		</details>
	`;
}

export function render(groups, container) {
	container.innerHTML = `
		<section class="examples-list-panel" aria-label="Examples">
			${groups.map((group, index) => renderGroup(group, index)).join('')}
		</section>
		<section class="preview-panel" data-preview-panel data-empty="true" aria-label="Selected example preview">
			<div class="preview-toolbar">
				<div class="preview-meta">
					<div class="preview-kicker" data-preview-kicker>Preview</div>
					<h2 class="preview-title" data-preview-title>No sketch selected</h2>
				</div>
				<div class="preview-actions">
					<a class="preview-action" data-preview-source target="_blank" rel="noopener noreferrer" hidden>source</a>
					<a class="preview-action" data-preview-link target="_blank" rel="noopener noreferrer" hidden>open</a>
					<button type="button" class="preview-action" data-preview-close hidden>close</button>
				</div>
			</div>
			<div class="preview-frame-shell">
				<div class="preview-empty" data-preview-empty>No sketch selected</div>
				<iframe class="preview-frame" data-preview-frame loading="lazy" hidden></iframe>
			</div>
		</section>
	`;
}

export function showGalleryState(message, container) {
	container.innerHTML = `<p class="gallery-state">${escapeHtml(message)}</p>`;
}
