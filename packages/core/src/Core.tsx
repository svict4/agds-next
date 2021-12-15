import React, { Fragment } from 'react';
import { Global } from '@emotion/react';
import { defaultPalette, paletteVars, PaletteKey, Palette } from './colors';

export function Core({
	children,
	applyReset = true,
	palette = defaultPalette,
}: React.PropsWithChildren<{
	palette?: Partial<Palette>;
	applyReset?: boolean;
}>) {
	return (
		<Fragment>
			<Global
				styles={[
					applyReset && {
						// FIXME: apply the css reset
						'body, html': {
							margin: 0,
							padding: 0,
							background:
								palette.lightBackgroundPage ??
								defaultPalette.lightBackgroundPage,
						},
					},
					{
						':root': Object.fromEntries(
							Object.entries(paletteVars).map(([key, variableName]) => [
								variableName,
								palette[key as PaletteKey] ?? defaultPalette[key as PaletteKey],
							])
						),
					},
				]}
			/>
			{children}
		</Fragment>
	);
}