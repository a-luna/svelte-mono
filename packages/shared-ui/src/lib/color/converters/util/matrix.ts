import type { Matrix1x3, Matrix2x2, Matrix3x3, Matrix3x3Coordinates } from '$lib/types';

export const multiplyMatrix3x3ByVector = (matrix: Matrix3x3, vector: Matrix1x3): Matrix1x3 =>
	matrix.map((row: Matrix1x3) => row[0] * vector[0] + row[1] * vector[1] + row[2] * vector[2]) as Matrix1x3;

export function invertMatrix3x3(matrix: Matrix3x3): Matrix3x3 {
	const det = calculateDeterminant3x3(matrix);
	const cofactorMatrix = getCofactorOfMatrix3x3(matrix);
	return multiplyMatrix3x3ByScalar(transposeMatrix3x3(cofactorMatrix), 1 / det);
}

const multiplyMatrix3x3ByScalar = (m: Matrix3x3, scalar: number): Matrix3x3 =>
	m.map((row: Matrix1x3) => row.map((val: number) => val * scalar)) as Matrix3x3;

const transposeMatrix3x3 = (m: Matrix3x3): Matrix3x3 =>
	m.map((row: Matrix1x3, i: number) => row.map((_, j: number) => m?.[j]?.[i])) as Matrix3x3;

function getCofactorOfMatrix3x3(m: Matrix3x3): Matrix3x3 {
	const m_ = getMatrixOfMinors3x3(m);
	return [
		[m_[0][0], -m_[0][1], m_[0][2]],
		[-m_[1][0], m_[1][1], -m_[1][2]],
		[m_[2][0], -m_[2][1], m_[2][2]],
	];
}

const getMatrixOfMinors3x3 = (matrix: Matrix3x3): Matrix3x3 => [
	[
		calculateMinorDeterminantForMatrix3x3Item(matrix, 0, 0),
		calculateMinorDeterminantForMatrix3x3Item(matrix, 0, 1),
		calculateMinorDeterminantForMatrix3x3Item(matrix, 0, 2),
	],
	[
		calculateMinorDeterminantForMatrix3x3Item(matrix, 1, 0),
		calculateMinorDeterminantForMatrix3x3Item(matrix, 1, 1),
		calculateMinorDeterminantForMatrix3x3Item(matrix, 1, 2),
	],
	[
		calculateMinorDeterminantForMatrix3x3Item(matrix, 2, 0),
		calculateMinorDeterminantForMatrix3x3Item(matrix, 2, 1),
		calculateMinorDeterminantForMatrix3x3Item(matrix, 2, 2),
	],
];

const isTupleContainingFourNumbers = (list: number[]): list is [number, number, number, number] => list.length === 4;

function calculateMinorDeterminantForMatrix3x3Item(m: Matrix3x3, row: 0 | 1 | 2, col: 0 | 1 | 2): number {
	const matrixCoordinates: Matrix3x3Coordinates = [
		[[0, 0], [0, 1], [0, 2]],
		[[1, 0], [1, 1], [1, 2]],
		[[2, 0], [2, 1], [2, 2]],
	];
	const minorDetValues = matrixCoordinates
		.map((coordinates) =>
			coordinates
				.map(([i, j]) => (row !== i && col !== j ? m?.[i]?.[j] ?? null : null))
				.filter((x): x is number => x !== null),
		)
		.flat();

	return isTupleContainingFourNumbers(minorDetValues)
		? calculateDeterminant2x2([
				[minorDetValues[0], minorDetValues[1]],
				[minorDetValues[2], minorDetValues[3]],
		  ])
		: 0;
}

const calculateDeterminant3x3 = (m: Matrix3x3): number =>
	m[0][0] * (m[1][1] * m[2][2] - m[1][2] * m[2][1]) -
	m[0][1] * (m[1][0] * m[2][2] - m[1][2] * m[2][0]) +
	m[0][2] * (m[1][0] * m[2][1] - m[1][1] * m[2][0]);

const calculateDeterminant2x2 = (m: Matrix2x2): number => m[0][0] * m[1][1] - m[0][1] * m[1][0];
