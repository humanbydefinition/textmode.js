import { getActiveBadge } from './preview.js';

export function filterExamples(container, searchInput) {
	const query = searchInput.value.trim().toLowerCase();

	container.querySelectorAll('[data-group]').forEach((section) => {
		const groupName = section.dataset.groupSearch;
		let visibleInGroup = 0;

		section.querySelectorAll('[data-subgroup-block]').forEach((subgroupBlock) => {
			const badges = subgroupBlock.querySelectorAll('.entry-link');
			let visibleInSubgroup = 0;

			badges.forEach((badge) => {
				const entryName = badge.dataset.entry;
				const entryTitle = badge.dataset.entryTitleSearch;
				const subgroup = badge.dataset.subgroup;
				const match =
					!query ||
					entryName.includes(query) ||
					entryTitle.includes(query) ||
					groupName.includes(query) ||
					subgroup.includes(query);

				badge.classList.toggle('hidden-entry', !match);

				if (match) {
					visibleInSubgroup++;
					visibleInGroup++;
				}
			});

			const subgroupCount = subgroupBlock.querySelector('[data-subgroup-count]');
			if (subgroupCount) subgroupCount.textContent = visibleInSubgroup;
			subgroupBlock.hidden = visibleInSubgroup === 0;
		});

		const countEl = section.querySelector('[data-count]');
		if (countEl) countEl.textContent = visibleInGroup;

		if (query && visibleInGroup > 0) {
			section.open = true;
		}

		section.hidden = visibleInGroup === 0;
	});

	const badge = getActiveBadge();
	if (badge && badge.classList.contains('hidden-entry')) {
		return badge;
	}

	return null;
}
