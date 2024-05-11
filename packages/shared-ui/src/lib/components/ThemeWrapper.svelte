<script lang="ts">
	import { getRandomHueValue } from '$lib/color/util';
	import type { ComponentColor } from '$lib/types';
	import type { UiThemeValue } from '$lib/types/Literals';
	import { getRandomThemeColor } from '$lib/util';

	export let color: ComponentColor = 'black';
	export let randomComponentColor = false;
	export let customHue: number | null = null;
	export let randomHue = false;
	let theme: UiThemeValue;

	$: theme = customHue || randomHue ? 'custom' : randomComponentColor ? getRandomThemeColor() ?? 'black' : color;
	$: style = randomHue
		? `--theme-color-hue: ${getRandomHueValue()};`
		: customHue
			? `--theme-color-hue: ${customHue};`
			: '';
</script>

<div id="ui-wrapper" data-ui-theme={theme} {style}>
	<slot {color} />
</div>

<style lang="postcss">
	#ui-wrapper {
		/* COLOR PALETTE */
		--rich-black1: hsl(226, 27%, 5%);
		--rich-black2: hsl(226, 27%, 10%);
		--rich-black3: hsl(226, 27%, 13%);
		--rich-black4: hsl(226, 27%, 15%);

		--black4: hsl(0, 0%, 0%);
		--black3: hsl(0, 0%, 5%);
		--black2: hsl(0, 0%, 10%);
		--black1: hsl(0, 0%, 15%);

		--dark-gray4: hsl(0, 0%, 20%);
		--dark-gray3: hsl(0, 0%, 25%);
		--dark-gray2: hsl(0, 0%, 30%);
		--dark-gray1: hsl(0, 0%, 35%);

		--gray4: hsl(0, 0%, 40%);
		--gray3: hsl(0, 0%, 45%);
		--gray2: hsl(0, 0%, 50%);
		--gray1: hsl(0, 0%, 60%);

		--light-gray4: hsl(0, 0%, 65%);
		--light-gray3: hsl(0, 0%, 70%);
		--light-gray2: hsl(0, 0%, 75%);
		--light-gray1: hsl(0, 0%, 80%);

		--white1: hsl(0, 0%, 85%);
		--white2: hsl(0, 0%, 90%);
		--white3: hsl(0, 0%, 95%);
		--white4: hsl(0, 0%, 100%);

		--red1: hsl(2, 100%, 35%);
		--red2: hsl(2, 100%, 45%);
		--red3: hsl(2, 100%, 55%);
		--red4: hsl(2, 100%, 75%);

		--orange1: hsl(19, 100%, 35%);
		--orange2: hsl(19, 100%, 45%);
		--orange3: hsl(19, 100%, 55%);

		--orange-yellow1: hsl(35, 100%, 35%);
		--orange-yellow2: hsl(35, 100%, 45%);
		--orange-yellow3: hsl(35, 100%, 55%);

		--yellow1: hsl(60, 100%, 35%);
		--yellow2: hsl(60, 100%, 45%);
		--yellow3: hsl(60, 100%, 55%);

		--yellow-green1: hsl(84, 100%, 35%);
		--yellow-green2: hsl(84, 100%, 45%);
		--yellow-green3: hsl(84, 100%, 55%);

		--green1: hsl(113, 100%, 20%);
		--green2: hsl(113, 100%, 30%);
		--green3: hsl(113, 100%, 40%);
		--green4: hsl(113, 100%, 70%);

		--blue-green1: hsl(165, 100%, 35%);
		--blue-green2: hsl(165, 100%, 45%);
		--blue-green3: hsl(165, 100%, 55%);
		--blue-green4: hsl(165, 100%, 75%);

		--dark-teal1: hsl(179, 100%, 15%);
		--dark-teal2: hsl(179, 100%, 25%);

		--teal1: hsl(179, 100%, 35%);
		--teal2: hsl(179, 100%, 45%);
		--teal3: hsl(179, 100%, 55%);

		--blue1: hsl(218, 100%, 25%);
		--blue2: hsl(218, 100%, 35%);
		--blue3: hsl(218, 100%, 45%);
		--blue4: hsl(218, 100%, 55%);

		--blue-gray0: hsl(221, 39%, 11%);
		--blue-gray1: hsl(215, 28%, 17%);
		--blue-gray2: hsl(217, 19%, 27%);
		--blue-gray4: hsl(220, 10%, 46%);

		--indigo1: hsl(251, 74%, 30%);
		--indigo2: hsl(251, 74%, 40%);
		--indigo3: hsl(251, 74%, 50%);
		--indigo4: hsl(251, 80%, 60%);

		--purple1: hsl(290, 100%, 35%);
		--purple2: hsl(290, 100%, 45%);
		--purple3: hsl(290, 100%, 55%);

		--pink1: hsl(315, 100%, 35%);
		--pink2: hsl(315, 100%, 45%);
		--pink3: hsl(315, 100%, 55%);

		--theme-default-red-hue: 335;
		--theme-default-orange-hue: 39;
		--theme-default-yellow-hue: 57;
		--theme-default-green-hue: 140;
		--theme-default-teal-hue: 175;
		--theme-default-blue-hue: 210;
		--theme-default-indigo-hue: 250;

		/* COMMON THEME PROPERTIES */
		--theme-default-background-color-sat: 100%;
		--theme-default-background-color-light: 94%;
		--theme-default-background-color-light-hover: 90%;
		--theme-default-background-color-light-active: 99%;
		/* --theme-default-background-color-light-hover: calc(var(--theme-default-background-color-light) - 4%);
		--theme-default-background-color-light-active: calc(var(--theme-default-background-color-light) + 5%); */
		--theme-default-background-color-alpha: 1;

		--theme-default-app-background-color-sat: 15%;
		--theme-default-app-background-color-light: 85%;

		--theme-default-color-sat: 63%;
		--theme-default-color-sat-hover: calc(var(--theme-default-color-sat) - 7%);
		--theme-default-color-sat-active: calc(var(--theme-default-color-sat) - 7%);
		--theme-default-color-light: 26%;
		--theme-default-color-light-hover: calc(var(--theme-default-color-light) + 24%);
		--theme-default-color-light-active: calc(var(--theme-default-color-light) + 24%);
		--theme-default-color-alpha: 1;

		--theme-default-focus-ring-color-hue: 218;
		--theme-default-focus-ring-color-light: 55%;
		--theme-default-focus-ring-color: hsl(
			var(--theme-focus-ring-color-hue, var(--theme-default-focus-ring-color-hue))
				var(--theme-background-color-sat, var(--theme-default-background-color-sat))
				var(--theme-focus-ring-color-light, var(--theme-default-focus-ring-color-light)) /
				var(--theme-color-alpha, var(--theme-default-color-alpha))
		);

		--theme-default-invalid-hue: 2;
		--theme-default-background-color-invalid-light: 75%;
		--theme-default-invalid-background-color: hsl(
			var(--theme-invalid-hue, var(--theme-default-invalid-hue))
				var(--theme-background-color-sat, var(--theme-default-background-color-sat))
				var(--theme-background-color-invalid-light, var(--theme-default-background-color-invalid-light)) /
				var(--theme-color-alpha, var(--theme-default-color-alpha))
		);

		--theme-default-color-invalid-light: 55%;
		--theme-default-invalid-color: hsl(
			var(--theme-invalid-hue, var(--theme-default-invalid-hue))
				var(--theme-background-color-sat, var(--theme-default-background-color-sat))
				var(--theme-color-invalid-light, var(--theme-default-color-invalid-light)) /
				var(--theme-color-alpha, var(--theme-default-color-alpha))
		);

		--theme-default-font-size: 0.875rem;
		--theme-default-border-radius: 6px;
		--theme-default-background-color-disabled: var(--white1);
		--theme-default-color-disabled: var(--gray2);
		--theme-default-border-color-disabled: var(--gray4);
		--theme-default-panel-background-color: var(
			--theme-background-color-active,
			var(--theme-default-background-color-active)
		);
	}
	[data-ui-theme='black'] {
		--theme-default-app-background-color: var(--white1);
		--theme-default-background-color: var(--white3);
		--theme-default-background-color-hover: var(--white2);
		--theme-default-background-color-active: var(--white4);
		--theme-default-text-color: var(--black2);
		--theme-default-text-color-hover: var(--black4);
		--theme-default-text-color-active: var(--black4);
	}
	[data-ui-theme='red'] {
		--theme-color-hue: var(--theme-red-hue, var(--theme-default-red-hue));
	}
	[data-ui-theme='orange'] {
		--theme-color-hue: var(--theme-orange-hue, var(--theme-default-orange-hue));
	}
	[data-ui-theme='yellow'] {
		--theme-color-hue: var(--theme-yellow-hue, var(--theme-default-yellow-hue));
	}
	[data-ui-theme='green'] {
		--theme-color-hue: var(--theme-green-hue, var(--theme-default-green-hue));
	}
	[data-ui-theme='teal'] {
		--theme-color-hue: var(--theme-teal-hue, var(--theme-default-teal-hue));
	}
	[data-ui-theme='blue'] {
		--theme-color-hue: var(--theme-blue-hue, var(--theme-default-blue-hue));
	}
	[data-ui-theme='indigo'] {
		--theme-color-hue: var(--theme-indigo-hue, var(--theme-default-indigo-hue));
	}
	:not([data-ui-theme='black']) {
		--theme-default-app-background-color: hsl(
			var(--theme-color-hue) var(--theme-app-background-color-sat, var(--theme-default-app-background-color-sat))
				var(--theme-app-background-color-light, var(--theme-default-app-background-color-light)) /
				var(--theme-color-alpha, var(--theme-default-color-alpha))
		);

		--theme-default-background-color: hsl(
			var(--theme-color-hue) var(--theme-background-color-sat, var(--theme-default-background-color-sat))
				var(--theme-background-color-light, var(--theme-default-background-color-light)) /
				var(--theme-background-color-alpha, var(--theme-default-background-color-alpha))
		);

		--theme-default-background-color-hover: hsl(
			var(--theme-color-hue) var(--theme-background-color-sat, var(--theme-default-background-color-sat))
				var(--theme-background-color-light-hover, var(--theme-default-background-color-light-hover)) /
				var(--theme-background-color-alpha, var(--theme-default-background-color-alpha))
		);

		--theme-default-background-color-active: hsl(
			var(--theme-color-hue) var(--theme-background-color-sat, var(--theme-default-background-color-sat))
				var(--theme-background-color-light-active, var(--theme-default-background-color-light-active)) /
				var(--theme-background-color-alpha, var(--theme-default-background-color-alpha))
		);

		--theme-default-text-color: hsl(
			var(--theme-color-hue) var(--theme-color-sat, var(--theme-default-color-sat))
				var(--theme-color-light, var(--theme-default-color-light)) /
				var(--theme-color-alpha, var(--theme-default-color-alpha))
		);

		--theme-default-text-color-hover: hsl(
			var(--theme-color-hue) var(--theme-color-sat-hover, var(--theme-default-color-sat-hover))
				var(--theme-color-light-hover, var(--theme-default-color-light-hover)) /
				var(--theme-color-alpha, var(--theme-default-color-alpha))
		);

		--theme-default-text-color-active: hsl(
			var(--theme-color-hue) var(--theme-color-sat-active, var(--theme-default-color-sat-active))
				var(--theme-color-light-active, var(--theme-default-color-light-active)) /
				var(--theme-color-alpha, var(--theme-default-color-alpha))
		);
	}
</style>
