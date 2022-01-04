import ColorPicker from '$lib/components/ColorPicker/ColorPicker.svelte';
import { fireEvent, render, screen } from '@testing-library/svelte';

describe('ColorParser component can parse strings containing valid color keywords (CSS Colors Level 3)', () => {
	it('can parse color name, regardless of letter-case: fuchsia/Fuchsia/FUCHSIA', async () => {
    const pickerId = 'test-picker';
    const { container, getByTestId } = render(ColorPicker, {
      pickerId
    });

		expect(container).toMatchSnapshot('initial-state');
		const picker = getByTestId(pickerId);
		expect(picker).toHaveClass('color-picker');

		let colorString = getByTestId('color-string');
		expect(colorString).toHaveTextContent('#808080');
		await fireEvent.click(colorString);
		expect(colorString).toHaveTextContent('rgb(128 128 128)');
		await fireEvent.click(colorString);
		expect(colorString).toHaveTextContent('hsl(0 0% 50%)');

		const redSlider = getByTestId('R-slider');
		expect(redSlider).toHaveValue('128');
		fireEvent.change(redSlider, { target: { value: '0' } });
		const greenSlider = getByTestId('G-slider');
		expect(greenSlider).toHaveValue('128');
		fireEvent.change(greenSlider, { target: { value: '0' } });
		const blueSlider = getByTestId('B-slider');
		expect(blueSlider).toHaveValue('128');
		fireEvent.change(blueSlider, { target: { value: '255' } });
		expect(redSlider).toHaveValue('0');
		expect(greenSlider).toHaveValue('0');
		expect(blueSlider).toHaveValue('255');

		const colorSpaceSelectorButton = getByTestId('open-list-button');
		await fireEvent.click(colorSpaceSelectorButton);
		const hslaMenuOption = getByTestId('select-color-space-option-4');
		expect(hslaMenuOption).toBeVisible();
		await fireEvent.click(hslaMenuOption);

		const hueSlider = getByTestId('H-slider');
		expect(hueSlider).toHaveValue('240');
		fireEvent.change(hueSlider, { target: { value: '290' } });
		const satSlider = getByTestId('S-slider');
		expect(satSlider).toHaveValue('100');
		const lightSlider = getByTestId('L-slider');
		expect(lightSlider).toHaveValue('50');
		fireEvent.change(lightSlider, { target: { value: '75' } });
		const alphaSlider = getByTestId('A-slider');
		expect(alphaSlider).toHaveValue('1');
		fireEvent.change(alphaSlider, { target: { value: '0.44' } });

		expect(hueSlider).toHaveValue('290');
		expect(satSlider).toHaveValue('100');
		expect(lightSlider).toHaveValue('75');
		expect(alphaSlider).toHaveValue('0.44');

		let editButton = getByTestId('edit-color-button');
		await fireEvent.click(editButton);
		let colorNameInput = getByTestId('color-name-input');
		await fireEvent.change(colorNameInput, { target: { value: 'fuchsia' } });
		expect(colorNameInput).toHaveValue('fuchsia');
		let okButton = getByTestId('change-color-button');
		await fireEvent.click(okButton);

		colorString = await screen.findByTestId('color-string');
		expect(colorString).toHaveTextContent('#ff00ff70');
		const copyButton = getByTestId('copy-color-button');
		await fireEvent.click(copyButton);

		editButton = getByTestId('edit-color-button');
		await fireEvent.click(editButton);
		colorNameInput = getByTestId('color-name-input');
		await fireEvent.change(colorNameInput, { target: { value: 'Fuchsia' } });
		expect(colorNameInput).toHaveValue('Fuchsia');
		okButton = getByTestId('change-color-button');
		await fireEvent.click(okButton);

		colorString = await screen.findByTestId('color-string');
		expect(colorString).toHaveTextContent('#ff00ff70');

		editButton = getByTestId('edit-color-button');
		await fireEvent.click(editButton);
		colorNameInput = getByTestId('color-name-input');
		await fireEvent.change(colorNameInput, { target: { value: 'FUCHSIA' } });
		expect(colorNameInput).toHaveValue('FUCHSIA');
		okButton = getByTestId('change-color-button');
		await fireEvent.click(okButton);

		colorString = await screen.findByTestId('color-string');
		expect(colorString).toHaveTextContent('#ff00ff70');
	});

	it('can parse color name, regarless of spaces, dashes or underscores: lawngreen/LawnGreen/lawn-green/lawn green/Lawn_Green', async () => {
    const pickerId = 'test-picker';
    const { container, getByTestId } = render(ColorPicker, {
      pickerId
    });
    
		let editButton = getByTestId('edit-color-button');
		await fireEvent.click(editButton);
		let colorNameInput = getByTestId('color-name-input');
		await fireEvent.change(colorNameInput, { target: { value: 'lawngreen' } });
		expect(colorNameInput).toHaveValue('lawngreen');
		let okButton = getByTestId('change-color-button');
		await fireEvent.click(okButton);

		let colorString = await screen.findByTestId('color-string');
		expect(colorString).toHaveTextContent('#7cfc00');

		editButton = getByTestId('edit-color-button');
		await fireEvent.click(editButton);
		colorNameInput = getByTestId('color-name-input');
		await fireEvent.change(colorNameInput, { target: { value: 'LawnGreen' } });
		expect(colorNameInput).toHaveValue('LawnGreen');
		okButton = getByTestId('change-color-button');
		await fireEvent.click(okButton);

		colorString = await screen.findByTestId('color-string');
		expect(colorString).toHaveTextContent('#7cfc00');

		editButton = getByTestId('edit-color-button');
		await fireEvent.click(editButton);
		colorNameInput = getByTestId('color-name-input');
		await fireEvent.change(colorNameInput, { target: { value: 'lawn-green' } });
		expect(colorNameInput).toHaveValue('lawn-green');
		okButton = getByTestId('change-color-button');
		await fireEvent.click(okButton);

		colorString = await screen.findByTestId('color-string');
		expect(colorString).toHaveTextContent('#7cfc00');

		editButton = getByTestId('edit-color-button');
		await fireEvent.click(editButton);
		colorNameInput = getByTestId('color-name-input');
		await fireEvent.change(colorNameInput, { target: { value: 'lawn green' } });
		expect(colorNameInput).toHaveValue('lawn green');
		okButton = getByTestId('change-color-button');
		await fireEvent.click(okButton);

		colorString = await screen.findByTestId('color-string');
		expect(colorString).toHaveTextContent('#7cfc00');

		editButton = getByTestId('edit-color-button');
		await fireEvent.click(editButton);
		colorNameInput = getByTestId('color-name-input');
		await fireEvent.change(colorNameInput, { target: { value: 'Lawn_Green' } });
		expect(colorNameInput).toHaveValue('Lawn_Green');
		okButton = getByTestId('change-color-button');
		await fireEvent.click(okButton);

		colorString = await screen.findByTestId('color-string');
		expect(colorString).toHaveTextContent('#7cfc00');
	});
});
