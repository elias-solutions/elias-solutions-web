import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslocoDirective } from '@jsverse/transloco';

import { Logo } from '../../brand/logo/logo';

@Component({
  selector: 'es-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RouterLinkActive, TranslocoDirective, Logo],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {}
