//our root app component
import {Component, NgModule, VERSION, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core'
import {BrowserModule} from '@angular/platform-browser'

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
          <h2>StencilJS</h2>
          <p>Source: <a href="https://github.com/ospatil/stencil-greeter">https://github.com/ospatil/stencil-greeter</a></p>
          <stencil-greeter greeting="Bonjour" (message)="handleStencilEvent($event)"></stencil-greeter>
          <p>Message from stencilJS : <strong>{{stencilMessage}}</strong></p>
        </div>
      </div>
    </section>
  `,
})
export class App {
  stencilMessage:string;

  handleStencilEvent(ev) {
    console.log('Reveceived event from Stencil: ', ev);
    this.stencilMessage = ev.detail;
  }
}

@NgModule({
  imports: [ BrowserModule ],
  declarations: [ App ],
  bootstrap: [ App ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule {}
