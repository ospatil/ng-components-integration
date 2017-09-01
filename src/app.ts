//our root app component
import {Component, NgModule, VERSION, CUSTOM_ELEMENTS_SCHEMA, OnInit, OnDestroy, Input} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'
import {default as SvelteGreeter} from 'sveltegreeter'

@Component({
  selector: 'my-app',
  template: `
    <section>
      <h1>Integrating external components into Angular</h1>
      <p>
      Source: <a href="http://github.com/ospatil/ng-components-integration">http://github.com/ospatil/ng-components-integration</a>
      </p>
      <p>
        The greeter component provides the following functionality:
      </p>
      <ul>
        <li>Receives input through the <em>greeting</em> property on the element.</li>
        <li>Listens to <em>greet</em> button click.</li>
        <li>On <em>greet</em> button click, reads value of input text box and sends a custom DOM <em>message</em>. It also logs events to console.</li>
      </ul>
      <div class="pure-g">

        <div class="pure-u-1-2">
          <component-wrapper>
            <h2>StencilJS</h2>
            <p>Source: <a href="https://github.com/ospatil/stencil-greeter">https://github.com/ospatil/stencil-greeter</a></p>
            <stencil-greeter greeting="Bonjour"></stencil-greeter>
          </component-wrapper>
        </div>

        <div class="pure-u-1-2">
          <component-wrapper>
            <h2>SvelteJS</h2>
            <p>Source: <a href="https://github.com/ospatil/svelte-greeter">https://github.com/ospatil/svelte-greeter</a></p>
            <svelte-comp-greeter [greeting]="'Hello'"></svelte-comp-greeter>
          </component-wrapper>
        </div>

      </div>
    </section>
  `,
  directives: [
    ComponentWrapper,
    SvelteCompGreeter
  ]
})
export class App {
}

@Component({
  selector: 'component-wrapper',
  template: `
    <section>
      <ng-content select="h2"></ng-content>
      <ng-content select="p"></ng-content>
      <div class="component-boundary" (message)="handleMessageEvent($event)">
        <ng-content></ng-content>
      </div>
      <p>Message from component : <strong>{{message}}</strong></p>
    </section>
  `,
  styles: [
    `
    .component-boundary {
      border: thin dashed lightseagreen;
      max-width: 20em;
    }
    `
  ]
})
export class ComponentWrapper {
  message:string;

  handleMessageEvent(ev) {
    console.log('Received event from component: ', ev);
    this.message = ev.detail;
  }
}

@Component({
  selector: 'svelte-comp-greeter',
  template: `
  <section class="svelte-greeter-host"></section>
  `,
})
export class SvelteCompGreeter implements OnInit, OnDestroy {
  @Input() greeting;
  private component;
  ngOnInit() {
    this.component = new SvelteGreeter({
      target: document.querySelector('.svelte-greeter-host'),
      data: {
        greeting: 'Hello'
      }
    });
  }

  ngOnDestroy() {
    this.component.destroy();
  }
}

@NgModule({
  imports: [ BrowserModule ],
  declarations: [
    App,
    ComponentWrapper,
    SvelteCompGreeter
  ],
  bootstrap: [ App ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule {}
