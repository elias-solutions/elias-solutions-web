import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/**
 * Modular Swiss cross mark (3×3 grid, plus filled). Brand colours are fixed —
 * a logo must not invert with the theme — so callers style the surrounding
 * context, not the mark itself.
 */
@Component({
  selector: 'es-logo',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <svg
      [attr.width]="size()"
      [attr.height]="size()"
      viewBox="0 0 30 30"
      role="img"
      [attr.aria-label]="label()"
    >
      <rect width="30" height="30" [attr.fill]="ground()" />
      <g [attr.fill]="cross()">
        <rect x="12.5" y="6" width="5" height="5" />
        <rect x="6" y="12.5" width="5" height="5" />
        <rect x="12.5" y="12.5" width="5" height="5" />
        <rect x="19" y="12.5" width="5" height="5" />
        <rect x="12.5" y="19" width="5" height="5" />
      </g>
    </svg>
  `,
  styles: `
    :host { display: inline-flex; line-height: 0; }
  `,
})
export class Logo {
  readonly size = input(30);
  readonly label = input('Elias Solutions');
  readonly ground = input('#E30613');
  readonly cross = input('#ffffff');
}
