import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoDirective } from '@jsverse/transloco';

import { Logo } from '../../core/brand/logo/logo';

@Component({
  selector: 'es-landing',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, TranslocoDirective, Logo],
  templateUrl: './landing.html',
  styleUrl: './landing.scss',
})
export class Landing {}
