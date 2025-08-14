import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { defineCustomElements } from 'iteration-deck/loader';
import { IterationDeckService } from './services/iteration-deck.service';
import { HeroComponent } from './components/hero/hero.component';
import { ButtonComponent } from './components/button/button.component';
import { FormComponent } from './components/form/form.component';
import { ChartComponent } from './components/chart/chart.component';

// Initialize the web components
defineCustomElements();

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HeroComponent,
    ButtonComponent,
    FormComponent,
    ChartComponent
  ],
  template: `
    <div class="angular-example">
      <h1>🎛️ Iteration Deck - Angular Integration</h1>
      <p>
        This example demonstrates how to integrate Iteration Deck components 
        with Angular standalone components and TypeScript.
      </p>

      <div class="integration-tip">
        <strong>💡 Angular Integration Tips:</strong>
        <ul>
          <li>Use CUSTOM_ELEMENTS_SCHEMA for web components</li>
          <li>Initialize components in main.ts or app component</li>
          <li>Services work normally with dependency injection</li>
          <li>Event binding works with Angular syntax</li>
        </ul>
      </div>

      <!-- Hero Section Variations -->
      <section class="example-section">
        <h2>Hero Section Variations</h2>
        <p>Angular components wrapped in Iteration Deck slides</p>

        <iteration-deck
          id="angular-heroes"
          label="Angular Hero Components"
          prompt="Create 3 Angular hero components with different layouts"
        >
          <iteration-deck-slide
            label="Centered"
            ai-prompt="Bold centered hero with gradient background"
            [attr.confidence]="0.92"
            notes="High impact design for landing pages"
          >
            <app-hero 
              variant="centered"
              (action)="onHeroAction('centered', $event)"
            ></app-hero>
          </iteration-deck-slide>

          <iteration-deck-slide
            label="Split Layout"
            ai-prompt="Content left, visual right, professional look"
            [attr.confidence]="0.87"
          >
            <app-hero 
              variant="split"
              (action)="onHeroAction('split', $event)"
            ></app-hero>
          </iteration-deck-slide>

          <iteration-deck-slide
            label="Minimal"
            ai-prompt="Clean minimal design with subtle borders"
            [attr.confidence]="0.95"
            notes="Best for B2B audiences, converts well"
          >
            <app-hero 
              variant="minimal"
              (action)="onHeroAction('minimal', $event)"
            ></app-hero>
          </iteration-deck-slide>
        </iteration-deck>
      </section>

      <!-- Interactive Button Variations -->
      <section class="example-section">
        <h2>Interactive Button Variations</h2>
        <p>Angular button components with reactive state</p>

        <div class="button-stats">
          <span>Total clicks: {{ getTotalClicks() }}</span>
          <button (click)="resetClickCounts()" class="reset-button">Reset</button>
        </div>

        <iteration-deck
          id="angular-buttons"
          label="Angular Button Components"
          prompt="Create accessible Angular button component with style variants"
        >
          <iteration-deck-slide
            label="Primary"
            ai-prompt="Bold primary button, high contrast"
            [attr.confidence]="0.95"
          >
            <div class="button-demo">
              <app-button
                variant="primary"
                (click)="onButtonClick('primary')"
              >
                Get Started
              </app-button>
              <p class="button-description">
                High contrast, excellent accessibility
              </p>
              <div class="click-counter">
                Clicked {{ clickCounts.primary }} times
              </div>
            </div>
          </iteration-deck-slide>

          <iteration-deck-slide
            label="Outline"
            ai-prompt="Subtle outline style, professional look"
            [attr.confidence]="0.87"
          >
            <div class="button-demo">
              <app-button
                variant="outline"
                (click)="onButtonClick('outline')"
              >
                Get Started
              </app-button>
              <p class="button-description">
                Subtle, professional appearance
              </p>
              <div class="click-counter">
                Clicked {{ clickCounts.outline }} times
              </div>
            </div>
          </iteration-deck-slide>

          <iteration-deck-slide
            label="Gradient"
            ai-prompt="Eye-catching gradient with depth"
            [attr.confidence]="0.92"
            notes="Great for hero sections and key CTAs"
          >
            <div class="button-demo">
              <app-button
                variant="gradient"
                (click)="onButtonClick('gradient')"
              >
                Get Started
              </app-button>
              <p class="button-description">
                Visual interest with gradient background
              </p>
              <div class="click-counter">
                Clicked {{ clickCounts.gradient }} times
              </div>
            </div>
          </iteration-deck-slide>
        </iteration-deck>
      </section>

      <!-- Dynamic Form Component -->
      <section class="example-section">
        <h2>Dynamic Form Layouts</h2>
        <p>Reactive Angular forms with different layouts</p>

        <div class="form-controls">
          <label>
            Form Style:
            <select [(ngModel)]="selectedFormStyle">
              <option value="modern">Modern</option>
              <option value="classic">Classic</option>
              <option value="minimal">Minimal</option>
            </select>
          </label>
          <div class="form-stats">
            Form submissions: {{ formSubmissions }}
          </div>
        </div>

        <iteration-deck
          id="angular-forms"
          label="Angular Form Components"
          prompt="Create responsive Angular form layouts with reactive forms"
        >
          <iteration-deck-slide
            label="Vertical Layout"
            ai-prompt="Stack form fields vertically for mobile-first design"
            [attr.confidence]="0.94"
          >
            <app-form
              layout="vertical"
              [styleVariant]="selectedFormStyle"
              (formSubmit)="onFormSubmit($event)"
            ></app-form>
          </iteration-deck-slide>

          <iteration-deck-slide
            label="Horizontal Layout"
            ai-prompt="Arrange fields horizontally for desktop efficiency"
            [attr.confidence]="0.87"
          >
            <app-form
              layout="horizontal"
              [styleVariant]="selectedFormStyle"
              (formSubmit)="onFormSubmit($event)"
            ></app-form>
          </iteration-deck-slide>

          <iteration-deck-slide
            label="Grid Layout"
            ai-prompt="Use CSS Grid for responsive form design"
            [attr.confidence]="0.91"
            notes="Best for complex forms with many fields"
          >
            <app-form
              layout="grid"
              [styleVariant]="selectedFormStyle"
              (formSubmit)="onFormSubmit($event)"
            ></app-form>
          </iteration-deck-slide>
        </iteration-deck>
      </section>

      <!-- Data Services Integration -->
      <section class="example-section">
        <h2>Data Services Integration</h2>
        <p>Angular services with dependency injection</p>

        <iteration-deck
          id="angular-charts"
          label="Angular Chart Components"
          description="Data visualization with Angular services"
        >
          <iteration-deck-slide
            label="Simple Chart"
            [attr.confidence]="0.89"
          >
            <app-chart
              variant="simple"
              [data]="chartData"
              (refresh)="refreshChartData()"
            ></app-chart>
          </iteration-deck-slide>

          <iteration-deck-slide
            label="Detailed Chart"
            [attr.confidence]="0.92"
            notes="Includes real-time updates via service"
          >
            <app-chart
              variant="detailed"
              [data]="chartData"
              (refresh)="refreshChartData()"
            ></app-chart>
          </iteration-deck-slide>

          <iteration-deck-slide
            label="Interactive Chart"
            [attr.confidence]="0.86"
          >
            <app-chart
              variant="interactive"
              [data]="chartData"
              (refresh)="refreshChartData()"
              (datapointClick)="onDatapointClick($event)"
            ></app-chart>
          </iteration-deck-slide>
        </iteration-deck>
      </section>

      <!-- Angular Integration Guide -->
      <section class="example-section">
        <h2>🔧 Angular Integration Best Practices</h2>
        <div class="best-practices-grid">
          <div class="practice-card practice-card--setup">
            <h4>🎯 Component Setup</h4>
            <ul>
              <li>Use CUSTOM_ELEMENTS_SCHEMA</li>
              <li>Initialize in main.ts or app component</li>
              <li>Standalone components for modularity</li>
              <li>Event binding with Angular syntax</li>
            </ul>
          </div>

          <div class="practice-card practice-card--services">
            <h4>🚀 Services & DI</h4>
            <ul>
              <li>Dependency injection works normally</li>
              <li>Reactive forms for complex inputs</li>
              <li>HttpClient for API integration</li>
              <li>Observables for reactive patterns</li>
            </ul>
          </div>

          <div class="practice-card practice-card--workflow">
            <h4>👥 Team Workflow</h4>
            <ul>
              <li>Share live Angular prototypes</li>
              <li>Compare component variants</li>
              <li>Track AI generation context</li>
              <li>Present to stakeholders</li>
            </ul>
          </div>
        </div>
      </section>

      <!-- Development vs Production -->
      <section class="example-section">
        <h2>🔧 Development vs Production Behavior</h2>
        <div class="environment-grid">
          <div class="env-card env-card--dev">
            <h4>Development Mode</h4>
            <ul>
              <li>Global toolbar with navigation</li>
              <li>Multi-deck selector dropdown</li>
              <li>Keyboard shortcuts (Ctrl/Cmd + ←/→)</li>
              <li>AI confidence scores visible</li>
              <li>All slides available for comparison</li>
            </ul>
          </div>
          <div class="env-card env-card--prod">
            <h4>Production Mode</h4>
            <ul>
              <li>No toolbar or dev tools</li>
              <li>Only first slide rendered</li>
              <li>Zero overhead</li>
              <li>Clean presentation mode</li>
              <li>Static HTML-like behavior</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  `,
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'iteration-deck-angular-example';
  
  clickCounts = {
    primary: 0,
    outline: 0,
    gradient: 0
  };

  selectedFormStyle: 'modern' | 'classic' | 'minimal' = 'modern';
  formSubmissions = 0;

  chartData = {
    users: 1234,
    revenue: 45678,
    growth: 12.5,
    lastUpdate: new Date()
  };

  private chartUpdateInterval?: number;

  constructor(private iterationDeckService: IterationDeckService) {}

  ngOnInit() {
    console.log('🎛️ Angular Iteration Deck example loaded');
    
    // Subscribe to the iteration deck service
    this.iterationDeckService.getDeckState().subscribe(state => {
      console.log('Deck state updated:', state);
    });

    // Start auto-refresh for chart data
    this.chartUpdateInterval = window.setInterval(() => {
      this.updateChartData();
    }, 5000);
  }

  ngOnDestroy() {
    if (this.chartUpdateInterval) {
      clearInterval(this.chartUpdateInterval);
    }
  }

  onHeroAction(variant: string, event: any) {
    console.log(`Hero ${variant} action:`, event);
  }

  onButtonClick(variant: keyof typeof this.clickCounts) {
    this.clickCounts[variant]++;
    console.log(`${variant} button clicked! Total: ${this.getTotalClicks()}`);
  }

  getTotalClicks(): number {
    return Object.values(this.clickCounts).reduce((sum, count) => sum + count, 0);
  }

  resetClickCounts() {
    this.clickCounts = { primary: 0, outline: 0, gradient: 0 };
  }

  onFormSubmit(formData: any) {
    this.formSubmissions++;
    console.log('Form submitted:', formData);
  }

  refreshChartData() {
    this.chartData = {
      users: Math.floor(Math.random() * 10000),
      revenue: Math.floor(Math.random() * 100000),
      growth: (Math.random() - 0.5) * 50,
      lastUpdate: new Date()
    };
  }

  private updateChartData() {
    this.chartData = {
      ...this.chartData,
      users: this.chartData.users + Math.floor(Math.random() * 10),
      revenue: this.chartData.revenue + Math.floor(Math.random() * 1000),
      growth: this.chartData.growth + (Math.random() - 0.5) * 2,
      lastUpdate: new Date()
    };
  }

  onDatapointClick(event: any) {
    console.log('Datapoint clicked:', event);
  }
}