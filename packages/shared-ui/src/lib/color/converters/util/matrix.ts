export type ColorValues = [number, number, number];
export type Matrix3x3 = [ColorValues, ColorValues, ColorValues];
export type Matrix2x2 = [[number, number], [number, number]];

export const multiplyMatrix3x3ByVector = (matrix: Matrix3x3, vector: ColorValues): ColorValues =>
	matrix.map((row: ColorValues) => row[0] * vector[0] + row[1] * vector[1] + row[2] * vector[2]) as ColorValues;

export function invertMatrix3x3(matrix: Matrix3x3): Matrix3x3 {
	const det = calculateDeterminant3x3(matrix);
	const cofactorMatrix = getCofactorOfMatrix3x3(matrix);
	return multiplyMatrix3x3ByScalar(transposeMatrix3x3(cofactorMatrix), 1 / det);
}

function getCofactorOfMatrix3x3(m: Matrix3x3): Matrix3x3 {
	const m_ = getMatrixOfMinors3x3(m);
	return [
		[m_[0][0], -m_[0][1], m_[0][2]],
		[-m_[1][0], m_[1][1], -m_[1][2]],
		[m_[2][0], -m_[2][1], m_[2][2]],
	];
}

function getMatrixOfMinors3x3(matrix: Matrix3x3): Matrix3x3 {
	const minRows = matrix
		.map((row: ColorValues, i: number) =>
			row.map((_, j: number) => calculateMinorDeterminantForMatrix3x3Item(matrix, i, j)),
		)
		.filter((minorRow): minorRow is ColorValues => minorRow.length === 3);
	return [minRows[0], minRows[1], minRows[2]];
}

function calculateMinorDeterminantForMatrix3x3Item(m: Matrix3x3, row: number, col: number): number {
	const minorDetValues = Array.from({ length: 3 }, (_, i) => i)
		.map((i) => {
			return Array.from({ length: 3 }, (_, j) => j).map((j) => {
				if (row !== i && col !== j) {
					return m[i][j];
				}
			});
		})
		.flat()
		.filter((x): x is number => !!x);

	return calculateDeterminant2x2([
		[minorDetValues[0], minorDetValues[1]],
		[minorDetValues[2], minorDetValues[3]],
	]);
}

const calculateDeterminant3x3 = (m: Matrix3x3): number =>
	m[0][0] * (m[1][1] * m[2][2] - m[1][2] * m[2][1]) -
	m[0][1] * (m[1][0] * m[2][2] - m[1][2] * m[2][0]) +
	m[0][2] * (m[1][0] * m[2][1] - m[1][1] * m[2][0]);

const calculateDeterminant2x2 = (m: Matrix2x2): number => m[0][0] * m[1][1] - m[0][1] * m[1][0];

const transposeMatrix3x3 = (m: Matrix3x3): Matrix3x3 =>
	m.map((row: ColorValues, i: number) => row.map((_, j: number) => m[j][i])) as Matrix3x3;

const multiplyMatrix3x3ByScalar = (m: Matrix3x3, scalar: number): Matrix3x3 =>
	m.map((row: ColorValues) => row.map((val: number) => val * scalar)) as Matrix3x3;
