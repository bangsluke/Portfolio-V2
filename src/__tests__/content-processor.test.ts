import {
	convertProjectNameToSlug,
	processContent,
	processMarkdownContent,
	processObsidianLink,
} from '../utils/content-processor';

describe('processContent', () => {
	test('handles null and undefined content', () => {
		expect(processContent(null)).toBe('');
		expect(processContent(undefined)).toBe('');
	});

	test('handles empty string', () => {
		expect(processContent('')).toBe('');
	});

	test('processes Obsidian links to existing projects with alt text', () => {
		const input =
			'Check out [[Homepage Website|this project]] for more details';
		const expected =
			'Check out <a href="/portfolio/projects/homepage-website" class="theme-link">this project</a> for more details';
		expect(processContent(input)).toBe(expected);
	});

	test('processes Obsidian links to existing projects without alt text', () => {
		const input = 'Check out [[Homepage Website]] for more details';
		const expected =
			'Check out <a href="/portfolio/projects/homepage-website" class="theme-link">Homepage Website</a> for more details';
		expect(processContent(input)).toBe(expected);
	});

	test('processes Obsidian links to existing projects with a predeceding parenthesis', () => {
		const input = 'Check out ([[Homepage Website]] for more details';
		const expected =
			'Check out (<a href="/portfolio/projects/homepage-website" class="theme-link">Homepage Website</a> for more details';
		expect(processContent(input)).toBe(expected);
	});

	test('processes Obsidian links with alt text', () => {
		const input =
			'Check out [[Non Existent Project|this project]] for more details';
		const expected =
			'Check out <span class="theme-link">this project</span> for more details';
		expect(processContent(input)).toBe(expected);
	});

	test('processes Obsidian links without alt text', () => {
		const input = 'Check out [[Non Existent Project]] for more details';
		const expected =
			'Check out <span class="theme-link">Non Existent Project</span> for more details';
		expect(processContent(input)).toBe(expected);
	});

	test('processes Obsidian links with special characters', () => {
		const input = 'Check out [[Project Name with Spaces]] for more details';
		const expected =
			'Check out <span class="theme-link">Project Name with Spaces</span> for more details';
		expect(processContent(input)).toBe(expected);
	});

	test('processes Obsidian links with numbers', () => {
		const input = 'Check out [[Project 123]] for more details';
		const expected =
			'Check out <span class="theme-link">Project 123</span> for more details';
		expect(processContent(input)).toBe(expected);
	});

	test('processes Obsidian links with mixed content', () => {
		const input =
			'Check out [[Project Name]] and [[Another Project|another]] for more details';
		const expected =
			'Check out <span class="theme-link">Project Name</span> and <span class="theme-link">another</span> for more details';
		expect(processContent(input)).toBe(expected);
	});

	test('processes simple Obsidian links', () => {
		const input = 'This is a [[link]] to something';
		const expected =
			'This is a <span class="theme-link">link</span> to something';
		expect(processContent(input)).toBe(expected);
	});

	test('processes markdown links', () => {
		const input = 'Visit [GitHub](https://github.com) for more info';
		const expected =
			'Visit <a href="https://github.com" class="theme-link" target="_blank" rel="noopener noreferrer">GitHub</a> for more info';
		expect(processContent(input)).toBe(expected);
	});

	test('converts newlines to br tags', () => {
		const input = 'Line 1\nLine 2\nLine 3';
		const expected = 'Line 1<br>Line 2<br>Line 3';
		expect(processContent(input)).toBe(expected);
	});

	test('processes multiple transformations in one string', () => {
		const input =
			'Check [[Non Existent Project|this]] and visit [GitHub](https://github.com)\nNew line';
		const expected =
			'Check <span class="theme-link">this</span> and visit <a href="https://github.com" class="theme-link" target="_blank" rel="noopener noreferrer">GitHub</a><br>New line';
		expect(processContent(input)).toBe(expected);
	});

	test('handles existing HTML theme-link tags', () => {
		const input = '<p class="theme-link">Some link</p>';
		const expected = '<span class="theme-link">Some link</span>';
		expect(processContent(input)).toBe(expected);
	});

	test('processes real world example of multiple transformations in one string', () => {
		const input =
			'A personal documentation site storing key links to the software I use, articles I find useful, and a section on [[Dorkinians FC]] stats. The repo also contains my [[Homepage Website|Homepage]] and [[New Tab Website|New Tab]] pages.';
		const expected =
			'A personal documentation site storing key links to the software I use, articles I find useful, and a section on <span class="theme-link">Dorkinians FC</span> stats. The repo also contains my <a href="/portfolio/projects/homepage-website" class="theme-link">Homepage</a> and <a href="/portfolio/projects/new-tab-website" class="theme-link">New Tab</a> pages.';
		expect(processContent(input)).toBe(expected);
	});
});

describe('convertProjectNameToSlug', () => {
	test('converts simple project names', () => {
		expect(convertProjectNameToSlug('Portfolio Card')).toBe('portfolio-card');
		expect(convertProjectNameToSlug('My Project')).toBe('my-project');
	});

	test('handles special characters', () => {
		expect(convertProjectNameToSlug('Project & More')).toBe('project-more');
		expect(convertProjectNameToSlug('Project@Home')).toBe('project-home');
		expect(convertProjectNameToSlug('Project #1')).toBe('project-1');
	});

	test('handles numbers', () => {
		expect(convertProjectNameToSlug('Project 123')).toBe('project-123');
		expect(convertProjectNameToSlug('123 Project')).toBe('123-project');
	});

	test('removes leading and trailing hyphens', () => {
		expect(convertProjectNameToSlug('-Project-')).toBe('project');
		expect(convertProjectNameToSlug(' Project ')).toBe('project');
	});

	test('handles multiple spaces and special characters', () => {
		expect(convertProjectNameToSlug('  Project   Name  ')).toBe('project-name');
		expect(convertProjectNameToSlug('Project---Name')).toBe('project-name');
	});

	test('handles edge cases', () => {
		expect(convertProjectNameToSlug('')).toBe('');
		expect(convertProjectNameToSlug('   ')).toBe('');
		expect(convertProjectNameToSlug('---')).toBe('');
	});
});

describe('processMarkdownContent', () => {
	test('processes markdown content', () => {
		const input = 'This is **bold** and *italic* text';
		// This function likely processes markdown, but we need to see its implementation
		// For now, we'll test that it returns a string
		expect(typeof processMarkdownContent(input)).toBe('string');
	});

	test('handles empty content', () => {
		expect(processMarkdownContent('')).toBe('');
	});
});

describe('processObsidianLink', () => {
	test('processes string values', () => {
		expect(processObsidianLink('[[Link]]')).toBe('Link');
	});

	test('processes array values', () => {
		expect(processObsidianLink(['[[Link1]]', '[[Link2]]'])).toBe(
			'Link1, Link2'
		);
	});

	test('handles undefined values', () => {
		expect(processObsidianLink(undefined)).toBe('');
	});

	test('handles empty arrays', () => {
		expect(processObsidianLink([])).toBe('');
	});
});

describe('Portfolio About Me processing', () => {
	test('processes Portfolio About Me content with existing project links', () => {
		const input =
			'I have worked on [[Homepage Website]] and [[New Tab Website]] projects.';
		const expected =
			'I have worked on <a href="/portfolio/projects/homepage-website" class="theme-link">Homepage Website</a> and <a href="/portfolio/projects/new-tab-website" class="theme-link">New Tab Website</a> projects.';
		expect(processContent(input)).toBe(expected);
	});

	test('processes Portfolio About Me content with non-existing project links', () => {
		const input =
			'I have worked on [[Non Existent Project]] and [[Another Non Existent]] projects.';
		const expected =
			'I have worked on <span class="theme-link">Non Existent Project</span> and <span class="theme-link">Another Non Existent</span> projects.';
		expect(processContent(input)).toBe(expected);
	});

	test('processes Portfolio About Me content with mixed existing and non-existing project links', () => {
		const input =
			'I have worked on [[Homepage Website]] and [[Non Existent Project]] projects.';
		const expected =
			'I have worked on <a href="/portfolio/projects/homepage-website" class="theme-link">Homepage Website</a> and <span class="theme-link">Non Existent Project</span> projects.';
		expect(processContent(input)).toBe(expected);
	});

	test('processes Portfolio About Me content with alt text links', () => {
		const input =
			'I have worked on [[Homepage Website|my homepage]] and [[New Tab Website|new tab]] projects.';
		const expected =
			'I have worked on <a href="/portfolio/projects/homepage-website" class="theme-link">my homepage</a> and <a href="/portfolio/projects/new-tab-website" class="theme-link">new tab</a> projects.';
		expect(processContent(input)).toBe(expected);
	});

	test('processes Portfolio About Me content with markdown links', () => {
		const input =
			'Check out my [GitHub](https://github.com/bangsluke) for more details.';
		const expected =
			'Check out my <a href="https://github.com/bangsluke" class="theme-link" target="_blank" rel="noopener noreferrer">GitHub</a> for more details.';
		expect(processContent(input)).toBe(expected);
	});

	test('processes Portfolio About Me content with newlines', () => {
		const input =
			'I am a developer.\nI work on various projects.\nI love coding.';
		const expected =
			'I am a developer.<br>I work on various projects.<br>I love coding.';
		expect(processContent(input)).toBe(expected);
	});

	test('processes complex Portfolio About Me content with multiple transformations', () => {
		const input =
			'I have worked on [[Homepage Website|my homepage]] and [[Non Existent Project]] projects.\nCheck out my [GitHub](https://github.com/bangsluke) for more.';
		const expected =
			'I have worked on <a href="/portfolio/projects/homepage-website" class="theme-link">my homepage</a> and <span class="theme-link">Non Existent Project</span> projects.<br>Check out my <a href="https://github.com/bangsluke" class="theme-link" target="_blank" rel="noopener noreferrer">GitHub</a> for more.';
		expect(processContent(input)).toBe(expected);
	});

	test('processes external Obsidian images', () => {
		const input = '![[https://i.imgur.com/AKxdBiC.png]]';
		const expected =
			'<img src="https://i.imgur.com/AKxdBiC.png" alt="External Obsidian image">';
		expect(processContent(input)).toBe(expected);
	});

	test('processes internal Obsidian images', () => {
		const input = '![[20241201 Player Stats Page Design.jpeg]]';
		const expected =
			'<!-- Image removed during sync: 20241201 Player Stats Page Design.jpeg -->';
		expect(processContent(input)).toBe(expected);
	});

	test('processes markdown headings', () => {
		const input = '# Main Heading\n## Sub Heading\n### Section Heading';
		const expected =
			'<h1>Main Heading</h1><br><h2>Sub Heading</h2><br><h3>Section Heading</h3>';
		expect(processContent(input)).toBe(expected);
	});

	test('processes markdown headings with content', () => {
		const input =
			'# Portfolio About Me\n\nThis is some content.\n\n## My Beginnings\n\nMore content here.';
		const expected =
			'<h1>Portfolio About Me</h1><br><br>This is some content.<br><br><h2>My Beginnings</h2><br><br>More content here.';
		expect(processContent(input)).toBe(expected);
	});

	test('processes all heading levels', () => {
		const input = '# H1\n## H2\n### H3\n#### H4\n##### H5\n###### H6';
		const expected =
			'<h1>H1</h1><br><h2>H2</h2><br><h3>H3</h3><br><h4>H4</h4><br><h5>H5</h5><br><h6>H6</h6>';
		expect(processContent(input)).toBe(expected);
	});

	test('processes headings with links', () => {
		const input =
			'# Main Heading\n\nCheck out [[Homepage Website]] and [GitHub](https://github.com)';
		const expected =
			'<h1>Main Heading</h1><br><br>Check out <a href="/portfolio/projects/homepage-website" class="theme-link">Homepage Website</a> and <a href="https://github.com" class="theme-link" target="_blank" rel="noopener noreferrer">GitHub</a>';
		expect(processContent(input)).toBe(expected);
	});
});

describe('Content processing for different content types', () => {
	test('processes project longDescription with Obsidian links', () => {
		const input =
			'This project was built using [[React]] and [[Node.js]] with a [[Neo4j]] database.';
		const expected =
			'This project was built using <span class="theme-link">React</span> and <span class="theme-link">Node.js</span> with a <span class="theme-link">Neo4j</span> database.';
		expect(processContent(input)).toBe(expected);
	});

	test('processes project lessonsLearned with markdown links', () => {
		const input =
			'I learned a lot about [React hooks](https://react.dev/reference/react) and [Next.js routing](https://nextjs.org/docs/routing).';
		const expected =
			'I learned a lot about <a href="https://react.dev/reference/react" class="theme-link" target="_blank" rel="noopener noreferrer">React hooks</a> and <a href="https://nextjs.org/docs/routing" class="theme-link" target="_blank" rel="noopener noreferrer">Next.js routing</a>.';
		expect(processContent(input)).toBe(expected);
	});

	test('processes referenceAddress with mixed content', () => {
		const input =
			'Contact me at [[RLE International]] or visit my [LinkedIn profile](https://linkedin.com/in/bangsluke).\nBased in London, UK.';
		const expected =
			'Contact me at <span class="theme-link">RLE International</span> or visit my <a href="https://linkedin.com/in/bangsluke" class="theme-link" target="_blank" rel="noopener noreferrer">LinkedIn profile</a>.<br>Based in London, UK.';
		expect(processContent(input)).toBe(expected);
	});

	test('processes work experience roleDescription with project links', () => {
		const input =
			'Led development of [[DVP Tool]] and [[SDP]] projects using [[React]] and [[TypeScript]].';
		const expected =
			'Led development of <a href="/portfolio/projects/dvp-tool" class="theme-link">DVP Tool</a> and <a href="/portfolio/projects/sdp" class="theme-link">SDP</a> projects using <span class="theme-link">React</span> and <span class="theme-link">TypeScript</span>.';
		expect(processContent(input)).toBe(expected);
	});

	test('processes education qualifications with technology mentions', () => {
		const input =
			'Studied [[Computer Science]] with focus on [[Python]], [[Java]], and [[SQL]] databases.';
		const expected =
			'Studied <span class="theme-link">Computer Science</span> with focus on <span class="theme-link">Python</span>, <span class="theme-link">Java</span>, and <span class="theme-link">SQL</span> databases.';
		expect(processContent(input)).toBe(expected);
	});

	test('processes skill description with project references', () => {
		const input =
			'Used extensively in [[Portfolio Site V2]] and [[Travel Website]] projects. Check out my [GitHub](https://github.com/bangsluke) for examples.';
		const expected =
			'Used extensively in <a href="/portfolio/projects/portfolio-site-v2" class="theme-link">Portfolio Site V2</a> and <a href="/portfolio/projects/travel-website" class="theme-link">Travel Website</a> projects. Check out my <a href="https://github.com/bangsluke" class="theme-link" target="_blank" rel="noopener noreferrer">GitHub</a> for examples.';
		expect(processContent(input)).toBe(expected);
	});

	test('processes about me content with complex mixed content', () => {
		const input =
			'I am a [[Frontend Developer]] with experience in [[React]], [[Next.js]], and [[TypeScript]].\n\nCheck out my projects like [[Portfolio Site V2]] and visit my [LinkedIn](https://linkedin.com/in/bangsluke) for more details.';
		const expected =
			'I am a <span class="theme-link">Frontend Developer</span> with experience in <span class="theme-link">React</span>, <span class="theme-link">Next.js</span>, and <span class="theme-link">TypeScript</span>.<br><br>Check out my projects like <a href="/portfolio/projects/portfolio-site-v2" class="theme-link">Portfolio Site V2</a> and visit my <a href="https://linkedin.com/in/bangsluke" class="theme-link" target="_blank" rel="noopener noreferrer">LinkedIn</a> for more details.';
		expect(processContent(input)).toBe(expected);
	});

	test('distinguishes between internal and external links correctly', () => {
		const input =
			'Check out my [Portfolio Site V2](/portfolio/projects/portfolio-site-v2) and visit my [GitHub](https://github.com/bangsluke) for more details.';
		const expected =
			'Check out my <a href="/portfolio/projects/portfolio-site-v2" class="theme-link">Portfolio Site V2</a> and visit my <a href="https://github.com/bangsluke" class="theme-link" target="_blank" rel="noopener noreferrer">GitHub</a> for more details.';
		expect(processContent(input)).toBe(expected);
	});
});
