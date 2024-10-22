import { isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  PLATFORM_ID,
  inject,
} from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'pricing-page',
  standalone: true,
  imports: [],
  templateUrl: './pricing-page.component.html',
  styleUrl: './pricing-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class PricingPageComponent implements OnInit {
  private title = inject(Title);
  private meta = inject(Meta);

  private platform = inject(PLATFORM_ID);

  ngOnInit(): void {
    //codigo con document de js
    if (isPlatformBrowser(this.platform)) {
      document.title = 'Pricing Page';
    }

    //codigo sin JS
    this.title.setTitle('Pricing Page');
    this.meta.updateTag({
      name: 'description',
      content: 'Este es mi Pricing page',
    });
    this.meta.updateTag({ name: 'og:title', content: 'Pricing page' });
    this.meta.updateTag({
      name: 'keywords',
      content: 'hola,mundo,fernando,herrera,curso,angular',
    });
  }
}

export default PricingPageComponent;
