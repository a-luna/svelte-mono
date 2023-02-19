registerPaint(
	'powdered-gradient',
	class {
		static get inputProperties() {
			return ['--powdered-gradient-direction', '--powdered-gradient-color', '--powdered-gradient-size'];
		}
		parseProps(t) {
			return ['--powdered-gradient-direction', '--powdered-gradient-color', '--powdered-gradient-size'].map(
				(e) => t.get(e).toString().trim() || void 0
			);
		}
		paint(t, e, r) {
			const { width: o, height: i } = e;
			let [a = 'to-bottom', n = 'white', d = 1] = this.parseProps(r);
			const s = 1 / (d = isNaN(parseInt(d)) ? { small: 1, medium: 2, large: 8 }[d] : parseInt(d)) - 0.01;
			for (let e = 0; e < i; e++)
				for (let r = 0; r < o; r++) {
					switch (a.toString()) {
						case 'to-top':
							if (Math.random() < 1.01 - e / (i * s)) continue;
							break;
						case 'to-left':
							if (Math.random() < 1.01 - r / (o * s)) continue;
							break;
						case 'to-bottom':
							if (Math.random() > 1.01 - e / (i * s)) continue;
							break;
						case 'to-right':
							if (Math.random() > 1.01 - r / (o * s)) continue;
					}
					t.beginPath(),
						t.arc(r * (d / Math.random()), e * (d / Math.random()), d / 4, 0, 2 * Math.PI),
						(t.fillStyle = n),
						t.fill();
				}
		}
	}
);
