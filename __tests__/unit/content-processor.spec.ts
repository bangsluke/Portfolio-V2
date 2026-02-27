import { processContent } from '../../src/utils/content-processor';

describe('processContent', () => {
	it('does not introduce ellipses when input has none', () => {
		const input =
			'This is a long description about a project that should remain fully intact without any extra characters being added by the processor. It contains links like [Portfolio Site V2](/projects/portfolio-site-v2) and [[Internal Reference]].';

		const output = processContent(input);

		// Guard against the content processor appending literal ellipses
		expect(output.includes('...')).toBe(false);
	});
});

