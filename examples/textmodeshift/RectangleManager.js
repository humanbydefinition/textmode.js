// RectangleManager.js

/**
 * @typedef {Object} Rect
 * @property {number} x
 * @property {number} y
 * @property {number} width
 * @property {number} height
 */

export class RectangleManager {
	/**
	 * Initializes the RectangleManager with grid dimensions, split depth, spacing, and maximum rectangle count.
	 * Creates a set of non-overlapping rectangles filling the grid space based on the split depth.
	 * @param {number} gridCols - Number of columns in the grid.
	 * @param {number} gridRows - Number of rows in the grid.
	 * @param {number} [splitDepth=3] - Maximum depth for recursive splitting. A depth of 3 generates ~8 rectangles.
	 * @param {number} [spacing=1] - Spacing between rectangles.
	 * @param {number} [maxRectangleCount=64] - Maximum number of rectangles to return. Extra slots are zero-sized.
	 */
	constructor(gridCols, gridRows, splitDepth = 3, spacing = 1, maxRectangleCount = 64) {
		this.gridCols = gridCols;
		this.gridRows = gridRows;
		this.maxRectangleCount = maxRectangleCount;
		this.splitDepth = splitDepth;
		this.spacing = Math.max(0, Math.floor(spacing));
		this.rectangles = [];
		this.maxRectangleDimension = 0;
	}

	/**
	 * Updates the grid dimensions.
	 * @param {number} gridCols - Number of columns in the grid.
	 * @param {number} gridRows - Number of rows in the grid.
	 */
	updateGridDimensions(gridCols, gridRows) {
		this.gridCols = gridCols;
		this.gridRows = gridRows;
	}

	/**
	 * Initializes and generates the rectangles based on current grid dimensions and split depth.
	 */
	initializeRectangles() {
		this.maxRectangleDimension = 0;
		this.rectangles = [];

		const container = {
			x: 0,
			y: 0,
			width: Math.max(0, Math.floor(this.gridCols)),
			height: Math.max(0, Math.floor(this.gridRows)),
		};

		this.splitSpace(container, 0);

		// Compute maximum rectangle dimension
		for (const rect of this.rectangles) {
			if (rect.width > 0 && rect.height > 0) {
				const maxDim = Math.max(rect.width, rect.height);
				if (maxDim > this.maxRectangleDimension) this.maxRectangleDimension = maxDim;
			}
		}

		// Shuffle
		for (let i = this.rectangles.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[this.rectangles[i], this.rectangles[j]] = [this.rectangles[j], this.rectangles[i]];
		}

		// Enforce maxRectangleCount: trim or pad with zeros
		if (this.rectangles.length > this.maxRectangleCount) {
			this.rectangles = this.rectangles.slice(0, this.maxRectangleCount);
		}
		while (this.rectangles.length < this.maxRectangleCount) {
			this.rectangles.push({ x: 0, y: 0, width: 0, height: 0 });
		}
	}

	/**
	 * Recursively splits the container space to generate rectangles.
	 * Spacing is reserved between child containers to ensure no spacing at grid edges.
	 * @param {Rect} container - The current container with x, y, width, and height.
	 * @param {number} depth - Current depth of recursion.
	 */
	splitSpace(container, depth) {
		if (depth >= this.splitDepth) {
			// Base case: create rectangle without adding spacing to edges
			this.rectangles.push({
				x: container.x,
				y: container.y,
				width: container.width,
				height: container.height,
			});
			return;
		}

		// Randomly choose split direction
		const splitHorizontal = Math.random() > 0.5;

		if (splitHorizontal) {
			// Need at least: top >=1, spacing, bottom >=1  => height >= spacing + 2
			if (container.height < this.spacing + 2) {
				this.rectangles.push({ ...container });
				return;
			}

			const minSplit = 1;
			const maxSplit = container.height - this.spacing - 1;
			if (maxSplit < minSplit) {
				this.rectangles.push({ ...container });
				return;
			}

			const splitPoint = this.randomInt(minSplit, maxSplit);

			const firstChild = {
				x: container.x,
				y: container.y,
				width: container.width,
				height: splitPoint,
			};

			const secondChild = {
				x: container.x,
				y: container.y + splitPoint + this.spacing,
				width: container.width,
				height: container.height - splitPoint - this.spacing,
			};

			this.splitSpace(firstChild, depth + 1);
			this.splitSpace(secondChild, depth + 1);
		} else {
			// Need at least: left >=1, spacing, right >=1  => width >= spacing + 2
			if (container.width < this.spacing + 2) {
				this.rectangles.push({ ...container });
				return;
			}

			const minSplit = 1;
			const maxSplit = container.width - this.spacing - 1;
			if (maxSplit < minSplit) {
				this.rectangles.push({ ...container });
				return;
			}

			const splitPoint = this.randomInt(minSplit, maxSplit);

			const firstChild = {
				x: container.x,
				y: container.y,
				width: splitPoint,
				height: container.height,
			};

			const secondChild = {
				x: container.x + splitPoint + this.spacing,
				y: container.y,
				width: container.width - splitPoint - this.spacing,
				height: container.height,
			};

			this.splitSpace(firstChild, depth + 1);
			this.splitSpace(secondChild, depth + 1);
		}
	}

	/**
	 * @param {number} minInclusive
	 * @param {number} maxInclusive
	 * @returns {number}
	 */
	randomInt(minInclusive, maxInclusive) {
		// Returns an int in [minInclusive, maxInclusive]
		const min = Math.ceil(minInclusive);
		const max = Math.floor(maxInclusive);
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
}
