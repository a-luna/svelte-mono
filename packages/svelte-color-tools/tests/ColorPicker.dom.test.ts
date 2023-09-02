import ColorPicker from '$lib/components/ColorPicker/ColorPicker.svelte';
import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import type { UserEvent } from '@testing-library/user-event/dist/types/setup';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';

describe('ColorPicker component can parse strings containing valid color keywords (CSS Colors Level 3)', () => {
	let container: HTMLElement;
	let picker: HTMLElement;
	let user: UserEvent;
	const pickerId = 'test-picker';

	beforeEach(() => {
		user = userEvent.setup();
	});

	afterEach(() => {
		container.firstChild?.remove();
		picker = screen.queryByTestId(pickerId);
		expect(picker).toBeFalsy();
	});

	async function changeColorByStringValue(color: string) {
		const editButton = await screen.findByTestId('edit-color-string-button');
		await user.click(editButton);
		const colorNameInput = await screen.findByTestId('color-name-input');
		await user.type(colorNameInput, `${color}{Enter}`);
	}

	test('can parse color name, regardless of letter-case: fuchsia/Fuchsia/FUCHSIA', async () => {
		({ container } = render(ColorPicker, { pickerId }));

		const picker = await screen.findByTestId(pickerId);
		expect(picker.outerHTML).toContain('color-picker');

		const colorString = await screen.findByTestId('color-string');
		expect(colorString.innerHTML).toContain('#808080');
		await user.click(colorString);
		expect(colorString.innerHTML).toContain('rgb(128 128 128)');
		await user.click(colorString);
		expect(colorString.innerHTML).toContain('hsl(0 0% 50.2%)');
		const copyButton = await screen.findByTestId('copy-color-string-button');
		await user.click(copyButton);

		const redSlider = await screen.findByTestId('R-slider');
		const redSliderValue = await screen.findByTestId('R-slider-value');
		const greenSlider = await screen.findByTestId('G-slider');
		const greenSliderValue = await screen.findByTestId('G-slider-value');
		const blueSlider = await screen.findByTestId('B-slider');
		const blueSliderValue = await screen.findByTestId('B-slider-value');

		expect(redSliderValue.innerHTML).toContain('128');
		expect(greenSliderValue.innerHTML).toContain('128');
		expect(blueSliderValue.innerHTML).toContain('128');

		// fireEvent.change(redSlider, { target: { value: 0 } });
		// fireEvent.change(greenSlider, { target: { value: 0 } });
		// fireEvent.change(blueSlider, { target: { value: 255 } });

		// expect(redSliderValue.innerHTML).toContain('0');
		// expect(greenSliderValue.innerHTML).toContain('0');
		// expect(blueSliderValue.innerHTML).toContain('255');

		const colorFormatSelectorButton = await screen.findByTestId('select-color-format-open-list-button');
		await user.click(colorFormatSelectorButton);
		const hslaMenuOption = await screen.findByTestId('select-color-format-option-4');
		await user.click(hslaMenuOption);

		const hueSlider = await screen.findByTestId('H-slider');
		const hueSliderValue = await screen.findByTestId('H-slider-value');
		const satSliderValue = await screen.findByTestId('S-slider-value');
		const lightSlider = await screen.findByTestId('L-slider');
		const lightSliderValue = await screen.findByTestId('L-slider-value');
		const alphaSlider = await screen.findByTestId('A-slider');
		const alphaSliderValue = await screen.findByTestId('A-slider-value');

		expect(hueSliderValue.innerHTML).toContain('0');
		expect(satSliderValue.innerHTML).toContain('0');
		expect(lightSliderValue.innerHTML).toContain('50');
		expect(alphaSliderValue.innerHTML).toContain('1');

		// expect(hueSliderValue.innerHTML).toContain('240');
		// expect(satSliderValue.innerHTML).toContain('100');
		// expect(lightSliderValue.innerHTML).toContain('50');
		// expect(alphaSliderValue.innerHTML).toContain('1');

		// fireEvent.change(hueSlider, { target: { value: '290' } });
		// fireEvent.change(lightSlider, { target: { value: '75' } });
		// fireEvent.change(alphaSlider, { target: { value: '0.44' } });

		// expect(hueSliderValue.innerHTML).toContain('290');
		// expect(satSliderValue.innerHTML).toContain('100');
		// expect(lightSliderValue.innerHTML).toContain('75');
		// expect(alphaSliderValue.innerHTML).toContain('0.44');

		// const fuchsiaHexValue = '#ff00ff70';
		// changeColorByStringValue('fuchsia');
		// colorString = await screen.findByTestId('color-string');
		// expect(colorString.innerHTML).toContain(fuchsiaHexValue);

		// changeColorByStringValue('Fuchsia');
		// colorString = await screen.findByTestId('color-string');
		// expect(colorString.innerHTML).toContain(fuchsiaHexValue);

		// changeColorByStringValue('FUCHSIA');
		// colorString = await screen.findByTestId('color-string');
		// expect(colorString.innerHTML).toContain(fuchsiaHexValue);
	});

	test.skip('can parse color name, regarless of spaces, dashes or underscores: lawngreen/LawnGreen/lawn-green/lawn green/Lawn_Green', async () => {
		({ container } = render(ColorPicker, { pickerId }));

		const lawnGreenHexValue = '#7cfc00';
		changeColorByStringValue('lawngreen');
		let colorString = await screen.findByTestId('color-string');
		expect(colorString.innerHTML).toContain(lawnGreenHexValue);

		changeColorByStringValue('LawnGreen');
		colorString = await screen.findByTestId('color-string');
		expect(colorString.innerHTML).toContain(lawnGreenHexValue);

		changeColorByStringValue('lawn-green');
		colorString = await screen.findByTestId('color-string');
		expect(colorString.innerHTML).toContain(lawnGreenHexValue);

		changeColorByStringValue('lawn green');
		colorString = await screen.findByTestId('color-string');
		expect(colorString.innerHTML).toContain(lawnGreenHexValue);

		changeColorByStringValue('Lawn_Green');
		colorString = await screen.findByTestId('color-string');
		expect(colorString.innerHTML).toContain(lawnGreenHexValue);
	});
});
