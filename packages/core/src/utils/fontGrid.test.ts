import { fontGrid } from './fontGrid';

test('works with font tokens', () => {
	expect(fontGrid('sm', 'default')).toStrictEqual({
		fontSize: '1rem',
		lineHeight: 1.5,
	});
});

test('works when the derived totalHeight is rounded down', () => {
	expect(fontGrid(4.321, 'heading')).toStrictEqual({
		fontSize: '4.321rem',
		lineHeight: 1.2728535061328397,
	});
});

test('works when the derived totalHeight is rounded up', () => {
	expect(fontGrid(2.6789, 'default')).toStrictEqual({
		fontSize: '2.6789rem',
		lineHeight: 1.4931501735787076,
	});
});
