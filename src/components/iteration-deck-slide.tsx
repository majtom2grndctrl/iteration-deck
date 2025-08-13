import { Component, Prop, Element, Event, EventEmitter, Watch, h, Host } from '@stencil/core';
import { isDevelopment } from '../core/store';

@Component({
  tag: 'iteration-deck-slide',
  styleUrl: 'iteration-deck-slide.css',
  shadow: true,
})
export class IterationDeckSlide {
  @Element() el!: HTMLElement;
  
  @Prop() label!: string;
  @Prop({ attribute: 'ai-prompt' }) aiPrompt?: string;
  @Prop() notes?: string;
  @Prop() confidence?: number;

  @Event() slideDataUpdated!: EventEmitter<{
    label: string;
    aiPrompt?: string;
    notes?: string;
    confidence?: number;
  }>;

  componentDidLoad() {
    this.notifyParentOfSlideData();
  }

  @Watch('label')
  @Watch('aiPrompt')
  @Watch('notes')
  @Watch('confidence')
  watchPropsChange() {
    this.notifyParentOfSlideData();
  }

  private notifyParentOfSlideData() {
    // Emit event to parent IterationDeck to update slide data
    this.slideDataUpdated.emit({
      label: this.label,
      aiPrompt: this.aiPrompt,
      notes: this.notes,
      confidence: this.confidence
    });
  }

  render() {
    const isDev = isDevelopment();
    
    return (
      <Host class={isDev ? 'dev-mode' : ''}>
        <div class="slide-content">
          <slot></slot>
        </div>
      </Host>
    );
  }
}