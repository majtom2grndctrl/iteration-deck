import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'iteration-deck-test',
  styleUrl: 'iteration-deck-test.css',
  shadow: true,
})
export class IterationDeckTest {
  @Prop() message: string = 'Hello from Stencil!';

  render() {
    return (
      <div class="test-component">
        <h1>{this.message}</h1>
        <p>This is a test component to verify Stencil is working correctly.</p>
      </div>
    );
  }
}